export interface DisasterPhaseGuide {
  before: string[];
  during: string[];
  after: string[];
}

export interface FullHazardEvent {
  id: string;
  nameKey: string;
  names: Record<string, string>;
  icon: string;
  helpline: string;
  helplinePhone: string;
  content: Record<string, DisasterPhaseGuide>;
  videoTitle: string;
}

export const FULL_NDMA_EVENTS: FullHazardEvent[] = [
  {
    id: "cyclones",
    nameKey: "Cyclones",
    names: {
      en: "Cyclones",
      hi: "चक्रवात (Cyclones)",
      bn: "ঘূর্ণিঝড় (Cyclones)",
      mr: "चक्रीवादळ (Cyclones)",
      ta: "சூறாவளி (Cyclones)",
      te: "తుఫానులు (Cyclones)",
      gu: "વાવાઝોડું (Cyclones)",
      kn: "ಚಂಡಮಾರುತ (Cyclones)",
    },
    icon: "Wind",
    helpline: "NDMA Cyclone Disaster Cell: 1078 / 112",
    helplinePhone: "1078",
    videoTitle: "#Cyclone | Safety & Preparedness Guidelines",
    content: {
      en: {
        before: [
          "Ignore rumours, stay calm, and don't panic.",
          "Keep mobile phones fully charged for emergency communication; prefer SMS over voice calls.",
          "Listen to radio, watch TV, and check official IMD alerts for cyclone track updates.",
          "Keep important documents and valuables in waterproof containers or ziplock bags.",
          "Prepare an emergency survival kit with non-perishable food, potable water, torch, and first-aid supplies.",
          "Secure your house, inspect the roof, and remove loose branches or sharp objects nearby.",
          "Keep cattle and domestic animals untied so they can reach safety independently.",
          "Know the nearest cyclone shelter and the safest evacuation route designated by district authorities.",
        ],
        during: [
          "Stay indoors in the safest, central room of your home away from glass windows and loose doors.",
          "Turn off mains electricity and cooking gas cylinders before storm winds peak.",
          "Do not go outside even if the wind suddenly calms (this is the calm 'eye' of the cyclone; ferocious reverse winds follow).",
          "If caught outdoors, seek immediate shelter in a concrete building; avoid trees, metal hoardings, and power lines.",
          "Drink only boiled or purified water to avoid cholera and gastrointestinal infections.",
        ],
        after: [
          "Wait for official 'all-clear' announcements from district disaster authorities before venturing outside.",
          "Check for gas leaks and damaged electrical wiring before switching on power or lighting matches.",
          "Beware of venomous snakes and scorpions seeking shelter in flooded areas and debris.",
          "Report fallen electric poles, dangling wires, and blocked roads to municipal helpline 112.",
        ],
      },
      hi: {
        before: [
          "अफवाहों पर ध्यान न दें, शांत रहें और घबराएं नहीं।",
          "इमरजेंसी संचार के लिए मोबाइल फोन चार्ज रखें; वॉयस कॉल की जगह एसएमएस का उपयोग करें।",
          "मौसम की जानकारी और चक्रवात ट्रैक के लिए रेडियो, टीवी और मौसम विभाग के बुलेटिन देखें।",
          "महत्वपूर्ण दस्तावेज, पहचान पत्र और गहने वाटरप्रूफ बैग में सुरक्षित रखें।",
          "कम से कम 7 दिनों के लिए सूखा भोजन, पीने का पानी, टॉर्च और प्राथमिक चिकित्सा किट तैयार रखें।",
          "घर की छत और खिड़कियों की मरम्मत करें; आसपास की कमजोर पेड़ की टहनियां काट दें।",
          "पशुओं को खूंटे से खोलकर रखें ताकि वे खतरे के समय सुरक्षित स्थान पर जा सकें।",
          "नजदीकी चक्रवात राहत केंद्र और सुरक्षित निकासी मार्ग की पूर्व जानकारी रखें।",
        ],
        during: [
          "घर के सबसे सुरक्षित और मध्य कमरे में रहें; खिड़कियों और दरवाजों से दूर रहें।",
          "तूफान तेज होने से पहले मुख्य बिजली स्विच और गैस सिलेंडर तुरंत बंद कर दें।",
          "हवा अचानक थमने पर भी बाहर न निकलें; यह चक्रवात की आंख हो सकती है, इसके बाद तेज विपरीत हवाएं आती हैं।",
          "यदि बाहर फंसे हों, तो पक्के भवन में शरण लें; पेड़ों, बिजली के खंभों और टीन शेड से दूर रहें।",
          "जलजनित रोगों से बचने के लिए केवल उबला हुआ या शुद्ध पानी ही पिएं।",
        ],
        after: [
          "प्रशासन द्वारा आधिकारिक सुरक्षित घोषणा किए जाने से पहले घर से बाहर न निकलें।",
          "बिजली चालू करने या माचिस जलाने से पहले गैस रिसाव और तारों की जांच करें।",
          "मलवे और बाढ़ के पानी में सांपों और जहरीले कीड़ों से सावधान रहें।",
          "टूटे हुए बिजली के तारों और गिरे खंभों की तुरंत हेल्पलाइन 112 या 1078 पर सूचना दें।",
        ],
      },
      bn: {
        before: [
          "গুজবে কান দেবেন না, শান্ত থাকুন এবং আতঙ্কিত হবেন না।",
          "জরুরি যোগাযোগের জন্য মোবাইল ফোন চার্জ করে রাখুন; এসএমএস ব্যবহার করুন।",
          "আবহাওয়ার খবরের জন্য রেডিও ও টেলিভিশন শুনুন এবং সতর্কবার্তা মেনে চলুন।",
          "মূল্যবান কাগজপত্র ও জরুরি নথি জলরোধী ব্যাগে সুরক্ষিত রাখুন।",
          "শুকনো খাবার, বিশুদ্ধ পানীয় জল, টর্চ এবং প্রাথমিক চিকিৎসার ওষুধ মজুত রাখুন।",
          "ঘরের চালা ও জানলা মেরামত করুন এবং আশপাশের মরা গাছের ডালপালা কেটে ফেলুন।",
          "গবাদি পশুদের মুক্ত রাখুন যাতে বিপদের সময় তারা নিরাপদ স্থানে যেতে পারে।",
        ],
        during: [
          "বাড়ির সবচেয়ে সুরক্ষিত স্থানে থাকুন, জানলা-দরজা থেকে দূরে থাকুন।",
          "ঝড় শুরু হওয়ার আগেই প্রধান বিদ্যুৎ সংযোগ ও গ্যাস বন্ধ করে দিন।",
          "হাওয়া হঠাৎ থেমে গেলেও বাইরে বের হবেন না; এটি ঝড়ের কেন্দ্রবিন্দু হতে পারে।",
          "বাইরে থাকলে পাকা আশ্রয়ে যান; গাছপালা ও বৈদ্যুতিক খুঁটির নিচে থাকবেন না।",
        ],
        after: [
          "প্রশাসনের অনুমতি না পাওয়া পর্যন্ত আশ্রয়কেন্দ্র ত্যাগ করবেন না।",
          "বিদ্যুৎ বা গ্যাস চালু করার আগে কোনো লিকেজ বা ছেঁড়া তার আছে কিনা পরীক্ষা করুন।",
          "জল জমে থাকা স্থানে বিষাক্ত সাপের উপদ্রব থেকে সতর্ক থাকুন।",
        ],
      },
      mr: {
        before: [
          "अफवांवर विश्वास ठेवू नका, शांत राहा आणि घाबरू नका.",
          "मोबाईल फोन पूर्ण चार्ज ठेवा; संभाषणासाठी एसएमएसचा वापर करा.",
          "हवामान विभागाच्या अधिकृत सूचना रेडिओ आणि टीव्हीवर ऐका.",
          "महत्त्वाची कागदपत्रे आणि औषधे वॉटरप्रूफ पिशवीत ठेवा.",
          "कोरडा खाऊ, पिण्याचे पाणी, बॅटरी आणि प्रथमोपचार पेटी तयार ठेवा.",
          "पाळीव जनावरांना मोकळे सोडा जेणेकरून ते सुरक्षित ठिकाणी जाऊ शकतील.",
        ],
        during: [
          "घरातील सर्वात सुरक्षित खोलीत राहा; खिडक्या आणि काचांपासून दूर राहा.",
          "वादळ वाढण्यापूर्वी मुख्य वीज पुरवठा आणि गॅस सिलिंडर बंद करा.",
          "वारा अचानक थांबला तरी बाहेर पडू नका; वादळाचा मुख्य भाग अजून बाकी असू शकतो.",
        ],
        after: [
          "प्रशासनाने सुरक्षित घोषित केल्याशिवाय घराबाहेर पडू नका.",
          "गॅस गळती किंवा तुटलेल्या तारांची खात्री केल्याशिवाय वीज चालू करू नका.",
          "साचलेल्या पाण्यात विषारी सापांपासून सावध राहा.",
        ],
      },
      ta: {
        before: [
          "வதந்திகளை நம்பாதீர்கள், அமைதியாக இருங்கள்.",
          "அவசர தகவல்களுக்கு மொபைல் போனை முழுமையாக சார்ஜ் செய்து வைக்கவும்.",
          "வானிலை எச்சரிக்கைகளை தொடர்ந்து வானொலி அல்லது செய்திகள் மூலம் கவனிக்கவும்.",
          "முக்கிய ஆவணங்களை நீர் புகாத பைகளில் பாதுகாப்பாக வைக்கவும்.",
          "கால்நடைகளை அவிழ்த்து விடவும், அதனால் அவை தங்களை பாதுகாத்துக் கொள்ள முடியும்.",
        ],
        during: [
          "வீட்டின் பாதுகாப்பான நடுப்பகுதியில் இருக்கவும், ஜன்னல்களுக்கு அருகில் செல்ல வேண்டாம்.",
          "மின்சாரம் மற்றும் எரிவாயு இணைப்புகளை உடனடியாக துண்டிக்கவும்.",
          "காற்று நின்றாலும் வெளியே செல்ல வேண்டாம்; மீண்டும் பலத்த காற்று வீசக்கூடும்.",
        ],
        after: [
          "அதிகாரப்பூர்வ அறிவிப்பு வரும் வரை பாதுகாப்பான இடத்தை விட்டு வெளியேற வேண்டாம்.",
          "அறுந்து கிடக்கும் மின்கம்பிகளை தொடாதீர்கள்; உடனடியாக 112-க்கு தகவல் தெரிவிக்கவும்.",
        ],
      },
      te: {
        before: [
          "పుకార్లను నమ్మవద్దు, ప్రశాంతంగా ఉండండి.",
          "అత్యవసర సమాచారం కోసం మొబైల్ ఫోన్‌ను పూర్తిగా ఛార్జ్ చేయండి.",
          "వాతావరణ హెచ్చరికలను రేడియో మరియు టీవీ ద్వారా ఎప్పటికప్పుడు తెలుసుకోండి.",
          "ముఖ్యమైన పత్రాలను వాటర్‌ప్రూఫ్ కవర్లలో భద్రపరుచుకోండి.",
          "పశువులను కట్టేయకుండా విడిచిపెట్టండి, అవి సురక్షిత ప్రాంతాలకు వెళ్లగలవు.",
        ],
        during: [
          "ఇంటిలోని అత్యంత సురక్షితమైన మధ్య గదిలో ఉండండి; కిటికీలకు దూరంగా ఉండండి.",
          "మెయిన్ విద్యుత్ స్విచ్ మరియు గ్యాస్ సిలిండర్ వెంటనే ఆపివేయండి.",
        ],
        after: [
          "అధికారుల నుంచి అనుమతి వచ్చే వరకు బయటకు రావద్దు.",
          "తెగిపడిన విద్యుత్ తీగలను తాకవద్దు, వెంటనే 112 లేదా 1078కు ఫిర్యాదు చేయండి.",
        ],
      },
      gu: {
        before: [
          "અફવાઓ પર ધ્યાન ન આપો, શાંત રહો અને ગભરાશો નહીં.",
          "મોબાઇલ ફોન ચાર્જ રાખો; સંદેશાવ્યવહાર માટે એસએમએસનો ઉપયોગ કરો.",
          "હવામાન અપડેટ્સ માટે રેડિયો અને ટીવીના બુલેટિન સાંભળો.",
          "મહત્વના દસ્તાવેજો વોટરપ્રૂફ બેગમાં સુરક્ષિત રાખો.",
          "પશુઓને બાંધેલા ન રાખશો જેથી તેઓ સલામત સ્થાને જઈ શકે.",
        ],
        during: [
          "ઘરના સૌથી સલામત ઓરડામાં રહો; બારી-બારણાંથી દૂર રહો.",
          "મુખ્ય વીજળી સ્વીચ અને ગેસ સિલિન્ડર તરત જ બંધ કરો.",
        ],
        after: [
          "તંત્રની સત્તાવાર સૂચના ન મળે ત્યાં સુધી બહાર ન નીકળો.",
          "તૂટેલા વીજ વાયરોથી સાવધ રહો અને હેલ્પલાઇન 112 પર જાણ કરો.",
        ],
      },
      kn: {
        before: [
          "ವದಂತಿಗಳನ್ನು ನಂಬಬೇಡಿ, ಶಾಂತರಾಗಿರಿ.",
          "ತುರ್ತು ಸಂಪರ್ಕಕ್ಕಾಗಿ ಮೊಬೈಲ್ ಫೋನ್ ಚಾರ್ಜ್ ಮಾಡಿಟ್ಟುಕೊಳ್ಳಿ.",
          "ಹವಾಮಾನ ಇಲಾಖೆಯ ಮುನ್ಸೂಚನೆಗಳನ್ನು ನಿರಂತರವಾಗಿ ಗಮನಿಸಿ.",
          "ಪ್ರಮುಖ ದಾಖಲೆಗಳನ್ನು ಜಲನಿರೋಧಕ ಕವರ್‌ಗಳಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ.",
          "ಸಾಕುಪ್ರಾಣಿಗಳನ್ನು ಕಟ್ಟಿಹಾಕಬೇಡಿ, ಅವು ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ತೆರಳಲು ಅನುವು ಮಾಡಿಕೊಡಿ.",
        ],
        during: [
          "ಮನೆಯ ಸುರಕ್ಷಿತವಾದ ಮಧ್ಯ ಕೋಣೆಯಲ್ಲಿರಿ; ಕಿಟಕಿಗಳಿಂದ ದೂರವಿರಿ.",
          "ಮುಖ್ಯ ವಿದ್ಯುತ್ ಸ್ವಿಚ್ ಮತ್ತು ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ತಕ್ಷಣ ಆಫ್ ಮಾಡಿ.",
        ],
        after: [
          "ಸರ್ಕಾರದ ಅಧಿಕೃತ ಸೂಚನೆ ಬರುವವರೆಗೆ ಆಶ್ರಯತಾಣ ಬಿಟ್ಟು ಹೊರಬರಬೇಡಿ.",
          "ತುಂಡಾದ ವಿದ್ಯುತ್ ತಂತಿಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ; 112 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.",
        ],
      },
    },
  },
  {
    id: "floods",
    nameKey: "Floods",
    names: {
      en: "Floods",
      hi: "बाढ़ (Floods)",
      bn: "বন্যা (Floods)",
      mr: "पूर (Floods)",
      ta: "வெள்ளம் (Floods)",
      te: "వరదలు (Floods)",
      gu: "પૂર (Floods)",
      kn: "ಪ್ರವಾಹ (Floods)",
    },
    icon: "Waves",
    helpline: "National Flood Relief Cell: 1078 / 1070",
    helplinePhone: "1078",
    videoTitle: "#Floods | Safe Evacuation & Water Safety",
    content: {
      en: {
        before: [
          "Know the flood risk and elevation level of your area relative to nearby rivers.",
          "Keep essential emergency supplies, first-aid items, and 7-day potable water ready.",
          "Install check-valves in plumbing to prevent floodwater backing up into building drains.",
          "Move valuable appliances, records, and medicines to the highest floor or attic.",
        ],
        during: [
          "Turn off main electrical breaker and LPG cylinders before water enters premises.",
          "Never attempt to walk, swim, or drive through moving water (just 6 inches sweeps away an adult; 12 inches moves cars).",
          "Move children and elderly family members to the roof and broadcast emergency GPS coordinates.",
          "Do not touch submerged electrical switchboards, meters, or fallen poles.",
        ],
        after: [
          "Return home only after authorities declare your locality structurally safe.",
          "Discard all food and medication that came into contact with floodwaters.",
          "Boil or chemically treat drinking water before consumption to prevent cholera and leptospirosis.",
          "Photograph building damage for insurance claims and municipal relief aid.",
        ],
      },
      hi: {
        before: [
          "अपने क्षेत्र के बाढ़ जोखिम और नजदीकी जलस्तर की जानकारी रखें।",
          "दवाइयां, टॉर्च, ड्राई राशन और पीने का पानी सुरक्षित ऊंचाई पर रखें।",
          "घर के नालों में फ्लड चेक वाल्व लगाएं ताकि गंदा पानी वापस न आए।",
          "जरूरी दस्तावेज और इलेक्ट्रॉनिक सामान ऊपरी मंजिल पर पहुंचा दें।",
        ],
        during: [
          "घर में पानी घुसने से पहले मेन बिजली स्विच और गैस तुरंत बंद कर दें।",
          "बहते पानी में कभी पैदल या गाड़ी से न जाएं (मात्र 6 इंच पानी बहा ले जा सकता है)।",
          "बच्चों और बुजुर्गों को छत पर ले जाएं और आपातकालीन लोकेशन भेजें।",
          "पानी में डूबे खंभों या मीटर को छूने की गलती कभी न करें।",
        ],
        after: [
          "प्रशासन द्वारा सुरक्षित घोषित होने पर ही घर लौटें।",
          "बाढ़ के पानी के संपर्क में आया भोजन और दवाइयां तुरंत फेंक दें।",
          "पीने का पानी हमेशा उबालकर या शुद्ध करके ही पिएं।",
          "मुआवजे और बीमा के लिए नुकसान की तस्वीरें सुरक्षित रखें।",
        ],
      },
      bn: {
        before: [
          "এলাকার বন্যার ঝুঁকি এবং নিকটবর্তী নদীর জলস্তরের খবর রাখুন।",
          "জরুরি ওষুধপত্র ও শুকনো খাবার নিরাপদ উঁচুতে রাখুন।",
          "প্রয়োজনীয় নথিপত্র দোতলায় বা নিরাপদ স্থানে সরিয়ে নিন।",
        ],
        during: [
          "বাড়িতে জল ঢোকার আগে বিদ্যুৎ ও গ্যাস বন্ধ করুন।",
          "প্রবাহিত জলের মধ্য দিয়ে গাড়ি বা হেঁটে যাওয়ার চেষ্টা করবেন না।",
          "পরিবারের সদস্যদের ছাদে নিয়ে যান এবং অবস্থান জানান।",
        ],
        after: [
          "বন্যার জলে ভেজা কোনো খাবার খাবেন না।",
          "জল ফুটিয়ে বা ক্লোরিন দিয়ে বিশুদ্ধ করে পান করুন।",
        ],
      },
      mr: {
        before: [
          "आपल्या भागातील पुराचा धोका समजून घ्या.",
          "महत्त्वाचे सामान आणि औषधे वरच्या मजल्यावर ठेवा.",
        ],
        during: [
          "पाणी घरात शिरण्यापूर्वी वीज आणि गॅस बंद करा.",
          "वाहत्या पाण्यातून चालणे किंवा गाडी चालवणे टाळा.",
        ],
        after: [
          "पाणी उकळूनच प्या आणि दूषित अन्न खाऊ नका.",
        ],
      },
      ta: {
        before: [
          "உங்கள் பகுதியின் வெள்ள அபாயத்தை முன்கூட்டியே தெரிந்து கொள்ளுங்கள்.",
          "மருந்துகள் மற்றும் அவசர பொருட்களை உயரமான இடத்தில் வைக்கவும்.",
        ],
        during: [
          "மின்சாரத்தை உடனடியாக அணைக்கவும்.",
          "வெள்ள நீரில் நடக்கவோ அல்லது வாகனம் ஓட்டவோ கூடாது.",
        ],
        after: [
          "காய்ச்சிய தண்ணீரை மட்டுமே குடிக்கவும்.",
        ],
      },
      te: {
        before: [
          "వరద ప్రమాద తీవ్రతను ఎప్పటికప్పుడు గమనించండి.",
          "అవసరమైన సామాగ్రిని ఎత్తైన ప్రదేశంలో భద్రపరచండి.",
        ],
        during: [
          "విద్యుత్ సరఫరాను వెంటనే నిలిపివేయండి.",
          "వరద ప్రవాహంలో నడవడం లేదా డ్రైవింగ్ చేయడం చేయవద్దు.",
        ],
        after: [
          "నీటిని కాచి చల్లార్చి మాత్రమే తాగండి.",
        ],
      },
      gu: {
        before: [
          "તમારા વિસ્તારમાં પૂરના જોખમથી માહિતગાર રહો.",
          "દવાઓ અને જરૂરી સામાન ઊંચાઈ પર મૂકો.",
        ],
        during: [
          "વીજ સ્વિચ અને ગેસ તરત બંધ કરો.",
          "વહેતા પાણીમાં વાહન ચલાવવું નહીં.",
        ],
        after: [
          "ઉકાળેલું પાણી પીવો અને રોગચાળાથી બચો.",
        ],
      },
      kn: {
        before: [
          "ನಿಮ್ಮ ಪ್ರದೇಶದ ಪ್ರವಾಹ ಅಪಾಯದ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಿ.",
          "ಅಗತ್ಯ ಔಷಧಿ ಮತ್ತು ಆಹಾರವನ್ನು ಎತ್ತರದ ಸ್ಥಳದಲ್ಲಿಡಿ.",
        ],
        during: [
          "ವಿದ್ಯುತ್ ಮತ್ತು ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಿ.",
          "ಹರಿಯುವ ನೀರಿನಲ್ಲಿ ವಾಹನ ಚಲಾಯಿಸಬೇಡಿ.",
        ],
        after: [
          "ಕಾಯಿಸಿ ಆರಿಸಿದ ನೀರನ್ನೇ ಕುಡಿಯಿರಿ.",
        ],
      },
    },
  },
  {
    id: "avalanches",
    nameKey: "Avalanches",
    names: {
      en: "Avalanches",
      hi: "हिमस्खलन (Avalanches)",
      bn: "তুষারপাত (Avalanches)",
      mr: "हिमस्खलन (Avalanches)",
      ta: "பனிச்சரிவு (Avalanches)",
      te: "హిమపాతం (Avalanches)",
      gu: "હિમપ્રપાત (Avalanches)",
      kn: "ಹಿಮಪಾತ (Avalanches)",
    },
    icon: "Mountain",
    helpline: "High-Altitude Rescue / SDRF: 9456596190 / 112",
    helplinePhone: "9456596190",
    videoTitle: "#Avalanche | High Altitude Survival Protocols",
    content: {
      en: {
        before: [
          "Check Snow & Avalanche Study Establishment (SASE/DGRE) bulletins before traveling high-altitude mountain passes.",
          "Always carry an avalanche beacon, collapsible rescue probe, and emergency snow shovel.",
          "Avoid slopes between 30° and 45° where dry slab avalanches trigger most easily.",
          "Never venture into avalanche terrain alone; travel in single file with safety spacing.",
        ],
        during: [
          "If caught in an avalanche slide, jettison skis and heavy backpacks immediately.",
          "Use vigorous swimming motions to stay near the moving snow surface as long as possible.",
          "As the slide slows, cup your hands over your mouth and nose to form a critical breathing air pocket.",
          "Thrust one arm upward toward the surface before snow sets rock-hard.",
        ],
        after: [
          "Remain calm and conserve oxygen; avoid shouting unless you hear rescuers directly overhead.",
          "Survivors should switch avalanche beacons to 'Receive / Search' mode immediately.",
          "Alert SDRF Mountain Rescue and begin probing systematically without delay.",
        ],
      },
      hi: {
        before: [
          "बर्फीले पर्वतीय इलाकों में जाने से पहले हिमस्खलन चेतावनी बुलेटिन अवश्य जांचें।",
          "हमेशा एवलांच बीकन, जांच पोल और बर्फ का फावड़ा साथ रखें।",
          "30 से 45 डिग्री ढलान वाले जोखिम भरे क्षेत्रों में जाने से बचें।",
          "कभी भी अकेले न जाएं; सुरक्षा दूरी बनाकर एक पंक्ति में चलें।",
        ],
        during: [
          "हिमस्खलन की चपेट में आने पर भारी बैकपैक और उपकरण तुरंत फेंक दें।",
          "बर्फ की सतह पर बने रहने के लिए तैरने जैसी शारीरिक हरकतें करें।",
          "बर्फ रुकते ही मुंह और नाक के आगे दोनों हाथों से हवा का पॉकेट बना लें।",
          "बर्फ जमने से पहले एक हाथ ऊपर की ओर निकालने का प्रयास करें।",
        ],
        after: [
          "शांत रहें और ऑक्सीजन बचाएं; केवल बचाव दल की आवाज आने पर ही चिल्लाएं।",
          "बचे हुए साथी तुरंत बीकन को सर्च मोड में डालकर खोज शुरू करें।",
          "एसडीआरएफ माउंटेन रेस्क्यू टीम 9456596190 को तुरंत सूचित करें।",
        ],
      },
      bn: {
        before: [
          "তুষারাবৃত পর্বতে যাওয়ার আগে আবহাওয়া ও তুষারপাতের খবর রাখুন।",
          "অ্যাভালঞ্চ বীকন ও জরুরি উদ্ধার সরঞ্জাম সঙ্গে রাখুন।",
        ],
        during: [
          "ভারী ব্যাকপ্যাক ফেলে সাঁতারের গতি ব্যবহার করে তুষারের উপরে থাকার চেষ্টা করুন।",
          "মুখের উপর হাত দিয়ে বাতাসের পকেট তৈরি করুন যাতে শ্বাস নেওয়া যায়।",
        ],
        after: [
          "অক্সিজেন বাঁচাতে শান্ত থাকুন এবং উদ্ধারকারী দল এলে শব্দ করুন।",
        ],
      },
      mr: {
        before: [
          "बर्फाच्छादित पर्वतात जाताना हिमस्खलनाचा इशारा तपासा.",
        ],
        during: [
          "बर्फाच्या वर राहण्यासाठी पोहण्यासारखी हालचाल करा.",
          "तोंडासमोर हात ठेवून श्वास घेण्यासाठी हवेची पोकळी तयार करा.",
        ],
        after: [
          "शांत राहा आणि ऑक्सिजन वाचवा.",
        ],
      },
      ta: {
        before: [
          "பனிச்சரிவு எச்சரிக்கைகளை முன்கூட்டியே கவனிக்கவும்.",
        ],
        during: [
          "சுவாசிக்க காற்று இடைவெளி உருவாக்க கைகளை முகத்தின் முன் வைக்கவும்.",
        ],
        after: [
          "ஆக்ஸிஜனை சேமிக்க அமைதியாக இருக்கவும்.",
        ],
      },
      te: {
        before: [
          "పర్వత ప్రాంతాలలో ప్రయాణించే ముందు హిమపాత హెచ్చరికలు తెలుసుకోండి.",
        ],
        during: [
          "శ్వాస తీసుకోవడానికి ముఖం ముందు గాలి పాకెట్ ఏర్పరచండి.",
        ],
        after: [
          "ఆక్సిజన్ ఆదా చేయడానికి ప్రశాంతంగా ఉండండి.",
        ],
      },
      gu: {
        before: [
          "બરફીલા પહાડી વિસ્તારોમાં હિમપ્રપાતની ચેતવણી તપાસો.",
        ],
        during: [
          "શ્વાસ લેવા માટે મોં સામે હવાની જગ્યા બનાવો.",
        ],
        after: [
          "ઓક્સિજન બચાવવા માટે શાંત રહો.",
        ],
      },
      kn: {
        before: [
          "ಹಿಮಪಾತ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
        ],
        during: [
          "ಉಸಿರಾಡಲು ಮುಖದ ಮುಂದೆ ಗಾಳಿಯ ಜಾಗ ಮಾಡಿಕೊಳ್ಳಿ.",
        ],
        after: [
          "ಆಮ್ಲಜನಕ ಉಳಿಸಲು ಶಾಂತರಾಗಿರಿ.",
        ],
      },
    },
  },
  {
    id: "earthquakes",
    nameKey: "Earthquakes",
    names: {
      en: "Earthquakes",
      hi: "भूकंप (Earthquakes)",
      bn: "ভূমিকম্প (Earthquakes)",
      mr: "भूकंप (Earthquakes)",
      ta: "நிலநடுக்கம் (Earthquakes)",
      te: "భూకంపాలు (Earthquakes)",
      gu: "ધરતીકંપ (Earthquakes)",
      kn: "ಭೂಕಂಪ (Earthquakes)",
    },
    icon: "Activity",
    helpline: "National Disaster Relief: 1070 / 112",
    helplinePhone: "1070",
    videoTitle: "#Earthquake | Drop, Cover, Hold On Drills",
    content: {
      en: {
        before: [
          "Fasten heavy furniture, cupboards, and water heaters securely to wall studs.",
          "Identify safe structural spots in every room: under sturdy desks, interior load-bearing walls.",
          "Keep flashlights, whistle, fire extinguisher, and first aid kit easily accessible.",
          "Educate all family members on how to turn off main gas, electricity, and water valves.",
        ],
        during: [
          "DROP to your hands and knees immediately.",
          "COVER your head and neck under a sturdy table or desk.",
          "HOLD ON to your shelter until shaking completely stops.",
          "If outdoors, move to open ground away from buildings, power lines, and flyovers.",
          "Never use elevators or stairwells during active shaking.",
        ],
        after: [
          "Be prepared for aftershocks which can cause further collapses.",
          "Inspect for gas leaks and fire hazards; do not light candles or electrical switches.",
          "Use a whistle or tap on pipes if trapped under debris to signal rescuers.",
          "Listen to battery-operated radio for official emergency instructions.",
        ],
      },
      hi: {
        before: [
          "भारी अलमारियों और पानी की टंकियों को दीवारों से मजबूती से बांधें।",
          "घर के मजबूत सुरक्षित स्थानों की पहचान करें जैसे मजबूत मेज के नीचे।",
          "टॉर्च, सीटी, प्राथमिक चिकित्सा किट आसानी से मिलने वाले स्थान पर रखें।",
          "परिवार के सभी सदस्यों को गैस और बिजली बंद करने का तरीका सिखाएं।",
        ],
        during: [
          "झुकें (DROP): तुरंत घुटनों के बल बैठ जाएं।",
          "ढकें (COVER): किसी मजबूत मेज के नीचे सिर और गर्दन को सुरक्षित करें।",
          "पकड़ें (HOLD ON): जब तक कंपन रुके नहीं, मेज को मजबूती से पकड़े रहें।",
          "यदि बाहर हैं तो इमारतों, बिजली के खंभों और पुलों से दूर खुले मैदान में जाएं।",
          "भूकंप के दौरान कभी भी लिफ्ट का उपयोग न करें।",
        ],
        after: [
          "मुख्य झटकों के बाद आने वाले आफ्टरशॉक्स के लिए तैयार रहें।",
          "गैस रिसाव की जांच करें; माचिस या बिजली स्विच न चलाएं।",
          "मलबे में फंसने पर सीटी बजाएं या धातु के पाइप पर चोट करके आवाज करें।",
          "केवल आधिकारिक आपातकालीन रेडियो बुलेटिन पर भरोसा करें।",
        ],
      },
      bn: {
        before: [
          "ভারী আসবাবপত্র শক্ত করে দেয়ালের সঙ্গে আটকে রাখুন।",
          "টেবিল বা খাটের নিচে নিরাপদ স্থান চিহ্নিত করুন।",
        ],
        during: [
          "ড্রপ, কভার এবং হোল্ড অন পদ্ধতি অনুসরণ করুন।",
          "মাটি কাঁপলে ঘরের বাইরে ছুটোছুটি করবেন না বা লিফট ব্যবহার করবেন না।",
        ],
        after: [
          "পরবর্তী কম্পন বা আফটারশকের জন্য প্রস্তুত থাকুন।",
          "ধসে পড়া বাড়িঘর থেকে দূরে থাকুন।",
        ],
      },
      mr: {
        before: [
          "घरातील जड वस्तू सुरक्षित बांधून ठेवा.",
        ],
        during: [
          "खाली वाका, डोके झाका आणि घट्ट पकडा.",
          "लिफ्टचा वापर करू नका.",
        ],
        after: [
          "गॅस आणि विजेची तपासणी करा.",
        ],
      },
      ta: {
        before: [
          "கனமான பொருட்களை சுவருடன் உறுதியாக பொருத்தவும்.",
        ],
        during: [
          "கீழே குனிந்து, தலையை மூடிக்கொண்டு, மேசையை இறுகப் பிடிக்கவும்.",
        ],
        after: [
          "மீண்டும் வரும் நில அதிர்வுகளுக்கு தயாராக இருக்கவும்.",
        ],
      },
      te: {
        before: [
          "భారీ వస్తువులను గోడలకు గట్టిగా బిగించండి.",
        ],
        during: [
          "కిందకు వంగండి, తలను కవర్ చేసుకోండి, గట్టిగా పట్టుకోండి.",
        ],
        after: [
          "తదుపరి ప్రకంపనలకు సిద్ధంగా ఉండండి.",
        ],
      },
      gu: {
        before: [
          "ભારે ફર્નિચરને દિવાલ સાથે સુરક્ષિત રીતે જોડો.",
        ],
        during: [
          "નીચે બેસો, માથું ઢાંકો અને મજબૂતીથી પકડો.",
        ],
        after: [
          "આફ્ટરશોક્સ માટે તૈયાર રહો.",
        ],
      },
      kn: {
        before: [
          "ಭಾರವಾದ ಪೀಠೋಪಕರಣಗಳನ್ನು ಗೋಡೆಗೆ ಭದ್ರಪಡಿಸಿ.",
        ],
        during: [
          "ಕೆಳಗೆ ಬಗ್ಗಿ, ತಲೆಯನ್ನು ರಕ್ಷಿಸಿಕೊಳ್ಳಿ ಮತ್ತು ಗಟ್ಟಿಯಾಗಿ ಹಿಡಿದುಕೊಳ್ಳಿ.",
        ],
        after: [
          "ನಂತರದ ಕಂಪನಗಳ ಬಗ್ಗೆ ಎಚ್ಚರವಿರಲಿ.",
        ],
      },
    },
  },
  {
    id: "heat-waves",
    nameKey: "Heat Waves",
    names: {
      en: "Heat Waves",
      hi: "लू / अत्यधिक गर्मी (Heat Waves)",
      bn: "তাপপ্রবাহ (Heat Waves)",
      mr: "उष्णतेची लाट (Heat Waves)",
      ta: "வெப்ப அலை (Heat Waves)",
      te: "వడగాల్పులు (Heat Waves)",
      gu: "હીટવેવ (Heat Waves)",
      kn: "ಬಿಸಿಗಾಳಿ (Heat Waves)",
    },
    icon: "Sun",
    helpline: "Health Emergency / 108 / 112",
    helplinePhone: "108",
    videoTitle: "#Heatwave | Hydration & Heatstroke Protection",
    content: {
      en: {
        before: [
          "Monitor daily IMD maximum temperature forecasts and heatwave alerts.",
          "Stock ORS, glucose, lemon, and oral rehydration fluids at home.",
          "Keep curtains, shutters, and sunshades drawn during afternoon hours.",
        ],
        during: [
          "Avoid direct sun exposure between 12:00 noon and 3:30 PM.",
          "Drink adequate water at regular intervals, even if not feeling thirsty.",
          "Wear loose, lightweight, light-colored cotton clothing and wide-brimmed hats.",
          "Never leave infants, children, or pets locked inside parked vehicles.",
        ],
        after: [
          "If someone shows heatstroke symptoms (high fever, unconsciousness, confusion), move them to shade immediately.",
          "Apply wet cloths or ice packs to the neck, armpits, and groin; call 108 immediately.",
        ],
      },
      hi: {
        before: [
          "मौसम विभाग के दैनिक तापमान पूर्वानुमान और लू चेतावनी पर नजर रखें।",
          "घर में ओआरएस, ग्लूकोज, नींबू और जीवनरक्षक घोल तैयार रखें।",
          "दोपहर में घर की खिड़कियों पर पर्दे लगाकर धूप रोकें।",
        ],
        during: [
          "दोपहर 12:00 से 3:30 बजे के बीच सीधी धूप में निकलने से बचें।",
          "प्यास न लगने पर भी नियमित अंतराल पर पर्याप्त पानी पिएं।",
          "हल्के रंग के ढीले सूती कपड़े पहनें और सिर को ढककर रखें।",
          "बच्चों और पालतू जानवरों को कभी भी बंद कार में न छोड़ें।",
        ],
        after: [
          "लू या हीटस्ट्रोक के लक्षण दिखने पर मरीज को तुरंत छांव में लिटाएं।",
          "शरीर पर गीला कपड़ा रखें और तुरंत 108 एम्बुलेंस को कॉल करें।",
        ],
      },
      bn: {
        before: ["তাপপ্রবাহের সতর্কবার্তা সম্পর্কে সচেতন থাকুন।"],
        during: [
          "দুপুর ১২টা থেকে ৩টা পর্যন্ত রোদে বের হবেন না।",
          "প্রচুর জল, ওআরএস এবং লেবুর শরবত পান করুন।",
        ],
        after: ["সানস্ট্রোকের লক্ষণ দেখলে রোগীকে ঠান্ডা স্থানে নিন ও ১০৮ কল করুন।"],
      },
      mr: {
        before: ["उष्णतेच्या लाटेच्या इशाऱ्याकडे लक्ष ठेवा."],
        during: ["दुपारी उन्हात जाणे टाळा आणि भरपूर पाणी प्या."],
        after: ["उष्माघात झाल्यास त्वरित १०८ वर संपर्क करा."],
      },
      ta: {
        before: ["வெப்பநிலை முன்னறிவிப்புகளை கவனிக்கவும்."],
        during: ["மதியம் வெயிலில் செல்ல வேண்டாம்; நிறைய தண்ணீர் குடிக்கவும்."],
        after: ["சூரிய பக்கவாதம் ஏற்பட்டால் உடனடியாக 108-ஐ அழைக்கவும்."],
      },
      te: {
        before: ["వాతావరణ హెచ్చరికలను గమనించండి."],
        during: ["మధ్యాహ్నం ఎండలో వెళ్లవద్దు, తగినంత నీరు తాగండి."],
        after: ["వడదెబ్బ తగిలితే వెంటనే 108కు కాల్ చేయండి."],
      },
      gu: {
        before: ["તાપમાનની આગાહી પર નજર રાખો."],
        during: ["બપોરે તડકામાં જવાનું ટાળો અને પુષ્કળ પાણી પીવો."],
        after: ["લૂ લાગે તો તાત્કાલિક ૧૦૮ પર ફોન કરો."],
      },
      kn: {
        before: ["ತಾಪಮಾನ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಗಮನಿಸಿ."],
        during: ["ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಲಿನಲ್ಲಿ ಹೋಗಬೇಡಿ; ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ."],
        after: ["ಬಿಸಿಲಿನ ಆಘಾತವಾದರೆ ತಕ್ಷಣ 108ಕ್ಕೆ ಕರೆ ಮಾಡಿ."],
      },
    },
  },
  {
    id: "lightning",
    nameKey: "Lightning",
    names: {
      en: "Lightning & Storms",
      hi: "आकाशीय बिजली (Lightning)",
      bn: "বজ্রপাত (Lightning)",
      mr: "वीज पडणे (Lightning)",
      ta: "மின்னல் (Lightning)",
      te: "పిడుగుపాటు (Lightning)",
      gu: "વીજળી પડવી (Lightning)",
      kn: "ಮಿಂಚು ಮತ್ತು ಗುಡುಗು (Lightning)",
    },
    icon: "Zap",
    helpline: "Emergency Services: 112",
    helplinePhone: "112",
    videoTitle: "#Lightning | 30-30 Safety Rule Drills",
    content: {
      en: {
        before: [
          "Check local weather radar and thunderstorm warnings before planning outdoor travel.",
          "Install lightning arresters on rooftops of buildings.",
        ],
        during: [
          "Follow the 30-30 Rule: If time between flash and thunder is under 30 seconds, go indoors immediately.",
          "Never take shelter under tall trees, hilltops, metal sheds, or utility poles.",
          "If caught in an open field, crouch in a ball with feet together, hands over ears (do not lie flat).",
          "Stay away from water bodies, ponds, and wet paddy fields.",
        ],
        after: [
          "Stay indoors for at least 30 minutes after hearing the last clap of thunder.",
          "Lightning victims carry no electrical charge; administer CPR and call 112 immediately.",
        ],
      },
      hi: {
        before: [
          "मौसम विभाग की आंधी और वज्रपात चेतावनी पर ध्यान दें।",
          "इमारतों पर तड़ित चालक (लाइटनिंग अरेस्टर) लगवाएं।",
        ],
        during: [
          "30-30 नियम अपनाएं: बिजली चमकने और गड़गड़ाहट में 30 सेकंड से कम अंतर हो तो तुरंत पक्के मकान में जाएं।",
          "ऊंचे पेड़ों, बिजली के खंभों, टीन शेड या पानी के पास कभी न खड़े हों।",
          "खुले मैदान में फंसने पर दोनों पैरों को जोड़कर घुटनों के बल उकड़ू बैठें (जमीन पर सीधे न लेटें)।",
          "खेतों और जलाशयों से तुरंत बाहर आएं।",
        ],
        after: [
          "अंतिम गड़गड़ाहट के बाद भी कम से कम 30 मिनट तक सुरक्षित स्थान पर रहें।",
          "बिजली से प्रभावित व्यक्ति में कोई करंट नहीं होता; तुरंत सीपीआर दें और 112 पर कॉल करें।",
        ],
      },
      bn: {
        before: ["বজ্রপাতের পূর্বাভাস খেয়াল রাখুন।"],
        during: [
          "খোলা মাঠ বা গাছের নিচে আশ্রয় নেবেন না।",
          "পায়ে ভর দিয়ে উবু হয়ে বসুন, মাটিতে শুয়ে পড়বেন না।",
        ],
        after: ["আক্রান্ত ব্যক্তিকে সঙ্গে সঙ্গে হাসপাতালে নিয়ে যান।"],
      },
      mr: {
        before: ["विजांचा इशारा तपासा."],
        during: ["झाडाखाली उभे राहू नका; सुरक्षित इमारतीत आश्रय घ्या."],
        after: ["विजेचा धक्का बसलेल्या व्यक्तीला त्वरित सीपीआर द्या."],
      },
      ta: {
        before: ["இடி மின்னல் எச்சரிக்கையை கவனியுங்கள்."],
        during: ["மரங்களின் கீழ் நிற்க வேண்டாம்; பாதுகாப்பான கட்டிடத்திற்கு செல்லவும்."],
        after: ["பாதிக்கப்பட்டவருக்கு உடனடியாக முதலுதவி அளிக்கவும்."],
      },
      te: {
        before: ["ఉరుములు, మెరుపుల హెచ్చరికలను గమనించండి."],
        during: ["చెట్ల కింద ఉండవద్దు; సురక్షితమైన భవనంలో ఆశ్రయం పొందండి."],
        after: ["బాధిత వ్యక్తికి వెంటనే సీపీఆర్ అందించి 112కు కాల్ చేయండి."],
      },
      gu: {
        before: ["વીજળીની ચેતવણી ધ્યાનમાં રાખો."],
        during: ["ઝાડ નીચે ઊભા ન રહેશો; ખુલ્લા મેદાનમાંથી તરત હટી જાઓ."],
        after: ["ઈજાગ્રસ્ત વ્યક્તિને તાત્કાલિક હોસ્પિટલ પહોંચાડો."],
      },
      kn: {
        before: ["ಮಿಂಚಿನ ಮುನ್ಸೂಚನೆಗಳನ್ನು ಗಮನಿಸಿ."],
        during: ["ಮರಗಳ ಕೆಳಗೆ ನಿಲ್ಲಬೇಡಿ; ಸುರಕ್ಷಿತ ಕಟ್ಟಡದೊಳಗೆ ತೆರಳಿ."],
        after: ["ಗಾಯಾಳುಗಳಿಗೆ ತಕ್ಷಣ ಸಿಪಿಆರ್ ನೀಡಿ 112ಕ್ಕೆ ಕರೆ ಮಾಡಿ."],
      },
    },
  },
  {
    id: "tsunamis",
    nameKey: "Tsunamis",
    names: {
      en: "Tsunamis",
      hi: "सुनामी (Tsunamis)",
      bn: "সুনামি (Tsunamis)",
      mr: "सुनामी (Tsunamis)",
      ta: "சுனாமி (Tsunamis)",
      te: "సునామీ (Tsunamis)",
      gu: "સુનામી (Tsunamis)",
      kn: "ಸುನಾಮಿ (Tsunamis)",
    },
    icon: "Waves",
    helpline: "INCOIS Tsunami Early Warning / 112",
    helplinePhone: "112",
    videoTitle: "#Tsunami | Coastal Inundation & High Ground Routes",
    content: {
      en: {
        before: [
          "Know coastal evacuation zones and routes to high ground (at least 30m above sea level or 2km inland).",
          "Familiarize yourself with INCOIS Indian Ocean Tsunami Warning alerts.",
        ],
        during: [
          "If you feel a strong coastal earthquake or see ocean water receding drastically, run inland to high ground immediately.",
          "Do not wait for official sirens; nature's warning signs require instant action.",
          "Never go to the beach to watch a tsunami wave.",
        ],
        after: [
          "Stay on high ground; tsunami waves come in a series over several hours, and subsequent waves are often larger.",
          "Do not return to coastal ports until the all-clear is issued by naval authorities.",
        ],
      },
      hi: {
        before: [
          "तटीय क्षेत्रों में सुरक्षित ऊंचे स्थानों (समुद्र तल से 30 मीटर ऊपर या 2 किमी अंदर) की जानकारी रखें।",
          "आईएनसीओआईएस सुनामी पूर्व चेतावनी प्रणाली के संकेतों को समझें।",
        ],
        during: [
          "समुद्र तट पर तेज भूकंप महसूस होने या समुद्र का पानी अचानक पीछे हटने पर तुरंत ऊंचे स्थान की ओर दौड़ें।",
          "सायरन का इंतजार न करें; समुद्र का अचानक पीछे जाना सुनामी का सीधा संकेत है।",
          "सुनामी की लहरें देखने समुद्र तट पर कभी न जाएं।",
        ],
        after: [
          "ऊंचे स्थान पर बने रहें; सुनामी की कई लहरें आती हैं और बाद की लहरें अधिक विनाशकारी होती हैं।",
          "प्रशासन की आधिकारिक घोषणा से पहले तटीय इलाकों में न लौटें।",
        ],
      },
      bn: {
        before: ["উপকূলীয় নিরাপদ আশ্রয়স্থলের খোঁজ রাখুন।"],
        during: [
          "সমুদ্রের জল হঠাৎ নেমে গেলে দ্রুত উঁচু স্থানে চলে যান।",
          "সুনামির ঢেউ দেখতে সমুদ্র সৈকতে যাবেন না।",
        ],
        after: ["প্রশাসনের অনুমতি না পাওয়া পর্যন্ত উপকূলে ফিরবেন না।"],
      },
      mr: {
        before: ["किनारपट्टीवरील उंच सुरक्षित जागांची माहिती ठेवा."],
        during: ["समुद्राचे पाणी अचानक मागे ओसरल्यास त्वरित उंच जागी पळा."],
        after: ["सुनामीच्या लाटा एकापाठोपाठ येतात, त्यामुळे उंच जागीच राहा."],
      },
      ta: {
        before: ["கடலோர பாதுகாப்பான பகுதிகளை தெரிந்து கொள்ளுங்கள்."],
        during: ["கடல் நீர் உள்வாங்கினால் உடனடியாக உயரமான இடத்திற்கு ஓடவும்."],
        after: ["கடற்கரைக்கு உடனடியாக திரும்ப வேண்டாம்."],
      },
      te: {
        before: ["తీరప్రాంత సురక్షిత ప్రాంతాల వివరాలు తెలుసుకోండి."],
        during: ["సముద్రం అకస్మాత్తుగా వెనక్కి తగ్గితే వెంటనే ఎత్తైన ప్రాంతానికి వెళ్లండి."],
        after: ["అధికారిక ప్రకటన వచ్చే వరకు తీరానికి రావద్దు."],
      },
      gu: {
        before: ["દરિયાકાંઠાના સલામત સ્થળોની માહિતી રાખો."],
        during: ["દરિયાનું પાણી અચાનક પાછળ હટે તો ઊંચાઈવાળા સ્થળે ભાગો."],
        after: ["તંત્રની મંજૂરી વિના કાંઠે પાછા ન ફરો."],
      },
      kn: {
        before: ["ಕರಾವಳಿಯ ಸುರಕ್ಷಿತ ಎತ್ತರದ ಸ್ಥಳಗಳ ಬಗ್ಗೆ ತಿಳಿದಿರಲಿ."],
        during: ["ಸಮುದ್ರದ ನೀರು ಹಠಾತ್ ಹಿಂದಕ್ಕೆ ಸರಿದರೆ ತಕ್ಷಣ ಎತ್ತರದ ಸ್ಥಳಕ್ಕೆ ಓಡಿ."],
        after: ["ಅಧಿಕೃತ ಸೂಚನೆ ಬರುವವರೆಗೆ ಕರಾವಳಿಗೆ ಮರಳಬೇಡಿ."],
      },
    },
  },
  {
    id: "cold-wave",
    nameKey: "Cold Wave",
    names: {
      en: "Cold Wave",
      hi: "शीतलहर (Cold Wave)",
      bn: "শৈত্যপ্রবাহ (Cold Wave)",
      mr: "थंडीची लाट (Cold Wave)",
      ta: "குளிர் அலை (Cold Wave)",
      te: "శీతల గాలులు (Cold Wave)",
      gu: "શીત લહેર (Cold Wave)",
      kn: "ಶೀತಗಾಳಿ (Cold Wave)",
    },
    icon: "Wind",
    helpline: "Relief Shelter Helpline: 112",
    helplinePhone: "112",
    videoTitle: "#ColdWave | Hypothermia Prevention & Winter Safety",
    content: {
      en: {
        before: [
          "Stock sufficient warm clothes, blankets, and thermal wear for winter.",
          "Keep emergency room heaters inspected and ventilation safe.",
        ],
        during: [
          "Wear multiple layers of loose, warm woollen clothing rather than a single heavy layer.",
          "Keep head, neck, hands, and feet covered when stepping outside.",
          "Drink warm fluids frequently; avoid alcohol which actually increases hypothermia risk.",
          "Never leave room heaters burning overnight in unventilated closed rooms (carbon monoxide hazard).",
        ],
        after: [
          "Seek medical care immediately if experiencing numbness, shivering, or frostbite.",
        ],
      },
      hi: {
        before: [
          "सर्दियों से पहले पर्याप्त गर्म कपड़े, कंबल और जरूरी दवाइयां सुरक्षित रखें।",
          "कमरे को गर्म रखने वाले उपकरणों की सुरक्षा जांच करवाएं।",
        ],
        during: [
          "एक मोटे कपड़े की जगह कई परतों वाले ढीले ऊनी कपड़े पहनें।",
          "बाहर निकलते समय सिर, कान, हाथ और पैरों को पूरी तरह ढककर रखें।",
          "गुनगुना पानी और गर्म पेय पदार्थ पिएं; शराब का सेवन न करें।",
          "बंद कमरे में अंगीठी या हीटर जलाकर कभी न सोएं (कार्बन मोनोऑक्साइड का खतरा)।",
        ],
        after: [
          "शरीर में अत्यधिक कंपन या सुन्नता होने पर तुरंत डॉक्टर से संपर्क करें।",
        ],
      },
      bn: {
        before: ["শীতের আগে পর্যাপ্ত গরম কাপড়ের ব্যবস্থা রাখুন।"],
        during: [
          "একাধিক স্তরের গরম পোশাক পরুন।",
          "বন্ধ ঘরে হিটার বা আগুন জ্বালিয়ে ঘুমাবেন না।",
        ],
        after: ["অতিরিক্ত ঠান্ডা লাগলে ডাক্তারের পরামর্শ নিন।"],
      },
      mr: {
        before: ["उबदार कपडे आणि ब्लँकेट तयार ठेवा."],
        during: [
          "अंगात अनेक थरांचे गरम कपडे घाला.",
          "बंद खोलीत शेकोटी पेटवून झोपू नका.",
        ],
        after: ["अंग बधिर झाल्यास त्वरित डॉक्टरांचा सल्ला घ्या."],
      },
      ta: {
        before: ["குளிர்காலத்திற்கு தேவையான கம்பளி ஆடைகளை தயார் செய்யவும்."],
        during: ["உடலை முழுமையாக மூடும் ஆடைகளை அணியுங்கள்."],
        after: ["உடல்நலம் பாதிக்கப்பட்டால் மருத்துவரை அணுகவும்."],
      },
      te: {
        before: ["శీతాకాలానికి సరిపడా వెచ్చని దుస్తులు సిద్ధం చేసుకోండి."],
        during: ["మూసి ఉన్న గదిలో హీటర్లు వెలిగించి నిద్రపోవద్దు."],
        after: ["చలి తీవ్రతకు గురైతే వైద్య సహాయం పొందండి."],
      },
      gu: {
        before: ["ગરમ કપડાં અને ધાબળા તૈયાર રાખો."],
        during: [
          "ગરમ કપડાંના કેટલાક સ્તરો પહેરો.",
          "બંધ ઓરડામાં સગડી સળગાવીને સૂવું નહીં.",
        ],
        after: ["ઠંડીની તીવ્ર અસર થાય તો તાત્કાલિક સારવાર લો."],
      },
      kn: {
        before: ["ಚಳಿಗಾಲಕ್ಕೆ ಅಗತ್ಯವಾದ ಉಣ್ಣೆ ಬಟ್ಟೆಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ."],
        during: ["ಮುಚ್ಚಿದ ಕೋಣೆಯಲ್ಲಿ ಹೀಟರ್ ಹಚ್ಚಿ ಮಲಗಬೇಡಿ."],
        after: ["ವಿಪರೀತ ಚಳಿ ಅನಿಸಿದರೆ ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ."],
      },
    },
  },
];
