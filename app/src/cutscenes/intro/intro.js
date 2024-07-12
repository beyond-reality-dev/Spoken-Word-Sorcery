module.exports = { intro };

const { printLines, quickPrint, awaitInput } = require("../../general");

var validInput = false;

async function intro() {
    printLines("app/src/cutscenes/intro/1.txt");
    var name = await awaitInput();
    // Validate input to make sure it's not empty
    while (!validInput) {
        if (name == "") {
            quickPrint('"Speak up, I can\'t understand you!" He barked.');
            name = await awaitInput();
        } else {
            validInput = true;
        }
    }
    validInput = false;
    quickPrint("I have to assume you know your own name, but just in case, is " + name + " correct?");
    var confirm = await awaitInput();
    while (confirm != "Yes" && confirm != "yes" && confirm != "Y" && confirm != "y") {
        if (confirm == "No" || confirm == "no" || confirm == "N" || confirm == "n") {
            quickPrint('"Then what is your name?" He demanded.');
            name = await awaitInput();
            quickPrint("I have to assume you know your own name, but just in case, is " + name + " correct?");
        }
        else {
            quickPrint('"Speak up, I can\'t understand you!" He barked. "It\'s a simple question, is ' + name + ' your name?"');
        }
        confirm = await awaitInput();
    }
    confirm = false;
    var playerData = {
        "name": name,
        "maxHealth": 100,
        "currentHealth": 100,
        "maxMana": 50,
        "currentMana": 50,
    }
    localStorage.setItem("playerData", JSON.stringify(playerData));
    console.log(playerData);
    printLines("app/src/cutscenes/intro/2.txt");
}