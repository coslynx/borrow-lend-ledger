import React from 'react';
// Assuming Transaction type is exported from context or a shared types file
// Based on provided context/api files, Transaction has: id, lender, borrower, amount, createdAt?
import { Transaction } from '../context/TransactionContext';

/**
 * @interface TransactionListProps
 * @description Defines the props accepted by the TransactionList component.
 * @property {Transaction[]} transactions - An array of transaction objects to be displayed.
 */
export interface TransactionListProps {
  transactions: Transaction[];
}

/**
 * TransactionList Component
 *
 * Purpose:
 * Renders a list of financial transactions in a tabular format. It receives an array
 * of transaction objects via props and displays them. It also handles the case
 * where no transactions are available, showing an informative message instead.
 *
 * Responsibilities:
 * - Displays a message if the `transactions` array is empty or not provided.
 * - Renders an HTML table with appropriate headers (Lender, Borrower, Amount).
 * - Maps over the `transactions` array to render each transaction as a row in the table.
 * - Formats the transaction amount as currency (e.g., $10.50).
 * - Uses unique transaction IDs for React list keys for performance.
 * - Adheres to the application's dark theme styling using Tailwind CSS.
 *
 * Props:
 * - `transactions` (Transaction[]): The list of transaction records to display.
 *
 * @param {TransactionListProps} props - The props for the TransactionList component.
 * @param {Transaction[]} props.transactions - The array of transactions to display.
 * @returns {React.ReactElement} The rendered transaction list table or an empty state message.
 */
const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  // Check for empty state: null, undefined, or empty array
  if (!transactions || transactions.length === 0) {
    return (
      <p className="text-gray-400 italic p-4 text-center">
        No transactions recorded yet.
      </p>
    );
  }

  // Render the table if transactions exist
  return (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-md overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Lender
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Borrower
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider text-right" // Align header right like the data
              >
                Amount
              </th>
              {/* Optional: Add date header later if needed
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date
              </th>
              */}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {transactions.map((transaction) => (
              // **Critical:** Use transaction.id (or fallback to _id if id is missing, though context should provide `id`) as the unique key.
              // Based on analysis of api.ts and context, `id` should be present.
              <tr
                key={transaction.id || transaction._id} // Ensure a key is always provided
                className="hover:bg-gray-750 transition-colors duration-150"
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">
                  {transaction.lender}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">
                  {transaction.borrower}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100 font-mono text-right">
                  ${transaction.amount.toFixed(2)}
                </td>
                 {/* Optional: Render formatted date later if needed
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
                  {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString() : '-'}
                </td>
                 */}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default TransactionList;