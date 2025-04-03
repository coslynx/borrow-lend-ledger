import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

/**
 * Represents the data required to create a new transaction via the API.
 */
export interface TransactionPayload {
  lender: string;
  borrower: string;
  amount: number; // Ensure this is handled as a number
}

/**
 * Represents a transaction object as returned by the backend API.
 * Assumes the backend generates a unique ID and may include a timestamp.
 */
export interface Transaction {
  id: string; // Assuming backend generates a string ID (e.g., UUID or MongoDB ObjectID)
  lender: string;
  borrower: string;
  amount: number;
  createdAt?: string; // Optional: ISO date string from backend
}

// Create and configure an Axios instance for API communication.
const apiClient: AxiosInstance = axios.create({
  // Base URL is read from the environment variable defined in .env and vite-env.d.ts
  // Vite handles injecting the value of import.meta.env.VITE_API_BASE_URL
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Set a reasonable timeout for requests (e.g., 10 seconds)
  timeout: 10000,
  // Default headers for requests, assuming JSON communication
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers like 'Accept' if needed
    // 'Accept': 'application/json'
  },
});

/**
 * Fetches the list of all transactions from the backend API.
 * @returns {Promise<Transaction[]>} A promise that resolves to an array of transaction objects.
 * @throws {Error} Throws an error if the API request fails (network error or non-2xx response).
 */
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    // Make GET request to the '/transactions' endpoint.
    // Explicitly type the expected response data structure.
    const response: AxiosResponse<Transaction[]> = await apiClient.get<
      Transaction[]
    >('/transactions');
    // Return the data part of the response upon success.
    return response.data;
  } catch (error: unknown) {
    // Log the detailed error for debugging purposes.
    if (axios.isAxiosError(error)) {
      console.error(
        'API Error fetching transactions:',
        error.response?.status,
        error.response?.data,
        error.message
      );
    } else {
      console.error('Unexpected error fetching transactions:', error);
    }
    // Re-throw the error to be handled by the calling function (e.g., in TransactionContext).
    // This allows the UI layer to manage user feedback based on the error.
    throw new Error('Failed to fetch transactions from the server.');
  }
};

/**
 * Creates a new transaction by sending data to the backend API.
 * @param {TransactionPayload} payload - The data for the new transaction.
 * @returns {Promise<Transaction>} A promise that resolves to the newly created transaction object returned by the API.
 * @throws {Error} Throws an error if the API request fails (network error or non-2xx response).
 */
export const createTransaction = async (
  payload: TransactionPayload
): Promise<Transaction> => {
  try {
    // Make POST request to the '/transactions' endpoint with the payload.
    // Explicitly type the expected response data structure.
    const response: AxiosResponse<Transaction> = await apiClient.post<
      Transaction
    >('/transactions', payload);
    // Return the data part of the response (the created transaction) upon success.
    return response.data;
  } catch (error: unknown) {
    // Log the detailed error for debugging.
    if (axios.isAxiosError(error)) {
      console.error(
        'API Error creating transaction:',
        error.response?.status,
        error.response?.data,
        error.message
      );
    } else {
      console.error('Unexpected error creating transaction:', error);
    }
    // Re-throw the error for handling in the calling code.
    throw new Error('Failed to create the transaction on the server.');
  }
};