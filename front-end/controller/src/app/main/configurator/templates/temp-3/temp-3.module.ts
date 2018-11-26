import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import {
    MatButtonModule, MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule
} from '@angular/material';
import {Temp3Component} from './temp-3.component';
import {DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule} from 'devextreme-angular';
import {Temp3Service} from './temp-3.service';

const routes: Routes = [
    {
        path     : '**',
        // path     : 'configurator/personnel/employee-class',
        component: Temp3Component
    }
];

@NgModule({
    declarations: [
        Temp3Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        DxTemplateModule,
        DxButtonModule,
        DxDataGridModule,
        DxCheckBoxModule,

        FuseSharedModule
    ],
    providers : [
        Temp3Service
    ],
    exports     : [
        Temp3Component
    ]
})

export class Temp3Module {

}
