import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate the user here
    navigate('/');
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col bg-teal-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >


      {/* Header */}
      <div className="p-4 pt-6">
        <motion.h1 
          className="text-3xl font-bold text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Sign In
        </motion.h1>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 bg-white rounded-t-3xl p-5"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2 
          className="text-2xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Welcome Back!
        </motion.h2>
        
        <motion.p 
          className="text-gray-500 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          To keep Connected please login with your person info
        </motion.p>

        <form onSubmit={handleSignIn}>
          <motion.div 
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => {}}
              >
                <Eye size={20} />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-red-500 font-medium">Forgot Password</a>
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 bg-teal-600 text-white rounded-lg font-medium mt-6"
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="mt-6 space-y-4">
            <button className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#EA4335"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white"/>
                <path d="M12.0003 11.9998L17.6003 8.3998V15.5998L12.0003 11.9998Z" fill="#EA4335"/>
                <path d="M12.0002 11.9998L6.40015 8.3998V15.5998L12.0002 11.9998Z" fill="#FBBC05"/>
                <path d="M12.0002 11.9998L6.40015 8.3998L17.6002 8.3998L12.0002 11.9998Z" fill="#4285F4"/>
                <path d="M12.0002 11.9998L6.40015 15.5998L17.6002 15.5998L12.0002 11.9998Z" fill="#34A853"/>
              </svg>
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
            
            <button className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center space-x-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0001 2H7.00006C4.23863 2 2.00006 4.23858 2.00006 7V17C2.00006 19.7614 4.23863 22 7.00006 22H17.0001C19.7615 22 22.0001 19.7614 22.0001 17V7C22.0001 4.23858 19.7615 2 17.0001 2Z" fill="black"/>
                <path d="M16.0001 12C16.0001 14.2091 14.2092 16 12.0001 16C9.79098 16 8.00006 14.2091 8.00006 12C8.00006 9.79086 9.79098 8 12.0001 8C14.2092 8 16.0001 9.79086 16.0001 12Z" fill="white"/>
              </svg>
              <span className="text-sm font-medium">Sign in with Apple</span>
            </button>
          </div>
        </motion.div>

        <motion.p 
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Don't have an account? <a href="#" className="text-teal-600 font-medium">Sign up</a>
        </motion.p>

        {/* Home indicator */}
        <div className="w-1/4 h-1 bg-black bg-opacity-30 rounded-full mx-auto mt-8" />
      </motion.div>
    </motion.div>
  );
};

export default SignIn;