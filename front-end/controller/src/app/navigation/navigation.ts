import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'configurator',
        title    : 'Configurator',
        translate: 'NAV.CONFIGURATOR',
        type     : 'group',
        children : [
            {
                id       : 'personnel',
                title    : 'Personnel',
                translate: 'NAV.PERSONNEL',
                type     : 'collapsable',
                icon     : 'person',
                children : [
                    {
                        id   : 'employee-class',
                        title: 'Employee Class',
                        translate: 'NAV.EMPLOYEE_CLASS',
                        type : 'item',
                        url  : 'configurator/personnel/employee-class'
                    },
                    {
                        id   : 'employee',
                        title: 'Employee',
                        translate: 'NAV.EMPLOYEE',
                        type : 'item',
                        url  : 'configurator/personnel/employee'
                    },
                    {
                        id   : 'configuration-access',
                        title: 'Configuration Access',
                        translate: 'NAV.CONFIGURATION_ACCESS',
                        type : 'item',
                        url  : 'configurator/personnel/configuration-access'
                    }
                ]
            },
            {
                id       : 'rvcInformation',
                title    : 'RVC Information',
                translate: 'NAV.RVC_INFORMATION',
                type     : 'collapsable',
                icon     : 'business_center',
                children : [
                    {
                        id   : 'rvc-configuration',
                        title: 'Revenue Center Configuration',
                        translate: 'NAV.RVC_CONFIGURATION',
                        type : 'item',
                        url  : 'configurator/rvc-information/rvc-configuration'
                    },
                ]
            },
            {
                id       : 'menuItems',
                title    : 'Menu Items',
                translate: 'NAV.MENU_ITEMS',
                type     : 'collapsable',
                icon     : 'restaurant',
                children : [
                    {
                        id   : 'major-group',
                        title: 'Major Group',
                        translate: 'NAV.MAJOR_GROUP',
                        type : 'item',
                        url  : 'configurator/menu-items/major-group'
                    },
                    {
                        id   : 'major-group2',
                        title: 'Major Group2',
                        translate: 'NAV.MAJOR_GROUP2',
                        type : 'item',
                        url  : 'configurator/menu-items/major-group2/major-groups-ex'
                    },
                    {
                        id   : 'major-group3',
                        title: 'Major Group3',
                        translate: 'NAV.MAJOR_GROUP3',
                        type : 'item',
                        url  : 'configurator/menu-items/major-group3'
                    }
                ]
            },
            {
                id: 'templates',
                title    : 'Templates',
                type     : 'collapsable',
                icon     : 'restaurant',
                children : [
                    {
                        id   : 'temp-1',
                        title: 'TEMP-1',
                        type : 'item',
                        url  : 'configurator/templates/temp-1'
                    },
                    {
                        id   : 'temp-2',
                        title: 'TEMP-2',
                        type : 'item',
                        url  : 'configurator/templates/temp-2'
                    },
                    {
                        id   : 'temp-3',
                        title: 'TEMP-3',
                        type : 'item',
                        url  : 'configurator/templates/temp-3'
                    }
                ]
            }
        ]
    },
    {
        id       : 'reports',
        title    : 'Reports',
        translate: 'NAV.REPORTS',
        type     : 'group',
        children : [
            {
                id       : 'revenue-reports',
                title    : 'Revenue Reports',
                translate: 'NAV.REVENUE_REPORTS',
                type     : 'collapsable',
                icon     : 'bar_chart',
                children : [
                    {
                        id   : 'daily-revenue-report',
                        title: 'Daily Revenue Report',
                        translate: 'NAV.DAILY_REVENUE_REPORT',
                        type : 'item',
                        url  : 'reports/revenueReports/daily-revenue-report'
                    },
                    {
                        id   : 'monthly-revenue-report',
                        title: 'Monthly Revenue Report',
                        translate: 'NAV.MONTHLY_REVENUE_REPORT',
                        type : 'item',
                        url  : 'reports/revenueReports/monthly-revenue-report'
                    }
                ]
            }
        ]
    },
    {
        id       : 'utilities',
        title    : 'Utilities',
        translate: 'NAV.UTILITIES',
        type     : 'group',
        children : [
            {
                id       : 'userWorkstation',
                title    : 'User Workstation',
                translate: 'NAV.USER_WORKSTATION',
                type     : 'collapsable',
                icon     : 'desktop_windows',
                children : [
                    {
                        id   : 'workstation-status',
                        title: 'Workstation Status',
                        translate: 'NAV.WORKSTATION_STATUS',
                        type : 'item',
                        url  : 'utilities/userWorkstation/workstation-status'
                    },
                    {
                        id   : 'control-workstation',
                        title: 'Control Workstation',
                        translate: 'NAV.CONTROL_WORKSTATION',
                        type : 'item',
                        url  : 'utilities/userWorkstation/control-workstation'
                    }
                ]
            }
        ]
    },
    {
        id       : 'apps',
        title    : 'Application',
        type     : 'group',
        children : [
            {
                id       : 'mail',
                title    : 'MAIL',
                type     : 'collapsable',
                icon     : 'desktop_windows',
                children : [
                    {
                        id   : 'workstation-status',
                        title: 'Workstation Status',
                        type : 'item',
                        url  : 'utilities/userWorkstation/workstation-status'
                    },
                    {
                        id   : 'control-workstation',
                        title: 'Control Workstation',
                        type : 'item',
                        url  : 'utilities/userWorkstation/control-workstation'
                    }
                ]
            }
        ]
    }
];
