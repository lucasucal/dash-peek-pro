import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project detailsss
const supabaseUrl = "https://vascgynbztwepxpenkiq.supabase.co/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhc2NneW5ienR3ZXB4cGVua2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Njg3OTMsImV4cCI6MjA3NjA0NDc5M30.263x7iXLIi0unSsM0rPaJX4OYe8H6mVf-U3Hj9bGD0k";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Tracking script loaded");

// Constants
const SESSION_FLAG = "onflow_session_created";
const SESSION_ID_KEY = "onflow_session_id";

// Create or reuse a session
async function createSession() {
  if (!localStorage.getItem(SESSION_FLAG)) {
    const sessionId = crypto.randomUUID();
    const { error } = await supabase.from("sessions").insert([
      {
        session_id: sessionId,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Session creation error:", error);
      return;
    }

    localStorage.setItem(SESSION_FLAG, "true");
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
}

// Track clicks per step (URL)
let clickCount = 0;
let currentStep = window.location.pathname;

// Count clicks on the current page
document.addEventListener("click", () => {
  clickCount++;
});

// Function to send click data via Supabase (normal async)
async function sendClickData(step, count) {
  if (count === 0) return;
  const { error } = await supabase.from("clicks").insert([
    {
      session_id: localStorage.getItem(SESSION_ID_KEY),
      step,
      count,
      timestamp: new Date().toISOString(),
    },
  ]);
  if (error) console.error("Error saving click data:", error);
  else console.log(`✅ Sent ${count} clicks for step: ${step}`);
}

// Fallback send using navigator.sendBeacon (for page close)
function sendClickDataBeacon(step, count) {
  if (count === 0) return;
  const url = `${supabaseUrl}/rest/v1/clicks`;
  const payload = JSON.stringify([
    {
      session_id: localStorage.getItem(SESSION_ID_KEY),
      step,
      count,
      timestamp: new Date().toISOString(),
    },
  ]);
  const headers = {
    "Content-Type": "application/json",
    apikey: supabaseAnonKey,
    Prefer: "return=minimal",
  };
  const blob = new Blob([payload], { type: "application/json" });
  navigator.sendBeacon(
    url + "?" + new URLSearchParams(headers).toString(),
    blob
  );
}

// Detect URL changes (SPA-safe)
let lastUrl = window.location.href;
const observer = new MutationObserver(() => {
  const url = window.location.href;
  if (url !== lastUrl) {
    // URL changed → push data for the previous step
    sendClickData(currentStep, clickCount);
    clickCount = 0;
    currentStep = window.location.pathname;
    lastUrl = url;
  }
});
observer.observe(document, { subtree: true, childList: true });

// Flush periodically (safety)
setInterval(() => {
  if (clickCount > 0) {
    sendClickData(currentStep, clickCount);
    clickCount = 0;
  }
}, 5000);

// Final flush when user leaves (reliable)
window.addEventListener("pagehide", () => {
  sendClickDataBeacon(currentStep, clickCount);
});

createSession();
