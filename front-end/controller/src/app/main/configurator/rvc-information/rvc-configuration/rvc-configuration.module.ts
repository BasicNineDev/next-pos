import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RvcConfigurationComponent} from './rvc-configuration.component';
import {FuseSharedModule} from '@fuse/shared.module';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import { RvcConfigurationListComponent } from './rvc-configuration-list/rvc-configuration-list.component';
import { RvcConfigurationDetailsComponent } from './rvc-configuration-details/rvc-configuration-details.component';


const routes: Routes = [
    {
        path : '**',
        component: RvcConfigurationComponent
    }
];


@NgModule({
    declarations: [
        RvcConfigurationComponent,
        RvcConfigurationListComponent,
        RvcConfigurationDetailsComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,

        MatTooltipModule
    ],
    exports : [
        RvcConfigurationComponent
    ]
})

export class RvcConfigurationModule {

}