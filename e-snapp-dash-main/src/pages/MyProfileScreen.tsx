import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, LogOut, Trash2, AlertTriangle, X, Check } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
}

export const MyProfileScreen = () => {
  const navigate = useNavigate();
  const [profile] = useState<UserProfile>({
    name: 'Inayat Ali',
    email: 'inayatalikaif@gmail.com'
  });

  // Get current time for status bar
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if (showLogoutConfirm) {
      setShowLogoutConfirm(false);
      return;
    }
    if (showDeleteConfirm) {
      setShowDeleteConfirm(false);
      return;
    }
    navigate(-1);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleLogout = () => {
    setIsLoading(true);
    // Simulate API call for logout
    setTimeout(() => {
      setIsLoading(false);
      navigate('/signin');
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);
    // Simulate API call for account deletion
    setTimeout(() => {
      setIsLoading(false);
      navigate('/signin');
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
        <h1 className="text-xl font-bold ml-2">My Profile</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 pt-4 pb-6 overflow-y-auto">
        <AnimatePresence>
          {!showLogoutConfirm && !showDeleteConfirm ? (
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Profile card */}
              <motion.div
                className="bg-primary-light/30 rounded-xl p-4 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-semibold">{profile.name}</h2>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                  </div>
                  <button className="ml-auto">
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
              </motion.div>

              {/* Account actions */}
              <div className="space-y-4">
                <motion.button
                  className="w-full py-3 text-red-600 font-medium border border-red-600 rounded-xl flex items-center justify-center"
                  onClick={handleDeleteClick}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(254, 226, 226, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete Account
                </motion.button>

                <motion.button
                  className="w-full py-3 text-white font-medium bg-red-600 rounded-xl flex items-center justify-center"
                  onClick={handleLogoutClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          ) : showLogoutConfirm ? (
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6 text-center">
                <motion.div 
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <LogOut size={32} className="text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-bold mb-2">Logout Confirmation</h2>
                <p className="text-sm text-gray-600">Are you sure you want to logout from your account?</p>
              </div>
              
              <div className="mt-auto space-y-3">
                <motion.button
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl flex items-center justify-center"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Logging out...
                    </div>
                  ) : (
                    <>
                      <Check size={18} className="mr-2" />
                      Yes, Logout
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl flex items-center justify-center"
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <X size={18} className="mr-2" />
                  Cancel
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
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <AlertTriangle size={32} className="text-red-600" />
                </motion.div>
                <h2 className="text-xl font-bold mb-2">Delete Account</h2>
                <p className="text-sm text-gray-600 mb-2">Are you sure you want to delete your account?</p>
                <p className="text-xs text-red-500">This action cannot be undone and all your data will be permanently deleted.</p>
              </div>
              
              <div className="mt-auto space-y-3">
                <motion.button
                  className="w-full py-3 bg-red-600 text-white font-medium rounded-xl flex items-center justify-center"
                  onClick={handleDeleteAccount}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Deleting account...
                    </div>
                  ) : (
                    <>
                      <Trash2 size={18} className="mr-2" />
                      Yes, Delete My Account
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl flex items-center justify-center"
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <X size={18} className="mr-2" />
                  Cancel
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

export default MyProfileScreen;