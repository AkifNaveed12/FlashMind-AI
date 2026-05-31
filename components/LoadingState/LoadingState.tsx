export function LoadingState() {
  const items = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full">
      {items.map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between h-[220px] animate-pulse"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <div className="h-6 w-24 bg-slate-200 rounded-lg"></div>
                <div className="h-6 w-12 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-7 h-7 bg-slate-200 rounded-lg"></div>
                <div className="w-7 h-7 bg-slate-200 rounded-lg"></div>
              </div>
            </div>
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded-lg w-full"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-5/6"></div>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <div className="flex-1 h-10 bg-slate-200 rounded-lg"></div>
            <div className="flex-1 h-10 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
