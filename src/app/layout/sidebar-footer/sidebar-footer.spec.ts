import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LayoutSidebarFooter } from "./sidebar-footer";

describe("LayoutSidebarFooter", () => {
  let component: LayoutSidebarFooter;
  let fixture: ComponentFixture<LayoutSidebarFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSidebarFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSidebarFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
