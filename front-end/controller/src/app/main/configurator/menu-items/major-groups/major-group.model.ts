import { FuseUtils } from '@fuse/utils/index';

export class MajorGroup
{
    majorGroupRn: any;
    majorGroupName: string;
    reportGroup: any;

    /**
     * Constructor
     *
     * @param majorGroup
     */
    constructor(majorGroup)
    {
        {
            this.majorGroupRn = majorGroup.majorGroupRn || '';
            this.majorGroupName = majorGroup.majorGroupName || '';
            this.reportGroup = majorGroup.reportGroup || '';
        }
    }
}
