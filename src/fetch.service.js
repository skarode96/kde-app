
export default async function fetchSparQL(query) {
    let body = "query=" + encodeURIComponent(query);
    const response = await fetch("http://ec2-52-210-17-160.eu-west-1.compute.amazonaws.com:8080/kde_j_v2/sparql", {
        "credentials": "include",
        "headers": {
            "accept": "application/sparql-results+json,*/*;q=0.9",
            "accept-language": "en-US,en;q=0.9,hi;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": body,
        "method": "POST",
        "mode": "cors"
    });
    return response;
}
