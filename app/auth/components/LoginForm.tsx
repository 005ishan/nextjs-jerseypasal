export default function LoginForm() {
  return (
    <form className="space-y-5">
      <label htmlFor="email" className="text-[#161499] font-semibold">
        Email
      </label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
        placeholder="yourmail@example.com"
      />
      <label htmlFor="password" className="text-[#161499] font-semibold">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="password"
        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
        placeholder="••••••••••"
      />
      <label htmlFor="password" className="text-[#161499] text-sm">
        Forget Password?
      </label>
      <button className="h-10 w-full rounded-md bg-[#F25019] text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60 mt-2">
        Login
      </button>
      <div className="text-center">
        <label htmlFor="" className="text-[#161499] text-sm">
          or continue with
        </label>
      </div>
        <div className="flex justify-center items-center gap-35">
      <div className="bg-white w-25 h-10 rounded-4xl border"></div>
      <div className="bg-white w-25 h-10 rounded-4xl border"></div>
      </div>
      <label htmlFor="" className="text-[#161499] text-sm block text-center mt-2">
          Don't have an account yet? Register for free
        </label>
    </form>
  );
}
