import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MoodleChat } from "./moodle-chat";

describe("MoodleChat", () => {
  let component: MoodleChat;
  let fixture: ComponentFixture<MoodleChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodleChat],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodleChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
