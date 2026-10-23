export interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

const REJECTED_WORDS = new Set([
  "hi",
  "hii",
  "hiii",
  "hello",
  "hey",
  "heyy",
  "yo",
  "sup",
  "test",
  "testing",
  "asdf",
  "qwerty",
  "lol",
  "lmao",
  "ok",
  "okay",
  "hmm",
  "bro",
  "bruh",
  "wdym",
  "pizza",
  "pizza delivery",
  "good morning",
  "good night",
  "who are you",
  "what is this",
  "tell me something",
  "what can you do",
  "test test",
  "testing 123",
]);

export function validateProblemInput(
  text: string,
  hasImage: boolean,
  lang: string = "en"
): ValidationResult {
  if (hasImage) {
    return { isValid: true };
  }

  const clean = (text || "").trim().toLowerCase();

  if (clean.length < 5) {
    return {
      isValid: false,
      reason: getRejectionMessage(lang),
    };
  }

  if (/^(.)\1{4,}$/.test(clean)) {
    return {
      isValid: false,
      reason: getRejectionMessage(lang),
    };
  }

  if (REJECTED_WORDS.has(clean)) {
    return {
      isValid: false,
      reason: getRejectionMessage(lang),
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 1 && clean.length < 7) {
    return {
      isValid: false,
      reason: getRejectionMessage(lang),
    };
  }

  return { isValid: true };
}

function getRejectionMessage(lang: string): string {
  switch (lang) {
    case "hi":
      return "कृपया किसी विशिष्ट समस्या (चिकित्सा, यातायात, आपदा या नागरिक खतरा) का विवरण दें ताकि हम बिना समय गंवाए सहायता कर सकें।";
    case "bn":
      return "অনুগ্রহ করে নির্দিষ্ট সমস্যার (চিকিৎসা, ট্র্যাফিক, দুর্যোগ বা নাগরিক সমস্যা) বিবরণ দিন যাতে আমরা দ্রুত ব্যবস্থা নিতে পারি।";
    case "ta":
      return "தயவுசெய்து ஒரு குறிப்பிட்ட பிரச்சனையை (மருத்துவம், போக்குவரத்து, பேரழிவு அல்லது குடிமை ஆபத்து) விவரிக்கவும்.";
    case "te":
      return "దయచేసి ఒక నిర్దిష్ట సమస్యను (వైద్య, ట్రాఫిక్, విపత్తు లేదా పౌర ప్రమాదం) వివరించండి.";
    case "mr":
      return "कृपया एखाद्या विशिष्ट समस्येचे (वैद्यकीय, वाहतूक, आपत्ती किंवा नागरी धोका) वर्णन करा जेणेकरून त्वरित कारवाई करता येईल.";
    case "gu":
      return "કૃપા કરીને ચોક્કસ સમસ્યા (તબીબી, ટ્રાફિક, આપત્તિ અથવા નાગરિક જોખમ) વર્ણવો જેથી અમે સમય બગાડ્યા વિના મદદ કરી શકીએ.";
    case "kn":
      return "ದಯವಿಟ್ಟು ನಿರ್ದಿಷ್ಟ ಸಮಸ್ಯೆಯನ್ನು (ವೈದ್ಯಕೀಯ, ಸಂಚಾರ, ವಿಪತ್ತು ಅಥವಾ ನಾಗರಿಕ ಅಪಾಯ) ವಿವರಿಸಿ.";
    default:
      return "Please describe a specific problem (medical, traffic, disaster, or civic hazard) so we can take action without wasting resources.";
  }
}
