// client/src/components/MessageInput.jsx
import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText('');
  };

  const keyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      submit(e);
    }
  };

  const disabled = !text.trim();

  return (
    <form onSubmit={submit} className="mt-3 flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={keyDown}
        placeholder="Type a message… (Shift+Enter for newline)"
        rows={1}
        className="flex-1 resize-none rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-400"
      />
      <button
        type="submit"
        disabled={disabled}
        className={`rounded-xl px-5 py-3 font-medium active:scale-[.99]
          ${disabled
            ? 'bg-slate-300 text-slate-600 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400'
            : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white'
          }`}
      >
        Send
      </button>
    </form>
  );
}
