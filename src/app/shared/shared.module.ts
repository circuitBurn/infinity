import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { MatToolbarModule, MatMenuModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        FormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatIconModule,
        MatSnackBarModule,
        MatGridListModule,
        MatProgressBarModule,
        MatChipsModule,
        MatTableModule
    ],
    exports: [
        FormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatIconModule,
        MatSnackBarModule,
        MatGridListModule,
        MatProgressBarModule,
        MatChipsModule,
        MatTableModule
    ]
})
export class SharedModule {}