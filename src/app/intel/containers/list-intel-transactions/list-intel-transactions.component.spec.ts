import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntelTransactionsComponent } from './list-intel-transactions.component';

describe('ListIntelTransactionsComponent', () => {
  let component: ListIntelTransactionsComponent;
  let fixture: ComponentFixture<ListIntelTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIntelTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIntelTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
