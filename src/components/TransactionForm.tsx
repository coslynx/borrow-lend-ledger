import React, { useState, FormEventHandler, ChangeEvent } from 'react';
import { useTransactions, TransactionPayload } from '../context/TransactionContext'; // Use TransactionPayload from context
import Input from './Input'; // Assuming Input.tsx is in the same directory
import Button from './Button'; // Assuming Button.tsx is in the same directory

// Define the type for form errors state, covering specific fields and a general form error
interface FormErrors {
  lender?: string;
  borrower?: string;
  amount?: string;
  form?: string;
}

/**
 * TransactionForm Component
 *
 * Purpose:
 * Renders a form for users to input and submit new borrow/lend transaction details.
 * Handles local form state, client-side validation, and interacts with the
 * TransactionContext to add the new transaction via the `addTransaction` function.
 *
 * Responsibilities:
 * - Manages local state for lender, borrower, amount, validation errors, and submission status.
 * - Renders input fields using the reusable `Input` component.
 * - Renders a submit button using the reusable `Button` component.
 * - Performs client-side validation before submitting.
 * - Calls the `addTransaction` function from `TransactionContext` upon successful validation.
 * - Displays validation errors specific to fields and general submission errors.
 * - Clears the form upon successful submission.
 *
 * Styling:
 * - Uses Tailwind CSS utility classes, consistent with the application's dark theme and component styles.
 * - Employs spacing utilities like `space-y-4` for vertical rhythm between form elements.
 */
const TransactionForm: React.FC = () => {
  // State for form fields
  const [lender, setLender] = useState<string>('');
  const [borrower, setBorrower] = useState<string>('');
  const [amount, setAmount] = useState<string>(''); // Store as string for input handling flexibility

  // State for validation and submission errors
  const [errors, setErrors] = useState<FormErrors>({});

  // State for tracking submission status to provide user feedback and disable controls
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Get the addTransaction function from the TransactionContext
  // Note: We manage isSubmitting locally in the form for immediate feedback.
  // The context's isLoading reflects the broader state (including fetching after add).
  const { addTransaction } = useTransactions();

  /**
   * Handles changes in input fields.
   * Updates the corresponding state variable and clears any specific validation error
   * for that field, providing immediate feedback as the user corrects the input.
   * Also clears the general form error if the user modifies any field after a failed submission.
   * @param e - The input change event.
   * @param fieldName - The name of the form field being updated ('lender', 'borrower', 'amount').
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof Pick<FormErrors, 'lender' | 'borrower' | 'amount'> // Use keyof for type safety
  ) => {
    const { value } = e.target;

    // Update the state corresponding to the changed input field
    if (fieldName === 'lender') setLender(value);
    if (fieldName === 'borrower') setBorrower(value);
    if (fieldName === 'amount') setAmount(value);

    // Clear the specific validation error for this field as the user types
    // Also clear the general form error if present, assuming user is attempting to correct
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined, // Clear the specific field error
      form: undefined, // Clear general form error on any input change after a failed submit
    }));
  };

  /**
   * Validates the current form data based on defined business rules.
   * Checks for required fields, valid amount, and ensures lender is not the same as borrower.
   * @returns {FormErrors} An object containing any validation errors keyed by field name. Returns an empty object if the form is valid.
   */
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const trimmedLender = lender.trim();
    const trimmedBorrower = borrower.trim();

    // Validate Lender Name
    if (!trimmedLender) {
      newErrors.lender = 'Lender name is required.';
    }

    // Validate Borrower Name
    if (!trimmedBorrower) {
      newErrors.borrower = 'Borrower name is required.';
    }

    // Validate Lender and Borrower are not the same (case-insensitive)
    if (
      trimmedLender &&
      trimmedBorrower &&
      trimmedLender.toLowerCase() === trimmedBorrower.toLowerCase()
    ) {
      // Apply error primarily to borrower field for simplicity, avoiding duplicate messages
      newErrors.borrower = 'Borrower cannot be the same as the lender.';
    }

    // Validate Amount
    if (!amount) {
      newErrors.amount = 'Amount is required.';
    } else {
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        newErrors.amount = 'Please enter a valid positive amount.';
      }
      // Optional: Add more specific checks like maximum value or decimal places if needed later.
    }
    return newErrors;
  };

  /**
   * Handles the form submission process. It prevents the default browser submission,
   * performs validation, and if valid, calls the `addTransaction` function from the context.
   * Manages the `isSubmitting` state for UI feedback and disables controls during the process.
   * Handles success by resetting the form and displays errors caught during submission.
   * @param event - The form submission event object.
   */
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault(); // Prevent default HTML form submission behavior

    // Perform client-side validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Display validation errors to the user
      return; // Halt the submission process
    }

    // If validation passes, proceed with submitting the data
    setErrors({}); // Clear any previous errors (including potential form errors)
    setIsSubmitting(true); // Indicate submission is in progress, disable inputs/button

    const transactionData: TransactionPayload = {
      lender: lender.trim(), // Ensure whitespace is trimmed
      borrower: borrower.trim(), // Ensure whitespace is trimmed
      amount: parseFloat(amount), // Convert amount string to number for the payload
    };

    try {
      // Attempt to add the transaction via the context function
      await addTransaction(transactionData);

      // --- Success Case ---
      // Reset the form fields to their initial empty state
      setLender('');
      setBorrower('');
      setAmount('');
      // Errors are already cleared
      // Optional: Could add a success toast/message here in future iterations.

    } catch (error: any) {
      // --- Error Case ---
      // Handle errors during the submission (e.g., network error, API validation error)
      console.error('Transaction Submission Error:', error);
      // Display a general error message to the user within the form area
      setErrors({
        form: error.message || 'Failed to add transaction. Please try again.',
      });
    } finally {
      // --- Cleanup ---
      // Ensure the submitting state is reset regardless of success or failure
      setIsSubmitting(false);
    }
  };

  // Render the form structure with Input and Button components
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md" // Apply vertical spacing between form elements and limit width
      noValidate // Disable browser's native validation messages
    >
      {/* Lender Input Field Group */}
      <div>
        <Input
          id="lender"
          name="lender"
          type="text"
          label="Lender Name"
          placeholder="Enter lender's name"
          value={lender}
          onChange={(e) => handleChange(e, 'lender')}
          required={true} // HTML5 required attribute (visual cue, validation enforced manually)
          disabled={isSubmitting} // Disable during submission
          aria-describedby={errors.lender ? 'lender-error' : undefined} // Link error message for accessibility
          aria-invalid={!!errors.lender} // Indicate invalid state for assistive tech
        />
        {/* Display lender validation error */}
        {errors.lender && (
          <p id="lender-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.lender}
          </p>
        )}
      </div>

      {/* Borrower Input Field Group */}
      <div>
        <Input
          id="borrower"
          name="borrower"
          type="text"
          label="Borrower Name"
          placeholder="Enter borrower's name"
          value={borrower}
          onChange={(e) => handleChange(e, 'borrower')}
          required={true}
          disabled={isSubmitting}
          aria-describedby={errors.borrower ? 'borrower-error' : undefined}
          aria-invalid={!!errors.borrower}
        />
        {/* Display borrower validation error */}
        {errors.borrower && (
          <p id="borrower-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.borrower}
          </p>
        )}
      </div>

      {/* Amount Input Field Group */}
      <div>
        <Input
          id="amount"
          name="amount"
          type="number"
          label="Amount"
          placeholder="Enter amount (e.g., 10.50)"
          value={amount}
          onChange={(e) => handleChange(e, 'amount')}
          required={true}
          step="0.01" // Allow decimal values for currency
          min="0.01" // Enforce a minimum positive value
          disabled={isSubmitting}
          aria-describedby={errors.amount ? 'amount-error' : undefined}
          aria-invalid={!!errors.amount}
        />
        {/* Display amount validation error */}
        {errors.amount && (
          <p id="amount-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.amount}
          </p>
        )}
      </div>

      {/* General Form Submission Error Display Area */}
      {/* Display non-field-specific errors (e.g., network/API errors) */}
      {errors.form && (
        <p className="text-red-500 text-sm text-center" role="alert">
          {errors.form}
        </p>
      )}

      {/* Submit Button Area */}
      <div className="pt-2"> {/* Add slight padding above the button */}
        <Button
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
          className="w-full" // Make button full width within its container
        >
          {/* Dynamically change button text based on submission state */}
          {isSubmitting ? 'Adding...' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;