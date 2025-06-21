import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LayoutFileTree } from "./file-tree";

describe("LayoutFileTree", () => {
  let component: LayoutFileTree;
  let fixture: ComponentFixture<LayoutFileTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutFileTree],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutFileTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
