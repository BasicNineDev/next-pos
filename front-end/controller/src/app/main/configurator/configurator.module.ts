import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'personnel',
        loadChildren: './personnel/personnel.module#PersonnelModule'
    },
    {
        path        : 'menu-items',
        loadChildren: './menu-items/menu-items.module#MenuItemsModule'
    },
    {
        path       : 'rvc-information',
        loadChildren: './rvc-information/rvc-information.module#RvcInformationModule'
    },
    {
        path        : 'templates',
        loadChildren: './templates/templates.module#TemplatesModule'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class ConfiguratorModule {

}
