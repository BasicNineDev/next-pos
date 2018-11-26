import {Component, OnDestroy, OnInit} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Temp2Service} from './temp-2.service';

@Component({
    selector   : 'temp-2',
    templateUrl: './temp-2.component.html',
    styleUrls  : ['./temp-2.component.scss']
})
export class Temp2Component implements OnInit, OnDestroy
{

    form: FormGroup;

    simpleProducts: string[];
    products: any[];
    data: any;

    dataSource: any;

    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _formBuilder: FormBuilder,
        private _temp2Service: Temp2Service
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.dataSource = {
            store: _temp2Service.generateData(15)
        };
    }

    //
    // @ Lifecycle hooks
    //

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.form = this._formBuilder.group({
            /*number : [
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

            ]*/


        });
    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
