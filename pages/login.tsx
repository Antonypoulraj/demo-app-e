"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const validatePassword = (pass: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length > 20 || password.length > 20) {
      toast("Username and password must not exceed 20 characters.");
      return;
    }

    if (!validatePassword(password)) {
      toast(
        "Password must be at least 8 characters with uppercase, alphabet, number, and special character."
      );
      return;
    }

    if (username === "admin" && password === "Admin@123") {
      toast("Login Successful");
      router.push("/dashboard?role=admin");
    } else if (username === "guest" && password === "Guest@123") {
      toast("Login Successful");
      router.push("/dashboard?role=guest");
    } else {
      toast("Login Failed: Invalid credentials.");
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center font-[Times_New_Roman]"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 shadow-md rounded-lg border">
        <h1 className="text-[26px] font-bold text-center mb-6">Login Portal</h1>

        {/* Username */}
        <div className="mb-4">
          <Label className="text-[20px]">Username</Label>
          <Input
            className="text-[16px]"
            maxLength={20}
            required
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <Label className="text-[20px]">Password</Label>
          <Input
            className="text-[16px] pr-10"
            maxLength={20}
            required
            type={showPass ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {/* Login Button */}
        <Button type="submit" className="w-full text-[16px] flex items-center justify-center mt-4">
          Login
        </Button>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm underline text-blue-600">
          <button type="button" onClick={() => router.push("/forgot-password")}>
            Forgot Password?
          </button>
          <button type="button" onClick={() => router.push("/register")}>
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
}

// // pages/login.tsx
// import React, { useState } from "react";
// import { useRouter } from "next/router"; // ✅ Use next/router for Pages Router
// import { useAuth } from "../contexts/AuthContext";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import { Card, CardContent, CardHeader } from "../components/ui/card";
// import { toast } from "sonner";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!username || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const success = await login(username, password);

//       if (success) {
//         toast.success("Welcome to AERO AUTOSPACE LLP");
//         setTimeout(() => {
//           router.push("/dashboard");
//         }, 1000);
//       } else {
//         toast.error("Invalid username or password");
//       }
//     } catch (error) {
//       toast.error("An error occurred during login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = () => {
//     router.push("/verification-mail");
//   };

//   const handleCreateAccount = () => {
//     router.push("/create-account");
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-white via-blue-50 to-blue-100">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-10">
//           <h1 className="font-times text-4xl font-bold text-gray-900 mb-4">AERO AUTOSPACE LLP</h1>
//           <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center shadow-inner">
//             <span className="text-lg font-times font-bold text-gray-700">LOGO</span>
//           </div>
//         </div>

//         <Card className="shadow-lg border border-gray-200 rounded-xl">
//           <CardHeader className="text-center pb-4">
//             <h2 className="font-times text-2xl font-semibold text-gray-500">Login</h2>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-1">
//                 <Label htmlFor="username" className="font-times text-sm text-gray-500">
//                   Username
//                 </Label>
//                 <Input
//                   id="username"
//                   type="text"
//                   value={username}
//                   onChange={e => setUsername(e.target.value)}
//                   maxLength={20}
//                   placeholder="Enter username"
//                   className="text-sm"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <Label htmlFor="password" className="font-times text-sm text-gray-500">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     maxLength={20}
//                     placeholder="Enter password"
//                     className="pr-10 text-sm"
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full font-times text-sm py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </Button>

//               <div className="flex justify-between text-xs pt-2">
//                 <button
//                   type="button"
//                   className="font-times text-blue-500 hover:underline"
//                   onClick={handleForgotPassword}
//                 >
//                   Forgot Password?
//                 </button>
//                 <button
//                   type="button"
//                   className="font-times text-blue-500 hover:underline"
//                   onClick={handleCreateAccount}
//                 >
//                   Create Account
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
//               <p className="font-times text-xs text-gray-800 mb-1 font-semibold">
//                 Demo Credentials:
//               </p>
//               <p className="font-times text-xs text-gray-500">
//                 <span className="font-semibold">Admin:</span> admin / admin123
//               </p>
//               <p className="font-times text-xs text-gray-500">
//                 <span className="font-semibold">Guest:</span> guest / guest123
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;
