
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";
import Dropdown from "react-bootstrap/Dropdown";

function Question2() {

    let [response, setResponse] = React.useState({});
    let [dropdownVal, setDropDownVal] = React.useState('DUBLIN 12');
    async function getResultList() {
        let query = "PREFIX csv: <http://example.org/csv/>\n" +
            "SELECT ?name ?add\n" +
            "WHERE {\n" +
            " ?subject csv:address ?add.\n" +
            " ?subject csv:name ?name.\n" +
            " FILTER regex(?add, \""+
            dropdownVal
            +"\", \"i\")\n" +
            "}";
        const response = await fetchSparQL(query);
        const myJson = await response.json();
        setResponse(myJson);
    }
    function resetResultList() {
        setResponse({});
    }

    function handleOnSelect(eventKey) {
        setDropDownVal(eventKey);
    }

    return(
        <Container>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col xs={7}>
                    What are names of Sports and Recreation Clubs & Multi-Use Community Centres present in
                </Col>
                <Col xs={2}>
                    <Dropdown onSelect={(eventKey)=>handleOnSelect(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {dropdownVal}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'Dublin 12'} >Dublin 12</Dropdown.Item>
                            <Dropdown.Item eventKey={'Dublin 24'}>Dublin 24</Dropdown.Item>
                            <Dropdown.Item eventKey={'Dublin 16'}>Dublin 16</Dropdown.Item>
                            <Dropdown.Item eventKey={'Dublin 22'}>Dublin 22</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={3}>
                    <Button variant="light" onClick={() => getResultList()}>Get List</Button>
                    <Button variant="dark" onClick={() => resetResultList()}>Reset</Button>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row>
                <ResponseTableComponent response={response} />
            </Row>
            <br/>
            <br/>
        </Container>

    )
}


export default Question2;