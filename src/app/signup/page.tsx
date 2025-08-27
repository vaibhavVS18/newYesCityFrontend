'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowLeft,
  FaPhone,
  FaKey,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
  FaUserFriends,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import app from '../../lib/firebase';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [referredBy, setReferredBy] = useState('');

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);

  // Status states
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpTimer, setOtpTimer] = useState(0);

  const router = useRouter();
  const auth = getAuth(app);

  // ---------------- VALIDATION ----------------
  const validateForm = (): boolean => {
    if (!username || !email || !password) {
      setError('All fields are required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  // ---------------- OTP SETUP ----------------
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        { size: 'invisible' }
      );
    }
  };

  const startOtpTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    if (!phone) {
      setError('Enter phone number');
      return;
    }

    setIsOtpSending(true);
    setError('');

    try {
      setupRecaptcha();
      const phoneNumber = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      setConfirmationResult(confirmation);
      setOtpSent(true);
      setError('');
      startOtpTimer();

      // Success toast
      const successMsg = document.createElement('div');
      successMsg.className =
        'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'OTP sent successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsOtpSending(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setError('Enter OTP');
      return;
    }

    setIsOtpVerifying(true);
    setError('');

    try {
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
      setError('');

      // Success toast
      const successMsg = document.createElement('div');
      successMsg.className =
        'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      successMsg.textContent = 'Phone number verified!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch (err: any) {
      console.error(err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsOtpVerifying(false);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!otpVerified) {
      setError('Please verify your phone number first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email,
            password,
            phone,
            referredBy: referredBy || null,
          }),
          credentials: 'include', // ✅ cookies
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      if (data.success) {
        // localStorage.setItem('token', data.token);
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- GOOGLE SIGN-IN ----------------
  const handleGoogleSignIn = () => {
    if (!otpVerified) {
      setError('Please verify your phone number before continuing with Google signup');
      return;
    }
    const params = new URLSearchParams();
    params.set(
      'state',
      JSON.stringify({
        phone,
        referredBy: referredBy || null,
      })
    );
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google?${params.toString()}`;
  };

  // ---------------- JSX ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 flex items-center text-sky-600 hover:text-sky-700 transition-colors font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-sky-100">
            <div className="px-8 py-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Create Account
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
              </div>

              {/* Phone verification notice */}
              {!otpVerified && (
                <div className="mb-6 bg-sky-50 border border-sky-200 p-4 rounded-xl">
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-sky-600 flex-shrink-0" />
                    <span className="text-sm text-sky-800">
                      Phone number verification is required for all signups
                    </span>
                  </div>
                </div>
              )}

              {/* Error alert */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl flex items-center">
                  <FaExclamationTriangle className="mr-3 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* PHONE NUMBER + OTP FLOW */}
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={otpVerified}
                      className={`w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all ${
                        otpVerified ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''
                      }`}
                      placeholder="9876543210"
                    />
                    {otpVerified && (
                      <FaCheck className="absolute right-4 top-4 text-green-500" />
                    )}
                  </div>

                  {/* OTP Send / Resend */}
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={isOtpSending || !phone}
                      className="mt-4 w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                    >
                      {isOtpSending ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Sending OTP...
                        </>
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  ) : (
                    !otpVerified && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={sendOtp}
                          disabled={otpTimer > 0 || isOtpSending}
                          className="w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 py-3 rounded-xl text-sm font-medium transition-colors border border-gray-200"
                        >
                          {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Resend OTP'}
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* OTP Field */}
                {otpSent && !otpVerified && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <FaKey className="absolute left-4 top-4 text-gray-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all"
                        placeholder="Enter 6-digit OTP"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={isOtpVerifying || !otp}
                      className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                    >
                      {isOtpVerifying ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </button>
                  </div>
                )}

                {/* OTP Verified Message */}
                {otpVerified && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center">
                    <FaCheck className="mr-3 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Phone number verified successfully!</span>
                  </div>
                )}

                {/* Referred By */}
                {!otpVerified && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Referred By{' '}
                      <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <FaUserFriends className="absolute left-4 top-4 text-gray-400" />
                      <input
                        type="tel"
                        value={referredBy}
                        onChange={(e) => setReferredBy(e.target.value)}
                        maxLength={10}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all"
                        placeholder="Friend's phone number (Optional)"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Enter the phone number of the person who referred you (10 digits)
                    </p>
                  </div>
                )}

                <div id="recaptcha-container"></div>

                {/* After OTP Verified Fields */}
                {otpVerified && (
                  <>
                    {/* Username */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Username
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all"
                          placeholder="Choose a username"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Email
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-4 top-4 text-gray-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full rounded-xl border-2 border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 transition-all"
                          placeholder="Create a password"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                      >
                        {isLoading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Creating account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Google Signup */}
              {otpVerified && (
                <div className="mt-8">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-6">
                      <span className="text-sm text-gray-500 font-medium">Or continue with</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="mt-6 flex w-full items-center justify-center rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 py-4 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <FaGoogle className="mr-3 text-red-500 text-lg" />
                    <span className="text-gray-700 font-semibold">Sign up with Google</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-sky-50 px-8 py-6 text-center rounded-b-3xl">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}