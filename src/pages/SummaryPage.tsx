import React from 'react';
import { useTransactions } from '../context/TransactionContext'; // Assuming Summaries type is implicitly handled or defined here
import SummaryDisplay from '../components/SummaryDisplay'; // Assuming this component exists and handles the summary display

/**
 * SummaryPage Component
 *
 * Purpose:
 * Serves as the dedicated page container for displaying the calculated summary of
 * debts and credits per person. It retrieves the pre-calculated summary data,
 * loading status, and any potential errors from the global `TransactionContext`.
 * Similar to the LedgerPage, it conditionally renders loading indicators, error messages,
 * or the actual summary visualization using the `SummaryDisplay` component.
 *
 * Responsibilities:
 * - Renders the page title "Summary".
 * - Consumes the `summaries`, `isLoading`, and `error` state from `TransactionContext` via the `useTransactions` hook.
 * - Implements conditional rendering logic:
 *   - Displays a loading message while initial data load/calculation might be in progress (`isLoading` is true).
 *   - Displays an error message if fetching or processing fails (`error` is not null).
 *   - Renders the `SummaryDisplay` component with the calculated `summaries` data when available and not loading/in error.
 * - Provides the structural layout for the summary view within the main application frame.
 *
 * Context Interaction:
 * - Directly interacts with `TransactionContext` by calling the `useTransactions` hook.
 * - Relies on the context to provide the calculated `summaries` object and the status of underlying data operations.
 *
 * Rendering Logic:
 * - Conditionally renders UI based on `isLoading` and `error` states obtained from the context.
 * - Delegates the rendering of the actual summary visualization to the `SummaryDisplay` component, passing the summaries object as a prop.
 *
 * Routing Association:
 * - Associated with the `/summary` route defined in `src/App.tsx`.
 *
 * Styling Approach:
 * - Uses Tailwind CSS utility classes exclusively for styling.
 * - Adheres to the application's established visual theme (dark mode) and styling conventions seen in `src/App.tsx` and `src/pages/LedgerPage.tsx` for headings, loading text, and error text.
 */
const SummaryPage: React.FC = () => {
  // Consume summaries state, loading status, and errors from the context
  const { summaries, isLoading, error } = useTransactions();

  // Helper function to render the main content based on state
  const renderContent = () => {
    if (isLoading) {
      // Display loading indicator while transactions/summaries might be processing
      return <p className="text-yellow-400">Loading summary...</p>;
    }

    if (error) {
      // Display error message if fetching or calculation failed
      // The 'error' from context is expected to be a string message
      return (
        <p className="text-red-500">Failed to load summary: {error}</p>
      );
    }

    // If not loading and no error, render the summary display
    // Check if SummaryDisplay component exists before rendering
    if (typeof SummaryDisplay === 'undefined') {
      // Fallback if component is missing (should ideally not happen in production)
      return (
        <p className="text-red-500">
          Error: SummaryDisplay component is missing.
        </p>
      );
    }
    // Pass the calculated summaries to the SummaryDisplay component
    // The summaries object structure is { [name: string]: number }
    return <SummaryDisplay summaries={summaries} />;
  };

  return (
    <div>
      {/* Page Heading */}
      <h2 className="mb-4 text-2xl font-bold text-gray-100">Summary</h2>

      {/* Render loading state, error state, or the summary display */}\
      {renderContent()}
    </div>
  );
};

export default SummaryPage;