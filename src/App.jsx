import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/App.css';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import Tools from './pages/Tools';
import Logs from './pages/Logs';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Context
import AuthState from './context/auth/AuthState';
import AgentState from './context/agent/AgentState';
import ToolState from './context/tool/ToolState';
import LogState from './context/log/LogState';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Alert from './components/common/Alert';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <AuthState>
      <AgentState>
        <ToolState>
          <LogState>
            <Router>
              <div className="app-container">
                <Navbar />
                <Alert />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                      path="/dashboard" 
                      element={
                        <PrivateRoute element={<Dashboard />} />
                      } 
                    />
                    <Route 
                      path="/agents/*" 
                      element={
                        <PrivateRoute element={<Agents />} />
                      } 
                    />
                    <Route 
                      path="/tools/*" 
                      element={
                        <PrivateRoute element={<Tools />} />
                      } 
                    />
                    <Route 
                      path="/logs" 
                      element={
                        <PrivateRoute element={<Logs />} />
                      } 
                    />
                    <Route 
                      path="/profile" 
                      element={
                        <PrivateRoute element={<Profile />} />
                      } 
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </LogState>
        </ToolState>
      </AgentState>
    </AuthState>
  );
}

export default App;
