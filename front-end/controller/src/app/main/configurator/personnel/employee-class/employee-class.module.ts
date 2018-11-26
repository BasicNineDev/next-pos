import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EmployeeClassComponent } from './employee-class.component';
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

const routes: Routes = [
    {
        path     : '**',
        // path     : 'configurator/personnel/employee-class',
        component: EmployeeClassComponent
    }
];

@NgModule({
    declarations: [
        EmployeeClassComponent
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

        FuseSharedModule
    ],
    exports     : [
        EmployeeClassComponent
    ]
})

export class EmployeeClassModule {

}
