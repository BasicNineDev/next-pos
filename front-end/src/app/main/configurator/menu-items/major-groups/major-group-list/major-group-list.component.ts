import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations/index';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { MajorGroupsService } from 'app/main/configurator/menu-items/major-groups/major-groups.service';
import { MajorGroupFormDialogComponent } from 'app/main/configurator/menu-items/major-groups/major-group-form/major-group-form.component';

@Component({
    selector     : 'major-group-list',
    templateUrl  : './major-group-list.component.html',
    styleUrls    : ['./major-group-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MajorGroupListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    majorGroups: any;
    majorGroup: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['majorGroupRn', 'majorGroupName', 'reportGroup', 'buttons'];
    selectedMajorGroups: any[];
    /*checkboxes: {};*/
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MajorGroupsService} _majorGroupsService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _majorGroupsService: MajorGroupsService,
        public _matDialog: MatDialog
    )
    {
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
        this.dataSource = new FilesDataSource(this._majorGroupsService);

        this._majorGroupsService.onMajorGroupsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(majorGroups => {
                this.majorGroups = majorGroups;

                /*this.checkboxes = {};*/
                /*majorGroups.map(majorGroup => {
                    this.checkboxes[majorGroup.majorGroupRn] = false;
                });*/
            });

        this._majorGroupsService.onSelectedMajorGroupsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMajorGroups => {
                /*for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedMajorGroups.includes(id);
                }*/
                this.selectedMajorGroups = selectedMajorGroups;
            });

        this._majorGroupsService.onMajorGroupDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(majorGroup => {
                this.majorGroup = majorGroup;
            });

        this._majorGroupsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._majorGroupsService.deselectMajorGroups();
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
     * Edit majorGroup
     *
     * @param majorGroup
     */
    editMajorGroup(majorGroup): void
    {
        this.dialogRef = this._matDialog.open(MajorGroupFormDialogComponent, {
            panelClass: 'major-group-form-dialog',
            data      : {
                majorGroup: majorGroup,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._majorGroupsService.updateMajorGroup(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteMajorGroup(majorGroup);

                        break;
                }
            });
    }

    /**
     * Delete MajorGroup
     */
    deleteMajorGroup(majorGroup): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._majorGroupsService.deleteMajorGroup(majorGroup);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param majorGroupId
     */
    onSelectedChange(majorGroupRn): void
    {
        this._majorGroupsService.toggleSelectedMajorGroup(majorGroupRn);
    }

    /**
     * Toggle star
     *
     * @param majorGroupId
     */
    toggleStar(majorGroupRn): void
    {
        if ( this.majorGroup.starred.includes(majorGroupRn) )
        {
            this.majorGroup.starred.splice(this.majorGroup.starred.indexOf(majorGroupRn), 1);
        }
        else
        {
            this.majorGroup.starred.push(majorGroupRn);
        }

    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {MajorGroupsService} _majorGroupsService
     */
    constructor(
        private _majorGroupsService: MajorGroupsService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._majorGroupsService.onMajorGroupsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
