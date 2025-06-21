import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SystemMessages } from "./system-messages";

describe("SystemMessages", () => {
  let component: SystemMessages;
  let fixture: ComponentFixture<SystemMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemMessages],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
