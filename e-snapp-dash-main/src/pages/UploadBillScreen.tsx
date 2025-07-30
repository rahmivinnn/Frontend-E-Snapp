import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';

export const UploadBillScreen = () => {
  const navigate = useNavigate();
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'manual'>('upload');
  const [customerType, setCustomerType] = useState('');
  const [powerCommitment, setPowerCommitment] = useState('');

  // Get current time for status bar
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const handleContinue = () => {
    // Save data
    // Navigate to next screen
    navigate('/electrical-systems');
  };

  const handleSkip = () => {
    navigate('/electrical-systems');
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
          Add your energy tariff details
        </motion.h1>

        <motion.div
          className="space-y-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload Utility Bill *</label>
            
            <div className="flex space-x-4 mt-2">
              <div 
                className={`flex-1 py-3 px-4 ${uploadMethod === 'upload' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-gray-50 border-gray-200 text-gray-500'} border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all`}
                onClick={() => setUploadMethod('upload')}
              >
                <Upload size={24} className={uploadMethod === 'upload' ? 'text-teal-600' : 'text-gray-400'} />
                <span className="text-sm mt-1">Upload a PDF or a photo of your bill</span>
                <span className="text-xs mt-1 text-gray-500">Ricorda: non contiene i tuoi dati e tariffe se è luce commercio</span>
              </div>
            </div>

            <div 
              className={`py-3 px-4 ${uploadMethod === 'manual' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-gray-50 border-gray-200 text-gray-500'} border rounded-lg flex items-center justify-center cursor-pointer transition-all mt-2`}
              onClick={() => setUploadMethod('manual')}
            >
              <span className="text-sm">Enter Manually</span>
            </div>
          </div>

          {uploadMethod === 'manual' && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Customer Type</label>
                <div className="relative border border-gray-300 rounded-lg">
                  <select 
                    className="w-full p-4 bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                  >
                    <option value="" disabled>Customer Type</option>
                    <option value="residential">Residential</option>
                    <option value="business">Business</option>
                    <option value="industrial">Industrial</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Power Commitment in kW</label>
                <div className="relative border border-gray-300 rounded-lg">
                  <select 
                    className="w-full p-4 bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
                    value={powerCommitment}
                    onChange={(e) => setPowerCommitment(e.target.value)}
                  >
                    <option value="" disabled>Power Commitment in kW</option>
                    <option value="3">3 kW</option>
                    <option value="4.5">4.5 kW</option>
                    <option value="6">6 kW</option>
                    <option value="10">10 kW</option>
                    <option value="15">15 kW</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-auto space-y-4">
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
          
          <motion.button
            className="w-full text-gray-500 py-2 font-medium text-sm"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
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

export default UploadBillScreen;