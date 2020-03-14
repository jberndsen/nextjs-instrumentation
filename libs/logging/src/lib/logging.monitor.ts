import { Monitor, Announcement } from '@nextjs-instrumentation/instrumentation';

/**
 * This is a really simply Monitor that just logs to the console
 * It's here to demonstrate how side-effects are pulled out of the app
 * and the ease of setting up multiple Monitors.
 */
export class LoggingMonitor extends Monitor {
  constructor() {
    super();
  }

  init(): void {
    console.log('executing initialising logic for logger');
  }

  handleAnnouncement(announcement: Announcement, metadata: unknown) {
    // you should call the concrete logger implementation here
    console.log(announcement);
  }

  teardown(): void {
    console.log('executing teardown logic for logger');
  }
}
