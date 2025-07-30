import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface CO2SummaryProps {
  emitted: number;
  avoided: number;
}

export const CO2Summary = ({ emitted, avoided }: CO2SummaryProps) => {
  return (
    <motion.div 
      className="bg-primary rounded-2xl p-3 text-primary-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Leaf size={20} />
        </motion.div>
        <h3 className="text-base font-semibold">CO₂ Emissions & Savings</h3>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div 
            className="text-xl font-bold mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {emitted} kg
          </motion.div>
          <motion.div 
            className="text-sm opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            CO₂ Emitted
          </motion.div>
        </motion.div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.div 
            className="text-xl font-bold mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {avoided} kg
          </motion.div>
          <motion.div 
            className="text-sm opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            CO₂ Avoided
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};