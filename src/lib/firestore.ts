import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface StructuredAction {
  targetSystem: string;
  actionRequired: string;
  resources: string[];
  urgencyScore: number;
  verificationHash: string;
  isSpam?: boolean;
  isCivicNonEmergency?: boolean;
  filterReason?: string;
}

export interface SubmissionItem {
  id?: string;
  title: string;
  category: string;
  description: string;
  rawInput?: string;
  inputType?: "voice" | "medical" | "disaster" | "traffic" | "general";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Pending" | "Triage Verified" | "Units Dispatched" | "Resolved";
  structuredAction?: StructuredAction;
  userName: string;
  userEmail: string;
  userPhoto?: string;
  createdAt?: unknown;
}

const COLLECTION_NAME = "submissions";

export async function createSubmission(
  data: Omit<SubmissionItem, "id" | "createdAt" | "status"> & { status?: SubmissionItem["status"] }
) {
  const colRef = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(colRef, {
    ...data,
    status: data.status || "Pending",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateSubmissionStatus(id: string, status: SubmissionItem["status"]) {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
}

export function subscribeToSubmissions(callback: (items: SubmissionItem[]) => void) {
  const colRef = collection(db, COLLECTION_NAME);
  const q = query(colRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: SubmissionItem[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<SubmissionItem, "id">),
      }));
      callback(items);
    },
    (error) => {
      console.error("Firestore listener error:", error);
    }
  );
}

export async function getSubmissionById(id: string): Promise<SubmissionItem | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<SubmissionItem, "id">) };
}
