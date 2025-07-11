"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const VerificationMail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
      toast({
        title: "Verification Email Sent",
        description: "Please check your email for reset instructions.",
      });
    }, 2000);
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Email Resent",
        description: "A new password reset link has been sent.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-times text-4xl font-bold text-gray-800 mb-4">AERO AUTOSPACE LLP</h1>
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl font-times font-bold text-gray-600">LOGO</span>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="font-times text-2xl font-bold">
              {isEmailSent ? "Check Your Email" : "Reset Your Password"}
            </h2>
            <p className="font-times text-gray-600 mt-2">
              {isEmailSent
                ? "We've sent a password reset link to your email address."
                : "Enter your email address and we'll send you a reset link."}
            </p>
          </CardHeader>
          <CardContent>
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-times text-lg">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="font-times text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-times text-lg py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full font-times text-base"
                  onClick={handleBackToLogin}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </form>
            ) : (
              <div className="space-y-6 text-center">
                <p className="font-times text-gray-600 mb-2">
                  If you don't see the email, check your spam or junk folder.
                </p>
                <p className="font-times text-sm text-gray-500">
                  Sent to: <strong>{email}</strong>
                </p>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full font-times text-base"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                >
                  {isLoading ? "Resending..." : "Resend Email"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full font-times text-base"
                  onClick={handleBackToLogin}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationMail;
