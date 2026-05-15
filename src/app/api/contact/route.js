// Server-side mailer for the OTILÌA contact form.
// All SMTP credentials are read from environment variables — never hardcoded.
// See .env.example for the required keys; set the real values in .env.local
// locally and in your deployment platform's environment for production.

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STUDIO_USER = process.env.SMTP_USER || "";
const STUDIO_PASS = process.env.SMTP_PASS || "";
const SMTP_HOST   = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT   = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_SECURE = (process.env.SMTP_SECURE ?? "true") === "true";
const TO_ADDRESS  = process.env.STUDIO_INBOX || STUDIO_USER;

function escape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name = "",
    email = "",
    phone = "",
    project = "",
    budget = "",
    message = "",
    locale = "en",
  } = body || {};

  // Minimal validation — trust the client form, harden against empties only.
  if (!String(name).trim() || !String(email).trim() || !String(message).trim()) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  const subject = `New OTILÌA enquiry — ${name} (${project || "General"})`;

  const text =
    `New enquiry from the OTILÌA website\n\n` +
    `Name:        ${name}\n` +
    `Email:       ${email}\n` +
    `Phone:       ${phone || "—"}\n` +
    `Project:     ${project || "—"}\n` +
    `Budget:      ${budget || "—"}\n` +
    `Locale:      ${locale}\n\n` +
    `Message:\n${message}\n`;

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color:#1c140e; max-width:560px; margin:auto;">
      <h2 style="font-family: Georgia, serif; font-weight: 400; color:#5B4636;">OTILÌA — New Enquiry</h2>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding:6px 0; color:#7d6249;">Name</td><td style="padding:6px 0;"><strong>${escape(name)}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#7d6249;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(email)}" style="color:#9C7C38;">${escape(email)}</a></td></tr>
        <tr><td style="padding:6px 0; color:#7d6249;">Phone</td><td style="padding:6px 0;">${escape(phone) || "—"}</td></tr>
        <tr><td style="padding:6px 0; color:#7d6249;">Project</td><td style="padding:6px 0;">${escape(project) || "—"}</td></tr>
        <tr><td style="padding:6px 0; color:#7d6249;">Budget</td><td style="padding:6px 0;">${escape(budget) || "—"}</td></tr>
        <tr><td style="padding:6px 0; color:#7d6249;">Locale</td><td style="padding:6px 0;">${escape(locale)}</td></tr>
      </table>
      <hr style="border:0; border-top: 1px solid #cdb89c; margin: 24px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.6;">${escape(message)}</p>
      <hr style="border:0; border-top: 1px solid #cdb89c; margin: 24px 0;" />
      <p style="color:#7d6249; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
        OTILÌA Interior Design · Abu Dhabi
      </p>
    </div>
  `;

  if (!STUDIO_USER || !STUDIO_PASS) {
    console.error("Contact API: SMTP_USER / SMTP_PASS env vars are not set.");
    return NextResponse.json(
      { ok: false, error: "Mailer is not configured" },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: STUDIO_USER, pass: STUDIO_PASS },
    });

    await transporter.sendMail({
      from: `"OTILÌA Website" <${STUDIO_USER}>`,
      to: TO_ADDRESS,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "Mail delivery failed" },
      { status: 502 }
    );
  }
}
