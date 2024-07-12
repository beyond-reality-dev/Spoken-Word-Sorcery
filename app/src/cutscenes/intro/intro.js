module.exports = { intro };

const { printLines, quickPrint, awaitInput, requireAnswer } = require("../../general");

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
    await requireAnswer(["yes", "y"], '"I am afraid you have no choice in this matter," he said sternly. "So I will ask again, are you ready to begin your training?"') 
    printLines("app/src/cutscenes/intro/3.txt");
    await requireAnswer(["any"], "unreachable");
    printLines("app/src/cutscenes/intro/4.txt");
    await requireAnswer(["yes", "y"], '"I will not proceed until you swear to it," he said firmly. "Do you swear to obey the Order?"');
    printLines("app/src/cutscenes/intro/5.txt");
    await requireAnswer(["remember"], '"You must speak the word <i>Remember</i>!" he ordered, nearly shouting."');
    printLines("app/src/cutscenes/intro/6.txt");
    await requireAnswer(["i must use the power sparingly for its cost is my mind my sanity my very humanity"], '"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"')
    quickPrint('"Now, speak the Word again," he instructed.')
    await requireAnswer(["remember"], '"You must speak the word <i>Remember</i>!" he ordered, nearly shouting."');
    printLines("app/src/cutscenes/intro/7.txt");
    await requireAnswer(["i am loyal to and shall give my life to defend if necessary the order and the empire"], '"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"')
    printLines("app/src/cutscenes/intro/8.txt");
    await requireAnswer(["remember"], '"You must speak the word <i>Remember</i>!" he ordered, nearly shouting."');
    printLines("app/src/cutscenes/intro/9.txt");
    await requireAnswer(["i shall obey the fourth grandmaster of the order arnoch segeric those designated to carry out his will and any successor lawfully appointed by the emperor after his death"], '"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"');
    printLines("app/src/cutscenes/intro/10.txt");
}