import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LaravelPhp } from "./laravel-php";

describe("LaravelPhp", () => {
  let component: LaravelPhp;
  let fixture: ComponentFixture<LaravelPhp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaravelPhp],
    }).compileComponents();

    fixture = TestBed.createComponent(LaravelPhp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
