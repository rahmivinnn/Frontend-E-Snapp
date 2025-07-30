import { Header } from "@/components/Header";
import { BillingSummaryCard } from "@/components/BillingSummaryCard";
import { BillingHistoryChart } from "@/components/BillingHistoryChart";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const billingHistoryData = [
  { period: "Jun", amount: 62 },
  { period: "Jul", amount: 74 },
  { period: "Aug", amount: 48 },
  { period: "Sep", amount: 32 },
  { period: "Oct", amount: 78 },
  { period: "Nov", amount: 65 },
  { period: "Dec", amount: 70 }
];

// This constant is not being used in the component, can be removed or used in the BillingSummaryCard

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
            dueDate="15 Sep 2025"
          />
        </motion.div>
        
        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BillingHistoryChart
            data={billingHistoryData}
            change="+3.5%"
            estimatedCurrent={62}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};