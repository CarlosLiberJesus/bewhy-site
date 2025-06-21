import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MoodleLangchain } from "./moodle-langchain";

describe("MoodleLangchain", () => {
  let component: MoodleLangchain;
  let fixture: ComponentFixture<MoodleLangchain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodleLangchain],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodleLangchain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
