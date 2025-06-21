import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SiteXml } from "./site-xml";

describe("SiteXml", () => {
  let component: SiteXml;
  let fixture: ComponentFixture<SiteXml>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteXml],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteXml);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
