// ============================================================
// Shared Types for Chronicle AI Automation Pipeline
// ============================================================

/** A single message in a conversation */
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

/** A full conversation session */
export interface ConversationSession {
  id: string;
  messages: Message[];
  startedAt: string;
  endedAt?: string;
  metadata?: Record<string, unknown>;
}

/** Detected intent from conversation */
export type IntentType = "bug" | "feature" | "improvement";

export interface DetectedIntent {
  type: IntentType;
  confidence: number;
  summary: string;
  details: string;
  affectedAreas: string[]; // e.g. ["Dashboard - Map", "Request Management"]
  priority: "critical" | "high" | "medium" | "low";
}

/** Retrieved knowledge context */
export interface KnowledgeChunk {
  source: string; // file path
  section: string; // section heading
  content: string;
  relevanceScore: number;
}

export interface KnowledgeContext {
  chunks: KnowledgeChunk[];
  designSystem: DesignSystem;
}

/** Chronicle Design System reference */
export interface DesignSystem {
  navigation: {
    topBar: string[];
    sidebar: string[];
    contextToolbar: string[];
  };
  layouts: {
    dualPane: string;
    dataGrid: string;
    formBased: string;
    mapView: string;
  };
  components: string[];
  roles: string[];
  colorCoding: Record<string, string>;
}

/** Enriched context = conversation + knowledge */
export interface EnrichedContext {
  conversation: ConversationSession;
  intent: DetectedIntent;
  knowledge: KnowledgeContext;
  mergedSummary: string;
}

/** Lean PRD from Product Reasoning */
export interface LeanPRD {
  title: string;
  epicSummary: string;
  problemStatement: string;
  proposedSolution: string;
  userStories: UserStory[];
  acceptanceCriteria: string[];
  outOfScope: string[];
  affectedRoles: string[];
  relatedFeatures: string[];
  priority: "critical" | "high" | "medium" | "low";
  estimatedComplexity: "small" | "medium" | "large" | "epic";
}

export interface UserStory {
  asA: string; // role
  iWant: string; // action
  soThat: string; // benefit
}

/** UI Behavior Specification */
export interface UIBehaviorSpec {
  screenList: ScreenSpec[];
  navigationFlow: FlowStep[];
  globalStates: StateDefinition[];
  interactionRules: InteractionRule[];
}

export interface ScreenSpec {
  id: string;
  name: string;
  description: string;
  layout: "dual-pane" | "full-width" | "form" | "modal" | "map-view";
  components: ComponentSpec[];
  states: StateDefinition[];
  dataEntities: string[];
}

export interface ComponentSpec {
  type: string; // e.g. "table", "map", "form", "card", "button", "modal"
  name: string;
  props: Record<string, unknown>;
  interactions: string[];
}

export interface FlowStep {
  from: string; // screen id
  to: string; // screen id
  trigger: string; // e.g. "click Save", "submit form"
  condition?: string;
}

export interface StateDefinition {
  name: string;
  description: string;
  defaultValue: unknown;
  transitions: { to: string; trigger: string }[];
}

export interface InteractionRule {
  screen: string;
  component: string;
  event: string; // "click", "hover", "submit", etc.
  behavior: string;
  validation?: string;
}

/** Figma mockup structure */
export interface FigmaMockup {
  projectName: string;
  pages: FigmaPage[];
  designTokens: Record<string, string>;
}

export interface FigmaPage {
  name: string;
  frames: FigmaFrame[];
}

export interface FigmaFrame {
  name: string;
  screenId: string;
  width: number;
  height: number;
  elements: FigmaElement[];
}

export interface FigmaElement {
  type: "rectangle" | "text" | "frame" | "component" | "group";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  properties: Record<string, unknown>;
  children?: FigmaElement[];
}

/** Notion ticket output */
export interface NotionTicket {
  type: "epic" | "task" | "feedback";
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  labels: string[];
  linkedEpicId?: string;
  designUrl?: string; // Figma URL
  prdContent?: string;
  uiSpecContent?: string;
}

/** Full pipeline result */
export interface PipelineResult {
  session: ConversationSession;
  intent: DetectedIntent;
  knowledge: KnowledgeContext;
  enrichedContext: EnrichedContext;
  prd: LeanPRD;
  uiSpec: UIBehaviorSpec;
  figmaMockup: FigmaMockup;
  notionTickets: {
    epicId: string;
    taskIds: string[];
    feedbackId?: string;
  };
  figmaDesignUrl: string;
}
