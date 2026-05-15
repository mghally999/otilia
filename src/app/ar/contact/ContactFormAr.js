"use client";

import { useState } from "react";
import { brand, ui } from "@/data/brand.ar";
import styles from "../../contact/contact.module.css";

export default function ContactFormAr() {
  const f = ui.labels.contact.form;
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    project: f.projectTypes[0],
    budget: f.budgets[1],
    message: "",
  });
  const [status, setStatus] = useState("idle");
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
        body: JSON.stringify({ ...state, locale: "ar" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Mail delivery failed");
      }
      setStatus("sent");
    } catch (err) {
      setErrorText(err?.message || "تعذّر الإرسال");
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate dir="rtl">
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{f.name}</span>
          <input type="text" required value={state.name} onChange={update("name")}
            className={styles.input} autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{f.email}</span>
          <input type="email" required value={state.email} onChange={update("email")}
            className={styles.input} autoComplete="email" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{f.phone}</span>
          <input type="tel" value={state.phone} onChange={update("phone")}
            className={styles.input} autoComplete="tel" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{f.projectType}</span>
          <select value={state.project} onChange={update("project")} className={styles.input}>
            {f.projectTypes.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{f.budget}</span>
          <select value={state.budget} onChange={update("budget")} className={styles.input}>
            {f.budgets.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        </label>
        <div className={styles.field} aria-hidden="true" />
      </div>

      <label className={`${styles.field} ${styles.fieldFull}`}>
        <span className={styles.label}>{f.message}</span>
        <textarea rows={6} required value={state.message} onChange={update("message")}
          className={`${styles.input} ${styles.textarea}`} />
      </label>

      <div className={styles.submitRow}>
        <button
          type="submit"
          className="btn"
          data-cursor="hover"
          disabled={status === "sending" || status === "sent"}
        >
          {status === "sending"
            ? f.submitting
            : status === "sent"
            ? "تم الإرسال ✓"
            : ui.buttons.sendEnquiry}
        </button>
        <p className={styles.submitNote}>{f.submitNote}</p>
      </div>

      {status === "sent" && (
        <p className={styles.sentNote} role="status">
          {f.sentOk}
        </p>
      )}

      {status === "error" && (
        <p className={styles.sentNote} role="alert">
          {f.sentError}{" "}
          <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
        </p>
      )}
    </form>
  );
}
