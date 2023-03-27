const FETCH_DATA_URL = "/api/fetchData";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function parseSheetData(data) {
  const headers = data.values.shift();
  const terms = data.values.map((row) => {
    const term = {};
    row.forEach((value, index) => {
      term[headers[index]] = value;
    });
    return term;
  });
  return terms;
}

function generateHTML(terms) {
  const container = document.getElementById("terms-definitions");
  terms.forEach((term) => {
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
  const sheetData = await fetchData(FETCH_DATA_URL);
  const terms = parseSheetData(sheetData);
  generateHTML(terms);
}

main();
