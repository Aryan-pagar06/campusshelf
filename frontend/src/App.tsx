import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          CampusShelf
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Phase 1: Environment & Project Scaffolding Ready
        </p>

        <div className="bg-slate-100 rounded-lg p-4 mb-6 text-xs text-left font-mono space-y-1 text-slate-700">
          <div>Frontend: React + Vite + TypeScript</div>
          <div>Styling: Tailwind CSS v4 + shadcn/ui base</div>
          <div>Backend API Target: /api/health</div>
        </div>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm cursor-pointer"
        >
          Interactive Test: Clicked {count} times
        </button>
      </div>
    </div>
  );
}

export default App;
