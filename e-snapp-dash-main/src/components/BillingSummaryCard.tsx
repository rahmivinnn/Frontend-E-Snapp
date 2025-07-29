import { Receipt, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BillingSummaryCardProps {
  currentBill: number;
  energyUsed: number;
  contract: string;
  period: string;
  estimatedFinal: number;
}

export const BillingSummaryCard = ({
  currentBill,
  energyUsed,
  contract,
  period,
  estimatedFinal
}: BillingSummaryCardProps) => {
  return (
    <motion.div 
      className="bg-card rounded-2xl p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div 
          className="bg-primary-light rounded-xl p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Current Bill</div>
          <div className="text-2xl font-bold text-primary">€{currentBill}</div>
        </motion.div>
        <motion.div 
          className="bg-primary-light rounded-xl p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="text-sm text-muted-foreground mb-1">Energy Used</div>
          <div className="text-2xl font-bold text-primary">{energyUsed} kWh</div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Contract:</span>
          <span className="font-medium text-foreground">{contract}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Period:</span>
          <span className="font-medium text-foreground">{period}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Est. Final Bill:</span>
          <span className="font-bold text-primary">€{estimatedFinal}</span>
        </div>
        
        <div className="w-full h-1 bg-muted mt-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary" 
            style={{ width: '60%' }}
            initial={{ width: '0%' }}
            animate={{ width: '60%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};