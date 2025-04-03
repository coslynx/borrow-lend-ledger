import React from 'react';
import { useTransactions, Transaction } from '../context/TransactionContext'; // Assuming Transaction type is exported here
import TransactionList from '../components/TransactionList'; // Assuming this component exists and handles the list display

/**
 * LedgerPage Component
 *
 * Purpose:
 * Serves as the dedicated page container for displaying the list of all recorded
 * borrow/lend transactions, commonly referred to as the ledger. It fetches the
 * current transaction data, loading status, and any potential errors from the
 * global `TransactionContext`. Based on this state, it conditionally renders
 * either a loading indicator, an error message, or the actual list of transactions
 * using the `TransactionList` component.
 *
 * Responsibilities:
 * - Renders the page title "Transaction Ledger".
 * - Consumes the `transactions`, `isLoading`, and `error` state from `TransactionContext` via the `useTransactions` hook.
 * - Implements conditional rendering logic:
 *   - Displays a loading message while data is being fetched (`isLoading` is true).
 *   - Displays an error message if data fetching fails (`error` is not null).
 *   - Renders the `TransactionList` component with the fetched `transactions` data when available and not loading/in error.
 * - Provides the structural layout for the ledger view within the main application frame.
 *
 * Context Interaction:
 * - Directly interacts with `TransactionContext` by calling the `useTransactions` hook.
 * - Relies on the context to provide the up-to-date list of transactions and the status of data fetching operations.
 *
 * Rendering Logic:
 * - Conditionally renders UI based on `isLoading` and `error` states from the context.
 * - Delegates the rendering of the actual transaction list to the `TransactionList` component, passing the transactions array as a prop.
 *
 * Routing Association:
 * - Associated with the `/ledger` route defined in `src/App.tsx`.
 * - Also serves as the default view as the root `/` route redirects to `/ledger`.
 *
 * Styling Approach:
 * - Uses Tailwind CSS utility classes exclusively for styling.
 * - Adheres to the application's established visual theme (dark mode) and styling conventions seen in `src/App.tsx` and other page components.
 */
const LedgerPage: React.FC = () => {
  // Consume transaction state, loading status, and errors from the context
  const { transactions, isLoading, error } = useTransactions();

  // Helper function to render the main content based on state
  const renderContent = () => {
    if (isLoading) {
      // Display loading indicator
      return <p className="text-yellow-400">Loading transactions...</p>;
    }

    if (error) {
      // Display error message if fetching failed
      // The 'error' from context is expected to be a string message
      return (
        <p className="text-red-500">Failed to load transactions: {error}</p>
      );
    }

    // If not loading and no error, render the transaction list
    // Check if TransactionList component exists before rendering
    if (typeof TransactionList === 'undefined') {
      // Fallback if component is missing (should ideally not happen)
      return (
        <p className="text-red-500">
          Error: TransactionList component is missing.
        </p>
      );
    }
    // Pass the fetched transactions to the TransactionList component
    return <TransactionList transactions={transactions} />;
  };

  return (
    <div>
      {/* Page Heading */}
      <h2 className="mb-4 text-2xl font-bold text-gray-100">
        Transaction Ledger
      </h2>

      {/* Render loading state, error state, or the transaction list */}
      {renderContent()}
    </div>
  );
};

export default LedgerPage;