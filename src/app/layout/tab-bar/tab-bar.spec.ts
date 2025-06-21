import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LayoutTabBar } from "./tab-bar";

describe("LayoutTabBar", () => {
  let component: LayoutTabBar;
  let fixture: ComponentFixture<LayoutTabBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutTabBar],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutTabBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
