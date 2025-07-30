import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Lock } from 'lucide-react';

export const WiFiSetupScreen = () => {
  const navigate = useNavigate();
  const [networks, setNetworks] = useState([
    { id: 1, name: 'WIFI Router 1', secured: true },
    { id: 2, name: 'WIFI Router 1', secured: true },
    { id: 3, name: 'WIFI Router 1', secured: true },
    { id: 4, name: 'WIFI Router 1', secured: true },
    { id: 5, name: 'WIFI Router 1', secured: true },
    { id: 6, name: 'WIFI Router 1', secured: true },
  ]);

  const handleNetworkSelect = (networkId: number) => {
    // Navigate to password input screen with the selected network
    navigate(`/wifi-password/${networkId}`);
  };

  const handleRefresh = () => {
    // In a real app, this would scan for networks
    console.log('Refreshing networks...');
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
            Wi-Fi Setup
          </motion.h1>
        </div>

        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium mb-1">Connect to Wi-Fi</h2>
          <p className="text-gray-600 text-sm">
            Choose a Wi-Fi network to connect your device to the internet.
          </p>
        </motion.div>

        {/* Networks List with Refresh Button */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700">Networks Nearby</h3>
          <motion.button
            className="p-1"
            onClick={handleRefresh}
            whileTap={{ scale: 0.9 }}
          >
            <RefreshCw size={18} />
          </motion.button>
        </div>

        <motion.div 
          className="flex-1 space-y-2 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {networks.map((network, index) => (
            <motion.div
              key={network.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              onClick={() => handleNetworkSelect(network.id)}
              whileHover={{ backgroundColor: '#f7f7f7' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4C14.9695 4 17.8348 5.15893 19.9706 7.29472C22.1065 9.43051 23.2654 12.2958 23.2654 15.2653" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8C13.5913 8 15.1174 8.63214 16.2426 9.75736C17.3679 10.8826 18 12.4087 18 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12C12.5304 12 13.0391 12.2107 13.4142 12.5858C13.7893 12.9609 14 13.4696 14 14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="18" r="2" fill="black"/>
                  </svg>
                </div>
                <span>{network.name}</span>
              </div>
              {network.secured && <Lock size={16} />}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Home indicator */}
      <div className="w-full flex justify-center pb-safe">
        <div className="w-1/3 h-1 bg-black bg-opacity-10 rounded-full mb-2" />
      </div>
    </motion.div>
  );
};