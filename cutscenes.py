from function_dump import *
from game import *
from class_collections.spellbook import *

# Print introduction.
def intro():
    clear()
    typing_print("After several weeks of travelling by horse to the Imperial Academy, you have arrived at its wrought iron gates.\n")
    typing_print("It is late at night, with several torches hanging from the pillars supporting the gates.\n")
    typing_print("Flanking each side of the imposing gate are two guards, crossing pikes in an X in front of the gates.\n")
    typing_print("As you walk forward, the gates open, pulled by an unseen hand.\n")
    typing_print("The soldiers stare forward, moving their pikes apart, as if they experience this everyday, which they do.\n")
    typing_print("As you step through the gates to the courtyard of the academy, you begin to feel a sense of foreboding.\n")
    typing_print("Unfortunately for you, as the gates slam shut, it is far too late to change your mind.\n")
    typing_print("As you walk through the darkness, sickly green flames light on torches along your path.\n")
    typing_print("While you climb the steps to the academy's entrance, its sturdy wooden doors, decorated with gold leaf, glide open.\n")
    typing_print("As the doors close behind you, you know your life will never be the same.\n")
    typing_print("As you walk into the entrance, you see a large, imposing figure in the center of the room.\n")
    typing_print("'Halt!' A voice thunders.\n")
    reset_spacing()
    while True:
        player_name_input = typing_input("What is your name? \n")
        name_confirmation = typing_input("Is that right? \n")
        if name_confirmation.lower() in ["yes", "y"]:
            break
        elif name_confirmation.lower() in ["no", "n"]:
            continue
        else:
            print("What was that? \n")
            continue
    edit_player("Name", "set", player_name_input)
    save_game()
    typing_print(f"'Ah yes, {get_player_attribute('Name')}, I have been expecting you.'\n")
    typing_print("'You have been invited to the Imperial Academy because a mage sensed power within you.'\n")
    typing_print("'Now, you must prove that you can wield it, which starts with two sacred choices.'\n")
    while True:
        choice_1 = typing_input("'Do you wish for a weapon, or a shield?'\n")
        if choice_1.lower() not in ["weapon", "a weapon", "shield", "a shield"]:
            continue
        else:
            break
    if choice_1.lower() in ["weapon", "a weapon"]:
        typing_print("'Very well. Listen carefully.'\n")
        # Instruct the player to input "spear" and then print.
        while True:
            spear_cast = typing_input(f"'If you wish to smite your enemies with an arcane spear, speak the word {italicize('Spear')} in the Ancient Tongue.'\n")
            if spear_cast.lower() not in ["spear"]:
                continue
            else:
                break
        if spear_cast.lower() in ["spear"]:
            add_knownSpell(Spear())
            add_spokenSpell(Spear())
            typing_print("A spear of light appears floating in front of you, before disappearing in a shower of sparks.\n")
            choice_1 = "Spear"
            save_game()
    elif choice_1.lower() in ["shield", "a shield"]:
        typing_print("'Very well. Listen carefully.'\n")
        # Instruct the player to input "shield" and then print.
        while True:
            shield_cast = typing_input(f"'If you wish to protect yourself with an arcane shield, speak the word {italicize('Shield')} in the Ancient Tongue.'\n")
            if shield_cast.lower() not in ["shield"]:
                continue
            else:
                break
        if shield_cast.lower() in ["shield"]:
            add_knownSpell(Shield())
            add_spokenSpell(Shield())
            choice_1 = "Shield"
            typing_print("A shield of light appears floating in front of you, before disappearing in a shower of sparks.\n")
            save_game()
    typing_print("'Now, you must choose your first element to combine with your power.'\n")
    typing_print(f"'You just drew from the element of {italicize('Aether')}, which can only affect the immaterial, such as other spells.'\n")
    typing_print(f"'You may choose from the following elements: {italicize('Fire, Water, Earth,')} or {italicize('Air.')}'\n")
    typing_print("'These are not the only elements, but they are fundamental to existance itself, and will allow you to affect the material world.'\n")
    while True:
        choice_2 = typing_input("'Which element do you choose?'\n")
        if choice_2.lower() not in ["fire", "water", "earth", "air"]:
            continue
        else:
            break
    if choice_2.lower() in ["fire"]:
        add_knownElement(Fire())
        typing_print(f"'You have chosen the element of {italicize('Fire')}'\n")
        typing_print("'You may now cast spells using this element.'\n")
        choice_2 = "Fire"
        adjective = "blazing"
        save_game()
    elif choice_2.lower() in ["water"]:
        add_knownElement(Water())
        typing_print(f"'You have chosen the element of {italicize('Water')}'\n")
        typing_print("'You may now cast spells using this element.'\n")
        choice_2 = "Water"
        adjective = "drenching"
        save_game()
    elif choice_2.lower() in ["earth"]:
        add_knownElement(Earth())
        typing_print(f"'You have chosen the element of {italicize('Earth')}'\n")
        typing_print("'You may now cast spells using this element.'\n")
        choice_2 = "Earth"
        adjective = "crushing"
        save_game()
    elif choice_2.lower() in ["air"]:
        add_knownElement(Air())
        typing_print(f"'You have chosen the element of {italicize('Air')}'\n")
        typing_print("'You may now cast spells using this element.'\n")
        choice_2 = "Air"
        adjective = "gushing"
        save_game()
    while True:
        combo = typing_input(f"'Now, you must combine them. Speak the words {italicize(choice_2)} and {italicize(choice_1)} in the Ancient Tongue.'\n")
        if combo.lower() not in [choice_2.lower() + " " + choice_1.lower()]:
            continue
        else:
            add_spokenElement(eval(f"{choice_2}()"))
            save_game()
            if choice_1 is "Spear":
                reset_spacing()
                typing_print(f"A {adjective} {italicize(choice_1)} of {italicize(choice_2)} flys from your outstretched arm, crahsing into the wall at the other side of the room.\n")
                typing_print("The wall crumbles, revealing a staircase leading down.\n")
                typing_print("'You have passed the first test. You may now go down the stairs and begin your training.'\n")
                typing_print(f"'Good luck, {get_player_attribute('Name')}.'\n")
                typing_print("'You will need it.'\n")
                save_game()
                break
            elif choice_1 is "Shield":
                reset_spacing()
                typing_print(f"A {adjective} {italicize(choice_1)} of {italicize(choice_2)} coalesces around you, just before a swarm of flying rocks break free from the wall and slam into the shield.\n")
                typing_print("What was once a wall is now a pile of rubble, revealing a hidden staircase.\n")
                typing_print("'You have passed the first test. You may now go down the stairs and begin your training.'\n")
                typing_print(f"'Good luck, {get_player_attribute('Name')}.'\n")
                typing_print("'You will need it.'\n")
                save_game()
                break