from spellbook import *

# Base Book Class
class Book(object):
    def __init__(book, name, description, knowledge, gValue):
        # Represents the name of the book.
        book.name = name
        # Represents the description of the book.
        book.description = description
        # Represents the knowledge of the book.
        book.knowledge = knowledge
        # Represents the gold value of the book.
        book.gValue = gValue

# Spellbooks

# Base spellbook class
class Spellbook(Book):
    def __init__(spellbook, name, description, spell, gValue):
        super().__init__(name, description, gValue)
        # Represents the spell of the spellbook.
        spellbook.spell = spell

# Tomes