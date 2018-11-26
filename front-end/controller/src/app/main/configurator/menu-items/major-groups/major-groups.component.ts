import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations/index';
import {MajorGroupsService} from './major-groups.service';
import {MajorGroupFormDialogComponent} from './major-group-form/major-group-form.component';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';


@Component({
    selector   : 'major-groups',
    templateUrl: './major-groups.component.html',
    styleUrls  : ['./major-groups.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MajorGroupsComponent implements OnInit, OnDestroy
{


    dialogRef: any;
    hasSelectedMajorGroups: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _majorGroupsService: MajorGroupsService,
        private _matDialog: MatDialog
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._majorGroupsService.onSelectedMajorGroupsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMajorGroups => {
                this.hasSelectedMajorGroups = selectedMajorGroups.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._majorGroupsService.onSearchTextChanged.next(searchText);
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New majorGroup
     */
    newMajorGroup(): void
    {
        this.dialogRef = this._matDialog.open(MajorGroupFormDialogComponent, {
            panelClass: 'major-group-form-dialog',
            data      : {
                action: 'new'
            },
            hasBackdrop: false
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                this._majorGroupsService.addMajorGroup(response.getRawValue());
            });
    }

}
