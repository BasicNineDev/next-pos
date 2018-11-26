import {Component} from '@angular/core';
import {FuseTranslationLoaderService} from '../../../../../@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as korean } from './i18n/kr';

@Component({
    selector : 'rvc-configuration',
    templateUrl: './rvc-configuration.component.html',
    styleUrls: ['./rvc-configuration.component.scss']
})
export class RvcConfigurationComponent
{


    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, korean);
    }
}