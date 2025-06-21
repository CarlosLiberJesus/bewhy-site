import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MoodleMcp } from "./moodle-mcp";

describe("MoodleMcp", () => {
  let component: MoodleMcp;
  let fixture: ComponentFixture<MoodleMcp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodleMcp],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodleMcp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
