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
}

export const addActionItem = async () => null;
export const updateActionItem = async () => null;
export const getActionItems = async () => [];
