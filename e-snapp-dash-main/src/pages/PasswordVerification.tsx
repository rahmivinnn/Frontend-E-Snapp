import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Eye, EyeOff } from 'lucide-react';

export const PasswordVerification = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill(''));
  const [email] = useState('lorem@gmail.com');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    // In a real app, you would verify the code and password here
    navigate('/password-reset');
  };

  const isFormValid = 
    verificationCode.every(digit => digit !== '') && 
    password.length >= 6 && 
    password === confirmPassword;

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col bg-teal-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-4 pt-6 flex items-center">
        <motion.button
          onClick={() => navigate(-1)}
          className="text-white p-2"
          whileTap={{ scale: 0.95 }}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={24} />
        </motion.button>
        <motion.h1 
          className="text-xl font-bold text-white ml-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Code Verification
        </motion.h1>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 bg-white rounded-t-3xl p-5"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center justify-start pt-8">
          <motion.div
            className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
          >
            <Mail size={28} className="text-teal-600" />
          </motion.div>

          <motion.h2
            className="text-xl font-bold mb-2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Verify code
          </motion.h2>

          <motion.p
            className="text-gray-500 mb-6 text-center text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Enter four-digit verification code sent to<br />{email}
          </motion.p>

          {/* Verification code inputs */}
          <motion.div
            className="flex gap-3 mb-6 w-full justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ))}
          </motion.div>

          {/* Password fields */}
          <motion.div 
            className="w-full space-y-4 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={handleVerify}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-lg font-medium transition-colors ${isFormValid ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'}`}
            whileTap={isFormValid ? { scale: 0.95 } : {}}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Verify
          </motion.button>
        </div>

        {/* Home indicator */}
        <div className="w-1/4 h-1 bg-black bg-opacity-30 rounded-full mx-auto mt-8" />
      </motion.div>
    </motion.div>
  );
};

export default PasswordVerification;