import App from 'next/app';
import { withInstrumentation } from '@nextjs-instrumentation/instrumentation';
import { AnalyticsMonitor } from '@nextjs-instrumentation/analytics';
import { LoggingMonitor } from '@nextjs-instrumentation/logging';

/**
 * To enable instrumentation, wrap your application with the provided HOC.
 * You can then configure your monitors to act on 'announcements' by the app.
 */

export default withInstrumentation(App, {
  monitors: [
    new AnalyticsMonitor('http://localhost:3333/api/event'),
    new LoggingMonitor()
  ]
});
