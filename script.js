const categories = {
    "Presidents": {
        200: ["This U.S. president issued the Emancipation Proclamation.", "Who is Abraham Lincoln?"],
        400: ["This president faced the challenges of the Barbary Wars and the Lewis and Clark expedition.", "Who is Thomas Jefferson?"],
        600: ["This president, the first one to serve two non-consecutive terms, is best known for leading the nation through the Panic of 1837 and the Indian Removal Act.", "Who is Martin Van Buren?"],
        800: ["This president, a leading figure during the Progressive Era, broke up monopolies, championed conservation, and brokered peace in the Russo-Japanese War, earning the Nobel Peace Prize.", "Who is Theodore Roosevelt?"],
        1000: ["This president delivered the famous 'Ich bin ein Berliner' speech in 1963.", "Who is John F. Kennedy?"]
    },
    "Events of the 20th Century": {
        200: ["In 1969, this astronaut's famous words upon stepping onto the lunar surface became a symbol of the U.S. space program’s success.", "Who is Neil Armstrong?"],
        400: ["In 1919, the refusal of the U.S. Senate to ratify this treaty saw the creation of the League of Nations without U.S. participation.", "What is the Treaty of Versailles?"],
        600: ["The invasion of this country by Nazi Germany in 1939 marked the start of World War II.", "What is Poland?"],
        800: ["This event in 1989 marked the peaceful end of the Cold War.", "What is the fall of the Berlin Wall?"],
        1000: ["This event in 1964 marked the escalation of U.S. involvement in the Vietnam War, when Congress passed this resolution giving the president broad military powers in Southeast Asia.", "What is the Gulf of Tonkin Resolution?"]
    },
    "The Foreign Service": {
        200: ["This diplomatic title refers to the highest-ranking official representing the U.S. in a foreign country.", "What is an Ambassador?"],
        400: ["Established in the 1960s, this organization places volunteers in developing countries to provide assistance in health, education, and community development.", "What is the Peace Corps?"],
        600: ["This U.S. program, established in 1946, provides financial assistance to foreign countries to promote economic development, democracy, and political stability.", "What is the Marshall Plan?"],
        800: ["This treaty, signed in 1947, was a major effort by the U.S. to strengthen its foreign policy and secure alliances in the post-World War II era.", "What is the North Atlantic Treaty Organization (NATO) Agreement?"],
        1000: ["This U.S. diplomat, known for his involvement in the Yalta Conference and later as Secretary of State, was instrumental in shaping post-war international policy and the United Nations.", "Who is James F. Byrnes?"]
    },
    "Sights of Washington": {
        200: ["This 555-foot structure was completed in 1884 and is a prominent feature of the National Mall.", "What is the Washington Monument?"],
        400: ["This structure, designed by architect John Russell Pope, houses the nation’s most important documents, including the Declaration of Independence and the U.S. Constitution.", "What is the National Archives Building?"],
        600: ["Located on the National Mall, this memorial features a reflective black granite wall with over 58,000 names etched into it.", "What is the Vietnam Veterans Memorial?"],
        800: ["This museum, which includes exhibits on American history, culture, and science, is housed within the Smithsonian Institution.", "What is the National Museum of American History?"],
        1000: ["This neoclassical building, completed in 1908, houses the U.S. Navy’s offices and is one of the oldest government buildings in Washington, D.C.", "What is the Old Executive Office Building?"]
    },
    "U.S. Landmarks": {
        200: ["This 630-foot monument, completed in 1965, was designed to symbolize westward expansion.", "What is the Gateway Arch?"],
        400: ["This park in Marin County, California, is home to some of the tallest trees on Earth, and its name honors a Scottish naturalist.", "What is Muir Woods National Monument?"],
        600: ["Known for its geothermal features and diverse wildlife, this was the first U.S. national park, designated in 1872.", "What is Yellowstone National Park?"],
        800: ["Landscape Arch, located in Utah, is the largest arch in the world and is part of this park.", "What is Arches National Park?"],
        1000: ["Mount Rushmore, in South Dakota, features the faces of these four U.S. presidents.", "Who are Washington, Lincoln, Jefferson, and Roosevelt?"]
    }
};

let teams = {};
let currentQuestion = null;
let currentPoints = 0;
let currentButton = null; // Stores the clicked button

document.getElementById("add-team").addEventListener("click", addTeam);
document.getElementById("start-game").addEventListener("click", startGame);

function addTeam() {
    const teamInputs = document.getElementById("team-inputs");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team Name";
    teamInputs.appendChild(input);
}

function startGame() {
    const teamInputs = document.querySelectorAll("#team-inputs input");
    if (teamInputs.length === 0) return;

    teams = {};
    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = "";
    document.getElementById("scores").innerHTML = "";

    teamInputs.forEach(input => {
        if (input.value.trim() !== "") {
            const name = input.value.trim();
            teams[name] = 0;

            const scoreDiv = document.createElement("div");
            scoreDiv.className = "team";
            scoreDiv.id = `team-${name}`;
            scoreDiv.innerText = `${name}: $0`;
            document.getElementById("scores").appendChild(scoreDiv);

            const option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            teamSelect.appendChild(option);
        }
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateBoard();
}

function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

    Object.keys(categories).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

    for (let points of [100, 200, 300, 400, 500]) {
        Object.keys(categories).forEach(category => {
            let button = document.createElement("button");
            button.className = "question";
            button.innerText = `$${points}`;
            button.setAttribute("data-category", category);
            button.setAttribute("data-points", points);
            button.onclick = showQuestion;
            board.appendChild(button);
        });
    }
}

function showQuestion(event) {
    currentButton = event.target; // Store the clicked button
    const category = currentButton.getAttribute("data-category");
    const points = parseInt(currentButton.getAttribute("data-points"));

    currentQuestion = category;
    currentPoints = points;

    // Play the Jeopardy theme song
    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.play();

    document.getElementById("question-text").innerText = categories[category][points][0];
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";

    // Stop the Jeopardy theme song
    const jeopardyTheme = document.getElementById("jeopardy-theme");
    jeopardyTheme.pause();
    jeopardyTheme.currentTime = 0; // Reset audio to start
}

function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    teams[team] += correct ? currentPoints : -currentPoints;
    document.getElementById(`team-${team}`).innerText = `${team}: $${teams[team]}`;

    // Close the answer pop-up after scoring
    document.getElementById("answer-popup").style.display = "none";

    // Disable the button permanently after the question has been answered
    if (currentButton) {
        currentButton.disabled = true;
        currentButton.style.backgroundColor = "#222"; // Change to a "used" style
        currentButton.style.cursor = "not-allowed";
    }
}
