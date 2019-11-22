
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";

import Form from "react-bootstrap/Form";

function Question8() {

    let [response, setResponse] = React.useState({});
    let query = "PREFIX csv: <http://www.semanticweb.org/KDE#>\n" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
        "PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>\n" +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n" +
        "PREFIX cs: <http://purl.org/vocab/changeset/schema#>\n" +
        "\n" +
        "SELECT ?Name\n" +
        "WHERE {\n" +
        "  ?record csv:hasOnlinePresence ?subject.\n" +
        "  ?record csv:hasName ?Name.\n" +
        "  FILTER(NOT EXISTS { ?subject csv:hasWebsite ?site })\n" +
        "}\n";
    async function getResultList() {
        const response = await fetchSparQL(query);
        const myJson = await response.json();
        setResponse(myJson);
    }
    function resetResultList() {
        setResponse({});
    }

    return(
        <Container>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col>
                    What are the Sports and Recreation Clubs & Multi-Use Community Centres that have missing website information?
                </Col>
                <Col>
                    <Button variant="light" onClick={() => getResultList()}>Query</Button>
                    <Button variant="dark" onClick={() => resetResultList()}>Reset</Button>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row>
                <Form.Control defaultValue={query} as="textarea" disabled={true}  rows="8" />
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


export default Question8;
