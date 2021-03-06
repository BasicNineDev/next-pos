import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';


@Injectable()
export class MajorGroupsExtService implements Resolve<any>
{
    majorGroups: any[];
    onMajorGroupsChanged: BehaviorSubject<any>;

    /**
     * Contructor
     */

    constructor (
        private _httpClient: HttpClient
    )
    {
        this.onMajorGroupsChanged = new BehaviorSubject<any>({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getMajorGroups()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getMajorGroups(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/major-groups')
                .subscribe((response: any) => {
                    this.majorGroups = response;
                    this.onMajorGroupsChanged.next(this.majorGroups);
                    resolve(response);

                }, reject);
        });
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
}