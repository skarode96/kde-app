
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";


function Question7() {

    let [response, setResponse] = React.useState({});
    let [dropdownValCenter, setDropDownValCenter] = React.useState('NEILSTOWN COMMUNITY CENTRE');
    let query = "PREFIX csv: <http://www.semanticweb.org/KDE#>\n" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
        "PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>\n" +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n" +
        "PREFIX cs: <http://purl.org/vocab/changeset/schema#>\n" +
        "SELECT  ?Type (xsd:string(Count(?Type)) AS ?Count)\n" +
        "WHERE {\n" +
        "  ?subject csv:hasX ?x.\n" +
        "  ?subject csv:hasY ?y.\n" +
        "  ?parkingrecord csv:hasCoordinates ?subject.\n" +
        "  ?parkingrecord rdf:type csv:ParkingSpace.\n" +
        "  ?parkingrecord csv:hasLocationName ?name.\n" +
        "  ?parkingrecord csv:hasSpaceType ?Type.\n" +
        "  {\n" +
        "    SELECT ?selectedx ?selectedy \n" +
        "    WHERE {\n" +
        "      ?sub csv:hasX ?selectedx.\n" +
        "      ?sub csv:hasY ?selectedy.\n" +
        "      ?center csv:hasCoordinates ?sub.\n" +
        "       ?center csv:hasName \"" + dropdownValCenter + "\".\n" +
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
        "  BIND(xsd:string(?distance) AS ?dist)\n" +
        "  \n" +
        "  FILTER(?distance < xsd:decimal(2000))\n" +
        "  \n" +
        "}GROUPBY ?Type";


    async function getResultList() {
        const response = await fetchSparQL(query);
        const myJson = await response.json();
        setResponse(myJson);
    }
    function resetResultList() {
        setResponse({});
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
                    What are the different kinds of Space-type available for parking near a particular Sports and Recreation Club and what are the counts of each of them?
                </Col>
                <Col xs={4}>
                    <Dropdown onSelect={(eventKey)=>handleOnSelectCenter(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {dropdownValCenter}
                        </Dropdown.Toggle>
                        &nbsp;
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={'NEILSTOWN COMMUNITY CENTRE'} >NEILSTOWN COMMUNITY CENTRE</Dropdown.Item>
                            <Dropdown.Item eventKey={'TYMON BAWN COMMUNITY CENTRE'}>TYMON BAWN COMMUNITY CENTRE
                            </Dropdown.Item>
                            <Dropdown.Item eventKey={'RATHCOOLE COMMUNITY CENTRE'}>RATHCOOLE COMMUNITY CENTRE</Dropdown.Item>
                            <Dropdown.Item eventKey={'QUARRYVALE COMMUNITY CENTRE'}>QUARRYVALE COMMUNITY CENTRE</Dropdown.Item>
                            <Dropdown.Item eventKey={'DOMINIC\'S COMMUNITY CENTRE'}>DOMINIC'S COMMUNITY CENTRE</Dropdown.Item>
                            <Dropdown.Item eventKey={'KILLINARDEN COMMUNITY CENTRE'}>KILLINARDEN COMMUNITY CENTRE</Dropdown.Item>
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


export default Question7;
