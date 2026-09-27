import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "preview");
const base = process.env.SHOT_BASE || "http://127.0.0.1:5340";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ args: ["--disable-dev-shm-usage"] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto(base + "/", { waitUntil: "load", timeout: 60000 });
await page.waitForSelector("#services .clinic-card", { timeout: 30000 });
await page.waitForTimeout(1200);
console.log(
  await page.evaluate(() => ({
    brand: document.querySelector(".clinic-nav__brand")?.textContent?.trim(),
    cards: document.querySelectorAll("#services .clinic-card").length,
    doctors: document.querySelectorAll("#team article").length,
    steps: [...document.querySelectorAll("#process .clinic-step__title")].map((e) =>
      e.textContent.trim()
    ),
    faq: document.querySelectorAll("#faq .clinic-faq__item").length,
    h: document.documentElement.scrollHeight,
  }))
);
await page.screenshot({ path: path.join(out, "clinic_desktop_en.png"), fullPage: true });
await page.locator("section.clinic-hero").first().screenshot({ path: path.join(out, "clinic_hero_en.png") });
await page.locator("#services").first().screenshot({ path: path.join(out, "clinic_services_en.png") });
await page.locator("#team").first().screenshot({ path: path.join(out, "clinic_team_en.png") });
await page.locator("#process").first().screenshot({ path: path.join(out, "clinic_process_en.png") });
await page.locator("#appoint").first().screenshot({ path: path.join(out, "clinic_appoint_en.png") });
await page.locator("#faq").first().screenshot({ path: path.join(out, "clinic_faq_en.png") });
await context.close();

const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const mp = await mctx.newPage();
await mp.goto(base + "/", { waitUntil: "load", timeout: 60000 });
await mp.waitForSelector("#services .clinic-card", { timeout: 30000 });
await mp.waitForTimeout(900);
await mp.screenshot({ path: path.join(out, "clinic_mobile_en.png"), fullPage: true });
await browser.close();

for (const f of fs
  .readdirSync(out)
  .filter((n) => n.startsWith("clinic_") && n.endsWith(".png"))
  .sort()) {
  console.log(f, fs.statSync(path.join(out, f)).size);
}
