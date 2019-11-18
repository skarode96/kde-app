
import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";

import Form from "react-bootstrap/Form";

function Question1() {

    let [response, setResponse] = React.useState({});
    let query = "PREFIX csv: <http://example.org/csv/>\n" +
        "SELECT ?subject ?name\n" +
        "WHERE {\n" +
        " ?subject csv:sdccowned \"Yes\".\n" +
        " ?subject csv:name ?name.\n" +
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
                        What are SDCC (South Dublin City Council) owned Sports and Recreation Clubs & Multi-Use Community Centres?
                    </Col>
                    <Col>
                        <Button variant="light" onClick={() => getResultList()}>Get List</Button>
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


export default Question1;