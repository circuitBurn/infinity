import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperativeFormComponent } from './operative-form.component';

describe('OperativeFormComponent', () => {
  let component: OperativeFormComponent;
  let fixture: ComponentFixture<OperativeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperativeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
