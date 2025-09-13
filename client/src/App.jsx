// client/src/App.jsx
import React, { useEffect, useState } from 'react';
import JoinPage from './pages/JoinPage';
import ChatPage from './pages/ChatPage';

function ThemeToggle() {
  // const [dark, setDark] = useState(() => {
  //   const saved = localStorage.getItem('theme.dark');
  //   if (saved != null) return saved === '1';
  //   return window.matchMedia?.matches ?? false;
  // });

//   useEffect(() => {
//     const root = document.documentElement; // <html>
//     if (dark) root.classList.add('dark'); else root.classList.remove('dark');
//     localStorage.setItem('theme.dark', dark ? '1' : '0');
//   }, [dark]);

//   return (
//     <button
//       onClick={() => setDark(d => !d)}
//       className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
//       title="Toggle theme"
//     >
//       {dark ? '🌙 Dark' : '☀️ Light'}
//     </button>
//   );
// }
}
export default function App() {
  const [userName, setUserName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold tracking-tight">Socket.IO Chat</h1>
          <ThemeToggle />
        </div>

      

        {userName ? (
          <ChatPage userName={userName} onChangeUser={() => setUserName('')} />
        ) : (
          <JoinPage onJoin={setUserName} />
        )}
      </div>
    </div>
  );
}
