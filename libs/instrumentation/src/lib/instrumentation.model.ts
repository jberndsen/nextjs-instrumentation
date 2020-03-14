import { SyntheticEvent } from 'react';

export abstract class Monitor {
  abstract init(): void;
  abstract handleAnnouncement(announcement: Announcement, metadata: unknown): void;
  abstract teardown(): void;
}

export interface Announcement {
  event: string,
  payload?: unknown,
  domEvent: SyntheticEvent
}

export type Announcer = (message: Announcement) => {};
