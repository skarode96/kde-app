
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";


function Question10() {

    let [response, setResponse] = React.useState({});
    let [dropdownVal, setDropDownVal] = React.useState('MARK\'S CELTIC FOOTBALL CLUB');
    let query = "PREFIX csv: <http://www.semanticweb.org/KDE#>\n" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
        "PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>\n" +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n" +
        "PREFIX cs: <http://purl.org/vocab/changeset/schema#>\n"+
        "SELECT ?Name ?Distance (xsd:string(?numberofspaces) AS ?Number_Of_Spaces) ?Type_Of_Space \n" +
        "WHERE {\n" +
        "  ?subject csv:hasX ?x.\n" +
        "  ?subject csv:hasY ?y.\n" +
        "  ?parkingrecord csv:hasCoordinates ?subject.\n" +
        "  ?parkingrecord rdf:type csv:ParkingSpace.\n" +
        "  ?parkingrecord csv:hasLocationName ?Name.\n" +
        "  ?parkingrecord csv:hasSpaceType ?Type_Of_Space.\n" +
        "  ?parkingrecord csv:numberOfSpaces ?numberofspaces\n" +
        "  {\n" +
        "    SELECT ?selectedx ?selectedy \n" +
        "    WHERE {\n" +
        "      ?sub csv:hasX ?selectedx.\n" +
        "      ?sub csv:hasY ?selectedy.\n" +
        "      ?center csv:hasCoordinates ?sub.\n" +
        "      ?center csv:hasName \"" + dropdownVal + "\".\n" +
        "   }\n" +
        "  }\n" +
        "# To get the distance between two coordinates in metres \n" +
        "# ref: https://www.movable-type.co.uk/scripts/latlong.html\n" +
        "  BIND ((xsd:decimal(?selectedx) - xsd:decimal(?x)) * 0.0174533 AS ?phi)\n" +
        "  BIND ((xsd:decimal(?selectedy) - xsd:decimal(?y)) * 0.0174533 AS ?lambda)\n" +
        "  BIND ((xsd:decimal(?x)) * 0.0174533 AS ?lat1radians)\n" +
        "  BIND ((xsd:decimal(?selectedx)) * 0.0174533 AS ?lat2radians)\n" +
        "  BIND(math:sin(?phi / xsd:decimal(2)) * math:sin(?phi / xsd:decimal(2)) + math:cos(?lat1radians) * math:cos(?lat2radians) * math:sin(?lambda / xsd:decimal(2)) * math:sin(?lambda / xsd:decimal(2)) AS ?a)\n" +
        "  BIND(xsd:decimal(2) * math:atan2(math:sqrt(?a),math:sqrt(1-?a)) AS ?c)\n" +
        "  BIND(xsd:decimal(6371000) * xsd:decimal(?c) AS ?distance)\n" +
        "  BIND(xsd:string(?distance) AS ?Distance)\n" +
        "  \n" +
        "  FILTER(?distance < xsd:decimal(2000))\n" +
        "}ORDER BY ?distance LIMIT 1 OFFSET 1\n";


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
                    Which is the nearest parking area available near a particular Sports and Recreation Club and what are the number of parking spaces in it?
                </Col>
                <Col xs={2} >
                    <Dropdown onSelect={(eventKey)=>handleOnSelect(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {dropdownVal}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'MARK\'S CELTIC FOOTBALL CLUB'} >MARK'S CELTIC FOOTBALL CLUB</Dropdown.Item>
                            <Dropdown.Item eventKey={'SAINT JOSEPH\'S AMATURE BOXING CLUB'}>SAINT JOSEPH'S AMATURE BOXING CLUB</Dropdown.Item>
                            <Dropdown.Item eventKey={'TALLAGHT WARRIORS RUGBY YOUTH CLUB'}>TALLAGHT WARRIORS RUGBY YOUTH CLUB</Dropdown.Item>
                            <Dropdown.Item eventKey={'South Dublin Football League'}>South Dublin Football League</Dropdown.Item>
                            <Dropdown.Item eventKey={'SAINT MARY\'S RUGBY FOOTBALL CLUB'}>SAINT MARY'S RUGBY FOOTBALL CLUB</Dropdown.Item>
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


export default Question10;