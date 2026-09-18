"use client";

import { useState } from "react";
import { site } from "@/lib/site";

// Submissions post to Web3Forms and are delivered to salmanumer.dev@gmail.com
const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "27cb64ef-4997-4380-b0a0-704217ca4676";

type Note = { type: "ok" | "err"; msg: string } | null;

export function ContactForm() {
  const [note, setNote] = useState<Note>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // spam bot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setNote({ type: "err", msg: "Please fill in your name, email, and message." });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNote({ type: "err", msg: "Please enter a valid email address." });
      return;
    }

    setSending(true);
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (r.ok) {
        form.reset();
        setNote({ type: "ok", msg: `Thanks, ${name}! Your message has been sent — I'll get back to you soon.` });
      } else {
        setNote({ type: "err", msg: `Something went wrong. Please email ${site.email} directly.` });
      }
    } catch {
      setNote({ type: "err", msg: `Network error. Please email ${site.email} directly.` });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New portfolio enquiry from your website" />
      <input type="hidden" name="from_name" value="Salman Umer Portfolio" />
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf_name">Your name</label>
          <input type="text" id="cf_name" name="name" placeholder="Jane Doe" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="cf_email">Email</label>
          <input type="email" id="cf_email" name="email" placeholder="jane@company.com" autoComplete="email" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf_company">
          Company / topic <span className="opt">(optional)</span>
        </label>
        <input type="text" id="cf_company" name="company" placeholder="Hiring React developers" />
      </div>
      <div className="field">
        <label htmlFor="cf_message">Message</label>
        <textarea id="cf_message" name="message" placeholder="Tell me what you're looking for…" required />
      </div>
      <input type="text" className="hpot" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn btn-gold submit" disabled={sending}>
        {sending ? "Sending…" : "Send message →"}
      </button>
      <div className={`form-note${note ? ` show ${note.type}` : ""}`} role="status" aria-live="polite">
        {note?.msg}
      </div>
    </form>
  );
}
