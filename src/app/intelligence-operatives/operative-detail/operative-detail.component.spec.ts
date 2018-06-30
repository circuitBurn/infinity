import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeDetailComponent } from './operative-detail.component';

describe('OperativeDetailComponent', () => {
  let component: OperativeDetailComponent;
  let fixture: ComponentFixture<OperativeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperativeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperativeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
