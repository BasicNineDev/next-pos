import { MatChipInputEvent } from '@angular/material';

import { FuseUtils } from '@fuse/utils';

export class MajorGroupEx
{

    majorGroupRn: string;
    majorGroupName: string;
    reportGroup: string;
    handle: string;

    /**
     * Constructor
     *
     * @param majorGroupEx
     */
    constructor(majorGroupEx?)
    {
        majorGroupEx = majorGroupEx || {};
        this.majorGroupRn = majorGroupEx.majorGroupRn || '';
        this.majorGroupName = majorGroupEx.majorGroupName || '';
        this.handle = majorGroupEx.handle || FuseUtils.handleize(this.majorGroupName);
        this.reportGroup = majorGroupEx.reportGroup || '';
    }
}
