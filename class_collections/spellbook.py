# Elements

# Base Element Class
class Element(object):
    def __init__(element, name, effect, negation):
        # Represents the name of the element.
        element.name = name
        # Represents the effect of the element.
        element.effect = effect
        # Represents the negation of the element.
        element.negation = negation

# Fundamental Elements (TODO)

class Aether(Element):
    def __init__(element, name="Aether", effect="Aether", negation="Aether"):
        super().__init__(name, effect, negation)

class Fire(Element):
    def __init__(element, name="Fire", effect="Fire", negation="Water"):
        super().__init__(name, effect, negation)

class Water(Element):
    def __init__(element, name="Water", effect="Water", negation="Fire"):
        super().__init__(name, effect, negation)

class Earth(Element):
    def __init__(element, name="Earth", effect="Earth", negation="Air"):
        super().__init__(name, effect, negation)

class Air(Element):
    def __init__(element, name="Air", effect="Air", negation="Earth"):
        super().__init__(name, effect, negation)

# Spells

# Base Spell Class
class Spell(object):
    def __init__(spell, name, manaCost, damage, healthIncrease, armorIncrease, range):
        # Represents the name of the spell.
        spell.name = name
        # Represents the mana cost of the spell.
        spell.manaCost = manaCost
        # Represents the damage of the spell.
        spell.damage = damage
        # Represents the health increase of the spell.
        spell.healthIncrease = healthIncrease
        # Represents the armor increase of the spell.
        spell.armorIncrease = armorIncrease
        # Represents the range of the spell.
        spell.range = range

# Weapons

class Spear(Spell):
    def __init__(spell, name="Spear", manaCost=10, damage=10, healthIncrease=10, armorIncrease=0, range=1):
        super().__init__(name, manaCost, damage, healthIncrease, armorIncrease, range)

# Armor

class Shield(Spell):
    def __init__(spell, name="Shield", manaCost=10, damage=0, healthIncrease=0, armorIncrease=50, range=0):
        super().__init__(name, manaCost, damage, healthIncrease, armorIncrease, range)