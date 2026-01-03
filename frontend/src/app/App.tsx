   import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Preloader } from "./components/Preloader";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthPage } from "./components/AuthPage";
import { ProfilePage } from "./components/ProfilePage";
import { MyBookingsPage } from "./components/MyBookingsPage";
import { CourtCard, type Court } from "./components/CourtCard";
import { DatePicker, type DateOption } from "./components/DatePicker";
import { TimeSlotGrid, type TimeSlot } from "./components/TimeSlotGrid";
import { BookingSummary } from "./components/BookingSummary";
import { CourtCardSkeleton, TimeSlotSkeleton, EmptyState } from "./components/LoadingSkeleton";
import { Toaster } from "./components/ui/sonner";
import { getSlots, bookSlot, type Slot } from "../services/api";

const courts: Court[] = [
  {
    id: "1",
    name: "Downtown Basketball Court",
    location: "123 Main St, Downtown",
    type: "Basketball",
    rating: 4.8,
    price: 45,
    image: "https://images.unsplash.com/photo-1577416412292-747c6607f055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnR8ZW58MXx8fHwxNzY3MzE1MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    name: "Elite Tennis Center",
    location: "456 Oak Ave, Uptown",
    type: "Tennis",
    rating: 4.9,
    price: 60,
    image: "https://images.unsplash.com/photo-1620742820748-87c09249a72a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydHxlbnwxfHx8fDE3NjczMjg3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    name: "Prime Soccer Turf",
    location: "789 Pine Rd, Westside",
    type: "Soccer",
    rating: 4.7,
    price: 80,
    image: "https://images.unsplash.com/photo-1712418516923-527799fb2bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0dXJmJTIwZmllbGR8ZW58MXx8fHwxNzY3Mzc4MDg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    name: "Ace Badminton Arena",
    location: "321 Elm St, Eastside",
    type: "Badminton",
    rating: 4.6,
    price: 35,
    image: "https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NjczNTEzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "5",
    name: "Pro Volleyball Arena",
    location: "555 Beach Blvd, Coastal",
    type: "Volleyball",
    rating: 4.7,
    price: 40,
    image: "https://images.unsplash.com/photo-1765910226872-e8811bd45d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY291cnQlMjBpbmRvb3J8ZW58MXx8fHwxNzY3Mzc4NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "6",
    name: "Champion Cricket Ground",
    location: "888 Stadium Road, Sports Complex",
    type: "Cricket",
    rating: 4.9,
    price: 100,
    image: "https://images.unsplash.com/photo-1761757106344-441482b56693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlja2V0JTIwdHVyZiUyMHBpdGNofGVufDF8fHx8MTc2NzM3ODQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "7",
    name: "Urban Squash Club",
    location: "234 City Center, Midtown",
    type: "Squash",
    rating: 4.5,
    price: 30,
    image: "https://images.unsplash.com/photo-1711294545092-303f7161017c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcXVhc2glMjBjb3VydHxlbnwxfHx8fDE3NjczNzg0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "8",
    name: "Victory Hockey Turf",
    location: "777 Sports Avenue, North District",
    type: "Hockey",
    rating: 4.8,
    price: 70,
    image: "https://images.unsplash.com/photo-1734158756511-56a9dd003eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2NrZXklMjB0dXJmJTIwZmllbGR8ZW58MXx8fHwxNzY3Mzc4NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const generateDates = (): DateOption[] => {
  const dates: DateOption[] = [];
  const today = new Date(2026, 0, 2); // Friday, January 2, 2026
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    dates.push({
      date: date.getDate().toString(),
      day: dayNames[date.getDay()],
      month: monthNames[date.getMonth()],
      fullDate: date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
      isToday: i === 0,
    });
  }
  
  return dates;
};

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const bookedTimes = ["9:00 AM", "2:00 PM", "6:00 PM"];
  
  for (let hour = 6; hour <= 22; hour++) {
    const time12h = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? "12:00 PM" : `${hour}:00 AM`;
    slots.push({
      time: time12h,
      status: bookedTimes.includes(time12h) ? "booked" : "available",
    });
  }
  
  return slots;
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "courts" | "bookings" | "profile" | "auth">("home");
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [dates] = useState<DateOption[]>(generateDates());
  const [courtsLoading, setCourtsLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const { user, logout, addBooking } = useAuth();

  useEffect(() => {
    // Set initial date
    setSelectedDate(dates[0].fullDate);
  }, [dates]);

  useEffect(() => {
    // Map slots to timeSlots
    const mapped = slots.map(slot => ({
      time: slot.time,
      status: slot.isBooked ? "booked" as const : "available" as const
    }));
    setTimeSlots(mapped);
  }, [slots]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const toggleTheme = () => setIsDark(!isDark);

  const handleNavigate = (page: string) => {
    if (page === "auth" || page === "home" || page === "courts") {
      setCurrentPage(page as any);
    } else if (page === "bookings" || page === "profile") {
      if (!user) {
        toast.error("Please log in to access this feature.");
        setCurrentPage("auth");
      } else {
        setCurrentPage(page as any);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("home");
    toast.success("Logged out successfully.");
  };

  const handleSelectCourt = async (court: Court) => {
    setSelectedCourt(court.id === selectedCourt?.id ? null : court);
    setSelectedTime(null);
    setSelectedSlotId(null);

    // Fetch slots for selected court and date
    if (court.id !== selectedCourt?.id) {
      setSlotsLoading(true);
      try {
        const fetchedSlots = await getSlots(court.id, selectedDate);
        setSlots(fetchedSlots);
      } catch (error) {
        toast.error("Failed to load slots");
        console.error(error);
      } finally {
        setSlotsLoading(false);
      }
    }
  };

  const handleSelectSlot = (time: string) => {
    const slot = slots.find(s => s.time === time);
    if (!slot || slot.isBooked) return;

    setSelectedSlotId(slot._id === selectedSlotId ? null : slot._id);
    setSelectedTime(time === selectedTime ? null : time);

    setTimeSlots((prev) =>
      prev.map((tslot) => ({
        ...tslot,
        status:
          tslot.time === time
            ? tslot.status === "selected"
              ? "available"
              : "selected"
            : tslot.status === "selected"
            ? "available"
            : tslot.status,
      }))
    );
  };

  const handleSelectDate = async (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedSlotId(null);

    if (selectedCourt) {
      setSlotsLoading(true);
      try {
        const fetchedSlots = await getSlots(selectedCourt.id, date);
        setSlots(fetchedSlots);
      } catch (error) {
        toast.error("Failed to load slots");
        console.error(error);
      } finally {
        setSlotsLoading(false);
      }
    }
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      toast.error("Please log in to make a booking.");
      setCurrentPage("auth");
      return;
    }

    if (selectedCourt && selectedSlotId) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please log in again.");
          setCurrentPage("auth");
          return;
        }

        await bookSlot(selectedSlotId, token);

        const total = selectedCourt.price * 1.1;

        // Add booking to user's bookings
        addBooking({
          courtId: selectedCourt.id,
          courtName: selectedCourt.name,
          date: selectedDate,
          time: selectedTime!,
          price: total,
        });

        toast.success(
          `🎉 Booking Confirmed!\n\n` +
          `Court: ${selectedCourt.name}\n` +
          `Date: ${selectedDate}\n` +
          `Time: ${selectedTime}\n` +
          `Total: $${total.toFixed(2)}\n\n` +
          `View your bookings in "My Bookings" page.`
        );

        // Reset selections
        setSelectedCourt(null);
        setSelectedTime(null);
        setSelectedSlotId(null);
        setSlots([]);
        setTimeSlots([]);
      } catch (error) {
        toast.error("Failed to book slot. Please try again.");
        console.error(error);
      }
    }
  };

  const filteredCourts = courts.filter((court) => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         court.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         court.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "All" || court.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const courtTypes = ["All", ...Array.from(new Set(courts.map((c) => c.type)))];

  // Render different pages based on currentPage
  if (isLoading) {
    return <Preloader onLoadComplete={handleLoadComplete} />;
  }

  if (currentPage === "auth") {
    return (
      <>
        <AuthPage onBack={() => setCurrentPage("home")} />
        <Toaster />
      </>
    );
  }

  if (currentPage === "profile") {
    return (
      <>
        <div className="min-h-screen bg-background">
          <Header
            isDark={isDark}
            toggleTheme={toggleTheme}
            onNavigate={handleNavigate}
            currentPage={currentPage}
            isLoggedIn={!!user}
            userName={user?.name}
            onLogout={handleLogout}
          />
          <ProfilePage onBack={() => setCurrentPage("home")} />
        </div>
        <Toaster />
        <Footer />
      </>
    );
  }

  if (currentPage === "bookings") {
    return (
      <>
        <div className="min-h-screen bg-background">
          <Header
            isDark={isDark}
            toggleTheme={toggleTheme}
            onNavigate={handleNavigate}
            currentPage={currentPage}
            isLoggedIn={!!user}
            userName={user?.name}
            onLogout={handleLogout}
          />
          <MyBookingsPage onBack={() => setCurrentPage("home")} />
        </div>
        <Toaster />
        <Footer />
      </>
    );
  }

  // Home/Courts page (main booking interface)
  return (
    <>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isLoggedIn={!!user}
          userName={user?.name}
          onLogout={handleLogout}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl mb-4">Book Your Court / Turf</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select an available time slot and confirm your booking
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courts, locations, or sports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {courtTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFilter(type)}
                      className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                        selectedFilter === type
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Court Selection */}
              <section>
                <h2 className="text-2xl mb-6">Available Courts</h2>
                
                {courtsLoading ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <CourtCardSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredCourts.length === 0 ? (
                  <EmptyState message="No courts match your search criteria. Try adjusting your filters." />
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredCourts.map((court, index) => (
                      <motion.div
                        key={court.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CourtCard
                          court={court}
                          isSelected={selectedCourt?.id === court.id}
                          onSelect={handleSelectCourt}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              {/* Date & Time Selection */}
              {selectedCourt && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <DatePicker
                    dates={dates}
                    selectedDate={selectedDate}
                    onSelectDate={handleSelectDate}
                  />

                  <div>
                    <h3 className="text-lg mb-4">Select Time Slot</h3>
                    {slotsLoading ? (
                      <TimeSlotSkeleton />
                    ) : (
                      <TimeSlotGrid slots={timeSlots} onSelectSlot={handleSelectSlot} />
                    )}

                    {/* Legend */}
                    <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-border bg-card" />
                        <span className="text-muted-foreground">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary" />
                        <span className="text-muted-foreground">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-muted/50 border-2 border-border" />
                        <span className="text-muted-foreground">Booked</span>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <BookingSummary
                selectedCourt={selectedCourt}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onConfirm={handleConfirmBooking}
              />
            </div>
          </div>
        </motion.main>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Toaster />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
