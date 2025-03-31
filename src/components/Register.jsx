// @ts-nocheck
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form state with all required fields from the schema
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    taxID: '',
    walletAddress: '',
    identityDocument: '',
    country: '',
    postalCode: '',
    address: '',
    addressNumber: '',
    isUIFF: false,
    isExposed: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      // Validate first step
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.username) {
        setError(t('register.errorPersonalInfo'));
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(t('register.errorPasswordMatch'));
        return;
      }
    } else if (currentStep === 2) {
      // Validate second step
      if (!formData.phoneNumber || !formData.country) {
        setError(t('register.errorContactInfo'));
        return;
      }
    }
    
    setError('');
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Final validations
    if (formData.password !== formData.confirmPassword) {
      setError(t('register.errorPasswordMatch'));
      setLoading(false);
      return;
    }

    try {
      // Use consistent server URL
      const API_URL = 'http://66.97.47.32';
      
      console.log('Submitting registration data to:', `${API_URL}/api/register`);
      
      // Prepare the request data - explicitly include all fields
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        taxID: formData.taxID,
        walletAddress: formData.walletAddress,
        identityDocument: formData.identityDocument,
        country: formData.country,
        postalCode: formData.postalCode,
        address: formData.address,
        addressNumber: parseInt(formData.addressNumber) || 0,
        isUIFF: formData.isUIFF,
        isExposed: formData.isExposed,
        role: 1 // Default user role
      };
      
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData),
        credentials: 'include' // Include cookies if the server uses them
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t('register.errorGeneric'));
      }
      
      console.log('Registration successful:', data);
      setSuccess(t('register.success'));
      
      // Log in the user after successful registration
      try {
        const loginResponse = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          }),
          credentials: 'include'
        });
        
        const loginData = await loginResponse.json();
        
        if (loginResponse.ok && loginData.user && loginData.token) {
          // Store auth data directly in localStorage
          localStorage.setItem('user', JSON.stringify(loginData.user));
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('loginTime', Date.now().toString());
          
          // Trigger event so other components can react
          window.dispatchEvent(new Event('storage-login'));
          
          // Redirect to home page after short delay
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          console.warn('Auto-login response not OK:', loginData);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (loginError) {
        console.error('Auto-login after registration failed:', loginError);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || t('register.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for form elements
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

  // Progress bar calculation
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-xl">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mb-6">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-300 
                ${currentStep > index + 1 ? 'bg-green-500 text-white' : 
                  currentStep === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}
            >
              {currentStep > index + 1 ? '✓' : index + 1}
            </div>
            <span className="text-xs mt-1 text-gray-500">
              {index === 0 ? t('register.accountDetails') : 
               index === 1 ? t('register.contactInfo') : 
               t('register.additionalInfo')}
            </span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        {currentStep === 1 ? t('register.createAccount') : 
         currentStep === 2 ? t('register.contactDetails') : 
         t('register.finalDetails')}
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
        {currentStep === 1 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <motion.div variants={itemVariants}>
                <label 
                  htmlFor="firstName" 
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  {t('register.firstName')}
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label 
                  htmlFor="lastName" 
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  {t('register.lastName')}
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  required
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label 
                htmlFor="username" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.username')}
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="email" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.email')}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="password" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.password')}
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
              <p className="text-xs text-gray-500 mt-1">{t('register.passwordHint')}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="confirmPassword" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </motion.div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="phoneNumber" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.phoneNumber')}
              </label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label 
                htmlFor="country" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.country')}
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">{t('register.selectCountry')}</option>
                <option value="Argentina">Argentina</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Brazil">Brazil</option>
                <option value="Chile">Chile</option>
                <option value="Uruguay">Uruguay</option>
                <option value="United States">United States</option>
                <option value="Spain">Spain</option>
              </select>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <motion.div variants={itemVariants}>
                <label 
                  htmlFor="address" 
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  {t('register.address')}
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label 
                  htmlFor="addressNumber" 
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  {t('register.addressNumber')}
                </label>
                <input
                  id="addressNumber"
                  type="text"
                  name="addressNumber"
                  value={formData.addressNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label 
                htmlFor="postalCode" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.postalCode')}
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </motion.div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.div variants={itemVariants}>
              <label 
                htmlFor="taxID" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.taxID')}
              </label>
              <input
                id="taxID"
                type="text"
                name="taxID"
                value={formData.taxID}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label 
                htmlFor="identityDocument" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.identityDocument')}
              </label>
              <input
                id="identityDocument"
                type="text"
                name="identityDocument"
                value={formData.identityDocument}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label 
                htmlFor="walletAddress" 
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                {t('register.walletAddress')}
              </label>
              <input
                id="walletAddress"
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center">
              <input
                id="isUIFF"
                type="checkbox"
                name="isUIFF"
                checked={formData.isUIFF}
                onChange={handleChange}
                className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isUIFF" className="text-sm text-gray-700">
                {t('register.isUIFF')}
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center">
              <input
                id="isExposed"
                type="checkbox"
                name="isExposed"
                checked={formData.isExposed}
                onChange={handleChange}
                className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isExposed" className="text-sm text-gray-700">
                {t('register.isExposed')}
              </label>
            </motion.div>

            <motion.div variants={itemVariants} className="p-3 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">{t('register.termsTitle')}</h3>
              <p className="text-sm text-gray-600 mb-3">{t('register.termsDescription')}</p>
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  {t('register.agreeTerms')} 
                  <Link to="/legal/terms" className="text-blue-600 hover:underline ml-1" target="_blank">
                    {t('register.termsLink')}
                  </Link>
                </label>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Form Navigation Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
          {currentStep > 1 && (
            <motion.button
              type="button"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="py-2 px-4 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              onClick={goToPrevStep}
            >
              {t('register.previous')}
            </motion.button>
          )}

          <motion.button
            type={currentStep === totalSteps ? "submit" : "button"}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`py-2 px-6 ${currentStep < totalSteps ? "bg-blue-600" : "bg-green-600"} text-white font-medium rounded-md hover:${currentStep < totalSteps ? "bg-blue-700" : "bg-green-700"} focus:outline-none focus:ring-2 focus:${currentStep < totalSteps ? "ring-blue-500" : "ring-green-500"} disabled:opacity-50 transition-colors w-full sm:w-auto`}
            onClick={currentStep < totalSteps ? goToNextStep : undefined}
            disabled={loading}
          >
            {loading ? t('register.processing') : 
             currentStep < totalSteps ? t('register.next') : t('register.submit')}
          </motion.button>
        </div>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {t('register.alreadyHaveAccount')} {' '}
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-800"
          >
            {t('register.signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
