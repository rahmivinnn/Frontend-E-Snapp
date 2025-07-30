import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomeSetupScreen = () => {
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [squareMeters, setSquareMeters] = useState('');
  const [residents, setResidents] = useState('');

  // Get current time for status bar
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const handleContinue = () => {
    // Save home setup data
    // Navigate to WiFi setup screen
    navigate('/wifi-setup');
  };

  return (
    <motion.div
      className="portrait-mode relative flex flex-col min-h-screen bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status bar */}
      <div className="w-full pt-safe z-20 px-4 py-3 flex justify-between items-center">
        <div className="text-black text-sm font-medium">{currentTime}</div>
        <div className="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 19H15.5C15.5 19 17 19 17 17.5V9.5C17 9.5 17 8 15.5 8H8.5C8.5 8 7 8 7 9.5V17.5C7 17.5 7 19 8.5 19Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M9 22H15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8V5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded-md">100</div>
        </div>
      </div>

      {/* Background image */}
      <div className="absolute top-0 left-0 w-full h-40 z-0">
        <img 
          src="/modern-house.jpg.svg" 
          alt="Modern House" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 pt-12 pb-6 z-10">
        <motion.h1 
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Let's set up your Home
        </motion.h1>

        <motion.div
          className="space-y-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location Name</label>
            <input 
              type="text" 
              placeholder="La mia abitazione"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location Address</label>
            <input 
              type="text" 
              placeholder="Location Address"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Square Meters</label>
            <div className="relative">
              <input 
                type="number" 
                placeholder="Square Meters"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                value={squareMeters}
                onChange={(e) => setSquareMeters(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">m²</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Number of Residents</label>
            <input 
              type="number" 
              placeholder="Number of Residents"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={residents}
              onChange={(e) => setResidents(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="mt-auto">
          <motion.button
            className="w-full bg-teal-600 text-white py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 font-medium"
            onClick={handleContinue}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span>Next</span>
            <ArrowRight size={18} />
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

export default HomeSetupScreen;