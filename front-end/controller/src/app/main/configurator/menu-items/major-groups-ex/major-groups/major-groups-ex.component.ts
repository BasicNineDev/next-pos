import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';

import {FuseUtils} from '@fuse/utils/index';
import {MajorGroupsExService} from './major-groups-ex.service';
import {fuseAnimations} from '@fuse/animations/index';
import { DataSource } from '@angular/cdk/collections';

@Component({
    selector : 'major-groups-ex',
    templateUrl: './major-groups-ex.component.html',
    styleUrls : ['./major-groups-ex.component.scss'],
    animations: fuseAnimations

})
export class MajorGroupsExComponent implements OnInit {
    dataSource: FilesDataSource | null;

    displayedColumns = ['majorGroupRn', 'majorGroupName', 'reportGroup'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;


    // Private

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _MajorGroupsExService: MajorGroupsExService
    )
    {
        // set the private default
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
        this.dataSource = new FilesDataSource(this._MajorGroupsExService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource)
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');


    constructor(
        private _majorGroupsExService: MajorGroupsExService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._majorGroupsExService.majorGroups;
    }



    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._majorGroupsExService.onMajorGroupsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._majorGroupsExService.majorGroups.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // @ Accessor

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // @ Public methods

    filterData(data): any
    {
        if ( !this.filter)
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[]
    {
        if (!this._matSort.active || this._matSort.direction === '')
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'majorGroupRn':
                    [propertyA, propertyB] = [a.majorGroupRn, b.majorGroupRn];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /*
     * Disconnect
     */
    disconnect(): void
    {

    }
}
