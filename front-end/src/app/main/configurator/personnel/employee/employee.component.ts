import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as korean } from './i18n/kr';

@Component({
    selector   : 'employee',
    templateUrl: './employee.component.html',
    styleUrls  : ['./employee.component.scss']
})
export class EmployeeComponent
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, korean);
    }
}
