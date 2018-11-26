import {Component, OnDestroy, OnInit} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Temp3Service} from './temp-3.service';

@Component({
    selector   : 'temp-3',
    templateUrl: './temp-3.component.html',
    styleUrls  : ['./temp-3.component.scss']
})
export class Temp3Component implements OnInit, OnDestroy
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
        private _temp3Service: Temp3Service
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.dataSource = {
            store: _temp3Service.generateData(20)
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
