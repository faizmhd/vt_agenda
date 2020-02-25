import React, { useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from "@syncfusion/ej2-react-schedule";
import { useStore } from 'react-redux'

export default function EDT() {
const store=useStore();
console.log(store.getState().DataEDT);
let datas = store.getState().DataEDT;


    return (
        <Grid container spacing={1}>
            <h1> {store.getState().DataEDT[0].subject} </h1>
            <ScheduleComponent selectedDate= {new Date(2020, 1, 24)}  startHour="7:00" endHour="20:00" readonly={true} eventSettings={{ dataSource: datas}} firstDayOfWeek={1} workHours={{
                highlight: true, start: '8:00', end: '19:00'
            }}

            >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
        </Grid>
    );
}
