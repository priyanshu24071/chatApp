
import React, { useState } from 'react';

export default function JoinPage({ onJoin }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return setError('Please enter a username');
    if (typeof onJoin !== 'function') return setError('Internal error: onJoin missing');
    onJoin(trimmed);
  };

  return (
    <div className="grid place-items-center pt-20">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome 👋</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Enter a username to join the chat room.</p>
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              autoFocus
              placeholder="Your username"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-slate-400"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 text-white px-4 py-3 font-medium hover:bg-slate-800 active:scale-[.99] dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
            >
              Join the chat
            </button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
