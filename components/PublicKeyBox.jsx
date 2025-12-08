"use client";

import { useState } from "react";

export default function PublicKeyBox({ title, keyContent, fingerprint }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(keyContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
      <div className="w-full border-2 border-white/30 rounded-lg p-2 md:p-6 bg-white/70">
      {/* Screen reader announcement for copy status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? `${title} copied to clipboard` : ""}
      </div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-signika font-medium text-black mb-1">
            {title}
          </h3>
          {fingerprint && (
            <p className="text-sm font-mono text-black/70">
              {fingerprint}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded transition-all duration-200 font-signika font-light ${
            copied
              ? "bg-green-500 text-white"
              : "bg-black/10 hover:bg-black/20 text-black"
          }`}
          aria-label={copied ? `${title} copied to clipboard` : `Copy ${title} to clipboard`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="bg-black/5 rounded p-2 md:p-4 overflow-x-auto">
        <pre className="text-xs font-mono text-black whitespace-pre-wrap break-all">
          {keyContent}
        </pre>
      </div>
    </div>
  );
}
