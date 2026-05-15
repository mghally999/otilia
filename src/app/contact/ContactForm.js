"use client";

import { useState } from "react";
import { brand } from "@/data/brand";
import styles from "./contact.module.css";

export default function ContactForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    project: "Residential",
    budget: "AED 250k – 500k",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorText, setErrorText] = useState("");

  const update = (k) => (e) => setState({ ...state, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, locale: "en" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Mail delivery failed");
      }
      setStatus("sent");
    } catch (err) {
      setErrorText(err?.message || "Mail delivery failed");
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Your name</span>
          <input
            type="text"
            required
            value={state.name}
            onChange={update("name")}
            className={styles.input}
            autoComplete="name"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            required
            value={state.email}
            onChange={update("email")}
            className={styles.input}
            autoComplete="email"
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Phone (optional)</span>
          <input
            type="tel"
            value={state.phone}
            onChange={update("phone")}
            className={styles.input}
            autoComplete="tel"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Project type</span>
          <select
            value={state.project}
            onChange={update("project")}
            className={styles.input}
          >
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
            <option>Bespoke Furniture</option>
            <option>Consultation Only</option>
          </select>
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Indicative budget</span>
          <select
            value={state.budget}
            onChange={update("budget")}
            className={styles.input}
          >
            <option>Under AED 250k</option>
            <option>AED 250k – 500k</option>
            <option>AED 500k – 1m</option>
            <option>AED 1m – 3m</option>
            <option>AED 3m+</option>
            <option>Prefer not to say</option>
          </select>
        </label>
        <div className={styles.field} aria-hidden="true" />
      </div>

      <label className={`${styles.field} ${styles.fieldFull}`}>
        <span className={styles.label}>Tell us about your project</span>
        <textarea
          rows={6}
          required
          value={state.message}
          onChange={update("message")}
          className={`${styles.input} ${styles.textarea}`}
        />
      </label>

      <div className={styles.submitRow}>
        <button
          type="submit"
          className="btn"
          disabled={status === "sending" || status === "sent"}
        >
          {status === "sending"
            ? "Sending…"
            : status === "sent"
            ? "Message Sent ✓"
            : "Send Enquiry"}
        </button>
        <p className={styles.submitNote}>
          We respond to every enquiry within two working days.
        </p>
      </div>

      {status === "sent" && (
        <p className={styles.sentNote} role="status">
          Thank you. Your enquiry has been received — we will respond personally within two working days.
        </p>
      )}

      {status === "error" && (
        <p className={styles.sentNote} role="alert">
          We could not deliver your message right now. Please write to{" "}
          <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
        </p>
      )}
    </form>
  );
}
