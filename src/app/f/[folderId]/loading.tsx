export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-lg border border-border divide-y divide-border">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3">
              <div className="col-span-6 h-4 bg-muted rounded animate-pulse" />
              <div className="col-span-2 h-4 bg-muted rounded animate-pulse" />
              <div className="col-span-2 h-4 bg-muted rounded animate-pulse" />
              <div className="col-span-2 h-4 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
