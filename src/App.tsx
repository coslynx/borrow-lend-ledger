import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

// Assuming TransactionProvider exists and handles transaction state
import { TransactionProvider } from './context/TransactionContext';

// Import page components
import AddTransactionPage from './pages/AddTransactionPage';
import LedgerPage from './pages/LedgerPage';
import SummaryPage from './pages/SummaryPage';

// Assuming a basic ErrorBoundary component exists or can be created
// import ErrorBoundary from './components/ErrorBoundary';

/**
 * The root application component.
 * Sets up the main layout, global context providers, and routing.
 */
const App: React.FC = () => {
  return (
    // Main application container with dark theme styling
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* TransactionProvider wraps the entire app to provide global state */}
      <TransactionProvider>
        {/* Navigation Bar */}
        <nav className="p-4 border-b border-gray-700">
          <Link
            to="/ledger"
            className="text-blue-400 hover:text-blue-300 mr-4 transition-colors duration-200"
          >
            Ledger
          </Link>
          <Link
            to="/add"
            className="text-blue-400 hover:text-blue-300 mr-4 transition-colors duration-200"
          >
            Add Transaction
          </Link>
          <Link
            to="/summary"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Summary
          </Link>
        </nav>

        {/* Main Content Area */}
        <main className="p-4">
          {/* Placeholder for Error Boundary: Wrap Routes to catch errors in page components */}
          {/* <ErrorBoundary fallback={<p>Something went wrong in this section.</p>}> */}
          <Routes>
            {/* Default route redirects to the ledger page */}
            <Route path="/" element={<Navigate replace to="/ledger" />} />

            {/* Route for adding a new transaction */}
            <Route path="/add" element={<AddTransactionPage />} />

            {/* Route for viewing the transaction ledger */}
            <Route path="/ledger" element={<LedgerPage />} />

            {/* Route for viewing the summary of debts/credits */}
            <Route path="/summary" element={<SummaryPage />} />

            {/* Optional: Catch-all route for 404 Not Found */}
            {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
          </Routes>
          {/* </ErrorBoundary> */}
        </main>
      </TransactionProvider>
    </div>
  );
};

export default App;