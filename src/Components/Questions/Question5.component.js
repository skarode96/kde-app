
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";

import Form from "react-bootstrap/Form";

function Question3() {

    let [response, setResponse] = React.useState({});
    let query = "PREFIX csv: <http://www.semanticweb.org/KDE#>\n" +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
        "PREFIX math:<http://www.w3.org/2005/xpath-functions/math#>\n" +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n" +
        "PREFIX cs: <http://purl.org/vocab/changeset/schema#>\n" +
        "\n" +
        "SELECT ?Name_Of_Center ?Is_Present\n" +
        "WHERE {\n" +
        "  ?subject csv:hasCoffeeDock ?Is_Present.\n" +
        "  ?center csv:hasFacilities ?subject.\n" +
        "  ?center csv:hasName ?Name_Of_Center\n" +
        "  FILTER(?Is_Present = \"Yes\")\n" +
        "}";
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
                    Which Sports and Recreation Clubs & Multi-Use Community Centres have coffee docks?
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


export default Question3;