import {Component, OnDestroy, OnInit} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as korean } from './i18n/kr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
    selector   : 'employee-class',
    templateUrl: './employee-class.component.html',
    styleUrls  : ['./employee-class.component.scss']
})
export class EmployeeClassComponent implements OnInit, OnDestroy
{

    classesForm: FormGroup;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, korean);
        this._unsubscribeAll = new Subject();
    }

    //
    // @ Lifecycle hooks
    //

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.classesForm = this._formBuilder.group({
            number : [
                {
                    value : '0001',
                    disabled: true
                }, Validators.required
            ],
            name : ['', Validators.required],
            hoursDayBeforeOT:[

            ],
            hoursPeriodBeforeOT: [

            ],
            defaultTransactionTouchscreen: [

            ]
        });
    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }



}
