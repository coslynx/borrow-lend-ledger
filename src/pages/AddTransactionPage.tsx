import React from 'react';
import TransactionForm from '../components/TransactionForm'; // Assuming this component exists and handles the form logic

/**
 * AddTransactionPage Component
 *
 * Purpose:
 * Serves as the dedicated page container for adding new borrow/lend transactions.
 * It is rendered by React Router when the user navigates to the `/add` path.
 * Its primary responsibility is to display a title and render the `TransactionForm` component,
 * which encapsulates the actual data input fields, validation, and submission logic.
 *
 * Responsibilities:
 * - Renders the page title "Add New Transaction".
 * - Renders the `TransactionForm` component.
 * - Provides the structural layout for the add transaction view within the main application frame.
 *
 * State Management:
 * - This component is stateless regarding form data. State is managed within `TransactionForm`.
 *
 * Context Interaction:
 * - Does not directly interact with `TransactionContext`. Interaction is delegated to `TransactionForm`.
 *
 * Routing:
 * - Associated with the `/add` route defined in `src/App.tsx`.
 *
 * Styling:
 * - Uses Tailwind CSS utility classes consistent with the application's theme.
 */
const AddTransactionPage: React.FC = () => {
  return (
    <div>
      {/* Page Heading */}
      <h2 className="mb-4 text-2xl font-bold text-gray-100">
        Add New Transaction
      </h2>

      {/* Transaction Form Component */}
      {/* This component handles all aspects of creating a new transaction */}
      <TransactionForm />
    </div>
  );
};

export default AddTransactionPage;