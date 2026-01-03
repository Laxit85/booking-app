import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign, CheckCircle, XCircle, Filter } from "lucide-react";
import { toast } from "sonner";
import { useAuth, type Booking } from "../contexts/AuthContext";

interface MyBookingsPageProps {
  onBack: () => void;
}

export function MyBookingsPage({ onBack }: MyBookingsPageProps) {
  const { bookings, cancelBooking } = useAuth();
  const [filter, setFilter] = useState<"all" | "confirmed" | "cancelled">("all");

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const handleCancelBooking = (bookingId: string, courtName: string) => {
    if (window.confirm(`Are you sure you want to cancel the booking for ${courtName}?`)) {
      cancelBooking(bookingId);
      toast.success("Booking cancelled successfully.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </motion.button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2">My Bookings</h1>
              <p className="text-muted-foreground">
                View and manage all your court bookings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-6"
        >
          <Filter className="w-5 h-5 text-muted-foreground" />
          <div className="flex gap-2">
            {(["all", "confirmed", "cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
                  filter === status
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">
              {filter === "all"
                ? "You haven't made any bookings yet. Start by selecting a court!"
                : `You don't have any ${filter} bookings.`}
            </p>
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Courts
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBookings
              .sort((a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime())
              .map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  onCancel={handleCancelBooking}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface BookingCardProps {
  booking: Booking;
  index: number;
  onCancel: (bookingId: string, courtName: string) => void;
}

function BookingCard({ booking, index, onCancel }: BookingCardProps) {
  const statusColors = {
    confirmed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    cancelled: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card border rounded-2xl p-6 transition-all ${
        booking.status === "confirmed"
          ? "border-border hover:border-primary/50 hover:shadow-lg"
          : "border-border opacity-70"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Court Name & Status */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl">{booking.courtName}</h3>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${
                statusColors[booking.status]
              }`}
            >
              {booking.status === "confirmed" ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5" />
              )}
              <span className="capitalize">{booking.status}</span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>${booking.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>Booked on:</span>
              <span>
                {new Date(booking.bookedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {booking.status === "confirmed" && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCancel(booking.id, booking.courtName)}
              className="px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm"
            >
              Cancel Booking
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              View Details
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
