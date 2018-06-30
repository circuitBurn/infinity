import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligenceAgencyDetailComponent } from './intelligence-agency-detail.component';

describe('IntelligenceAgencyDetailComponent', () => {
  let component: IntelligenceAgencyDetailComponent;
  let fixture: ComponentFixture<IntelligenceAgencyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligenceAgencyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligenceAgencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
