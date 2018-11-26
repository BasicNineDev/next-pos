import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components/index';

import {MajorGroupsComponent} from './major-groups.component';
import {
    MatFormFieldModule,
    MatIconModule,
    MatRippleModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatDatepickerModule,
    MatButtonModule, MatToolbarModule
} from '@angular/material';
import {MajorGroupListComponent} from './major-group-list/major-group-list.component';
import {MajorGroupsService} from './major-groups.service';
import {MajorGroupFormDialogComponent} from './major-group-form/major-group-form.component';
import {SpeedDialFabComponent} from 'basic9/components/speed-dial-fab/speed-dial-fab.component';


const routes = [
    {
        path     : '**',
        component: MajorGroupsComponent,
        resolve : {
            majorGroups: MajorGroupsService
        }
    }
];

@NgModule({
    declarations: [
        SpeedDialFabComponent,
        MajorGroupsComponent,
        MajorGroupListComponent,
        MajorGroupFormDialogComponent
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
        MatTableModule,
        MatToolbarModule,

        TranslateModule,
        FuseSharedModule,


        FuseConfirmDialogModule

    ],
    providers : [
        MajorGroupsService
    ],
    entryComponents: [
        MajorGroupFormDialogComponent
    ]
})

export class MajorGroupsModule
{
}
