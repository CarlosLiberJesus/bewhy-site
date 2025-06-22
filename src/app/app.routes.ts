import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "src/web-app/index-angular",
    pathMatch: "full",
  },
  {
    path: "src/web-app/index-angular",
    loadComponent: () =>
      import("./pages/src/webapp/index-angular/index-angular").then(
        (m) => m.IndexAngular,
      ),
  },
  {
    path: "src/web-app/laravel-php",
    loadComponent: () =>
      import("./pages/src/webapp/laravel-php/laravel-php").then(
        (m) => m.LaravelPhp,
      ),
  },
  {
    path: "readme-md",
    loadComponent: () =>
      import("./pages/read-me/read-me").then((m) => m.ReadMe),
  },
  {
    path: "site-xml",
    loadComponent: () =>
      import("./pages/site-xml/site-xml").then((m) => m.SiteXml),
  },
  {
    path: "404",
    loadComponent: () =>
      import("./layout/not-found/not-found").then((m) => m.NotFound),
  },
  {
    path: "public/sobre-org",
    loadComponent: () =>
      import("./pages/public/about-us/about-us").then((m) => m.AboutUs),
  },
  {
    path: "public/politicas-md",
    loadComponent: () =>
      import("./pages/public/policies/policies").then((m) => m.Policies),
  },
  {
    path: "public/contacte-nos",
    loadComponent: () =>
      import("./pages/public/contacts/contacts").then((m) => m.Contacts),
  },
  {
    path: "src/ai-agent/site-bot",
    loadComponent: () =>
      import("./pages/src/ai-agents/site-bot/site-bot").then((m) => m.SiteBot),
  },
  {
    path: "src/ai-agent/moodle-agent/moodle-chat",
    loadComponent: () =>
      import("./pages/src/ai-agents/moodle-agent/moodle-chat/moodle-chat").then(
        (m) => m.MoodleChat,
      ),
  },
  {
    path: "src/ai-agent/moodle-agent/moodle-langchain",
    loadComponent: () =>
      import(
        "./pages/src/ai-agents/moodle-agent/moodle-langchain/moodle-langchain"
      ).then((m) => m.MoodleLangChain),
  },
  {
    path: "src/ai-agent/moodle-agent/moodle-mcp",
    loadComponent: () =>
      import("./pages/src/ai-agents/moodle-agent/moodle-mcp/moodle-mcp").then(
        (m) => m.MoodleMcp,
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./layout/not-found/not-found").then((m) => m.NotFound),
  },
];
