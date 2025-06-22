export enum SystemMessageType {
  Success = "success",
  Warning = "warning",
  Info = "info",
  Error = "error",
  Cookie = "cookie", // Special type for cookie consent
}

export interface SystemMessage {
  id: string; // Unique ID for each message, can be generated (e.g., timestamp or UUID)
  type: SystemMessageType;
  text: string;
  closable?: boolean; // Default to true for most types, false for cookie
  duration?: number; // Optional: auto-close after X ms
  // For cookie consent or messages with actions
  link?: string;
  linkText?: string;
  buttonText?: string;
  onButtonClick?: (message: SystemMessage) => void;
  // Allow arbitrary data for more complex scenarios if needed in future
  data?: unknown;
}
