import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SmartSuggestionsProps {
  tip: string;
}

export const SmartSuggestions = ({ tip }: SmartSuggestionsProps) => {
  return (
    <motion.div 
      className="bg-accent rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div 
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { repeat: Infinity, repeatType: "loop", duration: 1.5 } }}
        >
          <Lightbulb size={20} className="text-accent-foreground" />
        </motion.div>
        <motion.h3 
          className="text-lg font-semibold text-accent-foreground"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Smart Suggestions
        </motion.h3>
      </motion.div>
      
      <motion.p 
        className="text-accent-foreground mb-4 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Tip: "{tip}"
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full bg-accent-foreground text-accent hover:bg-accent-foreground/90"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              See All Tips
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};