import {BehaviorSubject} from 'rxjs';

export class ToolbarService
{

    onClickedSaveBtn: BehaviorSubject<any>;



    constructor() {

        this.onClickedSaveBtn = new BehaviorSubject<any>({});
    }

    cmdSave() {
        console.log('cmdSave Call')
        this.onClickedSaveBtn.next({});
    }


}