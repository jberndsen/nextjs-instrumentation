# nextjs-instrumentation
Inspired by https://martinfowler.com/articles/domain-oriented-observability.html

## Purpose
* Functional observability is about obtaining insight in how our applications perform from a business/domain perspective.

* Domain-oriented measurements are more valuable because, by definition, they reflect more closely whether the system is performing toward its intended business goal.

* These higher-level metrics are specific to each system and usually require hand-rolled instrumentation logic inside the system’s codebase.

* By adding instrumentation that tracks these metrics we achieve domain-oriented observability.

Note that functional logging differs from technical logging in that technical logging can be solved with more generic observation tooling (such as CPU %, mem usage, GC, etc.). Aspect oriented programming is not a good fit either, because it is not trivial to define whether a function call is in fact interesting from a business perspective (i.e. sometimes a call is not interesting at all and sometimes you’re interested in both cases of an if-statement). With AOP, the code needs to be decorated for such indications, which clutters equally to the approach described below.


## Challenge
* The custom instrumentation logic lives right alongside the core domain logic, where clear maintainable code is vital.

* It tends to be noisy and easily clutters the code in a hard-to-understand mess. Unit tests no longer describe only core functionality.

* Functional components currently can contain a large amount of instrumentation code (logging, metrics, analytics, …) when compared to core domain logic.

* This is especially true for the most crucial components and application hot-paths, because their criticality mandates good observability.


## Solution design: Domain probes and monitors
* Extract instrumentation logic from composition components, instead they only announce domain events using a domain probe, besides their core functionality.

* Implement focussed monitors to react to these events, addressing each cross-cutting concern in a single location.

* Implement monitors and probes in libraries so they can be reused by all the apps interacting with (a portion of) the affected domain.

* Test instrumentation logic (monitors and probes) in isolation and as a side-effect have more concise and descriptive testing of core logic in the composition components.

# Project setup

This project was generated using [Nx](https://nx.dev).

## To run the demo
Run `nx serve frontend` for a dev server. Navigate to http://localhost:4200/.

Run `nx serve event-ingester` for a mock backend server. The frontend will send its messages to it.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
