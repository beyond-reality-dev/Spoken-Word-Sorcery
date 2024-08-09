const {
  printLines,
  requireAnswer,
  quickPrint,
} = require("../../../../general");
const { getValue, changeValue, addEntity } = require("../../../../save_data");
const { handleCombat } = require("../../../../combat");
const { Miscellaneous } = require("../../../../class_collections/item_catalog");

async function vault() {
  if (getValue("imperialAcademy.vault", true).cutscenePlayed == false) {
    await printLines(
      "app/src/cutscenes/imperial_citadel/imperial_academy/vault/1.txt"
    );
    await requireAnswer(["any"], "unreachable");
    await handleCombat();
    if (getValue("location") == "imperialAcademy.vault") {
      await printLines(
        "app/src/cutscenes/imperial_citadel/imperial_academy/vault/2.txt"
      );
      var response = await requireAnswer(
        ["yes", "y", "no", "n"],
        "Do you reach out and touch the field?"
      );
      if (response == "yes" || response == "y") {
        quickPrint("The field offers no resistance as you pass through it.");
      } else if ((response = "no" || response == "n")) {
        quickPrint(
          "As you turn away from the field, you stumble and fall through it."
        );
      }
      await printLines(
        "app/src/cutscenes/imperial_citadel/imperial_academy/vault/3.txt"
      );
      changeValue(
        "imperialAcademy.vault.cutscenePlayed",
        true,
        "locations"
      );
      var codex = new Miscellaneous(
        "Codex",
        "The book that supposedly contains all the Words discovered by the Empire",
        "accessory",
        0,
        1,
        1
      );
      addEntity(codex, "inventory");
    }
  }
}

module.exports = { vault };
