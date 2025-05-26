# PDF with AI

This project is a web application that allows users to upload PDF files and interact with them using AI-powered chat. The application is divided into two main parts: the client (frontend) and the server (backend).

## Features

- **Upload PDFs**: Users can upload PDF files to the application.
- **AI Chat**: Interact with the content of the uploaded PDFs using an AI chatbot.
- **Preprocessing**: Preprocess the uploaded PDFs for better AI interaction.
- **Theme Toggle**: Switch between light and dark themes.

## Project Structure

```
README.md
client/
	components.json
	eslint.config.js
	index.html
	jsconfig.json
	package.json
	README.md
	vite.config.js
	public/
		vite.svg
	src/
		App.css
		App.jsx
		index.css
		main.jsx
		assets/
			react.svg
		components/
			aiChat.jsx
			MainComponent.jsx
			preprocess.jsx
			theme-provider.jsx
			theme-toggle.jsx
			UploadComponent.jsx
			ui/
				button.tsx
				card.tsx
				input.tsx
		lib/
			utils.ts
server/
	package.json
	server.js
	routes/
		askDeepseek.js
		chat.js
		upload.js
uploads/
	1742928075276-chatgpt-conversation-8.pdf
```

### Client

The client is built using React and Vite. It contains the following key components:

- **aiChat.jsx**: Handles the AI chat functionality.
- **MainComponent.jsx**: The main component of the application.
- **preprocess.jsx**: Preprocesses the uploaded PDFs.
- **theme-provider.jsx**: Provides theme context to the application.
- **theme-toggle.jsx**: Allows users to toggle between light and dark themes.
- **UploadComponent.jsx**: Handles PDF uploads.
- **ui/**: Contains reusable UI components like buttons, cards, and inputs.

### Server

The server is built using Node.js and Express. It contains the following routes:

- **askDeepseek.js**: Handles AI-related queries.
- **chat.js**: Manages chat interactions.
- **upload.js**: Handles file uploads.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd pdfWithAi
   ```

3. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   node server.js
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to the provided URL to access the application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.