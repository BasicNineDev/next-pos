import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule
} from '@angular/material';
import {NgxDnDModule} from '@swimlane/ngx-dnd';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseSidebarModule} from '../../../../@fuse/components';
import {DxPageComponent} from './dx-page.component';
import {DxPageService} from './dx-page.service';
import {DevExtremeModule, DxDataGridModule} from 'devextreme-angular';

const routes: Routes = [
    {
        path     : '**',
        component: DxPageComponent,
        resolve  : {
            customers: DxPageService
        }
    }
];

@NgModule({
    declarations: [
        DxPageComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseSidebarModule,
        DevExtremeModule,
        DxDataGridModule

    ],
    providers   : [
        DxPageService
    ]
})
export class DxPageModule
{
}
