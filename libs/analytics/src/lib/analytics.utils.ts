import { Announcement } from '@nextjs-instrumentation/instrumentation';
import { FunctionalEvent } from './analytics.model';

const getContext = (node, acc = []) => {
  // if we're at the root DOM node, check if there were any defined contexts
  // if so, return the hierarchy, otherwise return null;
  if (!node.getAttribute) {
    if (acc.length > 0) {
      return acc;
    }
    return null;
  }

  // if there are intents defined at the current node,
  // add them to the accumulator
  const context = node.getAttribute('data-context');
  if (context) {
    acc.push(context);
  }

  // recursive case: investigate parent DOM node
  return getContext(node.parentNode, acc);
};

export const mapToFunctionalEvent = (announcement: Announcement, metadata: unknown): FunctionalEvent => {
  return {
    event: announcement.event,
    intent: {
      payload: announcement.payload,
      hierarchy: announcement.domEvent ? getContext(announcement.domEvent.target) : null
    },
    metadata: metadata
  };
};
