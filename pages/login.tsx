// pages/login.tsx
import React, { useState } from "react";
import { useRouter } from "next/router"; // ✅ Use next/router for Pages Router
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        toast.success("Welcome to AERO AUTOSPACE LLP");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/verification-mail");
  };

  const handleCreateAccount = () => {
    router.push("/create-account");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-white/70 backdrop-blur rounded-full mx-auto flex items-center justify-center shadow-md border border-gray-300">
            <span className="text-xl font-semibold text-gray-700 tracking-wide">LOGO</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mt-4 tracking-tight">
            AERO AUTOSPACE LLP
          </h1>
        </div>

        <Card className="border border-gray-200 shadow-xl rounded-2xl backdrop-blur bg-white/70">
          <CardHeader className="text-center pb-2">
            <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="username" className="text-sm text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  maxLength={20}
                  placeholder="Enter username"
                  className="text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    maxLength={20}
                    placeholder="Enter password"
                    className="pr-10 text-sm"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-sm py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="flex justify-between text-xs pt-1 text-blue-700">
                <button type="button" className="hover:underline" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
                <button type="button" className="hover:underline" onClick={handleCreateAccount}>
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
              <p className="text-xs text-gray-800 font-semibold mb-1">Demo Credentials:</p>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Admin:</span> admin / admin123
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Guest:</span> guest / guest123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
