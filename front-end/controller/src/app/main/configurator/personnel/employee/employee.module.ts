import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule, MatIconModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EmployeeComponent } from './employee.component';

const routes: Routes = [
    {
        path     : '**',
        // path     : 'configurator/personnel/employee',
        component: EmployeeComponent
    }
];

@NgModule({
    declarations: [
        EmployeeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatFormFieldModule,
        MatIconModule,

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        EmployeeComponent
    ]
})

export class EmployeeModule {

}
