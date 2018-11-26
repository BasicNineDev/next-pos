import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/index';
import {DevExtremeModule} from 'devextreme-angular';
import {DxoGridModule} from 'devextreme-angular/ui/nested/grid';
import {MajorGroupsExtService} from './major-groups-ext.service';
import {MajorGroupsExtComponent} from './major-groups-ext.component';



const routes: Routes = [
    {
        path        : '**',
        component: MajorGroupsExtComponent,
        resolve : {
            data : MajorGroupsExtService
        }
    }
];

@NgModule({
    declarations: [
        MajorGroupsExtComponent
    ],
    imports : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
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

        FuseSharedModule,
        FuseWidgetModule,

        DevExtremeModule,
        DxoGridModule
    ],
    providers : [
        MajorGroupsExtService
    ]
})
export class MajorGroupsExtModule
{


}