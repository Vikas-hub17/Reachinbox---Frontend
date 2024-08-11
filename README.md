# Project Overview
Onebox is a React-based web application designed for managing email threads. It features a custom text editor, keyboard shortcuts for quick actions, and integration with external APIs for fetching and manipulating email data. The application also includes a dark-themed user interface with a responsive design.

## Features
List and Manage Email Threads: View all email threads, delete threads, and send replies.
Custom Text Editor: Includes custom buttons like "SAVE" and "Variables."
Keyboard Shortcuts: Quickly delete or reply to email threads using keyboard shortcuts.
API Integration: Seamlessly integrates with external APIs to fetch and manage email data.
Dark Mode UI: A user-friendly dark mode user interface.
## Installation
### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.x or higher)

## Clone the Repository
- git clone https://github.com/Vikas-hub17/Reachinbox---Frontend.git
### cd onebox
### Install Dependencies
- npm install or
yarn install

Configuration
API Configuration
The application requires a Bearer Token to authenticate API requests. Set up the token in your environment variables.

bash
Copy code
REACT_APP_API_TOKEN=your_bearer_token
Environment Variables
Create a .env file in the root directory of the project and add the following:


REACT_APP_API_BASE_URL=https://hiring.reachinbox.xyz/api/v1
REACT_APP_API_TOKEN=your_bearer_token
Usage
Running the Application
To start the development server, run:

bash
Copy code
npm start
# or
yarn start
The application will be available at http://localhost:3000.

