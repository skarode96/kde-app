
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";


function Question6() {

    let [response, setResponse] = React.useState({});
    let [dropdownValDistance, setDropDownValDistance] = React.useState('1000');
    let [dropdownValCenter, setDropDownValCenter] = React.useState('MARK\'S CELTIC FOOTBALL CLUB');
    let query = "PREFIX pp: <http://www.semanticweb.org/public-place#>\n" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
        "PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>\n" +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n" +
        "PREFIX cs: <http://purl.org/vocab/changeset/schema#>\n" +
        "SELECT ?Name_Of_Center ?Distance_In_Meters\n" +
        "WHERE {\n" +
        "  ?subject pp:hasX ?x.\n" +
        "  ?subject pp:hasY ?y.\n" +
        "  ?parkingrecord pp:hasCoordinates ?subject.\n" +
        "  ?parkingrecord rdf:type pp:ParkingSpace.\n" +
        "  ?parkingrecord pp:hasLocationName ?Name_Of_Center.\n" +
        "  ?parkingrecord pp:hasSpaceType ?type.\n" +
        "  {\n" +
        "    SELECT ?selectedx ?selectedy \n" +
        "    WHERE {\n" +
        "      ?sub pp:hasX ?selectedx.\n" +
        "      ?sub pp:hasY ?selectedy.\n" +
        "      ?center pp:hasCoordinates ?sub.\n" +
        "      ?center pp:hasName \"" + dropdownValCenter + "\".\n" +
        "   }\n" +
        "  }\n" +
        "  BIND ((xsd:decimal(?selectedx) - xsd:decimal(?x)) * 0.0174533 AS ?phi)\n" +
        "  BIND ((xsd:decimal(?selectedy) - xsd:decimal(?y)) * 0.0174533 AS ?lambda)\n" +
        "  BIND ((xsd:decimal(?x)) * 0.0174533 AS ?lat1radians)\n" +
        "  BIND ((xsd:decimal(?selectedx)) * 0.0174533 AS ?lat2radians)\n" +
        "  BIND(math:sin(?phi / xsd:decimal(2)) * math:sin(?phi / xsd:decimal(2)) + math:cos(?lat1radians) * math:cos(?lat2radians) * math:sin(?lambda / xsd:decimal(2)) * math:sin(?lambda / xsd:decimal(2)) AS ?a)\n" +
        "  BIND(xsd:decimal(2) * math:atan2(math:sqrt(?a),math:sqrt(1-?a)) AS ?c)\n" +
        "  BIND(xsd:decimal(6371000) * xsd:decimal(?c) AS ?distance)\n" +
        "  BIND(xsd:string(?distance) AS ?Distance_In_Meters)\n" +
        "  FILTER(?distance < xsd:decimal("+ dropdownValDistance +"))\n" +
        "} ORDER BY ?distance";


    async function getResultList() {
        const response = await fetchSparQL(query);
        const myJson = await response.json();
        setResponse(myJson);
    }
    function resetResultList() {
        setResponse({});
    }

    function handleOnSelect(eventKey) {
        setDropDownValDistance(eventKey);
    }
    function handleOnSelectCenter(eventKey) {
        setDropDownValCenter(eventKey);
    }

    return(
        <Container>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col xs={4}>
                    What are the parking areas available near a particular Sports and Recreation Club within given distance (Sorted by distance)
                </Col>
                <Col xs={2} >
                    <Dropdown onSelect={(eventKey)=>handleOnSelect(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {dropdownValDistance}
                        </Dropdown.Toggle>
                        &nbsp; in Meters

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'1000'} >1000</Dropdown.Item>
                            <Dropdown.Item eventKey={'2000'}>2000</Dropdown.Item>
                            <Dropdown.Item eventKey={'3000'}>3000</Dropdown.Item>
                            <Dropdown.Item eventKey={'4000'}>4000</Dropdown.Item>
                            <Dropdown.Item eventKey={'5000'}>5000</Dropdown.Item>
                            <Dropdown.Item eventKey={'6000'}>6000</Dropdown.Item>
                            <Dropdown.Item eventKey={'7000'}>7000</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={4}>
                    <Dropdown onSelect={(eventKey)=>handleOnSelectCenter(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {dropdownValCenter}
                        </Dropdown.Toggle>
                        &nbsp; Club
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'MARK\'S CELTIC FOOTBALL CLUB'} >MARK'S CELTIC FOOTBALL CLUB</Dropdown.Item>
                            <Dropdown.Item eventKey={'SAINT JOSEPH\'S AMATURE BOXING CLUB'}>SAINT JOSEPH'S AMATURE BOXING CLUB</Dropdown.Item>
                            <Dropdown.Item eventKey={'TALLAGHT WARRIORS RUGBY YOUTH CLUB'}>TALLAGHT WARRIORS RUGBY YOUTH CLUB</Dropdown.Item>
                            <Dropdown.Item eventKey={'South Dublin Football League'}>South Dublin Football League</Dropdown.Item>
                            <Dropdown.Item eventKey={'SAINT MARY\'S RUGBY FOOTBALL CLUB'}>SAINT MARY'S RUGBY FOOTBALL CLUB</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Row/>
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


export default Question6;
