/**
 * Local English seed for Northvale Clinic.
 * Used when Prismic repo is unavailable (Prismic 仓库待建).
 * Image URLs point at local prismic-mirror; placeholders keep Image field shape.
 */

const rt = (type, text, spans = []) => [{ type, text, spans }];
const p = (text, spans = []) => rt("paragraph", text, spans);
const h2 = (text, spans = []) => rt("heading2", text, spans);
const h1 = (text, spans = []) => rt("heading1", text, spans);
const h3 = (text, spans = []) => rt("heading3", text, spans);

function img(role, alt, w = 1600, h = 1067) {
  return {
    url: `/prismic-mirror/northvale_${role}.jpg`,
    alt,
    dimensions: { width: w, height: h },
    prismicSrc: null, // Prismic Asset pending — local mirror only
  };
}

function link(url, text) {
  return {
    link_type: "Web",
    url,
    target: null,
    text,
  };
}

export const NAV = {
  brand_name: "Northvale Clinic",
  navs: [
    { button_text: "Services", button_link: link("#services", "Services") },
    { button_text: "Doctors", button_link: link("#team", "Doctors") },
    { button_text: "Visit", button_link: link("#process", "Visit") },
    { button_text: "FAQ", button_link: link("#faq", "FAQ") },
  ],
};

export const FOOTER = {
  company_name: "Northvale Clinic",
  copyright_text: "Demo site · fictional clinic · not affiliated with a real practice.",
  QuickLinks: [
    { button_text: "Book appointment", button_link: link("#appoint", "Book appointment") },
    { button_text: "Services", button_link: link("#services", "Services") },
    { button_text: "Location", button_link: link("#visit", "Location") },
    { button_text: "FAQ", button_link: link("#faq", "FAQ") },
  ],
};

export const HOME_SLICES = [
  {
    slice_type: "homepage_large_image",
    variation: "default",
    primary: {
      image: img("hero", "Clinician listening to a patient in a bright exam room", 2560, 1707),
      title: h1("Care you can plan around."),
      description: p(
        "Primary care and family medicine with clear scheduling, same-week openings when available, and a team that explains every next step.",
        [{ start: 0, end: 12, type: "strong" }]
      ),
      button_link: link("#appoint", "Book an appointment"),
    },
    items: [],
  },
  {
    slice_type: "info_panel_row",
    variation: "default",
    primary: {
      items: [
        {
          title: [
            ...h3("Primary care"),
            ...p(
              "Annual exams, chronic condition follow-ups, and day-to-day concerns with one consistent care team."
            ),
          ],
          button_link: link("#appoint", "Request visit"),
        },
        {
          title: [
            ...h3("Pediatrics"),
            ...p(
              "Well-child visits, school forms, and age-appropriate guidance for infants through teens."
            ),
          ],
          button_link: link("#appoint", "Request visit"),
        },
        {
          title: [
            ...h3("Women’s health"),
            ...p(
              "Routine screenings, contraception counseling, and coordinated referrals when specialty care is needed."
            ),
          ],
          button_link: link("#appoint", "Request visit"),
        },
        {
          title: [
            ...h3("Minor procedures"),
            ...p(
              "In-clinic wound care, simple dermatologic procedures, and joint injections when clinically appropriate."
            ),
          ],
          button_link: link("#appoint", "Request visit"),
        },
      ],
    },
    items: [],
  },
  {
    slice_type: "gridimagetext",
    variation: "default",
    primary: {
      gridgroup: [
        {
          image: img("doctor1", "Portrait of a physician in a white coat", 1600, 1067),
          richtext: [
            ...h3("Dr. Maya Chen, MD"),
            ...p("Family Medicine · Medical Director"),
            ...p(
              "Focuses on preventive plans and clear shared decision-making for adults and older teens."
            ),
          ],
          link: link("#appoint", "Book with Dr. Chen"),
        },
        {
          image: img("doctor2", "Portrait of a clinician in a white coat", 1600, 1200),
          richtext: [
            ...h3("Dr. Elena Brooks, DO"),
            ...p("Internal Medicine"),
            ...p(
              "Manages hypertension, diabetes, and complex medication reviews with measured follow-up."
            ),
          ],
          link: link("#appoint", "Book with Dr. Brooks"),
        },
        {
          image: img("doctor3", "Portrait of a physician wearing glasses", 1600, 2000),
          richtext: [
            ...h3("Dr. Samir Patel, MD"),
            ...p("Pediatrics"),
            ...p(
              "Supports growth checkups, vaccine schedules, and school/sports clearance paperwork."
            ),
          ],
          link: link("#appoint", "Book with Dr. Patel"),
        },
        {
          image: img("doctor4", "Physician reviewing notes on a tablet", 1600, 1067),
          richtext: [
            ...h3("Dr. Jordan Hale, MD"),
            ...p("Sports & musculoskeletal"),
            ...p(
              "Evaluates strains, overuse injuries, and return-to-activity plans for active patients."
            ),
          ],
          link: link("#appoint", "Book with Dr. Hale"),
        },
      ],
    },
    items: [],
  },
  {
    slice_type: "process_steps",
    variation: "default",
    primary: {
      eyebrow: "YOUR VISIT",
      title: h2("From booking to follow-up"),
      lead: "A predictable path so you know what happens before, during, and after your appointment.",
    },
    items: [
      {
        step_title: "Request a slot",
        step_body:
          "Share the reason for visit and preferred times. New patients complete a short intake online.",
      },
      {
        step_title: "Confirm & prepare",
        step_body:
          "We confirm insurance details, send prep notes, and remind you what to bring (ID, meds list).",
      },
      {
        step_title: "Seen on schedule",
        step_body:
          "Check in at reception. Clinicians aim to start within 15 minutes of your booked time.",
      },
      {
        step_title: "Clear next steps",
        step_body:
          "Leave with a written plan, referral status if any, and how to message the care team.",
      },
    ],
  },
  {
    slice_type: "reviews",
    variation: "default",
    primary: {
      title: h2("What patients notice"),
    },
    items: [
      {
        text: p(
          "They explained my options without rushing. I left knowing exactly when to follow up and why."
        ),
        author: "A. Rivera · primary care patient (demo quote)",
      },
      {
        text: p(
          "Front desk confirmed my insurance before the visit. No surprise paperwork at the window."
        ),
        author: "M. Okonkwo · new patient (demo quote)",
      },
      {
        text: p(
          "The pediatric visit felt calm. Forms for school were ready before we left the building."
        ),
        author: "L. Nguyen · parent (demo quote)",
      },
    ],
  },
  {
    slice_type: "faq",
    variation: "default",
    primary: {
      title: h2("Insurance & common questions"),
    },
    items: [
      {
        heading: h3("Which insurance plans do you accept?"),
        text: p(
          "We currently accept major PPO and HMO networks listed on our intake form, plus self-pay. Coverage varies by plan — please verify benefits before your visit. This site cannot confirm eligibility."
        ),
      },
      {
        heading: h3("How soon can I be seen?"),
        text: p(
          "Many routine visits open within the same week. Urgent concerns are triaged by phone; if we cannot safely care for you here, we will direct you to appropriate urgent or emergency care."
        ),
      },
      {
        heading: h3("Do you offer telehealth?"),
        text: p(
          "Yes for follow-ups and certain medication reviews when clinically appropriate. Some exams still require an in-person visit."
        ),
      },
      {
        heading: h3("What should I bring?"),
        text: p(
          "Photo ID, insurance card, a current medication list, and any recent records from other clinics or hospitals."
        ),
      },
      {
        heading: h3("Is this medical advice?"),
        text: p(
          "No. This website is a demonstration clinic template. Nothing here is a diagnosis, treatment recommendation, or substitute for care from a licensed clinician."
        ),
      },
    ],
  },
  {
    slice_type: "appointment_form",
    variation: "default",
    primary: {
      eyebrow: "APPOINTMENTS",
      title: h2("Request an appointment"),
      lead: "Tell us who you need to see and when. We reply during business hours — this form does not create a confirmed booking.",
      submit_label: "Send request",
      helper:
        "Demo only · opens your email client. Not monitored medical triage. For emergencies call your local emergency number.",
      mailto: "appointments@northvale.example",
    },
    items: [],
  },
  {
    slice_type: "text_image",
    variation: "default",
    primary: {
      image: img("visit", "Bright clinic waiting area with soft daylight", 1600, 1067),
      title: h2("Location & hours"),
      text: [
        ...p("120 Harbor Light Ave, Suite 200"),
        ...p("Northvale Bay, CA 94105 (fictional address)"),
        ...p("Mon–Fri 8:00–18:00 · Sat 9:00–13:00 · Sun closed"),
        ...p("Parking validated in the Harbor Light garage · Elevator access · Wheelchair-friendly exam rooms."),
      ],
      button_link: link("#appoint", "Book an appointment"),
    },
    items: [],
  },
];
