"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Send,
  Upload,
  Mic,
  MicOff,
  X,
  Sparkles,
  FolderArchive,
  Plus,
  Trash2,
  Lock,
  ArrowRight,
  LogIn,
  BookOpen,
  Radio,
  Shield,
  PhoneCall,
} from "lucide-react";
import { validateProblemInput } from "@/lib/input-validator";
import InteractiveSystemTerminal from "@/components/InteractiveSystemTerminal";

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (e: { results: Array<Array<{ transcript: string }>> }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: { new (): SpeechRecognitionInstance };
  webkitSpeechRecognition?: { new (): SpeechRecognitionInstance };
}

interface ActionManifest {
  directiveTitle: string;
  domain: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  urgencyScore: number;
  targetSystem: string;
  immediateAction: string;
  resources: string[];
  verificationHash?: string;
  timestamp?: string;
  executionState?: "proposed" | "executing" | "executed" | "cancelled";
  ticketId?: string;
  executedAt?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  imagePreview?: string | null;
  imageName?: string | null;
  category?: string;
  actionManifest?: ActionManifest | null;
  timestamp: string;
}

interface ChatSession {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  messages: ChatMessage[];
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "medical", label: "🩺 Medical" },
  { id: "traffic", label: "🚗 Traffic" },
  { id: "disaster", label: "🌊 Disaster" },
  { id: "civic", label: "⚡ Civic" },
  { id: "safety", label: "🛡️ Safety" },
];

const CATEGORY_LOCALIZED: Record<string, Record<string, string>> = {
  all: {
    en: "All",
    hi: "सभी",
    bn: "সমস্ত",
    mr: "सर्व",
    ta: "அனைத்தும்",
    te: "అన్నీ",
    gu: "બધા",
    kn: "ಎಲ್ಲಾ",
  },
  medical: {
    en: "🩺 Medical",
    hi: "🩺 चिकित्सा",
    bn: "🩺 চিকিৎসা",
    mr: "🩺 वैद्यकीय",
    ta: "🩺 மருத்துவம்",
    te: "🩺 వైద్య",
    gu: "🩺 તબીબી",
    kn: "🩺 ವೈದ್ಯಕೀಯ",
  },
  traffic: {
    en: "🚗 Traffic",
    hi: "🚗 ट्रैफिक",
    bn: "🚗 ট্রাফিক",
    mr: "🚗 वाहतूक",
    ta: "🚗 போக்குவரத்து",
    te: "🚗 ట్రాఫిక్",
    gu: "🚗 ટ્રાફિક",
    kn: "🚗 ಸಂಚಾರ",
  },
  disaster: {
    en: "🌊 Disaster",
    hi: "🌊 आपदा",
    bn: "🌊 দুর্যোগ",
    mr: "🌊 आपत्ती",
    ta: "🌊 பேரிடர்",
    te: "🌊 విపత్తు",
    gu: "🌊 આપત્તિ",
    kn: "🌊 ವಿಪತ್ತು",
  },
  civic: {
    en: "⚡ Civic",
    hi: "⚡ नागरिक",
    bn: "⚡ নাগরিক",
    mr: "⚡ नागरी",
    ta: "⚡ குடிமை",
    te: "⚡ పౌర",
    gu: "⚡ નાગરિક",
    kn: "⚡ ನಾಗರಿಕ",
  },
  safety: {
    en: "🛡️ Safety",
    hi: "🛡️ सुरक्षा",
    bn: "🛡️ সুরক্ষা",
    mr: "🛡️ सुरक्षा",
    ta: "🛡️ பாதுகாப்பு",
    te: "🛡️ రక్షణ",
    gu: "🛡️ સુરક્ષા",
    kn: "🛡️ ರಕ್ಷಣೆ",
  },
};

const LANG_SPEECH_MAP: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  te: "te-IN",
  gu: "gu-IN",
  kn: "kn-IN",
};

const PLACEHOLDERS: Record<string, string> = {
  hi: "अपनी आपातकालीन समस्या लिखें (जैसे मेडिकल, ट्रैफिक, बाढ़, बिजली खतरा) या फोटो अपलोड करें...",
  bn: "আপনার জরুরি সমস্যা লিখুন বা ছবি আপলোড করুন...",
  mr: "तुमची आपत्कालीन समस्या लिहा किंवा फोटो अपलोड करा...",
  ta: "உங்கள் அவசரப் பிரச்சனையை எழுதவும் அல்லது புகைப்படத்தைப் பதிவேற்றவும்...",
  te: "మీ అత్యవసర సమస్యను వ్రాయండి లేదా ఫోటోను అప్‌లోడ్ చేయండి...",
  gu: "તમારી કટોકટીની સમસ્યા લખો અથવા ફોટો અપલોડ કરો...",
  kn: "ನಿಮ್ಮ ತುರ್ತು ಸಮಸ್ಯೆಯನ್ನು ಬರೆಯಿರಿ ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ...",
  en: "Type your emergency issue or upload a photo...",
};

const GREETINGS: Record<string, string> = {
  en: "Universal AI Action Bridge. Send text, photo, or voice to trigger verified societal actions.",
  hi: "सार्वभौमिक एआई एक्शन ब्रिज। सत्यापित कार्रवाइयों को ट्रिगर करने के लिए टेक्स्ट, फोटो या वॉइस भेजें।",
  bn: "সার্বজনীন এআই অ্যাকশন ব্রিজ। তাত্ক্ষণিক ব্যবস্থা নিতে টেক্সট, ফটো বা ভয়েস পাঠান।",
  mr: "युनिव्हर्सल एआय अ‍ॅक्शन ब्रिज. त्वरित कृतीसाठी मजकूर, फोटो किंवा व्हॉईस पाठवा.",
  ta: "யுனிவர்சல் AI ஆக்ஷன் பிரிட்ஜ். உடனடி நடவடிக்கை எடுக்க உரை, புகைப்படம் அல்லது குரலை அனுப்பவும்.",
  te: "యూనివర్సల్ AI యాక్షన్ బ్రిడ్జ్. చర్యను ప్రారంభించడానికి వచనం, ఫోటో లేదా వాయిస్ పంపండి.",
  gu: "યુનિવર્સલ એઆઈ એક્શન બ્રિજ. તાત્કાલિક પગલાં માટે ટેક્સ્ટ, ફોટો અથવા અવાજ મોકલો.",
  kn: "ಯುನಿವರ್ಸಲ್ AI ಆಕ್ಷನ್ ಬ್ರಿಡ್ಜ್. ಪರಿಶೀಲಿಸಿದ ಕ್ರಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಪಠ್ಯ, ಫೋಟೋ ಅಥವಾ ಧ್ವನಿ ಕಳುಹಿಸಿ.",
};

export default function UniversalBridgeChatPage() {
  const router = useRouter();
  const { user, loading: authLoading, loginAsDemo, signInWithGoogle } = useAuth();
  const { currentLanguage } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inputText, setInputText] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>(() => "session-" + Date.now());

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "ai",
      category: "all",
      text: GREETINGS[currentLanguage] || GREETINGS.en,
      timestamp: "Ready",
    },
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aapda_chat_sessions_v2");
      if (saved) {
        setSessions(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id.startsWith("welcome")) {
        return [
          {
            ...prev[0],
            text: GREETINGS[currentLanguage] || GREETINGS.en,
          },
        ];
      }
      return prev;
    });
  }, [currentLanguage]);

  const saveCurrentSession = (updatedMessages: ChatMessage[]) => {
    if (updatedMessages.length <= 1) return;
    const firstUserMsg = updatedMessages.find((m) => m.sender === "user");
    const title = firstUserMsg ? firstUserMsg.text.slice(0, 32) : "Conversation";
    const detectedCategory = firstUserMsg?.category || selectedCategory || "general";

    const sessionObj: ChatSession = {
      id: activeSessionId,
      title: title || "Emergency Session",
      category: detectedCategory,
      timestamp: new Date().toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      messages: updatedMessages,
    };

    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== activeSessionId);
      const nextList = [sessionObj, ...filtered].slice(0, 20);
      try {
        localStorage.setItem("aapda_chat_sessions_v2", JSON.stringify(nextList));
      } catch {}
      return nextList;
    });
  };

  const startNewChat = () => {
    const newId = "session-" + Date.now();
    setActiveSessionId(newId);
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "ai",
        category: "all",
        text: GREETINGS[currentLanguage] || GREETINGS.en,
        timestamp: "Ready",
      },
    ]);
    setShowHistory(false);
  };

  const restoreSession = (sess: ChatSession) => {
    setActiveSessionId(sess.id);
    setMessages(sess.messages);
    setSelectedCategory(sess.category);
    setShowHistory(false);
  };

  const deleteSession = (sessId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== sessId);
      try {
        localStorage.setItem("aapda_chat_sessions_v2", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const removeAttachedImage = () => {
    setImageBase64(null);
    setImagePreview(null);
    setImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleRecording = () => {
    if (typeof window === "undefined") return;
    const win = window as unknown as WindowWithSpeech;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Voice input not supported in this browser.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = LANG_SPEECH_MAP[currentLanguage] || "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (e: { results: Array<Array<{ transcript: string }>> }) => {
        const transcript = e.results[0][0].transcript;
        setIsRecording(false);
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (customPrompt?: string, forcedCategory?: string) => {
    const textToSend = (customPrompt || inputText).trim();
    if (!textToSend && !imageBase64) return;
    if (isLoading) return;

    const validation = validateProblemInput(textToSend, !!imageBase64, currentLanguage);
    if (!validation.isValid) {
      const rejectMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        category: selectedCategory,
        text: validation.reason || "Please describe a specific problem clearly without wasting time.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => {
        const next = [...prev, rejectMsg];
        saveCurrentSession(next);
        return next;
      });
      setInputText("");
      return;
    }

    const currentCat = forcedCategory || selectedCategory;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      category: currentCat,
      imagePreview: imagePreview,
      imageName: imageName,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    const sentImageBase64 = imageBase64;
    removeAttachedImage();
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSend,
          domain: currentCat,
          language: currentLanguage,
          imageBase64: sentImageBase64,
          imageMimeType: "image/jpeg",
        }),
      });

      const data = await res.json();
      const replyText = data?.reply || "Guidance generated.";
      const actionManifest = data?.actionManifest || null;

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        category: currentCat,
        actionManifest: actionManifest,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => {
        const next = [...prev, aiMessage];
        saveCurrentSession(next);
        return next;
      });
    } catch {
      const errMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        category: currentCat,
        text: "Network error. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => {
        const next = [...prev, errMessage];
        saveCurrentSession(next);
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessageRef = useRef(handleSendMessage);
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  });

  useEffect(() => {
    try {
      const bridgeInput = sessionStorage.getItem("emergency_bridge_input");
      const bridgeCategory = sessionStorage.getItem("emergency_bridge_type") || "disaster";
      if (bridgeInput) {
        sessionStorage.removeItem("emergency_bridge_input");
        sessionStorage.removeItem("emergency_bridge_type");
        setSelectedCategory(bridgeCategory);
        handleSendMessageRef.current(bridgeInput, bridgeCategory);
      }
    } catch {}
  }, []);

  const handleTerminalExecute = (msgId: string, ticketId: string) => {
    setMessages((prev) => {
      const updated = prev.map((msg) => {
        if (msg.id === msgId && msg.actionManifest) {
          return {
            ...msg,
            actionManifest: {
              ...msg.actionManifest,
              executionState: "executed" as const,
              ticketId: ticketId,
              executedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          };
        }
        return msg;
      });
      saveCurrentSession(updated);
      return updated;
    });
  };

  const handleTerminalCancel = (msgId: string) => {
    setMessages((prev) => {
      const updated = prev.map((msg) => {
        if (msg.id === msgId && msg.actionManifest) {
          return {
            ...msg,
            actionManifest: {
              ...msg.actionManifest,
              executionState: "cancelled" as const,
            },
          };
        }
        return msg;
      });
      saveCurrentSession(updated);
      return updated;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-3xl p-6 sm:p-8 glass-card border border-slate-200 dark:border-slate-800 shadow-xl text-center flex flex-col gap-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Login Required
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Please sign in to access the Universal AI Action Bridge.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={loginAsDemo}
              className="w-full py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>⚡ Quick Guest / Judge Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 px-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <LogIn className="w-4 h-4 text-slate-500" />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium py-1"
            >
              Sign in with Email
            </button>
          </div>
        </div>
      </main>
    );
  }

  const filteredMessages = messages.filter((m) => {
    if (selectedCategory === "all") return true;
    return m.category === selectedCategory || m.category === "all";
  });

  return (
    <main className="min-h-screen py-5 px-3 sm:px-6 max-w-5xl mx-auto flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-none">
              AapdaSetu Universal AI Bridge
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Instant verified actions from messy notes, photos, or voice.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/dos-donts")}
            className="px-3 py-1.5 rounded-xl border bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Dos &amp; Don&apos;ts</span>
          </button>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
          >
            <FolderArchive className="w-3.5 h-3.5 text-blue-600" />
            <span>History ({sessions.length})</span>
          </button>

          <button
            type="button"
            onClick={startNewChat}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {CATEGORIES.map((cat) => {
          const catLabel = CATEGORY_LOCALIZED[cat.id]?.[currentLanguage] || cat.label;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                  : "glass-card text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              {catLabel}
            </button>
          );
        })}
      </div>

      {showHistory && (
        <div className="p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 shadow-md flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="font-bold text-slate-900 dark:text-white uppercase font-mono text-[11px]">
              Saved Chat History by Category
            </span>
            <button
              onClick={() => setShowHistory(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {sessions.length === 0 ? (
            <p className="text-slate-400 py-2">No saved conversations yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => restoreSession(s)}
                  className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                    activeSessionId === s.id
                      ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-bold truncate">{s.title}</p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {s.category.toUpperCase()} • {s.timestamp}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => deleteSession(s.id, e)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded-lg shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}



      <div className="rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col h-[580px]">
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          {filteredMessages.map((msg) => {
            const isAi = msg.sender === "ai";
            const manifest = msg.actionManifest;

            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 max-w-[92%] sm:max-w-[80%] ${
                  isAi ? "self-start" : "self-end items-end"
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 px-1">
                  <span>{isAi ? "AapdaSetu AI" : "You"}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs flex flex-col gap-2.5 ${
                    isAi
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.imagePreview && (
                    <div className="rounded-xl overflow-hidden border border-white/20 max-w-xs">
                      <img
                        src={msg.imagePreview}
                        alt="Attached upload"
                        className="w-full h-auto max-h-40 object-cover"
                      />
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {manifest && (
                    <InteractiveSystemTerminal
                      manifest={manifest}
                      onExecute={(tId) => handleTerminalExecute(msg.id, tId)}
                      onCancel={() => handleTerminalCancel(msg.id)}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="self-start p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2">
              <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing & formulating action...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {imagePreview && (
          <div className="px-3.5 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
            <img
              src={imagePreview}
              alt="Attached thumbnail"
              className="w-8 h-8 rounded-lg object-cover border border-slate-300 dark:border-slate-700"
            />
            <span className="truncate flex-1 font-mono text-slate-700 dark:text-slate-300">
              {imageName || "Image ready"}
            </span>
            <button
              type="button"
              onClick={removeAttachedImage}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="p-2.5 sm:p-3 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id="chat-upload-input"
          />

          <label
            htmlFor="chat-upload-input"
            className="p-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors"
            title="Upload photo / screenshot"
          >
            <Upload className="w-4 h-4 text-blue-600" />
          </label>

          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
              isRecording
                ? "bg-red-600 text-white border-red-700 animate-pulse"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
            }`}
            title="Dictate voice"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={PLACEHOLDERS[currentLanguage] || PLACEHOLDERS.en}
            className="flex-1 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputText.trim() && !imageBase64)}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50 transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              National Emergency Operations Grid
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            ITU-T X.1303 & NDMA CAP Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => router.push("/alerts")}
            className="p-5 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-red-500/50 transition-all cursor-pointer group flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                <Radio className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 font-bold text-[10px] tracking-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                Live Feed
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>CAP v1.2 Warning Feed</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-red-600" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Real-time official disaster alerts from NDMA, IMD and CWC with geographic polygon zoning and audio broadcasts.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-red-600">
              <span>View All-India Alerts</span>
              <span className="font-mono">Active</span>
            </div>
          </div>

          <div
            onClick={() => router.push("/sos")}
            className="p-5 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] tracking-tight">
                GPS Geolocation
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Emergency SOS & Contacts</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Auto-detects device GPS coordinates to resolve nearest district disaster control rooms, SDRF units, and direct 112 dispatch.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-emerald-600">
              <span>Access SOS Radar</span>
              <span className="font-mono">24x7</span>
            </div>
          </div>

          <div
            onClick={() => router.push("/dos-donts")}
            className="p-5 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-[10px] tracking-tight">
                8 NDMA Hazards
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>NDMA Dos & Don&apos;ts SOPs</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Standard operating protocols across Before, During, and After phases for cyclones, floods, earthquakes, heatwaves and fires.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-blue-600">
              <span>Explore Life Safety SOPs</span>
              <span className="font-mono">Official</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Verified All-India Emergency Hotlines</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct toll-free telecommunication channels linked to national command and control centers
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit">
              Toll-Free • Zero Data Charge
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <a
              href="tel:112"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all flex flex-col items-center text-center group"
            >
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">National ERSS</span>
              <span className="font-mono font-black text-base text-emerald-600 mt-0.5 group-hover:scale-105 transition-transform">112</span>
              <span className="text-[9px] text-slate-400">All Emergencies</span>
            </a>

            <a
              href="tel:1078"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500 hover:bg-blue-500/5 transition-all flex flex-col items-center text-center group"
            >
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">NDRF HQ</span>
              <span className="font-mono font-black text-base text-blue-600 mt-0.5 group-hover:scale-105 transition-transform">1078</span>
              <span className="text-[9px] text-slate-400">Disaster Rescue</span>
            </a>

            <a
              href="tel:1070"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-amber-500 hover:bg-amber-500/5 transition-all flex flex-col items-center text-center group"
            >
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">State SDMA</span>
              <span className="font-mono font-black text-base text-amber-600 mt-0.5 group-hover:scale-105 transition-transform">1070</span>
              <span className="text-[9px] text-slate-400">Relief Control</span>
            </a>

            <a
              href="tel:108"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-red-500 hover:bg-red-500/5 transition-all flex flex-col items-center text-center group"
            >
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Ambulance</span>
              <span className="font-mono font-black text-base text-red-600 mt-0.5 group-hover:scale-105 transition-transform">108</span>
              <span className="text-[9px] text-slate-400">Trauma & ALS</span>
            </a>

            <a
              href="tel:101"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-orange-500 hover:bg-orange-500/5 transition-all flex flex-col items-center text-center group"
            >
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Fire & Rescue</span>
              <span className="font-mono font-black text-base text-orange-600 mt-0.5 group-hover:scale-105 transition-transform">101</span>
              <span className="text-[9px] text-slate-400">Hazmat Response</span>
            </a>

            <a
              href="tel:1091"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-purple-500 hover:bg-purple-500/5 transition-all flex flex-col items-center text-center group"
            >
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Women Safety</span>
              <span className="font-mono font-black text-base text-purple-600 mt-0.5 group-hover:scale-105 transition-transform">1091</span>
              <span className="text-[9px] text-slate-400">Distress Support</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Multi-Agency Relay</span>
            <span className="text-xs font-bold text-emerald-600 font-mono mt-0.5 block">Operational</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Bridge Latency</span>
            <span className="text-xs font-bold text-blue-600 font-mono mt-0.5 block">&lt;120 ms</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Spam Filtering</span>
            <span className="text-xs font-bold text-amber-600 font-mono mt-0.5 block">Active (Safe)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Regional Languages</span>
            <span className="text-xs font-bold text-purple-600 font-mono mt-0.5 block">8 Supported</span>
          </div>
        </div>
      </div>
    </main>
  );
}
