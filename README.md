# Spoken Word Sorcery <!-- omit from toc -->

## Table of Contents <!-- omit from toc -->

- [About](#about)
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

The game has a visual map that shows the player's current location and the locations of the rooms that are directly connected to it, and those that are connected to those rooms, and so on. Currently only one iteration of rooms is shown, but in the future the map will be able to show the entire world.

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