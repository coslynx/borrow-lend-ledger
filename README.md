<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Borrow Lend Tracker MVP
</h1>
<h4 align="center">A web application to track money borrowed and lent between individuals, maintaining a clear transaction ledger and summary.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React%20(Vite)-blue" alt="Framework: React (Vite)">
  <img src="https://img.shields.io/badge/Language-TypeScript-blueviolet" alt="Language: TypeScript">
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC" alt="Styling: Tailwind CSS">
  <img src="https://img.shields.io/badge/API_Client-Axios-purple" alt="API Client: Axios">
  <img src="https://img.shields.io/badge/State_Management-React%20Context-orange" alt="State Management: React Context">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/borrow-lend-ledger?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/borrow-lend-ledger?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/borrow-lend-ledger?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 🤝 Contributing (Placeholder)
- 📜 API Documentation (Conceptual Backend)
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the Minimum Viable Product (MVP) for a **Borrow/Lend Tracker** web application. The primary goal is to provide a simple, efficient way for individuals (e.g., users within web marketplaces) to record and track money exchanged between known parties. It maintains a clear ledger ("sheet") of who borrowed how much from whom and calculates summaries of net debts and credits per person.

The frontend is built using **React** with **TypeScript** for type safety, bootstrapped with **Vite** for a fast development experience. **Tailwind CSS** is used for utility-first styling. Global state, including the transaction list and calculated summaries, is managed using **React Context API**. Data persistence relies on interaction with a **conceptual backend API** via **Axios**.

## 📦 Features
|    | Feature            | Description                                                                                                                                  |
|----|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | Component-based React frontend using Vite. Features separation into pages (`pages`), reusable UI elements (`components`), state management (`context`), and API interaction layer (`services`). |
| 📄 | **Documentation**  | This README provides an overview, setup instructions, usage details, and conceptual API definition. Code includes JSDoc comments where applicable. |
| 🔗 | **Dependencies**   | Core dependencies include `react`, `react-dom`, `react-router-dom`, `axios`. Dev dependencies include `vite`, `typescript`, `tailwindcss`, `eslint`. |
| 🧩 | **Modularity**     | Clear separation of concerns: Pages for views, Components for UI elements, Context for global state, Services for API calls.                     |
| ✨ | **Core Functionality**| Add new transactions (lender, borrower, amount). View a chronological ledger of all transactions. View an aggregated summary of who owes whom. |
| 🎨 | **Styling**        | Utility-first styling with Tailwind CSS, adhering to a consistent dark theme.                                                                 |
| 🧭 | **Routing**        | Client-side routing handled by `react-router-dom` for navigation between Ledger, Add Transaction, and Summary pages.                           |
| 💾 | **State Management**| Global application state (transactions, summaries, loading/error status) managed centrally via React Context API (`TransactionContext`).        |
| 📡 | **API Interaction**| Uses Axios (`src/services/api.ts`) to communicate with a conceptual backend API for fetching and creating transactions.                     |
| ✅ | **Validation**     | Includes basic client-side form validation in `TransactionForm.tsx` (required fields, positive amount, lender != borrower).                       |

## 📂 Structure
```text
/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── SummaryDisplay.tsx
│   │   ├── TransactionForm.tsx
│   │   └── TransactionList.tsx
│   ├── context/            # React Context for global state
│   │   └── TransactionContext.tsx
│   ├── pages/              # Page-level components associated with routes
│   │   ├── AddTransactionPage.tsx
│   │   ├── LedgerPage.tsx
│   │   └── SummaryPage.tsx
│   ├── services/           # API interaction logic
│   │   └── api.ts
│   ├── App.tsx             # Root application component with routing setup
│   ├── index.css           # Global styles and Tailwind directives
│   ├── main.tsx            # Application entry point (renders App into DOM)
│   └── vite-env.d.ts       # Vite environment variable type definitions
├── .env                    # Environment variables (API base URL) - *DO NOT COMMIT*
├── .env.example            # Example environment variables file
├── .eslintrc.cjs           # ESLint configuration (if generated/added)
├── .gitignore              # Git ignore rules
├── commands.json           # Descriptions of npm scripts
├── index.html              # Link to public/index.html (Vite convention)
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration (for Tailwind/Autoprefixer)
├── README.md               # This file
├── startup.sh              # Optional development server startup script
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript compiler configuration
└── vite.config.ts          # Vite build tool configuration
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - **Node.js:** LTS version recommended (e.g., v18.x or v20.x). Check with `node -v`.
> - **npm:** Usually included with Node.js. Check with `npm -v`.
> - **Git:** For cloning the repository.
> - **Conceptual Backend API:** This frontend requires a running backend API service that implements the endpoints defined in [API Documentation](#-api-documentation-conceptual-backend). The frontend expects this API to be accessible at the URL specified in the `.env` file.

### 🚀 Setup Instructions
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/coslynx/borrow-lend-ledger.git
    cd borrow-lend-ledger
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file and set the `VITE_API_BASE_URL` to the base URL of your running **conceptual backend API**.
        ```dotenv
        # Example .env content
        VITE_API_BASE_URL=http://localhost:3001/api # Replace with your actual backend API URL
        ```

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1.  **Ensure the conceptual backend API is running** and accessible at the URL specified in your `.env` file.
2.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    This command (defined in `package.json` and described in `commands.json`) starts the Vite development server, typically on `http://localhost:5173`.

3.  **Access the application** in your web browser at the URL provided by Vite (e.g., `http://localhost:5173`).

> [!TIP]
> ### ⚙️ Configuration
> - The primary configuration is the backend API endpoint set in the `.env` file via `VITE_API_BASE_URL`. Vite uses this during build time and makes it available to the application.
> - `vite.config.ts`: Configures the Vite build tool (dev server port, build options).
> - `tailwind.config.js`: Configures Tailwind CSS theme and content scanning.
> - `tsconfig.json`: Configures the TypeScript compiler options.

### 📚 Available Scripts

You can use the following scripts defined in `package.json` (see `commands.json` for descriptions):

-   `npm run dev`: Starts the development server.
-   `npm run build`: Creates a production build in the `dist/` directory.
-   `npm run lint`: Lints the codebase using ESLint.
-   `npm run typecheck`: Performs TypeScript type checking without emitting files.

## 🌐 Hosting
### 🚀 Deployment Instructions
This frontend application is built as a static site and can be deployed to various static hosting providers.

#### Example: Deploying to Netlify / Vercel
1.  **Build the application:**
    ```bash
    npm run build
    ```
    This creates an optimized production build in the `dist/` directory.
2.  **Deploy the `dist` directory:**
    *   **Netlify:** Use the Netlify CLI (`netlify deploy --prod`) or connect your Git repository via the Netlify dashboard. Set the build command to `npm run build` and the publish directory to `dist`.
    *   **Vercel:** Use the Vercel CLI (`vercel --prod`) or connect your Git repository via the Vercel dashboard. Vercel typically auto-detects Vite projects. Ensure the Output Directory is set to `dist`.
3.  **Set Environment Variables:** Configure the `VITE_API_BASE_URL` environment variable in your hosting provider's settings. This variable is needed **during the build process** on the hosting platform.

### 🔑 Environment Variables
-   **`VITE_API_BASE_URL` (Required at Build Time):** The base URL of the backend API the deployed frontend will communicate with.
    Example: `https://your-api.example.com/api`

## 🤝 Contributing (Placeholder)
> [!NOTE]
> As this is an AI-generated MVP, direct contributions are not typically accepted in the conventional sense. However, feedback and suggestions can be directed to CosLynx.com. If forking, follow standard Git practices.

## 📜 API Documentation (Conceptual Backend)
The frontend (`src/services/api.ts`) expects a backend API with the following endpoints. **This MVP only includes the frontend code; the backend must be implemented separately.**

### 🔍 Endpoints

-   **`GET /transactions`**
    -   **Description:** Retrieves all recorded transactions.
    -   **Method:** `GET`
    -   **Response Body (Success - 200 OK):** `application/json`
        ```json
        [
          {
            "id": "tx_123",
            "lender": "Alice",
            "borrower": "Bob",
            "amount": 50.00,
            "createdAt": "2023-10-27T10:00:00.000Z"
          },
          {
            "id": "tx_456",
            "lender": "Charlie",
            "borrower": "Alice",
            "amount": 25.50,
            "createdAt": "2023-10-28T11:30:00.000Z"
          }
        ]
        ```
    -   **Response Body (Error):** Standard HTTP error codes (e.g., 500 Internal Server Error).

-   **`POST /transactions`**
    -   **Description:** Creates a new transaction record.
    -   **Method:** `POST`
    -   **Request Body:** `application/json`
        ```json
        {
          "lender": "David",
          "borrower": "Eve",
          "amount": 100.75
        }
        ```
    -   **Response Body (Success - 201 Created):** `application/json` (The newly created transaction object)
        ```json
        {
          "id": "tx_789",
          "lender": "David",
          "borrower": "Eve",
          "amount": 100.75,
          "createdAt": "2023-10-29T14:00:00.000Z"
        }
        ```
    -   **Response Body (Error):** Standard HTTP error codes (e.g., 400 Bad Request for invalid data, 500 Internal Server Error).

### 🔒 Authentication
-   No authentication is implemented or expected by the frontend MVP. The conceptual backend API is assumed to be open or handle authentication independently if required.

### 📝 Examples (Conceptual `curl`)

```bash
# Get all transactions
curl http://localhost:3001/api/transactions

# Add a new transaction
curl -X POST http://localhost:3001/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"lender": "Frank", "borrower": "Grace", "amount": 15.00}'
```


> [!NOTE]
> ## 📜 License & Attribution
>
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
>
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
>
> No human was directly involved in the coding process of the repository: borrow-lend-ledger
>
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>