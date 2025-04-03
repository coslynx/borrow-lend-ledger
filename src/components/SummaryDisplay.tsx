import React from 'react';

/**
 * @interface SummaryDisplayProps
 * @description Defines the props accepted by the SummaryDisplay component.
 * @property {object} summaries - An object containing the calculated summaries.
 *   Keys are people's names (string).
 *   Values are their net balances (number).
 *   Positive values indicate the person owes the user/system.
 *   Negative values indicate the user/system owes the person.
 *   Example: { "Alice": 50.25, "Bob": -25.00 }
 */
interface SummaryDisplayProps {
  summaries: { [name: string]: number };
}

/**
 * SummaryDisplay Component
 *
 * Purpose:
 * Renders the calculated financial summaries, showing who owes money and who is owed money.
 * It separates the summaries into two distinct lists based on the sign of the balance.
 *
 * Responsibilities:
 * - Displays an informative message if no summary data is available.
 * - Processes the `summaries` object to separate positive (owed to user) and negative (owed by user) balances.
 * - Renders two sections with headings: "Who Owes You" and "Who You Owe".
 * - Displays each person's name and their corresponding net balance, formatted as currency, within the appropriate section.
 * - Uses distinct styling for positive (green) and negative (red) balances.
 * - Adheres to the application's dark theme using Tailwind CSS.
 *
 * Props:
 * - `summaries` ({ [name: string]: number }): The calculated summary data.
 *
 * @param {SummaryDisplayProps} props - The props for the SummaryDisplay component.
 * @param {object} props.summaries - The calculated summary object.
 * @returns {React.ReactElement} The rendered summary display sections or an empty state message.
 */
const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summaries }) => {
  // Check for empty state: null, undefined, or no entries
  if (!summaries || Object.keys(summaries).length === 0) {
    return (
      <p className="text-gray-400 italic p-4 text-center">
        No summary data available.
      </p>
    );
  }

  // Process summaries into two categories
  const summaryEntries = Object.entries(summaries);
  const owedToUser = summaryEntries.filter(([_, balance]) => balance > 0);
  const owedByUser = summaryEntries.filter(([_, balance]) => balance < 0);

  return (
    <div>
      {/* Section: Who Owes You (Positive Balances) */}
      {owedToUser.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Who Owes You
          </h3>
          <ul className="space-y-1 list-disc list-inside bg-gray-800 p-3 rounded-md border border-gray-700">
            {owedToUser.map(([name, balance]) => (
              <li key={name} className="text-gray-100">
                {name} owes you{' '}
                <span className="font-medium text-green-400">
                  ${balance.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section: Who You Owe (Negative Balances) */}
      {owedByUser.length > 0 && (
        // Add margin top only if the previous section also rendered
        <div className={owedToUser.length > 0 ? 'mt-4' : ''}>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Who You Owe
          </h3>
          <ul className="space-y-1 list-disc list-inside bg-gray-800 p-3 rounded-md border border-gray-700">
            {owedByUser.map(([name, balance]) => (
              <li key={name} className="text-gray-100">
                You owe {name}{' '}
                <span className="font-medium text-red-400">
                  ${Math.abs(balance).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SummaryDisplay;