import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Authcontext } from "../../authcontext/Authcontext";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const Login = () => {
  const { userlogin, googlelogin, setUser } = use(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/issues";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await userlogin(email, password);
      setUser(result.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await googlelogin();
      setUser(result.user);
      navigate(from, { replace: true });
    } catch {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-primary">Welcome Back</h1>
          <p className="text-sm text-muted mt-1">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="input input-bordered w-full focus:border-primary"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="••••••••"
              className="input input-bordered w-full pr-10 focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-muted"
            >
              {showPassword ? <BiSolidShow /> : <BiSolidHide />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-primary text-white hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-xs text-muted">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn w-full bg-white border border-border text-sm flex items-center justify-center gap-2 hover:bg-muted/40"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-muted">
          Don’t have an account?
          <Link to="/register" className="ml-1 text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
