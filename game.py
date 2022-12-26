import os
import json
from class_collections import *
from function_dump import *
from graphics.graphics_archive.chapter_text import *

# Game state variables
MAINSAVE_FILENAME = 'save_files\savegame.json'
PLAYERSAVE_FILENAME = 'save_files\player.json'
LOCALESAVE_FILENAME = 'save_files\locations.json'
KNOWSAVE_FILENAME = 'save_files\knowledge.json'
game_state = dict()
game_state_player = dict()
game_state_locations = dict()
game_state_knowledge = dict()

# Functions for loading, saving, and initializing the game

# Load the game state from a predefined savegame location and return the game state contained in that savegame.
def load_game():
    global game_state, game_state_player, game_state_locations, game_state_knowledge
    if os.path.isfile(MAINSAVE_FILENAME):
        with open(MAINSAVE_FILENAME, 'r') as openfile:
            game_state = json.load(openfile)
        with open(PLAYERSAVE_FILENAME, 'r') as openfile:
            game_state_player = json.load(openfile)
        with open (LOCALESAVE_FILENAME, 'r') as openfile:
            game_state_locations = json.load(openfile)
        with open (KNOWSAVE_FILENAME, 'r') as openfile:
            game_state_knowledge = json.load(openfile)
        global temp_player_name
        temp_player_name = game_state_player['Name']
    else:
        flash("No savegame found, returning to the start menu", 3)
        start_menu()


# Save the current game state to a savegame in a predefined location.
def save_game():
    global game_state
    new_game_state = json.dumps(game_state, indent=4, default=vars)
    with open(MAINSAVE_FILENAME, "w") as outfile:
        outfile.write(new_game_state)
    def save_player():
        global game_state_player
        new_game_state_player = json.dumps(game_state_player, indent=4, default=vars)
        with open(PLAYERSAVE_FILENAME, "w") as outfile:
            outfile.write(new_game_state_player)
    def save_locations():
        global game_state_locations
        new_game_state_locations = json.dumps(game_state_locations, indent=4, default=vars)
        with open(LOCALESAVE_FILENAME, "w") as outfile:
            outfile.write(new_game_state_locations)
    def save_knowledge():
        global game_state_knowledge
        new_game_state_knowledge = json.dumps(game_state_knowledge, indent=4, default=vars)
        with open(KNOWSAVE_FILENAME, "w") as outfile:
            outfile.write(new_game_state_knowledge)
    save_player()
    save_locations()
    save_knowledge()

# Refresh the game state from a savegame.
def refresh_game():
    save_game()
    load_game()
    
# Initialize the game state with some default values.
def initialize_game():
    global game_state, game_state_player, game_state_locations, game_state_knowledge
    game_state_player = {
        "Name": 'Default', 
        "Maximum Health": 100,
        "Current Health": 100,
        "Armor": 0,
        "Maximum Mana": 100,
        "Current Mana": 0,
        "Insanity": 0,
        "Progress": 0,
        "Experience": 0,
        "Level": 1,
        "Gold": 0
        }
    game_state_locations["locations"] = [locations]
    game_state_knowledge["knowledge"] = [knowledge]
    game_state["inventory"] = [inventory]
    game_state["equippedItems"] = [equippedItems]
    game_state["books"] = [books]
    game_state["knownSpells"] = [knownSpells]
    game_state["spokenSpells"] = [spokenSpells]
    game_state["knownElements"] = [knownElements]
    game_state["spokenElements"] = [spokenElements]
    game_state_locations["locations"].remove([])
    game_state_knowledge["knowledge"].remove([])
    game_state["inventory"].remove([])
    game_state["equippedItems"].remove([])
    game_state["books"].remove([])
    game_state["knownSpells"].remove([])
    game_state["spokenSpells"].remove([])
    game_state["knownElements"].remove([])
    game_state["spokenElements"].remove([])
    return game_state, game_state_player, game_state_locations, game_state_knowledge

# Functions for player attribute management
def edit_player(attribute, operation, change):
    if operation == "add":
        game_state_player[attribute] += change
    elif operation == "subtract":
        game_state_player[attribute] -= change
    elif operation == "set":
        game_state_player[attribute] = change
def get_player_attribute(attribute):
    return game_state_player[attribute]

# Functions for location management
locations = []
def add_location(locations):
    game_state_locations["locations"].append(locations)
def remove_location(location):
    game_state_locations["locations"].remove(location)

# Functions for knowledge management
knowledge = []
def add_knowledge(knowledge):
    game_state["knowledge"].append(knowledge)
def remove_knowledge(knowledge):
    game_state["knowledge"].remove(knowledge)

# Functions for inventory management
inventory=[]
def add_to_inventory(item):
    game_state["inventory"].append(item)
def remove_from_inventory(item):
    game_state["inventory"].remove(item)

# Functions for equipment management
equippedItems = []
def equip_item(item):
    game_state["equippedItems"].append(item)
def unequip_item(item):
    game_state["equippedItems"].remove(item)

# Functions for book management
books = []
def add_book(book):
    game_state["books"].append(book)
def remove_book(book):
    game_state["books"].remove(book)

# Functions for known spell management
knownSpells=[]
def add_knownSpell(spell):
    game_state["knownSpells"].append(spell)
def remove_knownSpell(spell):
    game_state["knownSpells"].remove(spell)

# Functions for spoken spell management
spokenSpells=[]
def add_spokenSpell(spell):
    game_state["spokenSpells"].append(spell)
def remove_spokenSpell(spell):
    game_state["spokenSpells"].remove(spell)

# Functions for known element management
knownElements=[]
def add_knownElement(element):
    game_state["knownElements"].append(element)
def remove_knownElement(element):
    game_state["knownElements"].remove(element)

# Functions for spoken element management
spokenElements=[]
def add_spokenElement(element):
    game_state["spokenElements"].append(element)
def remove_spokenElement(element):
    game_state["spokenElements"].remove(element)

# Start a new game.
def start_new_game():
    from cutscenes import intro
    initialize_game()
    save_game()
    #clear()
    #chapter_one()
    #input()
    #intro()

# Menus

# Start menu
def start_menu():
    clear()
    print("Spoken Word Sorcery - Start Menu")
    print("What would you like to do?")
    print("1. Start a new game")
    print("2. Load a saved game")
    print("3. View information")
    print("4. Quit")
    choice = input("Enter your choice: ")
    while choice not in ["1", "2", "3", "4"]:
        print("Invalid choice. Please enter a number 1, 2, 3, or 4.")
        choice = input("Enter your choice: ")
    # If choice is 1, start a new game.
    if choice == "1":
        start_new_game()
    # If choice is 2, load a saved game.
    elif choice == "2":
        load_game()
        print(f"Welcome back, {game_state_player['Name']}!")
    # If choice is 3, print information about the game.
    elif choice == "3":
        clear()
        print("This a text-based open-world RPG written by Scott Pawley.")
        print("Press CTRL to skip text.")
        input("Press enter to return to the start menu.")
        start_menu()
    # If choice is 4, quit the game.
    elif choice == "4":
        clear()
        exit()