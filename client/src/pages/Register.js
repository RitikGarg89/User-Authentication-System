import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      toast.success(res.data.message || "Registration successful!");
      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
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
             <UserPlus className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Register</h2>
          <p className="text-purple-200/60 font-light">Create a new account now</p>
        </motion.div>

        <form onSubmit={handleRegister} className="space-y-5">
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300/40 px-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="text"
                placeholder="John Doe"
                required
                className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-white placeholder:text-white/10"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300/40 px-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="email"
                placeholder="email@example.com"
                required
                className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-white placeholder:text-white/10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300/40 px-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-white placeholder:text-white/10"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className="btn-premium w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 mt-4 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
            ) : (
              <>
                Sign Up
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <motion.p variants={itemVariants} className="text-center mt-10 text-purple-200/40 text-sm">
          Already have an account?{' '}
          <span 
            onClick={() => navigate("/")}
            className="text-white font-bold hover:text-purple-300 transition-colors cursor-pointer"
          >
            Login here
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Register;