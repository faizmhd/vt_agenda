import React, {Component, ReactDOM, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {Agenda, Day, Inject, Month, ScheduleComponent,MonthAgenda,TimelineMonth,ResourceDirective,ResourcesDirective, Week, WorkWeek} from "@syncfusion/ej2-react-schedule";
import { useStore } from 'react-redux'
import {runInThisContext} from "vm";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom';
import { Redirect } from "react-router-dom";
export default function EDT() {
const store=useStore();
    const history=useHistory();
console.log(store.getState().DataEDT);
let datas = store.getState().DataEDT;

    if (store.getState().DataEDT ===null){
        return <Redirect to={'/'} />
        // history.replace('');
    }
//document.getElementById('e-appointment').style.backgroundColor = "black";

    return (
        <Grid container spacing={1}>
            <ScheduleComponent quickInfoOnSelectionEnd={true}
                               height='auto' width='auto'  selectedDate= {new Date(2013, 8, 24)}
                               startHour="7:00" endHour="21:00" readonly={true}
                               eventSettings={{ dataSource: datas}}
                               firstDayOfWeek={1} workHours={{
                highlight: true, start: '8:00', end: '20:00'
            }}
            >
                <Inject services={[Day, Week, WorkWeek,MonthAgenda, Month, Agenda,TimelineMonth]}/>
            </ScheduleComponent>
        </Grid>

    );
}



