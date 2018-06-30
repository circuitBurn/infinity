import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelDashboardComponent } from './intel-dashboard.component';

describe('IntelDashboardComponent', () => {
  let component: IntelDashboardComponent;
  let fixture: ComponentFixture<IntelDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
