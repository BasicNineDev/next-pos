import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'employee-class',
        loadChildren: './employee-class/employee-class.module#EmployeeClassModule'
    },
    {
        path        : 'employee',
        loadChildren: './employee/employee.module#EmployeeModule'
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class PersonnelModule {

}
