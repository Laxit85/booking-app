import { useState } from "react";
import { motion } from "motion/react";
import { User as UserIcon, Mail, Phone, Calendar, ArrowLeft, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, updateProfile, bookings } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const totalSpent = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl shadow-lg shadow-primary/20">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl mb-1">My Profile</h1>
                  <p className="text-muted-foreground text-sm">
                    Manage your account information
                  </p>
                </div>
              </div>

              {!isEditing ? (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit Profile</span>
                </motion.button>
              ) : (
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span className="text-sm">Save</span>
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm">Cancel</span>
                  </motion.button>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <UserIcon className="w-4 h-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-muted/50 rounded-lg">{user?.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <p className="px-4 py-2 bg-muted/50 rounded-lg text-muted-foreground">
                    {user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-muted/50 rounded-lg">
                      {user?.phone || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Member Since */}
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </label>
                  <p className="px-4 py-2 bg-muted/50 rounded-lg">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="text-3xl text-primary mb-2">
                {confirmedBookings.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="text-3xl text-primary mb-2">
                ${totalSpent.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="text-3xl text-primary mb-2">
                {bookings.filter((b) => b.status === "cancelled").length}
              </div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </motion.div>
          </div>

          {/* Account Settings */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-xl mb-4">Account Settings</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm">
                Notification Preferences
              </button>
              <button className="w-full text-left px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm">
                Privacy Settings
              </button>
              <button className="w-full text-left px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
