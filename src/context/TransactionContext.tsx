import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  FC,
  useCallback,
} from 'react';
import { getTransactions, createTransaction } from '../services/api';

// Represents a single transaction record
export interface Transaction {
  _id?: string; // Optional: Assuming MongoDB ID from backend
  lender: string;
  borrower: string;
  amount: number;
  createdAt?: string; // Optional: Assuming timestamp from backend
}

// Represents the data structure needed to create a new transaction
export interface TransactionPayload {
  lender: string;
  borrower: string;
  amount: number;
}

// Represents the calculated summary (net balance per person)
// Positive means the person owes money (borrowed net), negative means the person is owed money (lent net)
export interface Summary {
  [personName: string]: number;
}

// Defines the shape of the context value
interface TransactionContextType {
  transactions: Transaction[];
  summaries: Summary;
  isLoading: boolean;
  error: string | null;
  addTransaction: (transactionData: TransactionPayload) => Promise<void>;
  fetchTransactions: () => Promise<void>; // Expose fetch for potential manual refresh
}

// Create Context
const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

// Create Provider Component
export const TransactionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Transactions Function
  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors before fetching
    try {
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    } catch (err: any) {
      console.error('Failed to fetch transactions:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to load transactions. Please try again later.';
      setError(errorMessage);
      setTransactions([]); // Clear transactions on error
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies, function identity is stable

  // Add Transaction Function
  const addTransaction = async (transactionData: TransactionPayload) => {
    // Don't clear error here, fetchTransactions will handle it if the add is successful
    setIsLoading(true); // Indicate activity starts
    try {
      await createTransaction(transactionData);
      // Crucially, fetch the entire list again after adding to ensure consistency
      await fetchTransactions(); // This handles loading state changes and error clearing on success
    } catch (err: any) {
      console.error('Failed to add transaction:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to add transaction. Please try again.';
      setError(errorMessage);
      // Ensure loading is set to false only if the add operation itself failed
      // If fetchTransactions was called, it handles the final loading state.
      setIsLoading(false);
    }
    // No finally block needed here for isLoading, handled by fetchTransactions on success path or catch on error path.
  };

  // Initial Data Load
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]); // Depend on the stable fetchTransactions function

  // Calculate Summaries
  const summaries = useMemo<Summary>(() => {
    const tempSummary: Summary = {};
    transactions.forEach((tx) => {
      // Ensure names are handled consistently (case-sensitive for MVP)
      const lender = tx.lender.trim();
      const borrower = tx.borrower.trim();
      const amount = tx.amount;

      // Initialize balances if person doesn't exist in summary yet
      if (tempSummary[lender] === undefined) {
        tempSummary[lender] = 0;
      }
      if (tempSummary[borrower] === undefined) {
        tempSummary[borrower] = 0;
      }

      // Lender's balance decreases (they are owed money)
      tempSummary[lender] -= amount;
      // Borrower's balance increases (they owe money)
      tempSummary[borrower] += amount;
    });
    return tempSummary;
  }, [transactions]); // Only recalculate when transactions array changes

  // Context Value
  const value: TransactionContextType = {
    transactions,
    summaries,
    isLoading,
    error,
    addTransaction,
    fetchTransactions,
  };

  // Return Provider
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// Create Custom Hook
export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider'
    );
  }
  return context;
};