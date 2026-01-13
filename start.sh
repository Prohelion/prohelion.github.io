#!/bin/bash

# Script to start MkDocs server with automatic dependency checking
# This script activates the virtual environment, checks/installs required packages,
# and starts the MkDocs development server

set -e  # Exit on error

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Error: Virtual environment not found. Please create it first:"
    echo "  python3 -m venv venv"
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Required packages list
REQUIRED_PACKAGES=(
    "mkdocs-material"
    "mkdocs-awesome-pages-plugin"
    "mkdocs-glightbox"
    "mkdocs-spellcheck"
    "symspellpy"
)

# Check and install missing packages
echo "Checking for required packages..."
MISSING_PACKAGES=()

for package in "${REQUIRED_PACKAGES[@]}"; do
    if ! pip show "$package" &> /dev/null; then
        MISSING_PACKAGES+=("$package")
    fi
done

if [ ${#MISSING_PACKAGES[@]} -gt 0 ]; then
    echo "Installing missing packages: ${MISSING_PACKAGES[*]}"
    pip install "${MISSING_PACKAGES[@]}"
else
    echo "All required packages are installed."
fi

# Start MkDocs server
echo ""
echo "Starting MkDocs server..."
echo "Server will be available at http://127.0.0.1:8000"
echo "Press Ctrl+C to stop the server"
echo ""

mkdocs serve
