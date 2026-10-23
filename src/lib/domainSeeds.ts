import { StructuredAction } from "./firestore";

export interface DomainSeedItem {
  title: string;
  category: string;
  description: string;
  rawInput: string;
  inputType: "voice" | "medical" | "disaster" | "traffic" | "general";
  userName: string;
  userEmail: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Pending" | "Triage Verified" | "Units Dispatched" | "Resolved";
  structuredAction: StructuredAction;
}

export const DOMAIN_SEEDS: Record<string, DomainSeedItem[]> = {
  medical: [
    {
      title: "Acute Pediatric Anaphylaxis Triage",
      category: "Emergency Medical",
      description: "Messy prescription scribble: 'Pt 6yo peanut ingest, stridor+, bp 80/50, epi 0.15 given, icu bed req asap'.",
      rawInput: "Pt 6yo peanut ingest, stridor+, bp 80/50, epi 0.15 given, icu bed req asap no delay plz",
      inputType: "medical",
      userName: "Dr. Ananya Sharma",
      userEmail: "ananya.s@medops.org",
      priority: "Critical",
      status: "Units Dispatched",
      structuredAction: {
        targetSystem: "Pediatric Intensive Care Unit (PICU) & EMS",
        actionRequired: "Lock pediatric ventilator bed and dispatch second-line Epinephrine auto-infusion",
        resources: ["PICU Bed #3", "ALS Ambulance Unit 12", "Pediatric Resus Kit"],
        urgencyScore: 10,
        verificationHash: "SIG-MED-8491",
      },
    },
    {
      title: "Surgical O-Negative Blood Shortage",
      category: "Emergency Medical",
      description: "Messy handwritten hospital ward memo: 'OT-2 polytrauma victim, active bleeding, blood bank reserve 0'.",
      rawInput: "OT-2 polytrauma victim active hemoperitoneum, blood bank reserve empty need 4 units O neg immediately",
      inputType: "medical",
      userName: "Chief Surgeon V. Mehta",
      userEmail: "v.mehta@healthgov.in",
      priority: "Critical",
      status: "Triage Verified",
      structuredAction: {
        targetSystem: "Regional Blood Bank Logistics & Drone Transit",
        actionRequired: "Initiate emergency blood bank inter-hospital drone transfer protocol",
        resources: ["4x O-Negative Red Cell Units", "Medical Transit Drone #2"],
        urgencyScore: 9,
        verificationHash: "SIG-MED-7712",
      },
    },
  ],

  disaster: [
    {
      title: "Flash Flood Surge Inundation Sector 9",
      category: "Disaster Response",
      description: "Panicked audio voice transcript: 'Water entered ground floor, current very high, 4 kids trapped on tin roof'.",
      rawInput: "Bhaiya paani bohot tez aa raha hai ground floor doob gaya hai 4 bacche chat pe hain rescue boat bhejo jaldi",
      inputType: "voice",
      userName: "Commander Arvind Joshi",
      userEmail: "arvind.j@disastermgmt.gov",
      priority: "Critical",
      status: "Units Dispatched",
      structuredAction: {
        targetSystem: "National Disaster Response Force (NDRF) Air-Water Division",
        actionRequired: "Deploy motorized rubber dinghy and rooftop winch evacuation team",
        resources: ["NDRF Boat Team #7", "Thermal Aerial Drone", "Paramedic Liferaft"],
        urgencyScore: 10,
        verificationHash: "SIG-DIS-9901",
      },
    },
    {
      title: "Landslide Cutoff & Comms Disruption",
      category: "Disaster Response",
      description: "Fragmented news dispatch: 'NH-58 blocked at km 42, 12 vehicles stranded under debris, medical van trapped'.",
      rawInput: "NH-58 km 42 massive boulder slide multiple vehicles pinned beneath rockfall driver unresponsive",
      inputType: "disaster",
      userName: "Tariq Mansoor",
      userEmail: "tariq.m@reliefops.org",
      priority: "High",
      status: "Pending",
      structuredAction: {
        targetSystem: "Border Roads Organization & Heavy Extrication",
        actionRequired: "Dispatch heavy hydraulic spreader and trauma rescue convoy",
        resources: ["Hydraulic Cutter Rig", "Disaster Medical Van", "Excavator Unit"],
        urgencyScore: 9,
        verificationHash: "SIG-DIS-4412",
      },
    },
  ],

  traffic: [
    {
      title: "Cardiac Donor Organ Corridor Congestion",
      category: "Traffic & Evacuation",
      description: "Sensor speed telemetry: 'Airport Expressway bottleneck 8km/h, donor heart transit window 45 minutes'.",
      rawInput: "Heart transplant courier trapped near toll plaza gridlock vehicle KA05ME4921 donor organ viability dropping",
      inputType: "traffic",
      userName: "Dispatcher Pooja Varma",
      userEmail: "pooja.v@trafficops.in",
      priority: "Critical",
      status: "Units Dispatched",
      structuredAction: {
        targetSystem: "Intelligent Traffic Management System (ITMS)",
        actionRequired: "Force manual green-corridor signal wave from Junction 12 to Apollo Hospital",
        resources: ["Traffic Escort Motorcycle Team", "ITMS Phase Override #4"],
        urgencyScore: 10,
        verificationHash: "SIG-TRF-3184",
      },
    },
    {
      title: "Chemical Tanker Valve Leak Highway Block",
      category: "Traffic & Evacuation",
      description: "Witness voice note: 'White smoke coming from overturned tanker near toll bridge, stinging eyes'.",
      rawInput: "Tanker palat gaya hai toll ke paas safed dhuwa nikal raha hai aankh me jalan ho rahi hai bhago sab",
      inputType: "voice",
      userName: "Ramesh Deshmukh",
      userEmail: "r.deshmukh@citywater.gov",
      priority: "High",
      status: "Triage Verified",
      structuredAction: {
        targetSystem: "Fire Hazmat Division & Highway Police",
        actionRequired: "Cordon 1.5km radius and deploy chemical neutralizer foam cannons",
        resources: ["Hazmat Response Unit 1", "Foam Tender #3", "Perimeter Barricade Squad"],
        urgencyScore: 8,
        verificationHash: "SIG-TRF-6621",
      },
    },
  ],
};
