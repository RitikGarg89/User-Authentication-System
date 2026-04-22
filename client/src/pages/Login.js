import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Wake up Render backend
  useEffect(() => {
    axios.get("https://user-authentication-system-2wl2.onrender.com/").catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://user-authentication-system-2wl2.onrender.com/api/auth/login", {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1, ease: "easeOut" }
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
             <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">Login</h2>
          <p className="text-white/70 font-light">Enter your credentials to continue</p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 px-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="email"
                placeholder="email@example.com"
                required
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-white/10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 px-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300/30 group-focus-within:text-purple-400 transition-colors w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder:text-white/10"
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
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <motion.p variants={itemVariants} className="text-center mt-10 text-white/40 text-sm">
          Don't have an account?{' '}
          <span 
            onClick={() => navigate("/register")}
            className="text-white font-bold hover:text-purple-300 transition-colors cursor-pointer"
          >
            Create Account
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;