import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, LockKeyhole, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp
      });
      
      toast.success(res.data.message || "Email verified successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent relative overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card w-full max-w-md p-10 z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
             <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Verify</h2>
          <p className="text-purple-200/60 font-light">Confirm your identity via OTP</p>
        </motion.div>

        <form onSubmit={handleVerify} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300/40 px-1">Verification Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="email"
                placeholder="hello@example.com"
                required
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-white/10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300/40 px-1">6-Digit Code</label>
            <div className="relative group">
              <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="text"
                placeholder="000000"
                required
                maxLength="6"
                className="glass-input w-full pl-12 pr-4 py-5 rounded-2xl text-white placeholder:text-white/10 tracking-[0.5em] font-mono text-2xl text-center"
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading || otp.length !== 6}
            className="btn-premium w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 mt-4 disabled:opacity-30 disabled:grayscale transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
            ) : (
              <>
                Verify Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <motion.p variants={itemVariants} className="text-center mt-10 text-purple-200/40 text-sm">
          Return to{' '}
          <span 
            onClick={() => navigate("/")}
            className="text-white font-bold hover:text-purple-300 transition-colors cursor-pointer"
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default VerifyOtp;