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
import {MajorGroupsExComponent} from './major-groups/major-groups-ex.component';
import {MajorGroupsExService} from './major-groups/major-groups-ex.service';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/index';
import {MajorGroupExComponent} from './major-group/major-group-ex.component';
import {MajorGroupExService} from './major-group/major-group-ex.service';



const routes: Routes = [
    {
        path        : 'major-groups-ex',
        component: MajorGroupsExComponent,
        resolve : {
            shd : MajorGroupsExService
        }
    },
    {
        path        : 'major-groups-ex/:id',
        component: MajorGroupExComponent,
        resolve : {
           data: MajorGroupExService
        }
    },
    {
        path        : 'major-groups-ex/:id/:handle',
        component: MajorGroupExComponent,
        resolve: {
            data: MajorGroupExService
        }
    }
];

@NgModule({
    declarations: [
        MajorGroupsExComponent,
        MajorGroupExComponent
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
        FuseWidgetModule
    ],
    providers : [
        MajorGroupsExService,
        MajorGroupExService
    ]
})
export class MajorGroupsExModule
{


}