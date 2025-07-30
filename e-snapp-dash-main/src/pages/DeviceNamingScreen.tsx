import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Check, AlertCircle } from 'lucide-react';

export const DeviceNamingScreen = () => {
  const navigate = useNavigate();
  const [deviceName, setDeviceName] = useState('Smart Energy Meter');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [deviceType, setDeviceType] = useState('energy_meter');
  const [deviceFeatures, setDeviceFeatures] = useState([
    { name: 'Real-time monitoring', available: true },
    { name: 'Energy forecasting', available: true },
    { name: 'Smart suggestions', available: true },
    { name: 'Multi-zone control', available: false }
  ]);

  const handleFinishSetup = () => {
    if (!deviceName.trim()) return;
    
    setIsValidating(true);
    setValidationStatus('validating');
    
    // Simulate validation process
    setTimeout(() => {
      setValidationStatus('success');
      
      // Navigate after showing success
      setTimeout(() => {
        navigate('/device-setup-complete');
      }, 1000);
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Format time as HH:MM
  const getFormattedTime = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
  };

  return (
    <motion.div
      className="portrait-mode relative flex flex-col min-h-screen bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status Bar */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium">{getFormattedTime()}</div>
        <div className="flex items-center space-x-1">
          <div className="w-6 h-3 bg-black rounded-sm flex items-center justify-end px-0.5">
            <div className="w-1 h-1.5 bg-white rounded-sm"></div>
          </div>
          <span className="text-xs">100</span>
        </div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/modern-house.jpg.svg" 
          alt="Modern House" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-4 flex flex-col">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <motion.button
            className="p-2 -ml-2"
            onClick={handleBack}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <motion.h1 
            className="text-2xl font-bold ml-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Device Naming
          </motion.h1>
        </div>

        {/* Device Image and Naming Form */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Device Image with Interactive Elements */}
          <motion.div
            className="w-40 h-40 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="/router.svg" 
              alt="Smart Energy Meter" 
              className="w-full h-full object-contain"
            />
            
            {/* Animated Energy Icon */}
            <motion.div
              className="absolute -top-2 -right-2 bg-teal-500 text-white p-1.5 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.5 
              }}
            >
              <Zap size={16} />
            </motion.div>
            
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-teal-500"
              initial={{ opacity: 0.8, scale: 0.8 }}
              animate={{ 
                opacity: 0, 
                scale: 1.4,
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatType: "loop" 
              }}
            />
          </motion.div>
          
          {/* Naming Instructions */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h3 className="text-lg font-medium mb-2">Give your device a name</h3>
            <p className="text-sm text-gray-500 mb-2">This helps you identify your device in the app</p>
            
            {/* Device Type Selector */}
            <div className="flex justify-center space-x-2 mt-4">
              <motion.button
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${deviceType === 'energy_meter' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setDeviceType('energy_meter')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Energy Meter
              </motion.button>
              <motion.button
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${deviceType === 'smart_thermostat' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setDeviceType('smart_thermostat')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Smart Thermostat
              </motion.button>
            </div>
          </motion.div>
          
          {/* Device Name Input */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <label className="text-sm font-medium text-gray-700 mb-1 block">Device Name</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              />
              {validationStatus === 'success' && (
                <motion.div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Check size={20} />
                </motion.div>
              )}
              {validationStatus === 'error' && (
                <motion.div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <AlertCircle size={20} />
                </motion.div>
              )}
            </div>
            
            {/* Device Features */}
            <motion.div 
              className="mt-4 bg-gray-50 rounded-lg p-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <h4 className="text-sm font-medium text-gray-700 mb-2">Device Features</h4>
              <div className="space-y-2">
                {deviceFeatures.map((feature, index) => (
                  <motion.div 
                    key={feature.name}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.7 + (index * 0.1) }}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${feature.available ? 'bg-teal-500' : 'bg-gray-300'}`}></div>
                    <span className={`text-xs ${feature.available ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                      {feature.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="mt-auto">
          <motion.button
            className={`w-full py-4 rounded-lg shadow-lg flex items-center justify-center font-medium ${isValidating ? 'bg-gray-400 text-white' : 'bg-teal-600 text-white'}`}
            onClick={handleFinishSetup}
            disabled={!deviceName.trim() || isValidating}
            whileHover={!isValidating ? { scale: 1.05, backgroundColor: "#0d9488" } : {}}
            whileTap={!isValidating ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {validationStatus === 'validating' ? (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                Validating...
              </motion.div>
            ) : validationStatus === 'success' ? (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check size={20} className="mr-2" />
                Device Ready!
              </motion.div>
            ) : (
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: deviceName.trim() ? [0, -3, 3, -3, 3, 0] : 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Finish Setup
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="w-full flex justify-center pb-safe">
        <div className="w-1/3 h-1 bg-black bg-opacity-10 rounded-full mb-2" />
      </div>
    </motion.div>
  );
};