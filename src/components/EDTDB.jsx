import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent,ResourceDirective,ResourcesDirective, ViewDirective, Week, Resize, ExcelExport, DragAndDrop, Inject, ViewsDirective ,Agenda, Day,
    Month,MonthAgenda,TimelineMonth, WorkWeek} from '@syncfusion/ej2-react-schedule';
import {connect} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
/**
 *  Schedule header customization sample
 */
const mapStateToProps = ( state, ownProps ) => {
    return {
        Data: state.DataEDT,
    }
}
class EDTDB extends React.Component {
    constructor(props) {
        super(...arguments);
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
    cellTemplate(props) {
        console.log('props', props);
       const divStyle={
            'background': props.Color,
            height:'100%',
           width:'100%'
       };
        return (<div  style={divStyle}>{props.Subject.toString()}</div>);
    }
    render() {
        return (<ScheduleComponent cssClass='excel-export'  height='auto' width='auto' id='schedule'
                                   quickInfoOnSelectionEnd={true}
                                   ref={t => this.scheduleObj= t}
                                   startHour="7:00" endHour="21:00" readonly={true}
                                   selectedDate= {new Date(2013, 8, 24)}
                                   eventSettings={{ dataSource: this.props.Data,template:this.cellTemplate.bind(this)}} actionBegin={this.onActionBegin.bind(this)}
                                   colorField='Color'
                                   firstDayOfWeek={1} workHours={{
            highlight: true, start: '8:00', end: '20:00'
        }}
        >
            <ResourcesDirective>
                <ResourceDirective   allowMultiple={true} dataSource={this.props.Data} textField='Text' idField='Id' colorField='Color'>
                </ResourceDirective>
            </ResourcesDirective>
            <ViewsDirective>
                <ViewDirective option='Week' allowVirtualScrolling={true}/>
                <ViewDirective option='WorkWeek' allowVirtualScrolling={true}/>
                <ViewDirective option='Day' allowVirtualScrolling={true}/>
                <ViewDirective option='MonthAgenda' allowVirtualScrolling={true}/>
                <ViewDirective option='Month' allowVirtualScrolling={true}/>

            </ViewsDirective>
            <Inject services={[Week, Resize, DragAndDrop, ExcelExport,Day, WorkWeek,MonthAgenda, Month, Agenda,TimelineMonth]}/>
        </ScheduleComponent>);
    }
}
;
const ConnectedEDTDB = connect(
    mapStateToProps,
    null
)(EDTDB);
export default ConnectedEDTDB;