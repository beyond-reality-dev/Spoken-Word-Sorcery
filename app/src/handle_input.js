module.exports = { allowInput, blockInput, closedInput, openInput };

const { addEntity, getValue, changeValue } = require("./save_data");
const { toTitleCase } = require("./general");
const {
  Aether,
  Earth,
  Fire,
  Water,
  Spear,
  Shield,
  Away,
} = require("./class_collections/spellbook");

function allowInput() {
  document.getElementById("input-bar").style.backgroundColor = "#ffffff";
  document.getElementById("input-bar").setAttribute("contenteditable", "true");
}

function blockInput() {
  document.getElementById("input-bar").style.backgroundColor = "#d1d1d1";
  document.getElementById("input-bar").setAttribute("contenteditable", "false");
}

async function closedInput() {
  return new Promise(function (resolve) {
    const input = document.getElementById("input-bar");
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const text = input.innerText;
        document.getElementById("main-content").innerHTML +=
          "<span style='color: blue;'><p> " + text + "</p></span>";
        document.getElementById("main-content").scrollTop =
          document.getElementById("main-content").scrollHeight;
        input.innerText = "";
        input.removeEventListener("keypress", handleKeyPress);
        resolve(text);
      }
    }
    input.addEventListener("keypress", handleKeyPress);
  });
}

async function openInput() {
  return new Promise(function (resolve) {
    const input = document.getElementById("input-bar");
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        var text = input.innerText;
        document.getElementById("main-content").innerHTML +=
          "<span style='color: blue;'><p> " + text + "</p></span>";
        document.getElementById("main-content").scrollTop =
          document.getElementById("main-content").scrollHeight;
        input.innerText = "";
        input.removeEventListener("keypress", handleKeyPress);
        text = text.toLowerCase();
        text = text.replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
        if (text.substring(0, 2) == "i ") {
          text = text.substring(2);
        }
        var clauses = text.split(" and ");
        for (let i = 0; i < clauses.length; i++) {
          if (clauses[i].substring(0, 9) == "remember ") {
            var memory = clauses[i].substring(9);
            addEntity(memory, "memories");
          } else if (
            clauses[i].substring(0, 5) == "look " ||
            clauses[i].substring(0, 5) == "face " ||
            clauses[i].substring(0, 5) == "turn "
          ) {
            var direction = getValue("direction");
            if (clauses[i].substring(5, 12) == "to the ") {
              var change = clauses[i].substring(12);
            } else {
              change = clauses[i].substring(5);
            }
            switch (change) {
              case "left":
                if (direction == "North") {
                  changeValue("direction", "West");
                } else if (direction == "East") {
                  changeValue("direction", "North");
                } else if (direction == "South") {
                  changeValue("direction", "East");
                } else if (direction == "East") {
                  changeValue("direction", "South");
                }
                break;
              case "right":
                if (direction == "North") {
                  changeValue("direction", "East");
                } else if (direction == "East") {
                  changeValue("direction", "South");
                } else if (direction == "South") {
                  changeValue("direction", "West");
                } else if (direction == "West") {
                  changeValue("direction", "North");
                }
                break;
              case "forward":
                break;
              case "backward":
                if (direction == "North") {
                  changeValue("direction", "South");
                } else if (direction == "East") {
                  changeValue("direction", "West");
                } else if (direction == "South") {
                  changeValue("direction", "North");
                } else if (direction == "West") {
                  changeValue("direction", "East");
                }
                break;
            }
            document.getElementById("main-content").innerHTML +=
              "<p>You are now facing " + getValue("direction") + ".</p>";
          } else if (clauses[i].substring(0, 4) == "say ") {
            var words = clauses[i].substring(4);
            words = words.split(" ");
            var phrase = "";
            for (let i = 0; i < words.length; i++) {
              var spell = eval("new " + toTitleCase(words[i]) + "()");
              console.log(spell);
              console.log(spell.name);
              var knownSpells = getValue("knownSpells");
              console.log(knownSpells);
              var spokenSpells = getValue("spokenSpells");
              console.log(spokenSpells);
              for (let j = 0; j < knownSpells.length; j++) {
                var spellName = knownSpells[j]["name"];
                console.log(spellName);
                if (spellName == spell.name) {
                  var descriptor = spell.descriptor;
                  phrase = phrase.concat(descriptor);
                  var matchKnown = true;
                  break;
                }
              }
              for (let j = 0; j < spokenSpells.length; j++) {
                spellName = spokenSpells[j]["name"];
                console.log(spellName);
                if (spellName == spell.name) {
                  descriptor = spell.descriptor;
                  phrase = phrase.concat(descriptor);
                  var matchSpoken = true;
                  break;
                }
              }
              if (matchKnown == false && matchSpoken == false) {
                break;
              }
            }
            console.log(phrase);
            if (phrase == "" || (matchKnown == false && matchSpoken == false)) {
              phrase = "Nothing happens.";
            }
            console.log(spell);
            console.log(getValue("knownSpells"));
            console.log(getValue("spokenSpells"));
            document.getElementById("main-content").innerHTML +=
              "<p>" + phrase + "</p>";
            document.getElementById("main-content").scrollTop =
              document.getElementById("main-content").scrollHeight;
          } else if (clauses[i].substring(0, 6) == "speak ") {
            var words = clauses[i].substring(6);
            words = words.split(" ");
            var phrase = "";
            for (let i = 0; i < words.length; i++) {
              var spell = eval("new " + toTitleCase(words[i]) + "()");
              var knownSpells = getValue("knownSpells");
              var spokenSpells = getValue("spokenSpells");
              var match = false;
              for (let j = 0; j < knownSpells.length; j++) {
                var spellName = knownSpells[j]["name"];
                if (spellName == spell.name) {
                  descriptor = spell.descriptor;
                  phrase = phrase.concat(descriptor);
                  match = true;
                  break;
                }
              }
              for (let j = 0; j < spokenSpells.length; j++) {
                spellName = spokenSpells[j]["name"];
                if (spellName == spell.name) {
                  var descriptor = spell.descriptor;
                  phrase = phrase.concat(descriptor);
                  match = true;
                  break;
                }
              }
              if ((match = false)) {
                break;
              }
            }
            if (phrase == "" || match == false) {
              phrase = "Nothing happens.";
            }
            console.log(spell);
            console.log(getValue("knownSpells"));
            console.log(getValue("spokenSpells"));
            document.getElementById("main-content").innerHTML +=
              "<p>" + phrase + "</p>";
            document.getElementById("main-content").scrollTop =
              document.getElementById("main-content").scrollHeight;
          }
        }
        resolve(text);
      }
    }
    input.addEventListener("keypress", handleKeyPress);
  });
}
