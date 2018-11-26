import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import {MajorGroupEx} from './major-group-ex.model';
import {MajorGroupExService} from './major-group-ex.service';

@Component({
    selector     : 'major-group-ex',
    templateUrl  : './major-group-ex.component.html',
    styleUrls    : ['./major-group-ex.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MajorGroupExComponent implements OnInit, OnDestroy
{
    majorGroupEx: MajorGroupEx;
    pageType: string;
    majorGroupExForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} _majorGroupExService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _majorGroupExService: MajorGroupExService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.majorGroupEx = new MajorGroupEx();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update product on changes
        this._majorGroupExService.onMajorGroupExChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(majorGroupEx => {

                if ( majorGroupEx )
                {
                    this.majorGroupEx = new MajorGroupEx(majorGroupEx);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.majorGroupEx = new MajorGroupEx();
                }

                this.majorGroupExForm = this.createMajorGroupExForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createMajorGroupExForm(): FormGroup
    {
        return this._formBuilder.group({
            majorGroupRn    : [this.majorGroupEx.majorGroupRn],
            majorGroupName  : [this.majorGroupEx.majorGroupName],
            reportGroup     : [this.majorGroupEx.reportGroup],
            handle          : [this.majorGroupEx.handle]
        });
    }

    /**
     * Save product
     */
    saveMajorGroupEx(): void
    {
        const data = this.majorGroupExForm.getRawValue();
        data.handle = FuseUtils.handleize(data.majorGroupName);

        this._majorGroupExService.saveMajorGroupEx(data)
            .then(() => {

                // Trigger the subscription with new data
                this._majorGroupExService.onMajorGroupExChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Major Group saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add product
     */
    addMajorGroupEx(): void
    {
        const data = this.majorGroupExForm.getRawValue();
        data.handle = FuseUtils.handleize(data.majorGroupName);

        this._majorGroupExService.addMajorGroupEx(data)
            .then(() => {

                // Trigger the subscription with new data
                this._majorGroupExService.onMajorGroupExChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Major Group added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/major-groups/style-2/major-groups-ex/' + this.majorGroupEx.majorGroupRn + '/' + this.majorGroupEx.majorGroupName);
            });
    }
}
