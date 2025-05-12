import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AgentContext from '../../context/agent/agentContext';
import { formatDate } from '../../utils/formatDate';
import Loading from '../common/Loading';

const AgentConsole = () => {
  const { id } = useParams();
  
  const agentContext = useContext(AgentContext);
  const { getAgentById, current, loading, queryAgent, queryLoading, queryError } = agentContext;
  
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Load agent data on mount
  useEffect(() => {
    getAgentById(id);
    // eslint-disable-next-line
  }, [id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Auto-focus input field
  useEffect(() => {
    if (!loading && current) {
      inputRef.current?.focus();
    }
  }, [loading, current]);
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim() || !current) return;
    
    // Add user message to conversation
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    
    // Simulate typing indicator
    setIsTyping(true);
    
    try {
      // Call the API to query the agent
      const response = await queryAgent(id, prompt);
      
      // Add a short delay to make the response feel more natural
      setTimeout(() => {
        // Add agent response to conversation
        const agentMessage = {
          id: Date.now() + 1,
          role: 'agent',
          content: response.response || 'No response from agent',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, agentMessage]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Error querying agent:', error);
      
      // Add error message to conversation
      const errorMessage = {
        id: Date.now() + 1,
        role: 'system',
        content: `Error: ${error.message || 'Failed to get response from agent'}`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };
  
  // Get suggestion based on agent type
  const getSuggestions = (type) => {
    switch (type?.toLowerCase()) {
      case 'github':
        return [
          "What are the open PRs in the repository?",
          "Summarize the latest pull request",
          "Show me open issues with 'bug' label"
        ];
      case 'slack':
        return [
          "Send a message to #general saying 'Hello team!'",
          "What are the latest messages in the channel?",
          "Create a new channel called team-updates"
        ];
      case 'jira':
        return [
          "Show me all open bugs",
          "Create a new task for implementing login page",
          "What's the status of PROJECT-123?"
        ];
      case 'shopify':
        return [
          "How many products are in stock?",
          "Show me recent orders",
          "Update price of 'Blue T-shirt' to $24.99"
        ];
      default:
        return [
          "Hello! What can you do?",
          "What tools do you have access to?",
          "Help me with a task"
        ];
    }
  };
  
  // Function to handle suggestion click
  const handleSuggestion = (suggestion) => {
    setPrompt(suggestion);
  };
  
  // if (loading) {
  //   return <Loading />;
  // }
  
  if (!current) {
    return (
      <div className="not-found-container">
        <h2>Agent Not Found</h2>
        <p>The agent you're trying to chat with doesn't exist or has been removed.</p>
        <Link to="/agents" className="btn btn-primary">
          Back to Agents
        </Link>
      </div>
    );
  }
  
  return (
    <div className="agent-console-container">
      <div className="agent-console-header">
        <div className="agent-info">
          <Link to={`/agents/${id}`} className="back-link">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h2>{current.name}</h2>
          <div className={`agent-status ${current.isActive ? 'status-active' : 'status-inactive'}`}>
            {current.isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
        
        <div className="agent-type">
          <span className="type-badge">{current.type}</span>
        </div>
      </div>
      
      <div className="chat-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="empty-chat-content">
              <i className="fas fa-robot fa-4x"></i>
              <h3>Start a conversation with {current.name}</h3>
              <p>{current.description}</p>
              <div className="suggestions">
                <h4>Try asking:</h4>
                <div className="suggestion-list">
                  {getSuggestions(current.type).map((suggestion, index) => (
                    <button 
                      key={index}
                      className="suggestion-btn"
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message-item message-${message.role}`}
              >
                {message.role === 'agent' && (
                  <div className="message-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                )}
                
                {message.role === 'system' && (
                  <div className="message-avatar system">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                )}
                
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  <div className="message-time">
                    {formatDate(message.timestamp, true)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-item message-agent typing">
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef}></div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-container">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            disabled={!current.isActive || isTyping}
            ref={inputRef}
          />
        </div>
        <button 
          type="submit" 
          className="send-btn"
          disabled={!prompt.trim() || !current.isActive || isTyping}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
      
      {!current.isActive && (
        <div className="agent-inactive-warning">
          <i className="fas fa-exclamation-circle"></i>
          <span>This agent is currently inactive. Activate it in the agent settings to enable chat.</span>
        </div>
      )}
    </div>
  );
};

export default AgentConsole;