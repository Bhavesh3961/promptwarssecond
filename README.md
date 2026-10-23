# Emergency Mitra (इमरजेंसी मित्र) — Life-Saving Action Bridge
> **PromptWars 2026 Edition — Societal Benefit Track**  
> *A high-reliability AI protocol converting messy real-world human intent into verified life-saving dispatch manifests.*

[![Test Suite](https://img.shields.io/badge/Tests-5%2F5%20Passing-emerald)](https://github.com)
[![Tokens](https://img.shields.io/badge/Token%20Ceiling-120%20Max-blue)](https://github.com)
[![Languages](https://img.shields.io/badge/Localization-8%20Indian%20Languages-amber)](https://github.com)
[![Accessibility](https://img.shields.io/badge/Accessibility-5yo%20%26%20Senior%20Friendly-purple)](https://github.com)

---

## 1. Real-World Grounding & Problem Research

Most hackathon submissions build generic conversational chatbots that hallucinate, burn tokens, and fail in high-stress emergencies. **Emergency Mitra** was architected from empirical ground research on India's emergency infrastructure:

### A. The 99.7% ERSS-112 Noise & Prank Call Crisis
* **Government Audit Data (Telangana & National ERSS-112)**: India's unified 112 emergency helpline handles **1.4 to 1.6 million calls daily**.
* **The Bottle-neck**: Only **0.04% to 0.28%** (roughly 500–600 calls) are actual life-threatening emergencies. The remaining **99.7%** consist of accidental smartphone pocket dials (power-button clicks), civic inquiries (electricity/water bills), and prank calls.
* **Emergency Mitra Solution**: An **Automated ERSS-112 Noise Gate & Triage Verifier**. Non-emergencies are safely filtered with 0 emergency resource commitments, preserving critical ambulance response bandwidth.

### B. The 5-Year-Old Child & Senior Citizen Usability Gap
* In acute crises (e.g., an elderly grandparent suffering a heart attack or a 5-year-old whose parent fell unconscious), victims cannot navigate complex dropdowns, read English medical terminology, or type detailed addresses.
* Seniors suffer from physiological aging hurdles: presbyopia, cataract contrast loss, and hand tremors.
* **Emergency Mitra Solution**: **सरल मोड (Easy Mode)** featuring:
  1. **Giant 1-Tap Emergency Tiles**: Big, tactile, high-contrast tiles (🚑 Ambulance, 🚒 Fire, 👮 Police, 🌊 Flood Rescue).
  2. **Zero-Typing Multilingual Voice SOS**: Big pulsing microphone button supporting 8 Indian languages with native audio speech synthesis confirmation.
  3. **Direct 1-Tap National Dials**: Instant phone access to `112` (National SOS), `108` (Ambulance), and `101` (Fire Brigade).
  4. **Font-Size Accessibility Scaler**: Instant `A` / `A+` / `A++` text scaling.

### C. Medical Scribble Errors & The Golden Hour Transit Bottleneck
* Rushed hospital OPD prescriptions frequently cause tragic dosage and contraindicated medication errors.
* Organ transport couriers and ambulances lose the vital "Golden Hour" trapped in arterial traffic gridlocks.
* **Emergency Mitra Solution**: **प्रोटोकॉल मोड (Advanced Ingestion)** converts raw prescription text and transit telemetry into ITMS green corridor signal preemptions and hospital trauma-bed reservations.

---

## 2. Evaluation Criteria Alignment Matrix

| Parameter | Architectural Implementation |
| :--- | :--- |
| **Problem Statement Alignment** | Directly solves India-specific emergency response failures: ERSS-112 line congestion, illegible prescriptions, language barriers, and non-tech-savvy citizen access. |
| **Code Quality** | **Strict 0-comment policy** throughout all `src/` application code. Modular, self-documenting TypeScript with strict schema validation. |
| **Security & Spam Protection** | Server-side Gemini API routing (`/api/ai-assist`), zero exposed client keys, 500-char input truncation/sanitization, sliding-window rate limiting, and honeypot noise gates. |
| **Cost & Token Efficiency** | Zero token burn: Gemini 1.5 Flash capped at `maxOutputTokens: 120` with `temperature: 0.1` for deterministic outputs. 30-minute in-memory cache for repeat queries and instant 0-token deterministic fallback. |
| **Testing** | Comprehensive automated test suite (`npm test`) using Node's native runner covering schema validity, 8-language dictionary completeness, spam filtering, and lifecycle state changes. |
| **Accessibility & Design** | WCAG 2.1 AA compliant semantic HTML, visible focus rings, high-contrast Light/Dark mode toggling, text-scaling toggles, and screen-reader `aria-label` markup. |

---

## 3. Core Architecture & Workflow

```
Messy Real-World Input
(Voice SOS / Child Distress / Doctor Scribble / Traffic Gridlock)
                           │
                           ▼
          ┌──────────────────────────────────┐
          │   ERSS-112 Spam & Noise Gate    │
          │   - Pocket dial detection (<5ch) │
          │   - Repetitive spam filtering    │
          │   - Civic query redirection      │
          └────────────────┬─────────────────┘
                           │ Genuine Emergency
                           ▼
          ┌──────────────────────────────────┐
          │   Google Gemini 1.5 Flash Engine │
          │   - maxOutputTokens: 120 (Shield)│
          │   - temperature: 0.1             │
          │   - 30-min In-Memory Cache       │
          └────────────────┬─────────────────┘
                           │
                           ▼
             Structured Life-Saving Action
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
[Hospital ICU / EMS]               [ITMS Traffic Control]
Auto-reserve trauma bed           Preempt green corridor lights
```

---

## 4. 8 Indian Languages Fully Supported

Every label, preset, status, and emergency tile is localized end-to-end:
* **English (en)**
* **हिन्दी (hi)**
* **বাংলা (bn)**
* **मराठी (mr)**
* **தமிழ் (ta)**
* **తెలుగు (te)**
* **ગુજરાતી (gu)**
* **ಕನ್ನಡ (kn)**

---

## 5. Verification & Testing

### Run Automated Tests
```bash
npm test
```
*Validates manifest schema, 8-language dictionary coverage, spam detection algorithms, input bounds, and lifecycle states.*

### Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to test:
1. **Easy Mode**: Tap the 🚑 Ambulance tile or the microphone button for single-tap audio-confirmed dispatch.
2. **Spam Gate**: Type `hello` or `pizza delivery` to see the automated ERSS-112 noise gate in action.
3. **Protocol Mode**: Switch to advanced ingestion for doctor scribbles, traffic overrides, and QR code audit dockets.
4. **Command Center**: Navigate to `/admin` to view live dispatch queues and advance triage states in real time.
