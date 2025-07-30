import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "../App.css";

export const SplashScreen = () => {
  const navigate = useNavigate();

  // Auto navigate to home after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  
  // Current time display
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  return (
    <motion.div
      className="portrait-mode relative flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-primary to-primary-light overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Status bar */}
      <div className="w-full pt-safe z-20 px-4 py-3 flex justify-between items-center">
        <div className="text-white text-sm font-medium">{currentTime}</div>
        <div className="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 19H15.5C15.5 19 17 19 17 17.5V9.5C17 9.5 17 8 15.5 8H8.5C8.5 8 7 8 7 9.5V17.5C7 17.5 7 19 8.5 19Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M9 22H15" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8V5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 5H14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.33337 10.3333C6.33337 7.57167 8.57171 5.33333 11.3334 5.33333C14.095 5.33333 16.3334 7.57167 16.3334 10.3333C16.3334 13.095 14.095 15.3333 11.3334 15.3333C8.57171 15.3333 6.33337 13.095 6.33337 10.3333Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M16.3334 15.3333L18.6667 17.6667" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="bg-white text-primary text-xs font-bold px-1.5 py-0.5 rounded-md">100</div>
        </div>
      </div>

      {/* Main content with curved white background */}
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex-1 w-full flex flex-col items-center justify-center px-6 pt-16">
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center space-y-8"
            variants={itemVariants}
          >
            <img
              src="/e-snapp-logo.svg"
              alt="e-snapp Logo"
              className="w-32 h-32 mb-4 drop-shadow-xl"
            />
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-white mb-2">e-snapp</h1>
              <p className="text-white/80 text-sm">Pantau energi Anda dengan mudah</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Curved white background section */}
        <motion.div 
          className="bg-white w-full rounded-t-[40px] px-6 py-10 flex flex-col items-center z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <motion.div 
            className="w-full max-w-md space-y-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={cardVariants}>
              <h2 className="text-2xl font-bold text-gray-900">Selamat Datang</h2>
              <p className="text-gray-600">Mulai pantau penggunaan energi Anda dan hemat biaya listrik.</p>
            </motion.div>
            
            <motion.div className="space-y-4" variants={itemVariants}>
              <motion.div 
                className="flex items-center p-4 bg-primary/10 rounded-xl"
                variants={cardVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(20, 184, 166, 0.15)" }}
              >
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M13 2L4.09 12.11C3.71 12.56 3.52 12.79 3.52 13.05C3.52 13.31 3.71 13.54 4.09 13.99L13 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pantau Realtime</h3>
                  <p className="text-sm text-gray-600">Lihat penggunaan energi secara langsung</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center p-4 bg-primary/10 rounded-xl"
                variants={cardVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(20, 184, 166, 0.15)" }}
              >
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M2 12H5M19 12H22M12 2V5M12 19V22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Hemat Energi</h3>
                  <p className="text-sm text-gray-600">Dapatkan saran untuk menghemat energi</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.button
              className="w-full bg-primary text-white py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 font-medium"
              onClick={() => navigate("/")}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Lanjutkan</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 right-0 pb-safe flex justify-center items-center p-2 z-20">
        <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;