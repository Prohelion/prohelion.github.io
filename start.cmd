@echo off
REM Script to start MkDocs server with automatic dependency checking
REM This script activates the virtual environment, checks/installs required packages,
REM and starts the MkDocs development server

setlocal enabledelayedexpansion

REM Get the directory where this script is located
cd /d "%~dp0"

REM Check if virtual environment exists
if not exist "venv" (
    echo Error: Virtual environment not found. Please create it first:
    echo   python -m venv venv
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Required packages list
set "REQUIRED_PACKAGES=mkdocs-material mkdocs-awesome-pages-plugin mkdocs-glightbox mkdocs-spellcheck symspellpy"

REM Check and install missing packages
echo Checking for required packages...
set "MISSING_PACKAGES="

for %%p in (%REQUIRED_PACKAGES%) do (
    pip show %%p >nul 2>&1
    if errorlevel 1 (
        set "MISSING_PACKAGES=!MISSING_PACKAGES! %%p"
    )
)

if not "!MISSING_PACKAGES!"=="" (
    echo Installing missing packages:!MISSING_PACKAGES!
    pip install!MISSING_PACKAGES!
) else (
    echo All required packages are installed.
)

REM Start MkDocs server
echo.
echo Starting MkDocs server...
echo Server will be available at http://127.0.0.1:8000
echo Press Ctrl+C to stop the server
echo.

mkdocs serve
