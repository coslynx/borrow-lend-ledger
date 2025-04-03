#!/bin/sh

# Startup script for the Borrow/Lend Tracker MVP Frontend
#
# This script checks if Node.js dependencies are installed (by checking for
# the node_modules directory) and installs them if necessary using npm.
# Then, it starts the Vite development server.
#
# Usage: ./startup.sh
# Make sure the script has execute permissions: chmod +x startup.sh

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Dependency Check ---
# Check if the node_modules directory exists. If not, run npm install.
if [ ! -d "node_modules" ]; then
  echo "INFO: node_modules not found. Running npm install..."
  npm install
  echo "INFO: npm install completed."
fi

# --- Start Development Server ---
# Start the Vite development server using the script defined in package.json
echo "INFO: Starting Vite development server (npm run dev)..."
npm run dev

# The script will keep running in the foreground while the Vite server is active.
# Press Ctrl+C to stop the server and exit the script.