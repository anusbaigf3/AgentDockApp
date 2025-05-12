# AgentDock Frontend

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
