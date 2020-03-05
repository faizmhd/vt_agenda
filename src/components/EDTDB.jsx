import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, ViewDirective, Week, Resize, ExcelExport, DragAndDrop, Inject, ViewsDirective ,Agenda, Day, Month,MonthAgenda,TimelineMonth, WorkWeek} from '@syncfusion/ej2-react-schedule';

import {useStore} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
/**
 *  Schedule header customization sample
 */


class EDTDB extends React.Component {
    constructor() {
        super();

    }
    onActionBegin(args) {
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-excel-export',
                text: 'Excel Export', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
            };
            args.items.push(exportItem);
        }
    }
    onExportClick() {
        this.scheduleObj.exportToExcel();
    }
    render() {
        return (<ScheduleComponent cssClass='excel-export'  height='auto' width='auto' id='schedule'
                                   quickInfoOnSelectionEnd={true}
                                   startHour="7:00" endHour="21:00" readonly={true}
                                   ref={t => this.scheduleObj = t}  selectedDate= {new Date(2013, 8, 24)}
                                   eventSettings={{ dataSource: this.data }} actionBegin={this.onActionBegin.bind(this)}
                                   firstDayOfWeek={1} workHours={{
            highlight: true, start: '8:00', end: '20:00'
        }}
        >
            <ViewsDirective>
                <ViewDirective option='Week'/>
            </ViewsDirective>
            <Inject services={[Week, Resize, DragAndDrop, ExcelExport,Day, WorkWeek,MonthAgenda, Month, Agenda,TimelineMonth]}/>
        </ScheduleComponent>);
    }
}
;

export default EDTDB;