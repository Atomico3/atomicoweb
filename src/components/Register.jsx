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
      const API_URL = 'https://api3.atomico3.io';
      
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
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cabo Verde">Cabo Verde</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Grenada">Grenada</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Holy See">Holy See</option>
                <option value="Honduras">Honduras</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="North Korea">North Korea</option>
                <option value="North Macedonia">North Macedonia</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestine State">Palestine State</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Qatar">Qatar</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Korea">South Korea</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
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
