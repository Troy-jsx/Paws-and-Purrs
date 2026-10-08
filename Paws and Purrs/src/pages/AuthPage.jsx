import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/navLogo.png";

export default function AuthPage({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const isLogin = mode === "login";

  function handleSubmit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (isLogin) onLogin?.(values);
    else onRegister?.(values);
    navigate("/dashboard");
  }

  return (
    <div className="bg-gradient flex min-h-screen flex-col lg:flex-row">
      <section className="flex flex-col items-center justify-center gap-6 bg-magenta-400 px-6 py-12 text-center drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] lg:w-[45%] lg:gap-10 lg:px-16">
        <img src={logo} className="w-[220px] lg:w-[340px]" />
        <p className="max-w-[420px] font-josefin text-[20px] font-semibold leading-[1.2] text-magenta-100 lg:text-[24px]">
          Manage donations, update animal profiles and help every pet find a forever home.
        </p>
      </section>

      <main className="flex flex-1 items-center justify-center px-4 py-12 md:px-8">
        <div className="w-full max-w-[480px] rounded-lg bg-magenta-500 p-6 drop-shadow-[0_0_7.5px_rgba(0,0,0,0.75)] md:p-10">
          <div className="mb-8 grid grid-cols-2 gap-2 rounded-lg bg-magenta-100/10 p-1">
            <TabButton active={isLogin} onClick={() => setMode("login")}>
              Log In
            </TabButton>
            <TabButton active={!isLogin} onClick={() => setMode("register")}>
              Register
            </TabButton>
          </div>

          <h1 className="mb-2 font-display text-[36px] leading-[1.2] text-magenta-100 md:text-[43px]">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="mb-8 font-josefin text-[18px] font-semibold text-magenta-100/80">
            {isLogin ? "Provide your email and password to Login." : "Provide your full email and password to create your account and get started."}
          </p>

          <form key={mode} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && <TextField label="Full name" name="name" autoComplete="name" required />}
            <TextField label="Email" name="email" type="email" autoComplete="email" required />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={isLogin ? undefined : 8}
              required
            />

            <button
              type="submit"
              className="mt-2 h-14 rounded-lg bg-pink-base font-josefin text-[22px] font-semibold text-magenta-500 transition-colors hover:bg-magenta-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-100"
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center font-josefin text-[16px] font-semibold text-magenta-100/80">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(isLogin ? "register" : "login")}
              className="text-pink-base hover:text-magenta-100"
            >
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, children, ...props }) {
  return (
    <button
      type="button"
      className={`h-11 rounded-md font-josefin text-[18px] font-semibold transition-colors ${
        active ? "bg-pink-base text-magenta-500" : "text-magenta-100 hover:bg-magenta-100/10"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

function TextField({ label, name, type = "text", ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-josefin text-[16px] font-semibold text-magenta-100">{label}</span>
      <input
        name={name}
        type={type}
        title=""
        className="h-12 rounded-lg border border-magenta-100/30 bg-magenta-100/10 px-4 font-josefin text-[18px] text-white outline-none transition-colors placeholder:text-magenta-100/50 focus:border-pink-base focus:bg-magenta-100/15"
        {...props}
      />
    </label>
  );
}