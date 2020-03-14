import React, { useContext } from 'react';
import { InstrumentationService } from './instrumentation.service';

export const InstrumentationContext = React.createContext<{ service: InstrumentationService }>({
  service: null
});

export const InstrumentationProvider: React.FC<{ service: InstrumentationService }> = props => {
  return (
    <InstrumentationContext.Provider value={{ service: props.service }}>
      {props.children}
    </InstrumentationContext.Provider>
  );
};

// this hook exposes initialised domain probes to allow apps to
// dispatch functional events to the monitors
// it's basically a Domain Probe factory
export function useProbe(probe): typeof probe {
  const { service } = useContext(InstrumentationContext);

  // we could add more generic provided hooks to the probes if needed
  // this would however make this lib aware of more app contexts

  // const apolloClient = useApolloClient();
  // const locale = useLocale();

  if (!service) {
    throw new Error();
  }

  return new probe(service.announce.bind(service));
}
