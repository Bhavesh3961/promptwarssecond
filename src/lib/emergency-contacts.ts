export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  telUri: string;
  category: "all" | "police" | "medical" | "fire" | "disaster" | "traffic";
  desc: string;
  isPrimary?: boolean;
}

export interface RegionEmergencyData {
  regionName: string;
  stateCode: string;
  contacts: EmergencyContact[];
}

const REGIONS: {
  name: string;
  code: string;
  lat: number;
  lng: number;
  contacts: EmergencyContact[];
}[] = [
  {
    name: "Delhi NCR",
    code: "DL",
    lat: 28.6139,
    lng: 77.209,
    contacts: [
      {
        id: "dl-112",
        name: "National Unified Emergency",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "24/7 Police, Ambulance & Fire Dispatch",
        isPrimary: true,
      },
      {
        id: "dl-police",
        name: "Delhi Police Command HQ",
        phone: "011-23469112",
        telUri: "tel:01123469112",
        category: "police",
        desc: "Direct Police Control Room",
      },
      {
        id: "dl-ambulance",
        name: "CATS Ambulance Service",
        phone: "102",
        telUri: "tel:102",
        category: "medical",
        desc: "Government Emergency Ambulance",
      },
      {
        id: "dl-traffic",
        name: "Delhi Traffic Police Helpline",
        phone: "011-25844444",
        telUri: "tel:01125844444",
        category: "traffic",
        desc: "Accident & Gridlock Clearance",
      },
      {
        id: "dl-disaster",
        name: "DDMA Disaster Control",
        phone: "1077",
        telUri: "tel:1077",
        category: "disaster",
        desc: "Flood & Building Collapse Relief",
      },
    ],
  },
  {
    name: "Mumbai & Maharashtra",
    code: "MH",
    lat: 19.076,
    lng: 72.8777,
    contacts: [
      {
        id: "mh-112",
        name: "Maharashtra 112 ERSS",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "Statewide Unified Response",
        isPrimary: true,
      },
      {
        id: "mh-bmc",
        name: "BMC Disaster Management",
        phone: "1916",
        telUri: "tel:1916",
        category: "disaster",
        desc: "Monsoon & Urban Flooding Cell",
      },
      {
        id: "mh-police",
        name: "Mumbai Police Control Room",
        phone: "022-22620111",
        telUri: "tel:02222620111",
        category: "police",
        desc: "City Emergency Ops",
      },
      {
        id: "mh-ambulance",
        name: "MEMS Ambulance 108",
        phone: "108",
        telUri: "tel:108",
        category: "medical",
        desc: "Emergency Medical Dispatch",
      },
      {
        id: "mh-traffic",
        name: "Mumbai Traffic Police WhatsApp/Call",
        phone: "8454999999",
        telUri: "tel:8454999999",
        category: "traffic",
        desc: "Green Corridor & Road Clearance",
      },
    ],
  },
  {
    name: "Bengaluru & Karnataka",
    code: "KA",
    lat: 12.9716,
    lng: 77.5946,
    contacts: [
      {
        id: "ka-112",
        name: "Karnataka Namma 112",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "Unified First Responder Grid",
        isPrimary: true,
      },
      {
        id: "ka-ambulance",
        name: "Arogya Kavacha Ambulance",
        phone: "108",
        telUri: "tel:108",
        category: "medical",
        desc: "Trauma & ICU Transit",
      },
      {
        id: "ka-traffic",
        name: "BTP Traffic Management",
        phone: "080-22943030",
        telUri: "tel:08022943030",
        category: "traffic",
        desc: "Traffic Corridors & Congestion",
      },
      {
        id: "ka-bbmp",
        name: "BBMP Disaster Control",
        phone: "080-22660000",
        telUri: "tel:08022660000",
        category: "disaster",
        desc: "Tree Fall & Waterlogging Unit",
      },
    ],
  },
  {
    name: "Kolkata & West Bengal",
    code: "WB",
    lat: 22.5726,
    lng: 88.3639,
    contacts: [
      {
        id: "wb-112",
        name: "Bengal Unified ERSS",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "Unified Emergency Grid",
        isPrimary: true,
      },
      {
        id: "wb-police",
        name: "Lalbazar Police Control",
        phone: "033-22143024",
        telUri: "tel:03322143024",
        category: "police",
        desc: "Kolkata Police Command",
      },
      {
        id: "wb-ambulance",
        name: "Kolkata Emergency Ambulance",
        phone: "102",
        telUri: "tel:102",
        category: "medical",
        desc: "Medical Transportation",
      },
      {
        id: "wb-disaster",
        name: "WB Disaster Management",
        phone: "1070",
        telUri: "tel:1070",
        category: "disaster",
        desc: "Cyclone & Flood Operations",
      },
    ],
  },
  {
    name: "Chennai & Tamil Nadu",
    code: "TN",
    lat: 13.0827,
    lng: 80.2707,
    contacts: [
      {
        id: "tn-112",
        name: "Tamil Nadu Unified 112",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "Unified First Responders",
        isPrimary: true,
      },
      {
        id: "tn-ambulance",
        name: "Tamil Nadu 108 EMS",
        phone: "108",
        telUri: "tel:108",
        category: "medical",
        desc: "Free Emergency Ambulance",
      },
      {
        id: "tn-police",
        name: "Greater Chennai Police",
        phone: "044-23452359",
        telUri: "tel:04423452359",
        category: "police",
        desc: "Police Control Center",
      },
      {
        id: "tn-disaster",
        name: "TNDMA State Control Room",
        phone: "1070",
        telUri: "tel:1070",
        category: "disaster",
        desc: "Coastal Cyclone & Rain Watch",
      },
    ],
  },
  {
    name: "Hyderabad & Telangana",
    code: "TG",
    lat: 17.385,
    lng: 78.4867,
    contacts: [
      {
        id: "tg-112",
        name: "Telangana 112 Dial",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "Police, Fire & Medical Service",
        isPrimary: true,
      },
      {
        id: "tg-ambulance",
        name: "GVK EMRI 108",
        phone: "108",
        telUri: "tel:108",
        category: "medical",
        desc: "Statewide Medical Response",
      },
      {
        id: "tg-police",
        name: "Hyderabad City Police",
        phone: "040-27852435",
        telUri: "tel:04027852435",
        category: "police",
        desc: "Command & Control Center",
      },
    ],
  },
  {
    name: "Uttarakhand & Himalayan Region",
    code: "UK",
    lat: 30.3165,
    lng: 78.0322,
    contacts: [
      {
        id: "uk-112",
        name: "Uttarakhand ERSS 112",
        phone: "112",
        telUri: "tel:112",
        category: "all",
        desc: "State Emergency Grid",
        isPrimary: true,
      },
      {
        id: "uk-sdrf",
        name: "SDRF High-Altitude Rescue",
        phone: "9456596190",
        telUri: "tel:9456596190",
        category: "disaster",
        desc: "Mountain Avalanche & Landslide Team",
      },
      {
        id: "uk-disaster",
        name: "USDMA Disaster Control",
        phone: "0135-2710334",
        telUri: "tel:01352710334",
        category: "disaster",
        desc: "Dehradun Central Operations",
      },
      {
        id: "uk-ambulance",
        name: "Hill EMS 108",
        phone: "108",
        telUri: "tel:108",
        category: "medical",
        desc: "Mountain Ambulance Dispatch",
      },
    ],
  },
];

const NATIONAL_FALLBACK: EmergencyContact[] = [
  {
    id: "nat-112",
    name: "National Emergency Helpline",
    phone: "112",
    telUri: "tel:112",
    category: "all",
    desc: "Single Unified Number for All Emergencies",
    isPrimary: true,
  },
  {
    id: "nat-108",
    name: "Emergency Medical & Ambulance",
    phone: "108",
    telUri: "tel:108",
    category: "medical",
    desc: "Free 24/7 Ambulance Dispatch",
  },
  {
    id: "nat-101",
    name: "Fire & Rescue Brigade",
    phone: "101",
    telUri: "tel:101",
    category: "fire",
    desc: "Fire Stations & Rescue Service",
  },
  {
    id: "nat-100",
    name: "Police Emergency",
    phone: "100",
    telUri: "tel:100",
    category: "police",
    desc: "Immediate Police Dispatch",
  },
  {
    id: "nat-1070",
    name: "National Disaster Relief (NDRF)",
    phone: "1070",
    telUri: "tel:1070",
    category: "disaster",
    desc: "Flood, Cyclone & Earthquake Help",
  },
  {
    id: "nat-1091",
    name: "Women Safety Helpline",
    phone: "1091",
    telUri: "tel:1091",
    category: "all",
    desc: "24/7 Women Crisis Response",
  },
];

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return r * c;
}

export function getEmergencyContactsForLocation(
  lat?: number | null,
  lng?: number | null
): RegionEmergencyData {
  if (lat == null || lng == null) {
    return {
      regionName: "Pan-India Unified (All States)",
      stateCode: "IN",
      contacts: NATIONAL_FALLBACK,
    };
  }

  let closestRegion = REGIONS[0];
  let minDistance = getDistanceKm(lat, lng, closestRegion.lat, closestRegion.lng);

  for (let i = 1; i < REGIONS.length; i++) {
    const dist = getDistanceKm(lat, lng, REGIONS[i].lat, REGIONS[i].lng);
    if (dist < minDistance) {
      minDistance = dist;
      closestRegion = REGIONS[i];
    }
  }

  if (minDistance > 450) {
    return {
      regionName: `Pan-India Unified (${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E)`,
      stateCode: "IN",
      contacts: NATIONAL_FALLBACK,
    };
  }

  return {
    regionName: `${closestRegion.name} (${minDistance < 50 ? "Nearby" : Math.round(minDistance) + "km away"})`,
    stateCode: closestRegion.code,
    contacts: closestRegion.contacts,
  };
}
