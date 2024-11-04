import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/router";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const isLogin = router.pathname === "/login";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken); // Set token in the global state
      // Optionally fetch user data
    }
  }, [setToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:3000/v1/users/auth/login"
        : "http://localhost:3000/v1/users/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const response = await axios.post(url, payload);

      // Set token in both state and localStorage
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);

      toast.success(isLogin ? "Login successful" : "Registration successful");
      router.push(isLogin ? "/feed" : "/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "An error occurred, please try again"
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      className="flex flex-col px-2 items-center justify-center min-h-screen"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 flex flex-col rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <Input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLogin}
            className="mb-4 placeholder:text-gray-500"
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 placeholder:text-gray-500"
        />
        <div className="relative mb-4">
          <Input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="placeholder:text-gray-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <Button type="submit" className="w-full bg-green-800 text-white">
          {isLogin ? "Login" : "Register"}
        </Button>

        {isLogin && (
          <div className="mt-3 text-end">
            <Link
              href={"/forgotPassword"}
              className="text-blue-500  border-gray-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <div className="mt-4 text-center">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            {isLogin ? (
              <Link href={"/signup"} className="text-blue-500  hover:underline">
                Register
              </Link>
            ) : (
              <Link href={"/login"} className="text-blue-500  hover:underline">
                Login
              </Link>
            )}
          </span>
        </div>
      </form>

      <ToastContainer />
    </motion.div>
  );
};

export default AuthForm;
