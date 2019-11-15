
export default async function fetchSparQL(query) {
    let body = "query=" + encodeURIComponent(query);
    const response = await fetch("http://localhost:3030/test-1/sparql", {
        "credentials": "include",
        "headers": {
            "accept": "application/sparql-results+json,*/*;q=0.9",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "http://localhost:3030/dataset.html?tab=query&ds=/test-1",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": body,
        "method": "POST",
        "mode": "cors"
    });
    return response;
}
