"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/providers/auth-context";
import { toast } from "sonner";

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('emilys'); // Default user
  const [password, setPassword] = useState('emilyspass'); // Default password
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/shop'); // Redirect to the home page
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    try {
      await login({ username, password });
      toast.success('Login successful!');
      router.push('/'); // Successful login and redirect
    } catch (error: unknown) {
      toast.error('Login failed!');
      if (error instanceof Error) {
        setAuthError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register-login-page" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Log In (Dummy API)</h2>

            {/* Display authentication error */}
            {authError && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">{authError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username (Hint: emilys)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-1 border  rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password (Hint: emilyspass)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-1 border  rounded-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-2 px-3 rounded-full w-full"
              >
                {/* Display loading state text */}
                {loading ? 'Authenticating...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}