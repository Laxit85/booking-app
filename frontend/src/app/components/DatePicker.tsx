import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useState } from "react";

export interface DateOption {
  date: string;
  day: string;
  month: string;
  fullDate: string;
  isToday?: boolean;
}

interface DatePickerProps {
  dates: DateOption[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DatePicker({ dates, selectedDate, onSelectDate }: DatePickerProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("date-scroll-container");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg">Select Date</h3>
          <p className="text-xs text-muted-foreground">Choose your preferred booking date</p>
        </div>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <motion.button
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-background border-2 border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hover:text-primary-foreground -ml-5"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Date Scroll Container */}
        <div
          id="date-scroll-container"
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dates.map((dateOption, index) => (
            <motion.button
              key={dateOption.fullDate}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectDate(dateOption.fullDate)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 w-20 p-3 rounded-xl border-2 transition-all ${
                selectedDate === dateOption.fullDate
                  ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/30"
                  : "bg-card border-border hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs uppercase tracking-wider opacity-80">{dateOption.day}</span>
                <motion.span
                  animate={{
                    scale: selectedDate === dateOption.fullDate ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl"
                >
                  {dateOption.date}
                </motion.span>
                <span className="text-xs uppercase opacity-80">{dateOption.month}</span>
              </div>
              
              {dateOption.isToday && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 20 }}
                  className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full border-2 border-background ${
                    selectedDate === dateOption.fullDate
                      ? "bg-primary-foreground"
                      : "bg-destructive"
                  }`}
                >
                  <span className="sr-only">Today</span>
                </motion.div>
              )}

              {selectedDate === dateOption.fullDate && (
                <motion.div
                  layoutId="selected-date-bg"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-background border-2 border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:border-primary hover:text-primary-foreground -mr-5"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}