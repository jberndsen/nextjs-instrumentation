import { Subject, Subscription } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import { Announcement, Monitor } from '@nextjs-instrumentation/instrumentation';
import { FunctionalEvent } from './analytics.model';
import { mapToFunctionalEvent } from './analytics.utils';

/**
 * This Monitor likes to use Streams internally to enable complex flow patterns.
 * Note that the introduction of RxJS is not part of the Instrumentation,
 * it is an implementation choice of this particular Monitor.
 */
export class AnalyticsMonitor extends Monitor {
  private events: Subject<FunctionalEvent> = new Subject<FunctionalEvent>();
  private subs: Subscription = new Subscription();

  constructor(private endpoint: string) {
    super();
  }

  /**
   * Here, the Monitor initialises the flows of events it wants to send out.
   */
  init(): void {
    // simple example: send all raw events
    this.subs.add(this.events.subscribe((e) => {
      this.send(e);
    }));

    // complex example: send add to carts for which availability was checked
    this.subs.add(this.events.pipe(
      filter(e => e.event === 'added-to-cart'),
      withLatestFrom(this.events.pipe(filter(e => e.event === 'checked-availability'))),
      filter(([x,y]) => x.intent.payload['productId'] === y.intent.payload['productId'])
    ).subscribe(([e]) => {
      this.send({...e, event: 'checked-and-added'});
    }));
  }

  /**
   * handling the announcement callback is as simple as just putting it on
   * the internal event stream. As a demonstration, the Announcement message
   * is mapped into a FunctionalEvent which fits the hypothetical back-end model.
   * @param announcement
   * @param metadata
   */
  handleAnnouncement(announcement: Announcement, metadata: unknown) {
    const event = mapToFunctionalEvent(announcement, metadata);
    this.events.next(event);
  }

  /**
   * This Monitor requires teardown logic to unsubscribe all the streams
   * to prevent potential memory leaks.
   */
  teardown(): void {
    this.subs.unsubscribe();
  }

  /**
   * Internal function for sending events to the external event-ingester
   * For demo purposes, actual projects likely have a more resilient
   * approach available for this.
   * @param event
   */
  private async send(event) {
      return await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...event })
      });
    }
}

