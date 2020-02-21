import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/testtest';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';





const App = () => {


  return (

    <div className="App">
        <Router>
      <header className="App-header">
          <div>
              <Switch>
                  <Route path="/users">
                      <ScheduleComponent   startHour="7:00" endHour="20:00" readonly={true} firstDayOfWeek={1} workHours={{
                          highlight: true, start: '8:00', end: '19:00'
                      }}>
                          <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                      </ScheduleComponent>
                  </Route>
                  <Route path="/">
                      <Test/>
                  </Route>
              </Switch>
          </div>

      </header>
        </Router>
    </div>
  );
}

export default App;
