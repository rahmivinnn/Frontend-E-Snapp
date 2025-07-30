import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';

export const CodeVerification = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [email] = useState('lorem@gmail.com');
  const [timer, setTimer] = useState(10);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer for resend button
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
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
    // In a real app, you would verify the code here
    navigate('/email-verified');
  };

  const handleResend = () => {
    // In a real app, you would resend the code here
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(10);
      // Clear the inputs
      setVerificationCode(Array(6).fill(''));
      // Focus on first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 1000);
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

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
            className="text-gray-500 mb-8 text-center text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Enter six-digit verification code sent to<br />{email}
          </motion.p>

          {/* Verification code inputs */}
          <motion.div
            className="flex gap-2 mb-8 w-full justify-center"
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

          <motion.button
            onClick={handleVerify}
            disabled={!isCodeComplete}
            className={`w-full py-4 rounded-lg font-medium transition-colors ${isCodeComplete ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-400'}`}
            whileTap={isCodeComplete ? { scale: 0.95 } : {}}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Verify
          </motion.button>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 mb-2">Haven't received the verification code?</p>
            <button 
              onClick={handleResend} 
              disabled={timer > 0 || isResending}
              className={`text-sm font-medium ${timer > 0 || isResending ? 'text-gray-400' : 'text-teal-600'}`}
            >
              {isResending ? 'Sending...' : timer > 0 ? `Resend (${timer}s)` : 'Resend'}
            </button>
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="w-1/4 h-1 bg-black bg-opacity-30 rounded-full mx-auto mt-auto" />
      </motion.div>
    </motion.div>
  );
};

export default CodeVerification;