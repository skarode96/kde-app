import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ResponseTableComponent from "../ResponseTable.component";
import fetchSparQL from "../../fetch.service";
import Form from "react-bootstrap/Form";

function QueryInterface() {
    let [response, setResponse] = React.useState({});
    let [queryInput, setQueryInput] = React.useState("PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
        "SELECT * WHERE {\n" +
        "  ?sub ?pred ?obj .\n" +
        "} \n" +
        "LIMIT 10");
    async function getResultList(query) {
        console.log(queryInput);
        const response = await fetchSparQL(queryInput);
        const myJson = await response.json();
        setResponse(myJson);
    }
    function resetResultList() {
        setResponse({});
    }

    function handleOnChange(e) {
        setQueryInput(e.target.value.toString());
    }

    return(
        <Container>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col sm={2}><h4>Enter Query</h4></Col>
                <Col sm={10}></Col>
            </Row>
            <Row>
                <Col>
                    <Form noValidate>
                        <Form.Control defaultValue={queryInput} onChange={(e) => handleOnChange(e)} as="textarea" rows="8" />
                    </Form>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={10}/>
                <Col xs={1}>
                    <Button variant="light" onClick={() => getResultList()}>Query</Button>
                </Col>
                <Col xs={1}>
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


export default QueryInterface;