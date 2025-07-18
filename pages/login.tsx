import React, { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        router.push("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center text-muted-foreground font-medium mb-4">
            LOGO
          </div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your credentials to sign in</p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Login to your account</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      title: "Forgot Password",
                      description: "Feature not implemented yet.",
                    })
                  }
                  className="hover:underline"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      title: "Create Account",
                      description: "Feature not implemented yet.",
                    })
                  }
                  className="hover:underline"
                >
                  Create account
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p className="font-medium">Demo credentials</p>
          <p>
            <strong>Admin:</strong> admin / admin123
          </p>
          <p>
            <strong>Guest:</strong> guest / guest123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

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
