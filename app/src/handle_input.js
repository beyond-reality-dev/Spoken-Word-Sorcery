module.exports = { allowInput, blockInput, closedInput, openInput };

const { addEntity, getDirection, changeDirection } = require("./save_data");

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
                text = text.toLowerCase();
                if (text.substring(0, 2) == "i ") {
                    text = text.substring(2);
                }
                var clauses = text.split(" and ");
                for (let i = 0; i < clauses.length; i++) {
                    if (clauses[i].substring(0, 9) == "remember ") {
                        var memory = clauses[i].substring(9);
                        addEntity(memory, "memories");
                    } else if (clauses[i].substring(0, 5) == "look " || clauses[i].substring(0,5) == "turn ") {
                        var direction = getDirection();
                        var change = clauses[i].substring(5);
                        switch (change) {
                            case "left":
                                if (direction == "North") {
                                    changeDirection("West");
                                } else if (direction == "East") {
                                    changeDirection("North");
                                } else if (direction == "South") {
                                    changeDirection("East");
                                } else if (direction == "East") {
                                    changeDirection("South");
                                }
                                break;
                            case "right":
                                if (direction == "North") {
                                    changeDirection("East");
                                } else if (direction == "East") {
                                    changeDirection("South");
                                } else if (direction == "South") {
                                    changeDirection("West");
                                } else if (direction == "West") {
                                    changeDirection("North");
                                }
                                break;
                            case "forward":
                                break;
                            case "backward":
                                if (direction == "North") {
                                    changeDirection("South");
                                } else if (direction == "East") {
                                    changeDirection("West");
                                } else if (direction == "South") {
                                    changeDirection("North");
                                } else if (direction == "West") {
                                    changeDirection("East");
                                }
                                break;
                        }
                    } else if (clauses[i].substring(0, 4) == "say " || clauses[i].substring(0,6) == "speak") {
                        break;
                    }
                }
                resolve(text);
            }
        }
        input.addEventListener("keypress", handleKeyPress);
    });
}