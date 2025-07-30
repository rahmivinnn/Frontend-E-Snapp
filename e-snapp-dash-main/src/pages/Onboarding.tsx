import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const onboardingSlides = [
  {
    id: 1,
    image: '/e-snapp.png',
    title: '',
    description: '',
    background: 'bg-white'
  },
  {
    id: 2,
    image: '/Rectangle 95 (1).png',
    title: 'Track Live Consumption',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.',
    background: 'bg-white'
  },
  {
    id: 3,
    image: '/Rectangle 95 (2).png',
    title: 'Track Live Consumption',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.',
    background: 'bg-white'
  },
  {
    id: 4,
    image: '/Rectangle 95 (3).png',
    title: 'Track Live Consumption',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Quis Tortor Risus Lacus.',
    background: 'bg-white'
  }
];

export const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto advance from splash screen after 2 seconds
  useEffect(() => {
    if (currentSlide === 0) {
      const timer = setTimeout(() => {
        setCurrentSlide(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to the new energy tariff screen instead of signin
      navigate('/energy-tariff');
    }
  };

  const handleSkip = () => {
    // Navigate to the new energy tariff screen instead of signin
    navigate('/energy-tariff');
  };

  const slide = onboardingSlides[currentSlide];

  return (
    <motion.div 
      className={`min-h-screen w-full flex flex-col ${slide.background}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between py-8">
        {currentSlide === 0 ? (
          <motion.div 
            className="flex items-center justify-center h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={slide.image} alt="e-snapp logo" className="w-64 h-auto" />
          </motion.div>
        ) : (
          <>
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <motion.img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-auto object-cover max-h-[60vh]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="text-center px-6 absolute bottom-28 bg-white bg-opacity-90 w-full py-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm opacity-80">{slide.description}</p>
              </motion.div>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="w-full px-6 mt-auto mb-8 flex flex-col items-center">
          {currentSlide !== 0 && (
            <>
              <motion.button
                className="w-full py-4 bg-teal-600 text-white rounded-lg font-medium"
                onClick={handleNext}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Next
              </motion.button>
              
              <motion.button
                className="mt-4 text-sm font-medium opacity-70"
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Skip
              </motion.button>
            </>
          )}

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {onboardingSlides.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full ${currentSlide === index ? 'bg-teal-600 w-6' : 'bg-gray-300 w-2'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            ))}
          </div>

          {/* Home indicator */}
          <div className="w-1/4 h-1 bg-black bg-opacity-30 rounded-full mt-8" />
        </div>
      </div>
    </motion.div>
  );
};

export default Onboarding;