import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  LogOut, User, Mail, Shield, 
  LayoutDashboard, Bell, Settings, 
  CreditCard, Loader2, ExternalLink,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-brand-red" />
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen font-outfit text-white pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 glass-card rounded-none border-x-0 border-t-0 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-brand-red to-brand-blue rounded-xl flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block italic">MERN Auth</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5">
              <Bell className="w-5 h-5 text-brand-red/60" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2 rounded-full border border-red-500/20 transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Hero Section */}
          <motion.div variants={cardVariants} className="relative p-10 glass-card rounded-[32px] border-white/10 overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  Welcome back, <span className="bg-gradient-to-r from-brand-red to-brand-blue bg-clip-text text-transparent">{user?.name}</span>
                </h1>
                <p className="text-brand-red/60 text-lg font-light max-w-xl">
                  Your identity is protected and your workspace is fully synchronized.
                </p>
                <div className="mt-8 flex gap-4">
                  <button className="btn-premium px-8 py-3.5 rounded-full font-bold flex items-center gap-2 shadow-2xl">
                    View Profile
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-brand-red to-brand-blue rounded-[40px] flex items-center justify-center text-5xl md:text-7xl font-bold shadow-2xl rotate-3">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -inset-4 bg-brand-red/20 blur-3xl rounded-full -z-10 animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={cardVariants} className="lg:col-span-1 space-y-6">
              <div className="glass-card p-8 border-white/5 h-full">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-red/40 mb-8 px-1">Security Status</h3>
                <div className="space-y-5">
                  {[
                    { label: 'Cloud Identity', value: 'Active', icon: Shield, color: 'text-green-400' },
                    { label: 'Pro Subscription', value: 'Enabled', icon: CreditCard, color: 'text-brand-blue' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="text-sm font-medium text-brand-red/80">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded-md border border-white/10 uppercase">{item.value}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
                  Full Security Scan
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="lg:col-span-2">
              <div className="glass-card p-10 border-white/10 h-full relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold tracking-tight">Personal Identity</h3>
                  <button className="text-purple-400 hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/5">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { label: 'Full Username', value: user?.name, icon: User },
                    { label: 'Verified Email', value: user?.email, icon: Mail },
                  ].map((field, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                         <field.icon className="w-4 h-4 text-brand-red/60" />
                         <span className="text-[10px] uppercase tracking-widest font-bold text-brand-red/30">{field.label}</span>
                      </div>
                      <p className="text-lg font-medium text-white px-0.5">{field.value || 'Not set'}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-brand-red/30 mb-1">Account ID</p>
                      <p className="text-xs font-mono text-white/60 truncate">NXS-492-X92-2P1</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] uppercase font-bold text-brand-red/30 mb-1">Last Login</p>
                      <p className="text-xs font-mono text-white/60">Today at 09:44 AM</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;