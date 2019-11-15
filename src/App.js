import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question1 from "./Components/Questions/Question1.component";

function App() {
  return (
    <div className="App">

        <Tabs defaultActiveKey="Question1" id="uncontrolled-tab-example">
        <Tab eventKey="Question1" title="Question1">
            <Question1/>
        </Tab>
        <Tab eventKey="Question2" title="Question2">
            2
        </Tab>
        <Tab eventKey="Question3" title="Question3">
            3
        </Tab>
        <Tab eventKey="Question4" title="Question4">
            4
        </Tab>
        <Tab eventKey="Question5" title="Question5">
            5
        </Tab>
        <Tab eventKey="Question6" title="Question6">
            6
        </Tab>
        <Tab eventKey="Question7" title="Question7">
            7
        </Tab>
        <Tab eventKey="Question8" title="Question8">
            8
        </Tab>
        <Tab eventKey="Question9" title="Question9">
            9
        </Tab>
        <Tab eventKey="Question10" title="Question10">
            10
        </Tab>
      </Tabs>

    </div>
  );
}

export default App;
