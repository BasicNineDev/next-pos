import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer, DxPageService, Employee, State} from './dx-page.service';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector   : 'dx-page',
    templateUrl: './dx-page.component.html',
    styleUrls  : ['./dx-page.component.scss']
})
export class DxPageComponent implements OnInit, OnDestroy
{

    customers: Customer[];
    dataSource: Employee[];
    states: State[];

    private _unsubscribeAll: Subject<any>;


    /**
     * Constructor
     */
    constructor(private _activatedRoute: ActivatedRoute,
                private _dxPageService: DxPageService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.customers = this._dxPageService.customers;

        this.dataSource = _dxPageService.getEmployees();
        this.states = _dxPageService.getStates();
    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {

        alert('hi');

    }
}
