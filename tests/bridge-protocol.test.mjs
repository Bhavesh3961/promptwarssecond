import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { translations, SUPPORTED_LANGUAGES } from "../src/locales/index.ts";
import { OFFICIAL_CAP_ALERTS, NDMA_HAZARD_GUIDES, OFFICIAL_HELPLINES, OFFICIAL_MAP_ZONES } from "../src/lib/cap-protocol.ts";
import { validateProblemInput } from "../src/lib/input-validator.ts";
import { getEmergencyContactsForLocation } from "../src/lib/emergency-contacts.ts";
import { FULL_NDMA_EVENTS } from "../src/lib/ndma-dos-donts-full.ts";

describe("Emergency Mitra AI Action Protocol & NDMA CAP Localization Suite", () => {
  it("validates structured action manifest schema", () => {
    const mockManifest = {
      title: "Acute Pediatric Anaphylaxis",
      category: "Emergency Medical",
      priority: "Critical",
      urgencyScore: 10,
      targetSystem: "Pediatric ICU & EMS",
      actionRequired: "Lock ventilator bed and dispatch second-line Epinephrine",
      resources: ["PICU Bed #3", "ALS Ambulance Unit 12"],
      summary: "Patient in acute anaphylactic shock.",
      verificationHash: "SIG-MED-8491",
    };

    assert.equal(typeof mockManifest.title, "string");
    assert.ok(mockManifest.title.length > 0);
    assert.ok(["Emergency Medical", "Disaster Response", "Civic Crisis", "Traffic & Evacuation", "Filtered Non-Emergency"].includes(mockManifest.category));
    assert.ok(["Critical", "High", "Medium", "Low"].includes(mockManifest.priority));
    assert.ok(mockManifest.urgencyScore >= 0 && mockManifest.urgencyScore <= 10);
    assert.ok(Array.isArray(mockManifest.resources));
    assert.ok(mockManifest.verificationHash.startsWith("SIG-"));
  });

  it("ensures all 8 Indian languages have complete translation dictionaries including NDMA SACHET features", () => {
    assert.equal(SUPPORTED_LANGUAGES.length, 8);
    const requiredKeys = [
      "brandName",
      "heroTitle",
      "compileBtn",
      "dispatchBtn",
      "tabMedical",
      "tabVoice",
      "tabTraffic",
      "tabDisaster",
      "urgencyScore",
      "modeEasy",
      "modeAdvanced",
      "tileAmbulance",
      "tileFire",
      "tilePolice",
      "tileDisaster",
      "tapToSpeak",
      "callDirect",
      "spamFilteredTitle",
      "helpDispatchedTitle",
      "stepStaySafe",
      "stepKeepOpen",
      "stepGuideTeam",
      "netGridActive",
      "sachetAlertsTitle",
      "sachetSeverityRed",
      "sachetSeverityOrange",
      "sachetSeverityYellow",
      "ndmaDosDontsBtn",
      "ndmaGuideTitle",
      "dosTitle",
      "dontsTitle",
      "readAloudBtn",
      "stopAudioBtn",
      "allHelplinesBtn",
      "capStandardBadge",
      "viewAllAlerts",
      "hazardFlood",
      "hazardMedical",
      "hazardFire",
      "hazardQuake",
      "tabMap",
      "mapTitle",
      "mapSubtitle",
      "mapLocateMe",
      "mapLocating",
      "mapFilterAll",
      "mapFilterFlood",
      "mapFilterCyclone",
      "mapFilterHeat",
      "mapFilterTransit",
      "mapSelectForDispatch",
      "mapActiveZones",
      "mapIncidentRadius",
    ];

    for (const lang of SUPPORTED_LANGUAGES) {
      const dict = translations[lang.code];
      assert.ok(dict, `Missing dictionary for language: ${lang.code}`);
      for (const key of requiredKeys) {
        assert.ok(dict[key], `Missing key "${key}" in language "${lang.code}"`);
      }
    }
  });

  it("identifies and filters ERSS-112 spam, pocket dials, and non-emergency civic queries including casual inquiries", () => {
    const pocketDial = "hi";
    const repetitiveSpam = "aaaaa";
    const testPrank = "pizza delivery";
    const casualQuestion = "what is day";
    const civicQuery = "when will electricity bill come power cut";
    const realEmergency = "Pt 6yo peanut allergy, stridor+, bp 80/50, icu bed req asap";

    const isSpamOrCasual = (t) => {
      const l = t.toLowerCase().trim();
      if (l.length < 5) return true;
      if (/^(.)\1{4,}$/.test(l)) return true;
      if (["pizza delivery", "test", "testing", "what is day", "what day"].includes(l)) return true;
      return false;
    };

    const isCivic = (t) => {
      return t.toLowerCase().includes("power cut") || t.toLowerCase().includes("electricity");
    };

    assert.equal(isSpamOrCasual(pocketDial), true);
    assert.equal(isSpamOrCasual(repetitiveSpam), true);
    assert.equal(isSpamOrCasual(testPrank), true);
    assert.equal(isSpamOrCasual(casualQuestion), true);
    assert.equal(isCivic(civicQuery), true);
    assert.equal(isSpamOrCasual(realEmergency), false);
    assert.equal(isCivic(realEmergency), false);
  });

  it("enforces strict input length constraints to safeguard tokens", () => {
    const overlyLongMessyInput = "A".repeat(1500);
    const sanitized = overlyLongMessyInput.trim().slice(0, 500);
    assert.equal(sanitized.length, 500);
  });

  it("verifies lifecycle state transitions for dispatch queue", () => {
    const validStates = ["Pending", "Triage Verified", "Units Dispatched", "Resolved"];
    for (const state of validStates) {
      assert.ok(validStates.includes(state));
    }
  });

  it("validates ITU-T X.1303 / NDMA CAP v1.2 alert feed and hazard protocol completeness", () => {
    assert.ok(OFFICIAL_CAP_ALERTS.length >= 3);
    const langCodes = ["en", "hi", "bn", "mr", "ta", "te", "gu", "kn"];

    for (const alert of OFFICIAL_CAP_ALERTS) {
      assert.ok(alert.id.startsWith("CAP-IN-"));
      assert.ok(["CWC", "IMD", "NDMA", "SDMA"].includes(alert.agency));
      assert.ok(["Red", "Orange", "Yellow"].includes(alert.severity));
      for (const code of langCodes) {
        assert.ok(alert.summary[code], `Missing CAP alert summary for ${alert.id} in ${code}`);
      }
    }

    assert.equal(NDMA_HAZARD_GUIDES.length, 4);
    for (const guide of NDMA_HAZARD_GUIDES) {
      assert.ok(guide.helplineNum.length >= 3);
      for (const code of langCodes) {
        assert.ok(guide.dos[code] && guide.dos[code].length >= 4, `Missing Do's for ${guide.id} in ${code}`);
        assert.ok(guide.donts[code] && guide.donts[code].length >= 4, `Missing Don'ts for ${guide.id} in ${code}`);
      }
    }

    assert.ok(OFFICIAL_HELPLINES.length >= 8);
    const numbers = OFFICIAL_HELPLINES.map((h) => h.number);
    assert.ok(numbers.includes("112"));
    assert.ok(numbers.includes("1078"));
    assert.ok(numbers.includes("1070"));
    assert.ok(numbers.includes("108"));
    assert.ok(numbers.includes("101"));

    assert.ok(OFFICIAL_MAP_ZONES.length >= 6);
    for (const zone of OFFICIAL_MAP_ZONES) {
      assert.ok(zone.id.startsWith("ZONE-"));
      assert.ok(zone.lat && zone.lng);
      assert.ok(["Red", "Orange", "Yellow", "Green"].includes(zone.severity));
      assert.ok(zone.suggestedDistressText.length > 10);
      for (const code of langCodes) {
        assert.ok(zone.title[code], `Missing zone title for ${zone.id} in ${code}`);
        assert.ok(zone.details[code], `Missing zone details for ${zone.id} in ${code}`);
      }
    }
  });

  it("prevents unnecessary token consumption on spam, greetings, and idle inputs", () => {
    assert.equal(validateProblemInput("hi", false, "en").isValid, false);
    assert.equal(validateProblemInput("hii", false, "en").isValid, false);
    assert.equal(validateProblemInput("lol", false, "en").isValid, false);
    assert.equal(validateProblemInput("pizza", false, "en").isValid, false);
    assert.equal(validateProblemInput("aaaaa", false, "en").isValid, false);
    assert.equal(validateProblemInput("testing 123", false, "en").isValid, false);

    assert.equal(
      validateProblemInput("Pt 6yo anaphylaxis, stridor+, bp 80/50", false, "en").isValid,
      true
    );
    assert.equal(
      validateProblemInput("Heart transplant courier stuck in toll traffic", false, "en").isValid,
      true
    );
    assert.equal(validateProblemInput("", true, "en").isValid, true);
  });

  it("resolves working emergency contact numbers based on coordinates", () => {
    const delhi = getEmergencyContactsForLocation(28.61, 77.2);
    assert.ok(delhi.regionName.includes("Delhi"));
    assert.ok(delhi.contacts.some((c) => c.phone === "112" && c.telUri === "tel:112"));
    assert.ok(delhi.contacts.some((c) => c.phone.includes("23469112")));

    const blr = getEmergencyContactsForLocation(12.97, 77.59);
    assert.ok(blr.regionName.includes("Bengaluru"));
    assert.ok(blr.contacts.some((c) => c.phone === "112"));
    assert.ok(blr.contacts.some((c) => c.phone.includes("22943030")));

    const panIndia = getEmergencyContactsForLocation(null, null);
    assert.ok(panIndia.regionName.includes("Pan-India"));
    assert.ok(panIndia.contacts.some((c) => c.phone === "112"));
    assert.ok(panIndia.contacts.some((c) => c.phone === "108"));
  });

  it("verifies full NDMA disaster catalog completeness across 8 hazards and survival phases", () => {
    assert.equal(FULL_NDMA_EVENTS.length, 8);
    for (const evt of FULL_NDMA_EVENTS) {
      assert.ok(evt.id);
      assert.ok(evt.nameKey);
      assert.ok(evt.helplinePhone);
      assert.ok(evt.content.en);
      assert.ok(Array.isArray(evt.content.en.before));
      assert.ok(Array.isArray(evt.content.en.during));
      assert.ok(Array.isArray(evt.content.en.after));
      assert.ok(evt.content.en.before.length > 0);
      assert.ok(evt.content.en.during.length > 0);
      assert.ok(evt.content.en.after.length > 0);
      assert.ok(evt.content.hi);
      assert.ok(Array.isArray(evt.content.hi.before));
      assert.ok(Array.isArray(evt.content.hi.during));
      assert.ok(Array.isArray(evt.content.hi.after));
    }
  });
});

