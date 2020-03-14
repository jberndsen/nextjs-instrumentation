import { Announcer } from '../instrumentation.model';

export class QuotationProbe {
  constructor(private announce: Announcer) { }

  // clearly, you should agree on and fixate the event names and not just hard-code strings.
  addedToCart({productId, quantity}, event): void {
    this.announce(
      { event: 'added-to-cart',
        payload: { productId, quantity: quantity },
        domEvent: event
      });
  }

  checkedAvailability({productId}, event): void {
    this.announce(
      { event: 'checked-availability',
        payload: { productId },
        domEvent: event
      });
  }
}
