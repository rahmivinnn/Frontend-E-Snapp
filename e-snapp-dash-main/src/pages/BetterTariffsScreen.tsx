import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Check, ChevronRight, X } from 'lucide-react';

interface TariffOffer {
  id: string;
  name: string;
  type: string;
  planType: string;
  duration: string;
  savings: string;
  price: string;
}

export const BetterTariffsScreen = () => {
  const navigate = useNavigate();
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);

  // Sample tariff offers data
  const tariffOffers: TariffOffer[] = [
    {
      id: '1',
      name: 'Green Energy Plan',
      type: 'Monorata (Fixed)',
      planType: 'Monorata (Fixed)',
      duration: '12 months',
      savings: '€8.50',
      price: '€45.20'
    },
    {
      id: '2',
      name: 'Envi Flex Control',
      type: 'Monorata (Fixed)',
      planType: 'Monorata (Fixed)',
      duration: '12 months',
      savings: '€8.20',
      price: '€45.50'
    },
    {
      id: '3',
      name: 'Green Energy Plan',
      type: 'Monorata (Fixed)',
      planType: 'Monorata (Fixed)',
      duration: '12 months',
      savings: '€8.50',
      price: '€45.20'
    },
    {
      id: '4',
      name: 'Envi Flex Control',
      type: 'Monorata (Fixed)',
      planType: 'Monorata (Fixed)',
      duration: '12 months',
      savings: '€8.20',
      price: '€45.50'
    }
  ];

  // Get current time for status bar
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const toggleOfferSelection = (offerId: string) => {
    setSelectedOffers(prev => {
      if (prev.includes(offerId)) {
        return prev.filter(id => id !== offerId);
      } else {
        return [...prev, offerId];
      }
    });
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  
  // Additional sample tariff offers that will be shown when "Show more" is clicked
  const additionalOffers: TariffOffer[] = [
    {
      id: '5',
      name: 'Eco Power Plus',
      type: 'Binorata (Fixed)',
      planType: 'Binorata (Fixed)',
      duration: '24 months',
      savings: '€10.30',
      price: '€43.40'
    },
    {
      id: '6',
      name: 'Smart Energy Flex',
      type: 'Variable',
      planType: 'Variable',
      duration: '12 months',
      savings: '€7.80',
      price: '€46.00'
    }
  ];

  const handleShowMore = () => {
    setShowMoreOffers(true);
  };

  const handleBack = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else {
      navigate(-1);
    }
  };
  
  const handleConfirmSelection = () => {
    if (selectedOffers.length === 0) {
      // Show a toast or alert that no tariff is selected
      return;
    }
    setShowConfirmation(true);
  };
  
  const handleApplyTariff = () => {
    setIsLoading(true);
    // Simulate API call to apply the selected tariff
    setTimeout(() => {
      setIsLoading(false);
      // Navigate back to billing page with the selected tariff
      navigate('/billing', { state: { selectedTariffId: selectedOffers[0] } });
    }, 1500);
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

      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold ml-2">Better Tariffs Available</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 pt-4 pb-6 overflow-y-auto">
        <AnimatePresence>
          {!showConfirmation ? (
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4">
                <p className="text-sm text-gray-600">Based on your energy consumption, we've found these better tariffs that could save you money.</p>
              </div>

              {/* Tariff offers list */}
              <div className="space-y-4">
                {tariffOffers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    className={`border rounded-xl p-4 ${selectedOffers.includes(offer.id) ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleOfferSelection(offer.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedOffers.includes(offer.id) ? 'bg-teal-500' : 'border border-gray-300'}`}>
                            {selectedOffers.includes(offer.id) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              >
                                <Check size={14} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold ml-2">{offer.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{offer.type}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="text-sm font-medium">{offer.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Savings</p>
                            <p className="text-sm font-medium text-teal-600">{offer.savings}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Monthly Price</p>
                        <p className="text-lg font-bold">{offer.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Additional offers that appear when "Show more" is clicked */}
                <AnimatePresence>
                  {showMoreOffers && (
                    <>
                      {additionalOffers.map((offer, index) => (
                        <motion.div
                          key={offer.id}
                          className={`border rounded-xl p-4 ${selectedOffers.includes(offer.id) ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`}
                          initial={{ opacity: 0, height: 0, y: 20 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleOfferSelection(offer.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedOffers.includes(offer.id) ? 'bg-teal-500' : 'border border-gray-300'}`}>
                                  {selectedOffers.includes(offer.id) && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                    >
                                      <Check size={14} className="text-white" />
                                    </motion.div>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold ml-2">{offer.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{offer.type}</p>
                              <div className="mt-2 grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-xs text-gray-500">Duration</p>
                                  <p className="text-sm font-medium">{offer.duration}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Savings</p>
                                  <p className="text-sm font-medium text-teal-600">{offer.savings}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Monthly Price</p>
                              <p className="text-lg font-bold">{offer.price}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                {!showMoreOffers && (
                  <motion.button
                    className="w-full py-3 text-teal-600 font-medium border border-teal-600 rounded-xl"
                    onClick={handleShowMore}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    Show more
                  </motion.button>
                )}
                
                <motion.button
                  className={`w-full py-3 font-medium rounded-xl ${selectedOffers.length > 0 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                  onClick={handleConfirmSelection}
                  whileHover={selectedOffers.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={selectedOffers.length > 0 ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  disabled={selectedOffers.length === 0}
                >
                  Continue with selected tariff
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6 text-center">
                <motion.div 
                  className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check size={32} className="text-teal-600" />
                </motion.div>
                <h2 className="text-xl font-bold mb-2">Confirm Your Selection</h2>
                <p className="text-sm text-gray-600">You're about to switch to the following tariff:</p>
              </div>
              
              {selectedOffers.length > 0 && (
                <motion.div
                  className="border-2 border-teal-500 rounded-xl p-4 mb-6 bg-teal-50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {tariffOffers.concat(additionalOffers).filter(offer => selectedOffers.includes(offer.id)).map((offer) => (
                    <div key={offer.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{offer.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{offer.type}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="text-sm font-medium">{offer.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Savings</p>
                            <p className="text-sm font-medium text-teal-600">{offer.savings}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Monthly Price</p>
                        <p className="text-lg font-bold">{offer.price}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              
              <div className="mt-auto space-y-3">
                <motion.button
                  className="w-full py-3 bg-teal-600 text-white font-medium rounded-xl flex items-center justify-center"
                  onClick={handleApplyTariff}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Applying tariff...
                    </div>
                  ) : (
                    'Apply this tariff'
                  )}
                </motion.button>
                
                <motion.button
                  className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl"
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  Go back
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home indicator */}
      <div className="w-full flex justify-center pb-safe">
        <div className="w-1/3 h-1 bg-black bg-opacity-10 rounded-full mb-2" />
      </div>
    </motion.div>
  );
};

export default BetterTariffsScreen;