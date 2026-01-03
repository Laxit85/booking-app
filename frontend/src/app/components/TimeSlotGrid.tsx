import { motion } from "motion/react";
import { Lock, Clock } from "lucide-react";

export interface TimeSlot {
  time: string;
  status: "available" | "selected" | "booked";
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  onSelectSlot: (time: string) => void;
}

export function TimeSlotGrid({ slots, onSelectSlot }: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {slots.map((slot, index) => (
        <motion.button
          key={slot.time}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            layout: { type: "spring", stiffness: 400, damping: 25 },
            opacity: { delay: index * 0.02 },
            scale: { delay: index * 0.02 }
          }}
          onClick={() => slot.status !== "booked" && onSelectSlot(slot.time)}
          disabled={slot.status === "booked"}
          whileHover={
            slot.status !== "booked"
              ? {
                  scale: 1.05,
                  boxShadow: "0 8px 16px rgba(16, 185, 129, 0.15)",
                }
              : {}
          }
          whileTap={slot.status !== "booked" ? { scale: 0.95 } : {}}
          className={`relative p-4 rounded-lg border-2 transition-all ${
            slot.status === "selected"
              ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
              : slot.status === "booked"
              ? "bg-muted/50 border-border text-muted-foreground cursor-not-allowed opacity-60"
              : "bg-card border-border hover:border-primary/50"
          }`}
        >
          <div className="flex flex-col items-center gap-1.5">
            <Clock className="w-4 h-4 opacity-70" />
            <span className="text-sm">{slot.time}</span>
            {slot.status === "booked" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Lock className="w-3.5 h-3.5 mt-1" />
              </motion.div>
            )}
            {slot.status === "available" && (
              <span className="text-xs opacity-60 mt-0.5">Available</span>
            )}
          </div>

          {/* Animated Background for Selected State */}
          {slot.status === "selected" && (
            <>
              <motion.div
                layoutId="selected-slot-bg"
                className="absolute inset-0 bg-primary rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-primary/20 rounded-lg"
              />
            </>
          )}

          {/* Ripple Effect on Click */}
          {slot.status === "available" && (
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}