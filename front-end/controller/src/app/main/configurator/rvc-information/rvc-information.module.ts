import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '../../../../@fuse/shared.module';


const routes = [
    {
        path : 'rvc-configuration',
        loadChildren: './rvc-configuration/rvc-configuration.module#RvcConfigurationModule'
    }
];

@NgModule({
    imports : [
        RouterModule.forChild(routes),
        FuseSharedModule

    ]
})

export class RvcInformationModule {

}