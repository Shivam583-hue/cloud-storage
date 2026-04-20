import { SignInButton } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-zinc-800 opacity-40 blur-[120px]" />
        <div className="absolute -bottom-20 -right-40 h-[400px] w-[400px] rounded-full bg-zinc-700 opacity-30 blur-[100px]" />
      </div>

      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-xl font-semibold tracking-tight text-white">
            Ryuga<span className="text-zinc-500"> Storage</span>
          </span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-md">
          <h1
            className="mb-2 text-2xl font-semibold text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Welcome back
          </h1>
          <p className="mb-8 text-sm text-zinc-500">
            Sign in to access your files and folders.
          </p>

          <SignInButton forceRedirectUrl="/drive" mode="modal">
            <button className="w-full rounded-full bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-100">
              Continue with Clerk
            </button>
          </SignInButton>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-xs text-zinc-600">or</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-zinc-400 underline-offset-2 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        <footer className="mt-8 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} Ryuga Storage. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
