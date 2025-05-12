Frontend application for AgentDock - A Model Context Protocol (MCP) server with a clean UI to register, manage, and interact with intelligent agents.

## Features

- **Agent Management**: Register, update, and deregister agents with code, description, and configuration
- **Natural Language Interface**: Ask agents questions using Groq
- **Monitoring & Logs**: View recent agent actions and outputs
- **Tool Integration**: Configure and integrate tools like GitHub, Slack, Jira, and more

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/agentdock.git
cd agentdock/agentdock-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser

## Building for Production

```bash
npm run build
# or
yarn build
```

## Docker

You can also run the frontend using Docker:

```bash
docker build -t agentdock-app .
docker run -p 3000:80 agentdock-app
```

## Project Structure

```
agentdock-app/
├── public/                # Static files
├── src/                   # Source files
│   ├── assets/            # Images, styles, etc.
│   ├── components/        # React components
│   │   ├── common/        # Common components
│   │   ├── agents/        # Agent-related components
│   │   ├── tools/         # Tool-related components
│   │   ├── logs/          # Log-related components
│   │   ├── auth/          # Auth-related components
│   │   └── dashboard/     # Dashboard components
│   ├── context/           # React context API states
│   ├── utils/             # Utility functions
│   ├── pages/             # Page components
│   ├── App.jsx            # Main App component
│   └── index.jsx          # Entry point
└── package.json           # Dependencies and scripts
```

## App UI  
1. Home Page
   ![image](https://github.com/user-attachments/assets/41425379-b23b-47ff-bccd-c439aad67269)

3. Register Page
   ![image](https://github.com/user-attachments/assets/06c58477-34dd-4acb-9257-f8c1c7b6d51d)

4. Login Page
   ![image](https://github.com/user-attachments/assets/58c679bc-7ee2-4ec1-a1f4-3a439510a638)

5. Dashboard Page
   ![image](https://github.com/user-attachments/assets/538c980d-afc7-40be-834e-2369ca796d92)
   ![image](https://github.com/user-attachments/assets/95315d42-b95f-444d-9ec9-d8b5b34b3055)
   ![image](https://github.com/user-attachments/assets/57d999d3-ea6e-415a-a913-1d345da7f9d4)

6. Create Agent
   ![image](https://github.com/user-attachments/assets/966ad8af-8958-40b3-90fc-ad5936933119)
   ![image](https://github.com/user-attachments/assets/780c0f94-737b-44d3-a18c-6ca35bffbb2a)

8. Agent Management Page
   ![image](https://github.com/user-attachments/assets/04f5b007-d4b8-48f7-b045-e77d29c1f76a)

10. Register Tool Page
   ![image](https://github.com/user-attachments/assets/798685d7-b747-4643-b90f-127dc11347e6)

11. Tool Management Page
    ![image](https://github.com/user-attachments/assets/2659d412-37af-4d1b-8f67-980d8cf6c6f8)

12. Agent Config & Activity Page 
    ![image](https://github.com/user-attachments/assets/9ae5a0ae-3ffd-4452-8767-f037385230a5)
    ![image](https://github.com/user-attachments/assets/15cf13bc-af2a-457f-9a54-36525d67e209)

13. Agent Conversation Page
    ![image](https://github.com/user-attachments/assets/a4c13d4d-3886-4c9a-aff8-be840cba29fa)
    ![image](https://github.com/user-attachments/assets/53ff7523-a5d5-4e3d-acf9-b87336e8089f)
    ![image](https://github.com/user-attachments/assets/2f6b241e-e480-408a-a418-2f3077936500)
    ![image](https://github.com/user-attachments/assets/78ffd62a-5b7e-4b45-94d3-ef6d646dd70d)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
