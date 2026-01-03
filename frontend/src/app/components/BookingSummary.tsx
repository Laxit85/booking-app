import { motion } from "motion/react";
import { Calendar, Clock, MapPin, DollarSign, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Court } from "./CourtCard";

interface BookingSummaryProps {
  selectedCourt: Court | null;
  selectedDate: string;
  selectedTime: string | null;
  onConfirm: () => void;
}

export function BookingSummary({
  selectedCourt,
  selectedDate,
  selectedTime,
  onConfirm,
}: BookingSummaryProps) {
  const isComplete = selectedCourt && selectedTime;
  const subtotal = selectedCourt?.price || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      {/* Desktop - Sticky Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:block sticky top-24 h-fit"
      >
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Booking Summary</h3>
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </motion.div>
            )}
          </div>

          {!selectedCourt ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select a court to continue</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Court Image Preview */}
              <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedCourt.image}
                  alt={selectedCourt.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-sm truncate">{selectedCourt.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm truncate">{selectedCourt.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                    <p className="text-sm">{selectedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Time</p>
                    <p className="text-sm">{selectedTime || "Not selected"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per hour</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span>Total Amount</span>
                  <span className="text-xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                onClick={onConfirm}
                disabled={!isComplete}
                whileHover={isComplete ? { scale: 1.02 } : {}}
                whileTap={isComplete ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  isComplete
                    ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isComplete ? "Confirm Booking" : "Select Time Slot"}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {isComplete && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center text-muted-foreground"
                >
                  You'll receive a confirmation email
                </motion.p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mobile - Bottom Drawer */}
      {selectedCourt && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-2xl rounded-t-2xl"
        >
          <div className="p-4">
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="text-2xl text-primary">${total.toFixed(2)}</p>
              </div>
              <motion.button
                onClick={onConfirm}
                disabled={!isComplete}
                whileTap={isComplete ? { scale: 0.95 } : {}}
                className={`py-3 px-6 rounded-lg flex items-center gap-2 transition-all ${
                  isComplete
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Confirm
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedCourt.name}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedDate.split(",")[0]}</span>
              </div>
              {selectedTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedTime}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}