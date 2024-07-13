module.exports = { allowInput, blockInput, closedInput, openInput };

const { addEntity } = require("./save_data");

function allowInput() {
    document.getElementById("input-bar").style.backgroundColor = "#ffffff";
    document.getElementById("input-bar").setAttribute("contenteditable", "true");
}

function blockInput() {
    document.getElementById("input-bar").style.backgroundColor = "#d1d1d1";
    document.getElementById("input-bar").setAttribute("contenteditable", "false");
}

async function closedInput() {
    return new Promise(function(resolve) {
        const input = document.getElementById("input-bar");
        function handleKeyPress(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const text = input.innerText;
                document.getElementById("main-content").innerHTML += "<span style='color: blue;'><p> " + text + "</p></span>";
                document.getElementById("main-content").scrollTop = document.getElementById("main-content").scrollHeight;
                input.innerText = "";
                input.removeEventListener("keypress", handleKeyPress);
                resolve(text);
            }
        }
        input.addEventListener("keypress", handleKeyPress);
    });
}

async function openInput() {
    return new Promise(function(resolve) {
        const input = document.getElementById("input-bar");
        function handleKeyPress(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                var text = input.innerText;
                document.getElementById("main-content").innerHTML += "<span style='color: blue;'><p> " + text + "</p></span>";
                document.getElementById("main-content").scrollTop = document.getElementById("main-content").scrollHeight;
                input.innerText = "";
                input.removeEventListener("keypress", handleKeyPress);
                // If the beginning of the input is "Remember," add the phrase following it to the player's memory.
                text = text.toLowerCase();
                if (text.substring(0, 9) == "remember ") {
                    var memory = text.substring(9);
                    addEntity(memory, "memories");
                }
                resolve(text);
            }
        }
        input.addEventListener("keypress", handleKeyPress);
    });
}