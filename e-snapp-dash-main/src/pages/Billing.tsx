import { Header } from "@/components/Header";
import { BillingSummaryCard } from "@/components/BillingSummaryCard";
import { BillingHistoryChart } from "@/components/BillingHistoryChart";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const billingHistoryData = [
  { period: "Jun", amount: 62 },
  { period: "Jul", amount: 74 },
  { period: "Aug", amount: 48 },
  { period: "Sep", amount: 32 },
  { period: "Oct", amount: 78 },
  { period: "Nov", amount: 65 },
];

export const Billing = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header title="Billing Summary" />
      
      <motion.div 
        className="px-4 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>

        {/* Current Billing Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <BillingSummaryCard
            currentBill={57.00}
            energyUsed={129.5}
            contract="Bioraria (F1/F23)"
            period="01 Jul - 31 Aug 2025"
            estimatedFinal={83.40}
          />
        </motion.div>
        
        {/* Offers Section */}
        <motion.div 
          className="bg-primary rounded-2xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-primary-foreground mb-4">Scopri le Offerte Migliori</h3>
          
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="bg-primary-foreground text-primary rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="text-sm opacity-90 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >Costo Annuale</motion.div>
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >€920.47</motion.div>
              <motion.div 
                className="text-xs opacity-80 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >Basato sulla tue bollette</motion.div>
            </motion.div>
            <motion.div 
              className="bg-primary-foreground text-primary rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div 
                className="text-sm opacity-90 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >Risparmio Stimato</motion.div>
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >€120.00 / anno</motion.div>
              <motion.div 
                className="text-xs opacity-80 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >Stima migliore offerta</motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary">
              Scegli le offerte migliori
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BillingHistoryChart
            data={billingHistoryData}
            change="+3%"
            estimatedCurrent={62}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};