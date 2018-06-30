import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligenceAgencyFormComponent } from './intelligence-agency-form.component';

describe('IntelligenceAgencyFormComponent', () => {
  let component: IntelligenceAgencyFormComponent;
  let fixture: ComponentFixture<IntelligenceAgencyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligenceAgencyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligenceAgencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
