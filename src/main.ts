import "./style.css";

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://33f3f99d7064495b95ccacfb9225bbbf@o447951.ingest.us.sentry.io/4504689757257728",
  tracesSampleRate: 1.0,
  integrations: [Sentry.browserTracingIntegration()],
  beforeSend: (event) => {
    Sentry.startSpan(
      {
        name: "error-span",
        attributes: {
          "exit.reason": "your-reason-here",
          // if you want, you can also add data about the error here
          "error.trace_id": event.contexts?.trace?.trace_id,
          "error.event_id": event.event_id,
        },
      },
      () => {}
    );
    return event;
  },
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <button id="btn">Throw Error</button>
`;

const errorBtn = document.querySelector<HTMLButtonElement>("#btn")!;
errorBtn.addEventListener("click", () => {
  throw new Error("Test Error");
});
