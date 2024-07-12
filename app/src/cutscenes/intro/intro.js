module.exports = { intro };

const { printLines, quickPrint, awaitInput } = require("../../general");

var validInput = false;

async function intro() {
    printLines("app/src/cutscenes/intro/1.txt");
    var name = await awaitInput();
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
    confirm = await awaitInput();
    while (confirm != "Yes" && confirm != "yes" && confirm != "Y" && confirm != "y") {
        quickPrint('"I am afraid you have no choice in this matter," he said sternly. "So I will ask again, are you ready to begin your training?"');
        confirm = await awaitInput();
    }
    confirm = false;
    printLines("app/src/cutscenes/intro/3.txt");
    confirm = await awaitInput();
    confirm = false;
    printLines("app/src/cutscenes/intro/4.txt");
    confirm = await awaitInput();
    while (confirm != "Yes" && confirm != "yes" && confirm != "Y" && confirm != "y") {
        quickPrint('"I will not proceed until you swear to it," he said firmly. "Do you swear to obey the Order?"');
        confirm = await awaitInput();
    }
    confirm = false;
    printLines("app/src/cutscenes/intro/5.txt");
    confirm = await awaitInput();
    while (confirm != "Remember" && confirm != "remember") {
        quickPrint('"You must speak the word <i>Remember</i>!" he ordered, nearly shouting.');
        confirm = await awaitInput();
    }
    confirm = false;
    printLines("app/src/cutscenes/intro/6.txt");
    confirm = await awaitInput();
    confirm = confirm.toLowerCase();
    while (confirm != "the cost of the power is my mind, my sanity, my very humanity" &&
            confirm != "the cost of the power is my mind, my sanity, my very humanity.") {
        quickPrint('"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"');
        confirm = await awaitInput();
        confirm = confirm.toLowerCase();
    }
    confirm = false;
    quickPrint('"Now, speak the Word again," he instructed.')
    confirm = await awaitInput();
    while (confirm != "Remember" && confirm != "remember") {
        quickPrint('"You must speak the word <i>Remember</i>!" he ordered, nearly shouting.');
        confirm = await awaitInput();
    }
    confirm = false;
    printLines("app/src/cutscenes/intro/7.txt");
    confirm = await awaitInput();
    confirm = confirm.toLowerCase();
    while (confirm != "i am loyal to, and shall give my life to defend if necessary, the order and the empire" &&
            confirm != "i am loyal to, and shall give my life to defend if necessary, the order and the empire.") {
        quickPrint('"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!" he shouted.');
        confirm = await awaitInput();
        confirm = confirm.toLowerCase();
    }
    confirm = false;
}