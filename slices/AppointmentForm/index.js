"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";

const VISIT_TYPES = [
  { value: "primary", label: "Primary care / checkup" },
  { value: "followup", label: "Follow-up visit" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "womens", label: "Women’s health" },
  { value: "procedure", label: "Minor procedure" },
  { value: "other", label: "Other" },
];

export default function AppointmentForm({ slice }) {
  const p = slice.primary || {};
  const eyebrow = p.eyebrow || "APPOINTMENTS";
  const lead = p.lead || "";
  const submitLabel = p.submit_label || "Send request";
  const helper = p.helper || "";
  const mailto = p.mailto || "appointments@northvale.example";
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const visit = String(fd.get("visit_type") || "").trim();
    const preferred = String(fd.get("preferred") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = encodeURIComponent(
      `[Appointment] ${visit || "Request"} — ${name || "Patient"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nVisit type: ${visit}\nPreferred times: ${preferred}\n\n${message}\n\n— Sent from Northvale Clinic demo site (not a confirmed booking)`
    );
    setSent(true);
    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="appoint"
      className="clinic-section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="clinic-wrap clinic-consult">
        <div>
          <p className="clinic-eyebrow">{eyebrow}</p>
          {p.title ? (
            <div className="clinic-display">
              <PrismicRichText field={p.title} />
            </div>
          ) : (
            <h2 className="clinic-display">Request an appointment</h2>
          )}
          {lead ? <p className="clinic-lead mt-2">{lead}</p> : null}
        </div>

        <form className="clinic-form" onSubmit={onSubmit} noValidate>
          <div className="clinic-form__row">
            <div>
              <label htmlFor="appt-name">Full name</label>
              <input
                id="appt-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="appt-email">Email</label>
              <input
                id="appt-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="clinic-form__row">
            <div>
              <label htmlFor="appt-phone">Phone</label>
              <input
                id="appt-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="appt-visit">Visit type</label>
              <select
                id="appt-visit"
                name="visit_type"
                defaultValue="primary"
                required
              >
                {VISIT_TYPES.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="appt-preferred">Preferred days / times</label>
            <input
              id="appt-preferred"
              name="preferred"
              type="text"
              placeholder="e.g. Tue–Thu mornings"
            />
          </div>
          <div>
            <label htmlFor="appt-message">Reason for visit</label>
            <textarea
              id="appt-message"
              name="message"
              placeholder="Brief reason, new or returning patient, and any constraints we should know."
              required
            />
          </div>
          <button
            type="submit"
            className="clinic-btn clinic-btn--primary w-full sm:w-auto"
          >
            {sent ? "Opening mail…" : submitLabel}
          </button>
          {helper ? <p className="clinic-form__helper">{helper}</p> : null}
        </form>
      </div>
    </section>
  );
}
