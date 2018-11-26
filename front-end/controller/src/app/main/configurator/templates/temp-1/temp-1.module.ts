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
import {Temp1Component} from './temp-1.component';
import {DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule} from 'devextreme-angular';
import {Temp1Service} from './temp-1.service';

const routes: Routes = [
    {
        path     : '**',
        // path     : 'configurator/personnel/employee-class',
        component: Temp1Component
    }
];

@NgModule({
    declarations: [
        Temp1Component
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
        Temp1Service
    ],
    exports     : [
        Temp1Component
    ]
})

export class Temp1Module {

}
