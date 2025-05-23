import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate input
    if (!credentials.username || !credentials.password) {
      setError(t('login.missingFields'));
      setLoading(false);
      return;
    }

    try {
      // Use the server URL
      const API_URL = 'https://api3.atomico3.io';
      
      console.log('Attempting login with server:', API_URL);
      
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include' // Include cookies if the server uses them
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t('login.errorGeneric'));
      }
      
      console.log('Login successful:', data);
      setSuccess(t('login.success'));
      
      if (data && data.user && data.token) {
        // Store auth data directly in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Add timestamp for potential token expiration checks
        localStorage.setItem('loginTime', Date.now().toString());
        
        console.log("Auth data stored in localStorage:", { 
          user: data.user, 
          isAuthenticated: true 
        });
        
        // Trigger a custom event so other components can react
        window.dispatchEvent(new Event('storage-login'));
        
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        throw new Error("Server response missing required user data or token");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || t('login.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {t('login.title')}
      </h2>
      
      {error && (
        <motion.div 
          className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div 
          className="mb-4 p-3 bg-green-100 text-green-700 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {success}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <label 
              htmlFor="username" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              {t('login.username')}
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <label 
              htmlFor="password" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              {t('login.password')}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm text-blue-600 hover:underline"
            >
              {t('login.forgotPassword')}
            </Link>
          </motion.div>

          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? t('login.processing') : t('login.loginButton')}
          </motion.button>
        </motion.div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('login.noAccount')} {' '}
          <Link 
            to="/register" 
            className="text-blue-600 hover:text-blue-800"
          >
            {t('login.createAccount')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
