import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IndexAngular } from "./index-angular";

describe("IndexAngular", () => {
  let component: IndexAngular;
  let fixture: ComponentFixture<IndexAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
