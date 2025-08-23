"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Enter your password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, this would validate credentials with an API
      // For now, we'll just redirect
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`OAuth flow for ${provider} would start here.`);
    router.push("/");
  };

  return (
    <main className="auth min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <section className="card animate-in bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="muted text-center mb-6 text-gray-600 dark:text-gray-400">
          Sign in to your account
        </p>

        <div className="social space-y-3 mb-6">
          <button
            className="social__btn google w-full flex items-center justify-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => handleSocialLogin("google")}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt=""
            />
            Sign in with Google
          </button>

          <button
            className="social__btn github w-full flex items-center justify-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => handleSocialLogin("github")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <path
                fill="currentColor"
                d="M12 .5a12 12 0 0 0-3.79 23.4c.6.12.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01.11-.8.42-1.33.76-1.64-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.41 1.25-3.26-.13-.31-.54-1.55.12-3.22 0 0 1.02-.33 3.34 1.24a11.6 11.6 0 0 1 6.08 0c2.32-1.57 3.34-1.24 3.34-1.24.66 1.67.25 2.91.12 3.22.78.85 1.25 1.94 1.25 3.26 0 4.64-2.8 5.66-5.48 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z"
              />
            </svg>
            Sign in with GitHub
          </button>

          <button
            className="social__btn ms w-full flex items-center justify-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => handleSocialLogin("microsoft")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <path fill="#f25022" d="M11 11H3V3h8v8z" />
              <path fill="#00a4ef" d="M21 11h-8V3h8v8z" />
              <path fill="#7fba00" d="M11 21H3v-8h8v8z" />
              <path fill="#ffb900" d="M21 21h-8v-8h8v8z" />
            </svg>
            Sign in with Microsoft
          </button>
        </div>

        <div className="or relative text-center mb-6">
          <span className="bg-white dark:bg-gray-800 px-4 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600 -z-10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="field block relative">
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder=" "
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={handleInputChange}
            />
            <span className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-400">
              Email
            </span>
            {errors.email && (
              <small className="err block mt-1 text-red-500 text-sm">
                {errors.email}
              </small>
            )}
          </label>

          <label className="field block relative">
            <div className="pw relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                placeholder=" "
                className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="pw__toggle absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Show password"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            <span className="absolute -top-2 left-3 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-400">
              Password
            </span>
            {errors.password && (
              <small className="err block mt-1 text-red-500 text-sm">
                {errors.password}
              </small>
            )}
          </label>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            className="primary w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="muted small text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        <Link
          href="/"
          className="link small block text-center mt-2 text-sm text-blue-600 hover:underline"
        >
          Back to app
        </Link>
      </section>
    </main>
  );
}
