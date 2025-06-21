import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SiteBot } from "./site-bot";

describe("SiteBot", () => {
  let component: SiteBot;
  let fixture: ComponentFixture<SiteBot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteBot],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteBot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
