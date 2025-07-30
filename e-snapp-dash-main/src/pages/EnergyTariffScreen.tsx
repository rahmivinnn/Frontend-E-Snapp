import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type TariffType = 'Fixed' | 'Variable';
type FixedTariffPlan = 'Monorata' | 'Binorata' | 'Trinorata';

export const EnergyTariffScreen = () => {
  const navigate = useNavigate();
  const [tariffType, setTariffType] = useState<TariffType>('Fixed');
  const [fixedPlan, setFixedPlan] = useState<FixedTariffPlan>('Trinorata');
  const [f1, setF1] = useState('0.15');
  const [f2, setF2] = useState('0.15');
  const [f3, setF3] = useState('0.15');
  const [spread, setSpread] = useState('0.15');

  // Get current time for status bar
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const handleContinue = () => {
    // Save tariff data
    // Navigate to next screen
    navigate('/upload-bill');
  };

  const handleSkip = () => {
    navigate('/upload-bill');
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
          className="space-y-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tariff Type</label>
            <div className="relative border border-gray-300 rounded-lg">
              <select 
                className="w-full p-4 bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
                value={tariffType}
                onChange={(e) => setTariffType(e.target.value as TariffType)}
              >
                <option value="Fixed">Fixed</option>
                <option value="Variable">Variable</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {tariffType === 'Fixed' ? (
            <>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <div 
                    className={`flex items-center space-x-2 ${fixedPlan === 'Monorata' ? 'text-teal-600' : 'text-gray-500'}`}
                    onClick={() => setFixedPlan('Monorata')}
                  >
                    <div className={`w-4 h-4 rounded-full border ${fixedPlan === 'Monorata' ? 'border-4 border-teal-600' : 'border border-gray-300'}`}></div>
                    <span>Monorata</span>
                  </div>
                  <div 
                    className={`flex items-center space-x-2 ${fixedPlan === 'Binorata' ? 'text-teal-600' : 'text-gray-500'}`}
                    onClick={() => setFixedPlan('Binorata')}
                  >
                    <div className={`w-4 h-4 rounded-full border ${fixedPlan === 'Binorata' ? 'border-4 border-teal-600' : 'border border-gray-300'}`}></div>
                    <span>Binorata</span>
                  </div>
                  <div 
                    className={`flex items-center space-x-2 ${fixedPlan === 'Trinorata' ? 'text-teal-600' : 'text-gray-500'}`}
                    onClick={() => setFixedPlan('Trinorata')}
                  >
                    <div className={`w-4 h-4 rounded-full border ${fixedPlan === 'Trinorata' ? 'border-4 border-teal-600' : 'border border-gray-300'}`}></div>
                    <span>Trinorata</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">F1 (€/kWh)</label>
                  <input 
                    type="text" 
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                    value={f1}
                    onChange={(e) => setF1(e.target.value)}
                  />
                </div>
                
                {(fixedPlan === 'Binorata' || fixedPlan === 'Trinorata') && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">F2 (€/kWh)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                      value={f2}
                      onChange={(e) => setF2(e.target.value)}
                    />
                  </div>
                )}
                
                {fixedPlan === 'Trinorata' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">F3 (€/kWh)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                      value={f3}
                      onChange={(e) => setF3(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Spread (€/kWh)</label>
                <input 
                  type="text" 
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
                  value={spread}
                  onChange={(e) => setSpread(e.target.value)}
                />
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
            <span>Save and Continue</span>
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

export default EnergyTariffScreen;