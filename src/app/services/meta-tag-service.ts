import { Injectable, inject } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

@Injectable({
  providedIn: "root",
})
export class MetaTagService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);

  // Valores padrão - podem ser movidos para um ficheiro de configuração ou ambiente
  private defaultTitle = "BeWhyOrg";
  private defaultDescription = "Página de Apresentação do projecto BeWhyOrg";
  private defaultKeywords = [
    "informática",
    "consultadoria",
    "Web",
    "desenvolvimento",
    "laravel",
    "angular",
    "AI",
    "AiAgents",
  ];
  private defaultAuthor = "Carlos Jesus";
  private defaultCopyright = "BewhyOrg";
  private defaultAppName = "BeWhyOrg";
  private defaultOgType = "website";
  private defaultOgImage = "https://www.BeWhyOrg/img/facebook.jpg"; // URL base + imagem padrão
  private siteBaseUrl = "https://www.bewhyorg.pt"; // Deveria ser configurável

  setDefaultTags(): void {
    this.titleService.setTitle(this.defaultTitle);
    const currentUrl = this.siteBaseUrl + this.router.url;
    const defaultTags: MetaTag[] = [
      // Google
      { name: "description", content: this.defaultDescription },
      { name: "keywords", content: this.defaultKeywords.join(", ") },
      { name: "author", content: this.defaultAuthor },
      { name: "copyright", content: this.defaultCopyright },
      { name: "application-name", content: this.defaultAppName },
      // Facebook / Open Graph
      { property: "og:title", content: this.defaultTitle },
      { property: "og:type", content: this.defaultOgType },
      { property: "og:image", content: this.defaultOgImage },
      { property: "og:url", content: currentUrl },
      { property: "og:description", content: this.defaultDescription },
      // Twitter (X) Card Tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: this.defaultTitle },
      { name: "twitter:description", content: this.defaultDescription },
      { name: "twitter:image", content: this.defaultOgImage },
    ];
    this.updateTags(defaultTags);
  }

  setPageTags(
    title: string,
    description: string,
    image?: string,
    keywords?: string[],
  ): void {
    const pageTitle = title
      ? `${title} | ${this.defaultAppName}`
      : this.defaultTitle;
    this.titleService.setTitle(pageTitle);
    const currentUrl = this.siteBaseUrl + this.router.url;
    const pageOgImage = image || this.defaultOgImage;

    const pageTags: MetaTag[] = [
      // Google
      { name: "description", content: description },
      {
        name: "keywords",
        content: keywords
          ? keywords.join(", ")
          : this.defaultKeywords.join(", "),
      },
      // Facebook / Open Graph
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: pageOgImage },
      { property: "og:url", content: currentUrl },
      // Twitter (X) Card Tags
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: pageOgImage },
    ];
    this.updateTags(pageTags);
  }

  private updateTags(tags: MetaTag[]): void {
    // Remove as tags existentes que vamos definir para evitar duplicados ou conflitos
    // com tags de navegações anteriores.
    // Especificamente, removemos description, keywords, e todas as og:* e twitter:*
    this.metaService.removeTag("name='description'");
    this.metaService.removeTag("name='keywords'");
    this.metaService.removeTag("name='author'");
    this.metaService.removeTag("name='copyright'");
    this.metaService.removeTag("name='application-name'");
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:type'");
    this.metaService.removeTag("property='og:image'");
    this.metaService.removeTag("property='og:url'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("name='twitter:card'");
    this.metaService.removeTag("name='twitter:title'");
    this.metaService.removeTag("name='twitter:description'");
    this.metaService.removeTag("name='twitter:image'");

    tags.forEach((tag) => {
      if (tag.name) {
        this.metaService.updateTag({ name: tag.name, content: tag.content });
      } else if (tag.property) {
        this.metaService.updateTag({
          property: tag.property,
          content: tag.content,
        });
      }
    });
  }
}
