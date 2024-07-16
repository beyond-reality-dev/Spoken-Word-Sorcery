const { printLines } = require("../../general");
const { changeValue } = require("../../save_data");

changeValue("checkpoint", 1);
printLines("app/src/cutscenes/chapterOne/1.txt");