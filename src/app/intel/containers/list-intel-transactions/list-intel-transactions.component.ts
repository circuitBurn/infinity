import { Component, OnInit, Input } from '@angular/core';
import { IntelTransaction } from '../../models/intel-transaction.model';

@Component({
  selector: 'app-list-intel-transactions',
  templateUrl: './list-intel-transactions.component.html',
  styleUrls: ['./list-intel-transactions.component.css']
})
export class ListIntelTransactionsComponent implements OnInit {

    @Input()
    transactions: IntelTransaction[];

    constructor() { }

    ngOnInit() {
    }

}
