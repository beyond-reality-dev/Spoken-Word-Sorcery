module.exports = { intro };

const {
  printLines,
  quickPrint,
  requireAnswer,
} = require("../../../../general");
const {
  initializeData,
  addEntity,
  getValue,
  calculateValue,
  changeValue,
} = require("../../../../save_data");
const {
  closedInput,
  openInput,
  inputLoop,
} = require("../../../../handle_input");
const {
  Earth,
  Fire,
  Water,
  Spear,
  Shield,
  Away,
  Remember,
} = require("../../../../class_collections/spellbook");

var validInput = false;

async function intro() {
  if (localStorage.getItem("playerData") != null) {
    localStorage.removeItem("playerData");
  }
  for (var i = 0; i < localStorage.length + 1; i++) {
    var saveNum = i + 1;
    var file = "save_" + saveNum;
    if (localStorage.getItem(file) == null) {
      var saveFile = file;
      break;
    }
  }
  initializeData(saveFile);
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/1.txt");
  var name = await closedInput();
  while (!validInput) {
    if (name == "") {
      quickPrint('"Speak up, I can\'t understand you!" He barked.');
      name = await closedInput();
    } else {
      validInput = true;
    }
  }
  validInput = false;
  quickPrint(
    '"I have to assume you know your own name, but just in case, is "' +
      name +
      '" correct?"'
  );
  var confirm = await closedInput();
  if (confirm == "debug: skip intro") {
    changeValue("name", name);
    addEntity(new Remember(), "knownSpells");
    addEntity(new Remember(), "spokenSpells");
    addEntity("I must use the Power sparingly for its cost is my mind, my sanity, my very humanity.", "memories");
    addEntity("I am loyal to, and shall give my life to defend if necessary, the Arcane Order and the Empire.", "memories");
    addEntity("I am obedient to Grandmaster Arnoch Segeric of the Arcane Order and to those under his command.", "memories");
    addEntity(new Fire(), "knownSpells");
    addEntity(new Water(), "knownSpells");
    addEntity(new Earth(), "knownSpells");
    addEntity(new Spear(), "spokenSpells");
    addEntity(new Shield(), "spokenSpells");
    addEntity(new Away(), "knownSpells");
    inputLoop();
    return;
  }
  while (
    confirm != "Yes" &&
    confirm != "yes" &&
    confirm != "Y" &&
    confirm != "y"
  ) {
    if (
      confirm == "No" ||
      confirm == "no" ||
      confirm == "N" ||
      confirm == "n"
    ) {
      quickPrint('"Then what is your name?" He demanded.');
      name = await closedInput();
      quickPrint(
        '"I have to assume you know your own name, but just in case, is "' +
          name +
          '" correct?"'
      );
    } else {
      quickPrint(
        '"Speak up, I can\'t understand you!" He barked. "It\'s a simple question, is ' +
          name +
          ' your name?"'
      );
    }
    confirm = await closedInput();
  }
  confirm = false;
  changeValue("name", name);
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/2.txt");
  await requireAnswer(
    ["yes", "y"],
    '"I am afraid you have no choice in this matter," he said sternly. "So I will ask again, are you ready to begin your training?"'
  );
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/3.txt");
  await requireAnswer(["any"], "unreachable");
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/4.txt");
  addEntity(new Remember(), "knownSpells");
  await requireAnswer(
    ["yes", "y"],
    '"I will not proceed until you swear to it," he said firmly. "Do you swear to obey the Order?"'
  );
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/5.txt");
  await requireAnswer(
    ["remember"],
    '"You must speak the word <i>Remember</i>!" he ordered, nearly shouting.'
  );
  addEntity(new Remember(), "spokenSpells");
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/6.txt");
  await requireAnswer(
    [
      "i must use the power sparingly for its cost is my mind my sanity my very humanity",
    ],
    '"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"'
  );
  addEntity(
    "I must use the Power sparingly for its cost is my mind, my sanity, my very humanity.",
    "memories"
  );
  quickPrint('"Now, speak the Word again," he instructed.');
  await requireAnswer(
    ["remember"],
    '"You must speak the word <i>Remember</i>!" he ordered, nearly shouting.'
  );
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/7.txt");
  await requireAnswer(
    [
      "i am loyal to and shall give my life to defend if necessary the arcane order and the empire",
    ],
    '"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"'
  );
  addEntity(
    "I am loyal to, and shall give my life to defend if necessary, the Arcane Order and the Empire.",
    "memories"
  );
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/8.txt");
  await requireAnswer(
    ["remember"],
    '"You must speak the word <i>Remember</i>!" he ordered, nearly shouting.'
  );
  printLines("app/src/cutscenes/imperial_citadel/imperial_academy/intro/9.txt");
  await requireAnswer(
    [
      "i am obedient to grandmaster arnoch segeric of the arcane order and to those under his command",
    ],
    '"No, no, no!" he shouted, interrupting you. "You must repeat the words exactly as they were spoken to you!"'
  );
  addEntity(
    "I am obedient to Grandmaster Arnoch Segeric of the Arcane Order and to those under his command.",
    "memories"
  );
  printLines(
    "app/src/cutscenes/imperial_citadel/imperial_academy/intro/10.txt"
  );
  confirm = await closedInput();
  confirm = confirm.toLowerCase();
  confirm = confirm.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
  while (
    confirm != "1" &&
    confirm != "one" &&
    confirm != "the first" &&
    confirm != "the first one" &&
    confirm != "the first element" &&
    confirm != "2" &&
    confirm != "two" &&
    confirm != "the second" &&
    confirm != "the second one" &&
    confirm != "the second element" &&
    confirm != "3" &&
    confirm != "three" &&
    confirm != "the third" &&
    confirm != "the third one" &&
    confirm != "the third element"
  ) {
    quickPrint(
      '"Will you pick the first, second, or third element?" he demanded impatiently.'
    );
    confirm = await closedInput();
    confirm = confirm.toLowerCase();
    confirm = confirm.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
  }
  switch (confirm) {
    case "1":
    case "one":
    case "the first":
    case "the first one":
    case "the first element":
      quickPrint('"Very well, you have chosen the element of <i>Fire</i>."');
      addEntity(new Fire(), "knownSpells");
      break;
    case "2":
    case "two":
    case "the second":
    case "the second one":
    case "the second element":
      quickPrint('"Very well, you have chosen the element of <i>Water</i>."');
      addEntity(new Water(), "knownSpells");
      break;
    case "3":
    case "three":
    case "the third":
    case "the third one":
    case "the third element":
      quickPrint('"Very well, you have chosen the element of <i>Earth</i>."');
      addEntity(new Earth(), "knownSpells");
      break;
  }
  confirm = false;
  printLines(
    "app/src/cutscenes/imperial_citadel/imperial_academy/intro/11.txt"
  );
  await requireAnswer(["spear"], '"Speak the word <i>Spear</i>."');
  var spear = new Spear();
  addEntity(spear, "spokenSpells");
  calculateValue("currentMana", "subtract", spear.manaCost);
  printLines(
    "app/src/cutscenes/imperial_citadel/imperial_academy/intro/12.txt"
  );
  await requireAnswer(["shield"], '"Speak the word <i>Shield</i>."');
  var shield = new Shield();
  addEntity(shield, "spokenSpells");
  calculateValue("currentMana", "subtract", shield.manaCost);
  printLines(
    "app/src/cutscenes/imperial_citadel/imperial_academy/intro/13.txt"
  );
  var away = new Away();
  addEntity(away, "knownSpells");
  await openInput(true);
  while (getValue("direction") == "north" || getValue("currentMana") >= 40) {
    printLines("app/src/cutscenes/imperial_academy/intro/14.txt");
    await openInput(true);
  }
  await printLines(
    "app/src/cutscenes/imperial_citadel/imperial_academy/intro/15.txt"
  );
  changeValue("currentMana", 100);
  inputLoop();
}
