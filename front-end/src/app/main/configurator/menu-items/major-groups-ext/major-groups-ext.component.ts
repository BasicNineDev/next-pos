import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MajorGroupsExtService} from './major-groups-ext.service';
import {fuseAnimations} from '@fuse/animations/index';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import {DxDataGridComponent} from 'devextreme-angular';
import {ToolbarService} from '../../../../layout/components/toolbar/toolbar.service';
import {MajorGroup} from '../major-groups/major-group.model';

@Component({
    selector : 'major-groups-ext',
    templateUrl: './major-groups-ext.component.html',
    styleUrls : ['./major-groups-ext.component.scss'],
    animations: fuseAnimations

})
export class MajorGroupsExtComponent implements OnInit {

    dataSource: FilesDataSource | null;
    majorGroupsData: any | null;
    toUpdateMajorGroups: MajorGroup[];

    @ViewChild(DxDataGridComponent) majorGroupDataGrid: DxDataGridComponent;




    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _MajorGroupsExtService: MajorGroupsExtService,
        private _toolbarService: ToolbarService
    ) {
        //this.dataSource = _MajorGroupsExService.getEmployees();
        //this.states = _MajorGroupsExService.getStates();
        // set the private default
        this._unsubscribeAll = new Subject();

        this.toUpdateMajorGroups = [];

    }

    /**
     * On init
     */
    ngOnInit(): void {

        this.dataSource = new FilesDataSource(this._MajorGroupsExtService);
        this.majorGroupsData = this.dataSource.filteredData;
        //alert('hi');

        this._toolbarService.onClickedSaveBtn
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(v => {
                console.log(v);
                console.log('push me');
                if(this.majorGroupDataGrid.instance) {
                    this.saveEditData();
                }
            });
    }

    saveEditData() {
        console.log('_cmdSave called');
        //console.log(this.majorGroupDataGrid.instance.hasEditData());
        if(this.majorGroupDataGrid.instance.hasEditData()) {
            console.log('before', this.majorGroupDataGrid.instance.getDataSource());
            // Promise 객체에 태워서 http client 로 처리함.
            this.majorGroupDataGrid.instance.saveEditData().then(()=> {

                this.toUpdateMajorGroups.forEach((majorGroup)=> {
                    console.log('data', majorGroup);
                    this._MajorGroupsExtService.updateMajorGroup(majorGroup);
                });
            });
            console.log('after', this.majorGroupDataGrid.instance.getDataSource());
        }
    }

    onToolbarPreparing (e) {
        //var toolbarItems = e.toolbarOptions.items;
        // Modifies an existing item
        e.toolbarOptions.visible = false;
        /*toolbarItems.forEach(function(item) {
            if (item.name === "saveButton") {
                // Change the item options here
                item.visible = false;
            }
        });*/
    }

    updateCheckUpdating(e) {
        console.log('updating', e);
        this.toUpdateMajorGroups.push(new MajorGroup({
            'majorGroupRn' : e.key,
            'majorGroupName' : e.newData.majorGroupName || e.oldData.majorGroupName,
            'reportGroup' : e.newData.reportGroup || e.oldData.reportGroup
        }));
    }

    updateCheckUpdated(e) {
        console.log('updated', e);
    }
    startUpdating(e) {
        console.log(e)
        //this.startUpdating = true;
        console.log('updating');
    }
    endUpdating(e) {

        console.log(e)
        /*if (this.startUpdate) {
            this.startUpdate = false;
            alert('끝났어!')
        }*/
        console.log('complete');
    }
}



class FilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    constructor(
        private _majorGroupsExtService: MajorGroupsExtService
    ) {

        super();

        this.filteredData = this._majorGroupsExtService.majorGroups;
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._majorGroupsExtService.onMajorGroupsChanged
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(()=> {
                    let data =this._majorGroupsExtService.majorGroups.slice();
                    this.filteredData = [...data];
                    return data.splice(0, 10);
                }));
    }

    disconnect(): void {

    }


    // @ Accessor
    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any){
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
}
