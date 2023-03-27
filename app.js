const SHEET_ID = "1VOwuJVofOlgRvH4dgo8vWzkMHR9zGwzdFb6T7Wfv0TU";
const SHEET_NAME = "Sheet1";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data;
}

function parseCSV(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const terms = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const obj = {};
        const row = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = row[j].trim();
        }
        terms.push(obj);
    }
    return terms;
}

function generateHTML(terms) {
    const container = document.getElementById("terms-definitions");
    terms.forEach(term => {
        const termDiv = document.createElement("div");
        const termTitle = document.createElement("h2");
        const termDefinition = document.createElement("p");

        termTitle.textContent = term["Term"];
        termDefinition.textContent = term["Definition"];

        termDiv.appendChild(termTitle);
        termDiv.appendChild(termDefinition);
        container.appendChild(termDiv);
    });
}

async function main() {
    const csvData = await fetchData(CSV_URL);
    const terms = parseCSV(csvData);
    generateHTML(terms);
}

main();
