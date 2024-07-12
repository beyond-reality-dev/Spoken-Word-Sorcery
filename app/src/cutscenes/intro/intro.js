module.exports = { intro };

const { printLines, awaitInput } = require("../../general");

var validInput = false;

async function intro() {
    printLines("app/src/cutscenes/intro/1.txt");
    while (!validInput) {
        var text = await awaitInput();
        if (text == "") {
            document.getElementById("main-content").innerHTML += "<p>I'm sorry, I didn't quite catch that.</p>";
        } else {
            validInput = true;
        }
    }
    printLines("app/src/cutscenes/intro/2.txt");
}