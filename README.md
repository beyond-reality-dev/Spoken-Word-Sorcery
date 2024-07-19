# Spoken Word Sorcery <!-- omit from toc -->

## Table of Contents <!-- omit from toc -->

- [About](#about)
- [Features](#features)
  - [Introduction](#introduction)
  - [Game Speed Settings](#game-speed-settings)
  - [Inventory System](#inventory-system)
  - [Combat System](#combat-system)
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

Currently the only part of the game that is playable is a short introduction that gives some insight into some of the game's lore and mechanics but is not an accurate reflection of how the game will be once completed. It can be thought of as roughly half the content the whole tutorial will need to eventually be.

### Game Speed Settings

Users can select how much of a delay they want between lines being printed on the screen. The options range from no delay to a four second delay, which is roughly the speed that it takes to read most of the lines as they are being printed. The default is a one second delay.

### Inventory System

Users can pick up, drop, equip, and unequip items, and view their items in the inventory screen. Currently, however, while items are being tracked they do not yet have an impact on gameplay. In the future, they will be used to affect the player's stats and characteristics.

### Combat System

A simple combat system has already been implemented, with which the user may select an enemy to attack and then select a weapon or spell to use to attack. In the future, this system will be replaced by a direction-based combat system, where the user will be able to move around the battlefield and attack enemies in different directions.

## Future Changes

### Better Grammar Parsing

Currently options are very limited for what a user is able to type and be recognized by the game, which obviously is not ideal for a text-based game. In the future I hope to allow for more advanced input parsing to create a more immersive experience.

### Open World Features

The description of Spoken World Sorcery as open world is somewhat aspirational given that it is currently a short, linear game, however the systems and frameworks are being put into place that will allow it to be open world in the future.

### Procedural Generation

To support the goal of open world gameplay, I hope to build a procedural generation system for the game, to make the world large in scope while remaining sufficiently detailed. This however will only be possible once the more fundamental systems have been finished.

## Miscellaneous

### AI Disclosure

Github Copilot was used for some boilerplate/autocomplete code, but all substantial programming and creative work was done by myself.