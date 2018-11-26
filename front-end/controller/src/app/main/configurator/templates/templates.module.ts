import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'temp-1',
        loadChildren: './temp-1/temp-1.module#Temp1Module'
    },{
        path        : 'temp-2',
        loadChildren: './temp-2/temp-2.module#Temp2Module'
    },{
        path        : 'temp-3',
        loadChildren: './temp-3/temp-3.module#Temp3Module'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class TemplatesModule {

}
