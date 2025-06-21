import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MoodleAgent } from "./moodle-agent";

describe("MoodleAgent", () => {
  let component: MoodleAgent;
  let fixture: ComponentFixture<MoodleAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodleAgent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodleAgent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
