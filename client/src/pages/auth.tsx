import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";
import "@/app/globals.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    walletAddress: string;
  };
}

export default function AuthPages() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin ? "api/auth/login" : "api/auth/register";
      const res = await api.post<AuthResponse>(endpoint, { email, password });

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        toast.success("User created successfully! Please login.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      console.error("Error during login/register:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-300 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <label> Email</label>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
           <label >Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!isLogin && (
          <div className="relative">
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
              className="w-full px-3 py-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <FiEyeOff  />
              ) : (
                <FiEye  />
              )}
            </button>

            {confirmPassword.length > 0 && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? `Don't have an account?` : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
