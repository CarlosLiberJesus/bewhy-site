import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/projects/moodle-agent/moodle-chat",
    pathMatch: "full",
  },
  {
    path: "projects/moodle-agent/moodle-chat",
    loadComponent: () =>
      import("./pages/projects/moodle-agent/moodle-chat/moodle-chat").then(
        (m) => m.MoodleChat,
      ),
  },
  {
    path: "projects/moodle-agent/moodle-langchain",
    loadComponent: () =>
      import(
        "./pages/projects/moodle-agent/moodle-langchain/moodle-langchain"
      ).then((m) => m.MoodleLangChain),
  },
  {
    path: "projects/moodle-agent/moodle-mcp",
    loadComponent: () =>
      import("./pages/projects/moodle-agent/moodle-mcp/moodle-mcp").then(
        (m) => m.MoodleMcp,
      ),
  },
  {
    path: "config/package-json",
    loadComponent: () =>
      import("./pages/config/package-json/package-json").then(
        (m) => m.PackageJson,
      ),
  },
  {
    path: "config/readme",
    loadComponent: () =>
      import("./pages/config/readme/readme").then((m) => m.Readme),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found").then((m) => m.NotFound),
  },
];