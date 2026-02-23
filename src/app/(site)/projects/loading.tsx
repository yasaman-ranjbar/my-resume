export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 h-10 w-48 animate-pulse rounded bg-white/10 mx-auto" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <div className="aspect-video animate-pulse bg-white/10" />
            <div className="flex flex-col gap-3 p-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded bg-white/10" />
                <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
