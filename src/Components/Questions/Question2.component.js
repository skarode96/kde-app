
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";


function Question2() {

    let [response, setResponse] = React.useState({});
    let [dropdownVal, setDropDownVal] = React.useState('DUBLIN 12');
    let query = "PREFIX pp: <http://www.semanticweb.org/public-place#>\n" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
        "PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>\n" +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n" +
        "PREFIX cs: <http://purl.org/vocab/changeset/schema#>\n"+
        "SELECT ?Name_Of_Center ?Address\n" +
        "WHERE {\n" +
        "  ?subject pp:hasAddress ?Address.\n" +
        "  ?center pp:hasContactInfo ?subject. \n" +
        "  ?center pp:hasName ?Name_Of_Center.\n" +
        " FILTER regex(?Address, \""+
        dropdownVal
        +"\", \"i\")\n" +
        "}";


    async function getResultList() {
        const response = await fetchSparQL(query);
        const myJson = await response.json();
        setResponse(myJson);
    }
    function resetResultList() {
        setResponse({});
    }

    function handleOnSelect(eventKey) {
        setDropDownVal(eventKey);
        // resetResultList();
    }

    return(
        <Container>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col xs={7}>
                    Give names of Sports and Recreation Clubs & Multi-Use Community Centres present in
                </Col>
                <Col xs={2} >
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
                    <Button variant="light" onClick={() => getResultList()}>Query</Button>
                    <Button variant="dark" onClick={() => resetResultList()}>Reset</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Form.Control as="textarea" disabled={true}  rows="8" value={query}/>
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
