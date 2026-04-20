import Link from "next/link"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-zinc-800 opacity-40 blur-[120px]" />
        <div className="absolute top-1/3 -right-60 h-[500px] w-[500px] rounded-full bg-zinc-700 opacity-30 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-zinc-600 opacity-20 blur-[80px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <span className="text-lg font-semibold tracking-tight text-white">
          Ryuga<span className="text-zinc-400"> Storage</span>
        </span>
        <Link
          href="/sign-in"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs text-zinc-400 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          Your files. Always within reach.
        </div>

        {/* Headline */}
        <h1
          className="mb-6 max-w-3xl text-5xl font-semibold leading-[1.1] tracking-tight text-white md:text-7xl"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Store everything.
          <br />
          <span className="text-zinc-500">Forget nothing.</span>
        </h1>

        {/* Subtext */}
        <p className="mb-12 max-w-md text-base leading-relaxed text-zinc-500">
          A clean, fast, and private file storage built for people who care
          about their data.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/sign-up"
            className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all hover:bg-zinc-100"
          >
            <span className="relative z-10">Get started — it&apos;s free</span>
          </Link>
          <Link
            href="/f"
            className="rounded-full border border-zinc-800 px-8 py-3.5 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
          >
            Browse your drive →
          </Link>
        </div>
      </div>

      {/* Bottom fade UI preview hint */}
      <div className="relative z-10 mx-auto mb-0 w-full max-w-4xl px-6">
        <div className="rounded-t-2xl border border-b-0 border-zinc-800 bg-zinc-900/60 px-6 pt-6 backdrop-blur-md">
          {/* Fake toolbar */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="ml-4 h-3 w-32 rounded-full bg-zinc-800" />
            <div className="ml-auto h-3 w-16 rounded-full bg-zinc-800" />
          </div>
          {/* Fake rows */}
          <div className="space-y-2">
            {[
              { w: "w-48", color: "bg-blue-500/20", label: "w-24" },
              { w: "w-36", color: "bg-zinc-700", label: "w-20" },
              { w: "w-44", color: "bg-zinc-700", label: "w-16" },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg px-3 py-2.5"
                style={{ background: i === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}
              >
                <div className={`h-4 w-4 rounded ${row.color}`} />
                <div className={`h-2.5 rounded-full bg-zinc-700 ${row.w}`} />
                <div className="ml-auto flex gap-6">
                  <div className={`h-2 rounded-full bg-zinc-800 ${row.label}`} />
                  <div className="h-2 w-10 rounded-full bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
          {/* Fade out */}
          <div className="pointer-events-none mt-2 h-16 w-full bg-gradient-to-b from-transparent to-black" />
        </div>
      </div>
    </main>
  )
}
