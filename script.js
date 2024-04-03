// Get the input values
let nameInput = document.getElementById("name");
let scoreInput = document.getElementById("score");

// Get the scoreboard table and placeholder <td> elements
let scoreboardTable = document.getElementById("scoreboard");
let placeholderElements = scoreboardTable.querySelectorAll("tr[id^='tr_'] td");

// Add event listener to the "Add to scoreboard" button
function addToScoreboard() {
    // Get the input values
    let name = nameInput.value;
    let score = parseInt(scoreInput.value);

    // Clear the input fields
    nameInput.value = "";
    scoreInput.value = "";

    // Find the next available row to insert the new data
    let insertRow = null;
    let newScore = score; // Initialize the newScore variable
    for (i = 0; i < placeholderElements.length; i += 2) {
        let nameElement = placeholderElements[i];
        let scoreElement = placeholderElements[i + 1];
        if (nameElement.textContent === "") {
            insertRow = nameElement.parentNode;
            break;
        } else if (nameElement.textContent === name) {
            let oldScore = parseInt(scoreElement.textContent);
            newScore = oldScore + score; // Update the newScore variable
            scoreElement.textContent = newScore;
            insertRow = nameElement.parentNode; // Update the insertRow to the existing row
            break;
        }
    }

    // Update the placeholder <td> elements with the input values
    if (insertRow !== null) {
        insertRow.querySelector("td").textContent = name;
        insertRow.querySelector("td + td").textContent = newScore; // Use the newScore variable
    }
    else {
        // Create a new row for the name and score
        let newRow = document.createElement("tr");
        let nameCell = document.createElement("td");
        let scoreCell = document.createElement("td");

        nameCell.textContent = name;
        scoreCell.textContent = score;

        newRow.appendChild(nameCell);
        newRow.appendChild(scoreCell);

        scoreboardTable.appendChild(newRow);
    }

    // Sort the scoreboard rows based on the score
    let rows = scoreboardTable.querySelectorAll("tr[id^='tr_']");
    rows = Array.from(rows).sort(function (a, b) {
        let scoreA = parseInt(a.querySelector("td + td").textContent);
        let scoreB = parseInt(b.querySelector("td + td").textContent);
        return scoreB - scoreA;
    });

    // Reinsert the sorted rows into the scoreboard table
    for (j = 0; j < rows.length; j++) {
        scoreboardTable.appendChild(rows[j]);

        // Set font size for the top three scores
        let row = rows[j];
        let nameElement = row.querySelector("td");
        let scoreElement = row.querySelector("td + td");
        let fontSize = "";

        if (j === 0) {
            fontSize = "40px";
        } else if (j === 1) {
            fontSize = "35px";
        } else if (j === 2) {
            fontSize = "30px";
        } else {
            fontSize = "25px";
        }

        nameElement.style.fontSize = fontSize;
        scoreElement.style.fontSize = fontSize;
    }
};

// Add event listener to the "Add to scoreboard" button
document.getElementById("addButton").addEventListener("click", addToScoreboard);

// Add event listener to the input fields for the "Enter" key
nameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addToScoreboard();
    }
});

scoreInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addToScoreboard();
    }
});

// ----------------------------