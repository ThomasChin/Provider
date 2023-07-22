const firebaseConfig = {
    apiKey: "AIzaSyB6S0odPeC61yVsyQR5XYaSoSy7AZCwdKc",
    authDomain: "provider-bf2e9.firebaseapp.com",
    databaseURL: "https://provider-bf2e9.firebaseio.com",
    projectId: "provider-bf2e9",
    storageBucket: "provider-bf2e9.appspot.com",
    messagingSenderId: "759112311526",
    appId: "1:759112311526:web:d4d00e9655800501ca9127"
};

// Fill in the Firebase configuration
firebase.initializeApp(firebaseConfig);

const playerNameInput = document.getElementById("playerName");
const submitNameButton = document.getElementById("submitName");
const nameList = document.getElementById("nameList");
const userNamesRef = firebase.database().ref("usernames");

function handleNameSubmit() {
    const playerName = playerNameInput.value.trim();

    if (playerName !== "") {
        playerNameInput.value = "";
        userNamesRef.push({ name: playerName });
    }
}

submitNameButton.addEventListener("click", handleNameSubmit);

function displayUserNames(snapshot) {
    let names = [];
    snapshot.forEach((childSnapshot) => {
        const entry = childSnapshot.val();
        names.push(entry.name);
    });

    // Clear the list
    nameList.innerHTML = "";

    // Display names in the list
    names.forEach((name) => {
        const playerNameElement = document.createElement("li");
        playerNameElement.textContent = name;
        nameList.appendChild(playerNameElement);
    });
}

userNamesRef.on("value", displayUserNames);