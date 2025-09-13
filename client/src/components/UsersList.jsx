// client/src/components/UsersList.jsx
import React from 'react';

export default function UsersList({ users }) {
  return (
    <aside className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow p-4 h-fit">
      <div className="font-semibold mb-2">Online Users ({users.length})</div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {users.length ? (
          users.map((u, i) => (
            <li key={i} className="py-2 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {u}
            </li>
          ))
        ) : (
          <li className="py-2 text-sm text-slate-500">No one here yet.</li>
        )}
      </ul>
    </aside>
  );
}
