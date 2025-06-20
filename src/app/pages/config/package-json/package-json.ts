import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Package, Settings } from "lucide-angular";

@Component({
  selector: "app-package-json",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./package-json.html",
  styleUrl: "./package-json.scss",
})
export class PackageJson {
  readonly PackageIcon = Package;
  readonly SettingsIcon = Settings;

  packageContent = `{
  "name": "bewhy-site",
  "version": "0.0.1",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "lint": "ng lint",
    "format": "prettier --write \\"src/**/*.{ts,html,css,scss}\\"",
    "format:check": "prettier --check \\"src/**/*.{ts,html,css,scss}\\"",
    "analyze": "ng build --stats-json && npx webpack-bundle-analyzer dist/stats.json",
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{ts,html}": [
      "eslint --fix",
      "prettier --write"
    ],
    "src/**/*.{css,scss,json}": [
      "prettier --write"
    ]
  },
  "private": true,
  "dependencies": {
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/router": "^20.0.0",
    "lucide-angular": "^0.518.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.2",
    "@angular/build": "^20.0.2",
    "@angular/cli": "^20.0.2",
    "@angular/compiler-cli": "^20.0.0",
    "@commitlint/cli": "^19.8.1",
    "@commitlint/config-conventional": "^19.8.1",
    "@tailwindcss/forms": "^0.5.10",
    "@tailwindcss/typography": "^0.5.16",
    "@types/jest": "30.0.0",
    "angular-eslint": "20.1.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.29.0",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-prettier": "^5.5.0",
    "fluid-tailwind": "^1.0.4",
    "husky": "^9.1.7",
    "lint-staged": "^16.1.2",
    "postcss": "^8.5.6",
    "prettier": "^3.5.3",
    "prettier-plugin-tailwindcss": "^0.6.12",
    "tailwindcss": "^3.4.3",
    "typescript": "~5.8.2",
    "typescript-eslint": "8.34.0",
    "webpack-bundle-analyzer": "^4.10.2"
  }
}`;

  dependencies = [
    { name: "@angular/core", version: "^20.0.0", type: "framework" },
    { name: "@angular/router", version: "^20.0.0", type: "framework" },
    { name: "lucide-angular", version: "^0.518.0", type: "icons" },
    { name: "tailwindcss", version: "^3.4.3", type: "styling" },
    { name: "typescript", version: "~5.8.2", type: "language" },
  ];
}