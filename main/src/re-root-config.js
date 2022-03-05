import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: (location) => location.pathname === '/',
});

registerApplication({
  name: "@re/dashboard",
  app: () =>
    System.import(
      "@re/dashboard"
    ),
  activeWhen: ['/app'],
});

// registerApplication({
//   name: "@re/navbar",
//   app: () => System.import("@re/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
