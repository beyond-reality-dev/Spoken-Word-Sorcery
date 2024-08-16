# Spoken Word Sorcery <!-- omit from toc -->

## Table of Contents <!-- omit from toc -->

- [About](#about)
- [FAQ](#faq)
- [Installation](#installation)
  - [Simple Installation](#simple-installation)
  - [Manual Installation](#manual-installation)
- [How to Play](#how-to-play)
  - [General](#general)
  - [Movement](#movement)
  - [Item Management](#item-management)
  - [Combat](#combat)
  - [Resting](#resting)
  - [Remembering](#remembering)
- [Features](#features)
  - [Introduction](#introduction)
  - [Game Speed Settings](#game-speed-settings)
  - [Inventory System](#inventory-system)
  - [Combat System](#combat-system)
  - [Resting System](#resting-system)
  - [Visual Map](#visual-map)
- [Future Changes](#future-changes)
  - [Better Grammar Parsing](#better-grammar-parsing)
  - [Open World Features](#open-world-features)
  - [Procedural Generation](#procedural-generation)
- [Miscellaneous](#miscellaneous)
  - [AI Disclosure](#ai-disclosure)

## About

This is the official repository for Spoken Word Sorcery, a text-based role-playing game (RPG) written in JavaScript. The game is designed to be as open world as possible, within the constraints of the format and technical limitations. It utilizes the Electron platform to allow for distribution and release.

## FAQ

**Q:** How can I install this game?

**A:** Please see the [installation instructions](#installation) below.

**Q:** How can I play this game?

**A:** Please see the [how to play section](#how-to-play) below.

**Q:** Why do I get a warning when I try to run the game?

**A:** The game is not signed, so some operating systems may give you a warning when you try to run it. You can be confident that the game is safe to run, especially since it is an Electron PWA that runs in a secured sandbox, but if you are still concerned, you can check the source code yourself!

## Installation

### Simple Installation

1. Download the latest release from the [releases page](https://github.com/beyond-reality-dev/Spoken-Word-Sorcery/releases).
2. Extract the contents of the zip file.
3. Run the executable file.
4. If you are on Windows, and you get a warning from Windows Defender SmartScreen, click "More info" and then "Run anyway".
5. If you are on macOS, and you get a warning about the app being from an unidentified developer, right-click the app and click "Open".
6. If you have any issues, please open an issue on the [issues page](https://github.com/beyond-reality-dev/Spoken-Word-Sorcery/issues), or message me directly.

### Manual Installation

1. Clone the repository.
2. Install Node.js and npm.
3. Run `npm install` in the repository directory.
4. Run `npm start` to start the game.
5. If you have any issues, please open an issue on the [issues page](https://github.com/beyond-reality-dev/Spoken-Word-Sorcery/issues), or message me directly.

## How to Play

The introduction to the game will give you a good idea of how to play, but there are some more detailed instructions below. And remember, you can always type "help," "info," or "instructions" to get a list of commands that you can use in the game.

### General

To play Spoken Word Sorcery, you can type phrases to interact with the game.

You may optionally begin phrases with the letter "I" but it is not required.

Similarly, you may optionally insert prepositions, articles, or other words that do not change the meaning of the phrase, like "a," "an," "to," and "the."

For example, you can type either "I go north," "go to the north," etc. to move north.

Punctuation and capitalization is irrelevant, and you can combine phrases with "and" in most cases.

### Movement
To move to a room connected to your current location, you can type "go," "run," "exit," "move," or "walk" followed by a cardinal (compass) direction.

### Item Management

To pick up an item, you can type "take," "grab," "acquire," "obtain," "pick up," or "lift" followed by the item name.

To drop an item, you can type "drop," "discard," "leave," or "lose" followed by the item name.

To equip an item, you can type "equip" or "put on" followed by the item name.

To unequip an item, you can type "unequip" or "take off" followed by the item name.

For consumables, you can type "use," "consume," "drink," "eat," or "ingest" followed by the item name.

### Combat
To attack an enemy that is in front of you with a melee weapon, you can type "hit," "stab," "fight," "attack," "strike," "slash," "swing," or "thrust," followed by the weapon you wish to use. Optionally, you can add certain words like "with" before the weapon name. For example, "hit with sword," "stab with dagger," "swing sword," etc. will all work.

To attack an enemy that is farther away or out of reach with a ranged weapon, you can type "aim," "fire," "shoot," "snipe," "throw," or "launch" followed by the weapon you wish to use. Optionally, you can add certain words like "with" before the weapon name. For example, "aim with bow," "fire crossbow," etc. will all work.

To use a spell, you can type "say," "yell," "cast," "chant," "shout," "speak," "utter," "mutter," or "whisper" followed by the spell phrase.

To turn and phase a different direction, you can type "turn," "face," or "look" followed by the direction, left or right, you want to face. If you wish to only turn 45 degrees, rather than 90 degrees, you can add "slightly" or "halfway" before the direction. For example, "turn slightly left," "face halfway right," etc. will work.

To move during combat you can type "go," "run," "exit," "move," or "walk" followed by a distance, up to 20, followed optionally by "feet," then "forward," "backward," "left," or "right." For example "go 5 feet forward," "run 10 feet left." The grid is broken up into tiles, and each tile is 5 feet wide. Since moving diagonally requires you to move 7.5 feet, movements diagonally must be made in those increments, for example "go 7.5 feet left forward," or "run 15 feet right backward."

### Resting
If you are in a safe location, you can type "rest" or "sleep" to regain health and mana.

### Remembering
To remember a phrase, you can type "remember" followed by the phrase you want to remember.

## Features

### Introduction

Currently the only part of the game that is playable is an introduction that gives some insight into some of the game's lore and mechanics but does not include the procedural generation and open world format that the game will eventually include.

### Game Speed Settings

Users can select how much of a delay they want between lines being printed on the screen. The options range from no delay to a four second delay, which is roughly the speed that it takes to easily read most of the lines as they are being printed. The default is a one second delay.

### Inventory System

Users can pick up, drop, equip, and unequip items, and view their items in the inventory screen. These items determine player stats like armor, attack, and speed. They also contribute to the weight that the player is carrying, which will affect their speed and other stats in the future. Items are persistent in rooms, and the player can move and store items.

### Combat System

The combat system is turn-based, with the player and enemies taking turns to attack. The enemies occupy a certain direction in a room, and the player can change the direction that they are facing in order to target their desired enemy. They may then use a weapon or spell to attack those enemies. The damage that the player and enemies inflict is randomized within a specified range, and enemies move in random directions to evade the player's attacks.

### Resting System

Certain rooms in the game allow the player to rest, which will fully restore their health and mana. They cannot rest while in combat or outside of these rooms.

### Visual Map

The game has a visual map that shows the player's current location and the locations of the rooms that are directly connected to it, and those that are connected to those rooms, and so on. There is a fog of war system that hides rooms that are not attached to a room that the player has already visited. The player can move to any room that is directly connected to their current room, assuming it is not locked, and the map will update to show their new location.

## Future Changes

### Better Grammar Parsing

Currently options are very limited for what a user is able to type and be recognized by the game, which obviously is not ideal for a text-based game. In the future I hope to allow for more advanced input parsing to create a more immersive experience.

### Open World Features

The description of Spoken World Sorcery as open world is somewhat aspirational given that it is currently a short, linear game, however the systems and frameworks are being put into place that will allow it to be open world in the future.

### Procedural Generation

To support the goal of open world gameplay, I hope to build a procedural generation system for the game, to make the world large in scope while remaining sufficiently detailed. This however will only be possible once the more fundamental systems have been finished.

## Miscellaneous

### AI Disclosure

GitHub Copilot was used for some boilerplate/autocomplete code, but all substantial programming and creative work was done by myself.