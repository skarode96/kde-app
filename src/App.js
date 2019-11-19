import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question1 from "./Components/Questions/Question1.component";
import Question2 from "./Components/Questions/Question2.component";
import Question3 from "./Components/Questions/Question3.component";
import Question4 from "./Components/Questions/Question4.component";
import Question5 from "./Components/Questions/Question5.component";
import Question6 from "./Components/Questions/Question6.component";
import Question7 from "./Components/Questions/Question7.component";
import QueryInterface from "./Components/QueryInterface/QueryInterface.component";

function App() {
  return (
    <div className="App">

        <Tabs defaultActiveKey="Query Interface" id="uncontrolled-tab-example">
        <Tab eventKey="Query Interface" title="Query Interface">
            <QueryInterface/>
        </Tab>
        <Tab eventKey="Question1" title="Question1">
            <Question1/>
        </Tab>
        <Tab eventKey="Question2" title="Question2">
            <Question2/>
        </Tab>
        <Tab eventKey="Question3" title="Question3">
            <Question3/>
        </Tab>
        <Tab eventKey="Question4" title="Question4">
            <Question4/>
        </Tab>
        <Tab eventKey="Question5" title="Question5">
            <Question5/>
        </Tab>
        <Tab eventKey="Question6" title="Question6">
            <Question6/>
        </Tab>
        <Tab eventKey="Question7" title="Question7">
            <Question7/>
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
