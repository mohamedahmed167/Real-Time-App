
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  MessageCircle,
  Zap,
  Users,
  ShieldCheck,
} from "lucide-react";

import useLogin from "../hooks/useLogin";

function Login() {
  const {
    formData,
    showPassword,
    loading,
    error,
    handleChange,
    togglePassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl min-h-[680px] overflow-hidden rounded-3xl bg-white shadow-2xl flex">

        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-12 flex-col justify-between relative overflow-hidden">

          {/* Background circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/30" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-blue-800/30" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                <MessageCircle size={28} />
              </div>

              <span className="text-3xl font-bold">
                ChatApp
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Welcome Back.
            </h2>

            <p className="text-blue-100 text-lg leading-8 max-w-md">
              Sign in to continue your conversations and stay connected
              with your friends, team, and community.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <Zap size={20} />
                </div>

                <span className="text-blue-50">
                  Real-time messaging
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <Users size={20} />
                </div>

                <span className="text-blue-50">
                  Create and join rooms
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <Users size={20} />
                </div>

                <span className="text-blue-50">
                  See who's online
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>

                <span className="text-blue-50">
                  Secure and private
                </span>
              </div>

            </div>
          </div>

          {/* Bottom decoration */}
          <div className="relative z-10 mt-10">
            <div className="w-64 h-36 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm p-5">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-white/20" />

                <div>
                  <div className="w-24 h-2 bg-white/30 rounded" />
                  <div className="w-16 h-2 bg-white/20 rounded mt-2" />
                </div>
              </div>

              <div className="w-full h-8 bg-white/20 rounded-lg" />

            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex items-center">
          <div className="w-full max-w-lg mx-auto">

            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Welcome Back
              </h1>

              <p className="mt-3 text-slate-500">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-200 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-slate-200 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-blue-600 text-white font-semibold text-lg transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Login"}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="flex-1 h-px bg-slate-200" />

              <span className="text-sm text-slate-400">
                or
              </span>

              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Register */}
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}

              <button className="font-semibold text-blue-600 hover:text-blue-700">
                Register
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
