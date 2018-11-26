import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path        : 'major-group',
        loadChildren: './major-groups/major-groups.module#MajorGroupsModule'
    },
    {
        path        : 'major-group2',
        loadChildren: './major-groups-ex/major-groups-ex.module#MajorGroupsExModule'
    },
    {
        path        : 'major-group3',
        loadChildren: './major-groups-ext/major-groups-ext.module#MajorGroupsExtModule'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class MenuItemsModule {

}
