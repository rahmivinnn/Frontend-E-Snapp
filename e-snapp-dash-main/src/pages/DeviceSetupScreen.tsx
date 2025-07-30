import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const DeviceSetupScreen = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleScanQR = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Navigate to device connection screen after successful scan
      navigate('/device-connecting');
    }, 2000);
  };

  const handleManualEntry = () => {
    // Navigate to manual code entry screen
    navigate('/device-manual-entry');
  };

  const handleSkip = () => {
    // Skip device setup and go to home
    navigate('/home');
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
            Device Setup Wizard
          </motion.h1>
        </div>

        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium mb-1">Pair your Smart Energy Meter</h2>
          <p className="text-gray-600 text-sm">
            Use your phone camera to scan the QR code on the back of your device.
          </p>
        </motion.div>

        {/* QR Code Scanner Area */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden mb-6">
            {/* QR Code Frame with Scanner Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-teal-500 relative">
                {/* QR Code Image */}
                <img 
                  src="/qr-code-sample.svg" 
                  alt="QR Code" 
                  className="w-full h-full object-contain"
                />
                
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500 -mt-2 -ml-2"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500 -mt-2 -mr-2"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500 -mb-2 -ml-2"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500 -mb-2 -mr-2"></div>
                
                {/* Scanning Animation */}
                {isScanning && (
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-1 bg-teal-500"
                    initial={{ top: 0 }}
                    animate={{ top: '100%' }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "linear" 
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full grid grid-cols-10 grid-rows-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-gray-400"></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          <motion.button
            className="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg flex items-center justify-center font-medium"
            onClick={handleScanQR}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {isScanning ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning...
              </>
            ) : 'Scan QR Code'}
          </motion.button>
          
          <motion.button
            className="w-full text-teal-600 py-3 rounded-lg flex items-center justify-center font-medium"
            onClick={handleManualEntry}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Enter Code Manually
          </motion.button>
          
          <motion.button
            className="w-full text-gray-500 py-3 rounded-lg flex items-center justify-center text-sm"
            onClick={handleSkip}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Skip for now
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