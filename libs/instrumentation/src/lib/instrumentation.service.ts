import { Monitor, Announcement } from './instrumentation.model';

export class InstrumentationService {
  private monitors: Array<Monitor>;

  constructor(config: {monitors: Array<Monitor>}, private metadata = {}) {
    this.monitors = config.monitors;
  }

  init() {
    this.monitors.forEach(monitor => {
      monitor.init();
    })
  }

  teardown() {
    this.monitors.forEach(monitor => {
      monitor.teardown();
    });
  }

  announce(announcement: Announcement) {
    this.monitors.forEach(monitor => {
      monitor.handleAnnouncement(announcement, this.metadata);
    });
  }
}
