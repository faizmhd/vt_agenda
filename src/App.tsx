import React from 'react';
import logo from './logo.svg';
import './App.css';
import EDT from './components/EDT';
import EDTDB from './components/EDTDB';
import Test from './components/testtest';
import Detail from "./components/Detail";
import { Provider } from "react-redux";
import {store,persistor} from "./redux/store";

import { PersistGate } from 'redux-persist/integration/react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';






const App = () => {

    let data: object [] = [{

            Id: 1,
            Subject: 'Meeting - 1',
            StartTime: new Date(2020, 2, 24, 10, 0),
            EndTime: new Date(2020, 2, 24, 12, 30),
            IsAllDay: false

}];
    console.log('data', data);


  return (
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <div className="App">

        <Router>
      <header className="App-header">
          <div>
              <Switch>
                  <Route path="/detail">
                      <Detail/>
                  </Route>
                  <Route path="/users">
                      <EDT></EDT>
                  </Route>
                  <Route path="/Test">
                      <EDTDB></EDTDB>
                  </Route>
                  <Route path="/">
                      <Test/>
                  </Route>
              </Switch>
          </div>

      </header>
        </Router>
    </div>
    </PersistGate>
</Provider>
  );
};

export default App;
