import React, { useEffect } from 'react';
import { AppContext } from 'next/app';

import { Monitor } from './instrumentation.model';
import { InstrumentationService } from './instrumentation.service';
import { InstrumentationProvider } from './instrumentation.hook';
import { getMetadata } from './instrumentation.utils';

interface WithInstrumentationOptions {
  monitors: Array<Monitor>
}

export const withInstrumentation = (AppComponent: any, options: WithInstrumentationOptions) => {
  const WithInstrumentation = ({metadata,...props}) => {
    const instrumentation = new InstrumentationService({
      monitors: options.monitors
    }, metadata);

    useEffect(() => {
      instrumentation.init();
      return () => {
        instrumentation.teardown();
      }
    });

    return (
      <InstrumentationProvider service={instrumentation}>
        <AppComponent {...props} />
      </InstrumentationProvider>
    )
  };

  WithInstrumentation.getInitialProps = async (appContext: AppContext) => {
    let pageProps = {};
    if (AppComponent.getInitialProps) {
      pageProps = await AppComponent.getInitialProps(appContext);
    }

    // todo: not all navigation events are caught here.

    const metadata = getMetadata(appContext);

    return {
      metadata,
      ...pageProps
    }
  };

  return WithInstrumentation;
};
