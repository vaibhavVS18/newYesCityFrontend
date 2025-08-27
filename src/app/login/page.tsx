'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaArrowLeft, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Redirect if already logged in
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include", // 👈 important so cookies are sent
          });

          if (res.ok) {
            // ✅ User is authenticated
            router.push("/");
          }
        } catch (err) {
          console.error("Auth check failed:", err);
        }
      };

      checkAuth();
    }, [router]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
        credentials: "include" // ⬅️ IMPORTANT: include cookies
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
      return;
    }

    // ✅ No need to store token in localStorage anymore
    // Just store user info if needed
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/");
  } catch (err) {
    console.error(err);
    setError("An unexpected error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  // ✅ Google Login Handler
  // ---------------- GOOGLE SIGN-IN ----------------
  let phone=null, referredBy=null;
  const handleGoogleSignIn = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-sky-600 shadow-sm border border-sky-100 transition-all hover:bg-sky-50 hover:shadow-md"
        >
          <FaArrowLeft className="text-xs" />
          Back to Home
        </Link>

        <div className="flex flex-col items-center justify-center pt-8">
          <div className="w-full max-w-md">
            <div className="rounded-3xl bg-white px-6 py-8 shadow-2xl ring-1 ring-sky-100 sm:px-10 backdrop-blur-sm">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                <p className="mt-2 text-sky-600">Sign in to your account</p>
              </div>

              {error && (
                <div className="mb-6 rounded-xl bg-red-50 p-3 text-sm text-red-600 ring-1 ring-red-100 border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email or Username
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={emailOrUsername}
                    onChange={e => setEmailOrUsername(e.target.value)}
                    required
                    className="block w-full rounded-xl border border-sky-200 bg-sky-50/30 py-3 pl-3 pr-3 text-gray-800 placeholder-sky-400 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all"
                    placeholder="Enter your email or username"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-sky-600 hover:text-sky-500 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock className="text-sky-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-xl border border-sky-200 bg-sky-50/30 py-3 pl-10 pr-3 text-gray-800 placeholder-sky-400 shadow-sm focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex w-full justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 font-medium text-white shadow-lg transition-all hover:from-sky-600 hover:to-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 active:scale-[0.98] transform ${
                      isLoading ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>


              {/* ✅ Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-sky-200" />
                <span className="mx-4 text-sky-500 text-sm font-medium">Or continue with</span>
                <div className="flex-grow border-t border-sky-200" />
              </div>

              {/* ✅ Google Sign-In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-xl border-2 border-sky-200 bg-white px-4 py-3 text-gray-700 shadow-sm hover:bg-sky-50 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-all"
              >
                <FaGoogle className="mr-2 text-red-500" />
                <span className="font-medium">Sign in with Google</span>
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="font-medium text-sky-600 hover:text-sky-500 transition-colors">
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}