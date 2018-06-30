import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligenceAgenciesListComponent } from './intelligence-agencies-list.component';

describe('IntelligenceAgenciesListComponent', () => {
  let component: IntelligenceAgenciesListComponent;
  let fixture: ComponentFixture<IntelligenceAgenciesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligenceAgenciesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligenceAgenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
