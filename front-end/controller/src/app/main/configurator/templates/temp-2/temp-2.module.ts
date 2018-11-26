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
import {Temp2Component} from './temp-2.component';
import {DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule} from 'devextreme-angular';
import {Temp2Service} from './temp-2.service';

const routes: Routes = [
    {
        path     : '**',
        // path     : 'configurator/personnel/employee-class',
        component: Temp2Component
    }
];

@NgModule({
    declarations: [
        Temp2Component
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
        Temp2Service
    ],
    exports     : [
        Temp2Component
    ]
})

export class Temp2Module {

}
