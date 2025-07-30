import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BillingSummaryCardProps {
  currentBill: number;
  energyUsed: number;
  contract: string;
  period: string;
  estimatedFinal: number;
  dueDate?: string;
}

export const BillingSummaryCard = ({
  currentBill,
  energyUsed,
  contract,
  period,
  estimatedFinal,
  dueDate
}: BillingSummaryCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      className="bg-card rounded-2xl p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-4">Billing Summary</h2>
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div 
          className="bg-primary-light/30 rounded-xl p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs text-muted-foreground mb-1">Current Bill</div>
          <div className="text-xl font-bold text-primary">€{currentBill.toFixed(2)}</div>
        </motion.div>
        <motion.div 
          className="bg-primary-light/30 rounded-xl p-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="text-xs text-muted-foreground mb-1">Energy Used</div>
          <div className="text-xl font-bold text-primary">{energyUsed} kWh</div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Contract:</span>
          <span className="font-medium text-foreground">{contract}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Period:</span>
          <span className="font-medium text-foreground">{period}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Est. Final Bill:</span>
          <span className="font-bold text-primary">€{estimatedFinal.toFixed(2)}</span>
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
        
        <div className="mt-4 pt-2 border-t border-muted">
          <p className="text-xs font-medium text-center text-primary">Scopri le Offerte Migliori</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary rounded-lg p-2 text-center">
              <p className="text-xs text-white font-medium">Costo Annuale</p>
              <p className="text-sm text-white font-bold">€320</p>
              <p className="text-[10px] text-white/80">Prezzo fisso per 12 mesi</p>
            </div>
            <div className="bg-primary rounded-lg p-2 text-center">
              <p className="text-xs text-white font-medium">Risparmio Stimato</p>
              <p className="text-sm text-white font-bold">€120<span className="text-[10px]">/anno</span></p>
              <p className="text-[10px] text-white/80">Rispetto alla maggior tutela</p>
            </div>
          </div>
          <button 
            className="w-full bg-secondary text-primary font-medium text-xs py-2 rounded-lg mt-2"
            onClick={() => navigate('/better-tariffs')}
          >
            Scegli le offerte
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};