"use client";
import { useState } from "react";

/**
 * Phone input with a separate, manually-typable country-code box (not a
 * selector). Both fields reject non-numeric characters as you type, are
 * required, and are combined into a hidden `phone` input so the lead arrives
 * as one value, e.g. "+971 50 123 4567".
 */

/** Keep a leading "+" and digits only (country code). */
function cleanCc(v: string): string {
  return v.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "").slice(0, 5);
}
/** Digits plus common phone separators only — no letters. */
function cleanNum(v: string): string {
  return v.replace(/[^\d\s()\-]/g, "").slice(0, 20);
}

export default function PhoneField({ required = true }: { required?: boolean }) {
  const [cc, setCc] = useState("");
  const [num, setNum] = useState("");
  const combined = `${cc.trim()} ${num.trim()}`.trim();

  return (
    <div>
      {/* Group heading, not a <label> — the two inputs below carry their own
          aria-labels, so a <label> here would be an orphan with no control. */}
      <span className="form-label" style={{ display: "block" }}>Phone number</span>
      <div className="flex gap-2">
        <input
          className="form-input"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          aria-label="Country code"
          value={cc}
          onChange={(e) => setCc(cleanCc(e.target.value))}
          placeholder="+xx"
          required={required}
          pattern="\+?[0-9]{1,4}"
          title="Country code, e.g. +971"
          style={{ width: 84, flexShrink: 0, textAlign: "center" }}
        />
        <input
          className="form-input"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          aria-label="Phone number"
          value={num}
          onChange={(e) => setNum(cleanNum(e.target.value))}
          required={required}
          pattern="[0-9 ()\-]{6,20}"
          title="Enter a valid phone number (digits only)"
          style={{ flex: 1 }}
        />
      </div>
      <input type="hidden" name="phone" value={combined} />
    </div>
  );
}
