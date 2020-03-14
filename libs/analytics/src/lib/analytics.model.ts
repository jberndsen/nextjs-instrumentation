export interface FunctionalEvent {
  event: string,
  intent?: {
    payload?: unknown,
    hierarchy?: string[]
  },
  metadata?: unknown
}
