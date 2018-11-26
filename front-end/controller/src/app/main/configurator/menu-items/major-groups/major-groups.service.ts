import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils/index';

import { MajorGroup } from 'app/main/configurator/menu-items/major-groups/major-group.model';

@Injectable()
export class MajorGroupsService implements Resolve<any>
{
    onMajorGroupsChanged: BehaviorSubject<any>;
    onSelectedMajorGroupsChanged: BehaviorSubject<any>;
    onMajorGroupDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    majorGroups: MajorGroup[];
    majorGroup: any;
    selectedMajorGroups: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onMajorGroupsChanged = new BehaviorSubject([]);
        this.onSelectedMajorGroupsChanged = new BehaviorSubject([]);
        this.onMajorGroupDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getMajorGroups()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getMajorGroups();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getMajorGroups();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get majorGroups
     *
     * @returns {Promise<any>}
     */
    getMajorGroups(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get('api/major-groups')
                    .subscribe((response: any) => {

                        this.majorGroups = response;

                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.majorGroups = FuseUtils.filterArrayByString(this.majorGroups, this.searchText);
                        }

                        this.majorGroups = this.majorGroups.map(majorGroup => {
                            return new MajorGroup(majorGroup);
                        });

                        this.onMajorGroupsChanged.next(this.majorGroups);
                        resolve(this.majorGroups);
                    }, reject);
            }
        );
    }

    /**
     * Toggle selected majorGroup by id
     *
     * @param id
     */
    toggleSelectedMajorGroup(id): void
    {
        // First, check if we already have that majorGroup as selected...
        if ( this.selectedMajorGroups.length > 0 )
        {
            const index = this.selectedMajorGroups.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedMajorGroups.splice(index, 1);

                // Trigger the next event
                this.onSelectedMajorGroupsChanged.next(this.selectedMajorGroups);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedMajorGroups.push(id);

        // Trigger the next event
        this.onSelectedMajorGroupsChanged.next(this.selectedMajorGroups);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedMajorGroups.length > 0 )
        {
            this.deselectMajorGroups();
        }
        else
        {
            this.selectMajorGroups();
        }
    }

    /**
     * Select majorGroups
     *
     * @param filterParameter
     * @param filterValue
     */
    selectMajorGroups(filterParameter?, filterValue?): void
    {
        this.selectedMajorGroups = [];

        // If there is no filter, select all majorGroups
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedMajorGroups = [];
            this.majorGroups.map(majorGroup => {
                this.selectedMajorGroups.push(majorGroup.majorGroupRn);
            });
        }

        // Trigger the next event
        this.onSelectedMajorGroupsChanged.next(this.selectedMajorGroups);
    }


    /**
     *  Add majorGroup
     *
     * @param majorGroup
     * @returns {Promise<any>}
     */
    addMajorGroup(majorGroup): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/major-groups/', {...majorGroup})
                .subscribe(response => {
                    this.getMajorGroups();
                    resolve(response);
                });
        });
    }

    /**
     * Update majorGroup
     *
     * @param majorGroup
     * @returns {Promise<any>}
     */
    updateMajorGroup(majorGroup): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.put('api/major-groups/' + majorGroup.majorGroupRn, {...majorGroup})
                .subscribe(response => {
                    this.getMajorGroups();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect majorGroups
     */
    deselectMajorGroups(): void
    {
        this.selectedMajorGroups = [];

        // Trigger the next event
        this.onSelectedMajorGroupsChanged.next(this.selectedMajorGroups);
    }

    /**
     * Delete majorGroup
     *
     * @param majorGroup
     */
    deleteMajorGroup(majorGroup): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.delete('api/major-groups/' + majorGroup.majorGroupRn, {...majorGroup})
                .subscribe(response => {
                    this.getMajorGroups();
                    resolve(response);
                });
        });
        /*const majorGroupIndex = this.majorGroups.indexOf(majorGroup);
        this.majorGroups.splice(majorGroupIndex, 1);
        this.onMajorGroupsChanged.next(this.majorGroups);*/
    }

    /**
     * Delete selected majorGroups
     */
    deleteSelectedMajorGroups(): void
    {
        for ( const majorGroupRn of this.selectedMajorGroups )
        {
            const majorGroup = this.majorGroups.find(_majorGroup => {
                return _majorGroup.majorGroupRn === majorGroupRn;
            });
            const majorGroupIndex = this.majorGroups.indexOf(majorGroup);
            this.majorGroups.splice(majorGroupIndex, 1);
        }
        this.onMajorGroupsChanged.next(this.majorGroups);
        this.deselectMajorGroups();
    }

}
