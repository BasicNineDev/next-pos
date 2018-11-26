import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MajorGroupExService implements Resolve<any>
{
    routeParams: any;
    majorGroupEx: any;
    onMajorGroupExChanged: BehaviorSubject<any>;

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
        this.onMajorGroupExChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getMajorGroupEx()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getMajorGroupEx(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onMajorGroupExChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get('api/major-groups/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.majorGroupEx = response;
                        this.onMajorGroupExChanged.next(this.majorGroupEx);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveMajorGroupEx(majorGroupEx): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.put('api/major-groups/' + majorGroupEx.majorGroupRn, majorGroupEx)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addMajorGroupEx(majorGroupEx): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/major-groups/', majorGroupEx)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
