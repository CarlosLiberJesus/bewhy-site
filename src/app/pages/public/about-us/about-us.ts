import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MetaTagService } from "../../../services/meta-tag-service";

@Component({
  selector: "app-about-us",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./about-us.html",
  styleUrl: "./about-us.scss",
})
export class AboutUs implements OnInit {
  private metaTagService = inject(MetaTagService);

  ngOnInit(): void {
    this.metaTagService.setPageTags(
      "Sobre Nós",
      "Saiba mais sobre a BeWhyOrg, a nossa missão, visão e valores.",
      "https://www.BeWhyOrg/img/about-us-image.jpg", // URL de imagem específica para "Sobre Nós"
      ["bewhyorg", "sobre nós", "missão", "visão", "valores"],
    );
  }
}
