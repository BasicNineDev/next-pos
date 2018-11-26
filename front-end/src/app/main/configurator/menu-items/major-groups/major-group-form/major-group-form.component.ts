import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MajorGroup } from 'app/main/configurator/menu-items/major-groups/major-group.model';

@Component({
    selector     : 'major-groups-major-group-form-dialog',
    templateUrl  : './major-group-form.component.html',
    styleUrls    : ['./major-group-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MajorGroupFormDialogComponent
{
    action: string;
    majorGroup: MajorGroup;
    majorGroupForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MajorGroupFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<MajorGroupFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'EDIT MAJOR GROUP';
            this.majorGroup = _data.majorGroup;
        }
        else
        {
            this.dialogTitle = 'NEW MAJOR GROUP';
            this.majorGroup = new MajorGroup({});
        }

        this.majorGroupForm = this.createMajorGroupForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create majorGroup form
     *
     * @returns {FormGroup}
     */
    createMajorGroupForm(): FormGroup
    {
        return this._formBuilder.group({
            majorGroupRn      : [this.majorGroup.majorGroupRn],
            majorGroupName    : [this.majorGroup.majorGroupName],
            reportGroup: [this.majorGroup.reportGroup]
        });
    }
}
