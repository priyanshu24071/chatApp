// client/src/components/MessageList.jsx
import React, { useEffect, useMemo, useRef } from 'react';

function fmtTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function fmtDay(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}
function useGroupedByDay(messages) {
  return useMemo(() => {
    const groups = [];
    let cur = null, bucket = [];
    for (const m of messages) {
      const day = fmtDay(m.timestamp);
      if (day !== cur) {
        if (bucket.length) groups.push({ day: cur, items: bucket });
        cur = day; bucket = [m];
      } else bucket.push(m);
    }
    if (bucket.length) groups.push({ day: cur, items: bucket });
    return groups;
  }, [messages]);
}
function Avatar({ name }) {
  const initials = (name || '?').split(' ').map(p => p[0]?.toUpperCase()).slice(0,2).join('');
  return (
    <div className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 text-xs font-semibold">
      {initials || '?'}
    </div>
  );
}

export default function MessageList({ messages, currentUser }) {
  const listRef = useRef(null);
  const groups = useGroupedByDay(messages);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={listRef} className="h-[58vh] md:h-[60vh] overflow-y-auto pr-2 scroll-thin">
      {groups.length === 0 && (
        <div className="text-slate-500 text-center mt-10">No messages yet. Say hi! 👋</div>
      )}

      <div className="space-y-6">
        {groups.map((g, gi) => (
          <div key={gi} className="space-y-3">
            <div className="sticky top-0 z-[1] flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <div className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {g.day}
              </div>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <ul className="space-y-2">
              {g.items.map((m, i) => {
                const mine = m.userName === currentUser;
                return (
                  <li key={i} className={`flex items-start gap-3 ${mine ? 'flex-row-reverse' : ''}`}>
                    <Avatar name={m.userName} />
                    <div className="max-w-[80%] sm:max-w-[70%]">
                      <div className={`text-xs mb-1 ${mine ? 'text-right' : 'text-left'} text-slate-500`}>
                        <span className="font-medium">{m.userName}</span>
                        <span className="mx-1">•</span>
                        <span>{fmtTime(m.timestamp)}</span>
                      </div>
                      <div className={`px-4 py-2 rounded-2xl shadow-sm break-words ${
                        mine
                          ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 rounded-br-md'
                          : 'bg-slate-100 dark:bg-slate-800 dark:text-slate-100 rounded-bl-md'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
