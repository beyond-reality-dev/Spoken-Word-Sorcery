# Base Item Class
class Item(object):
    def __init__(item, name, description, gValue, hValue, aValue, dValue, mValue, isConsumable):
        # Represents the name of the item.
        item.name = name
        # Represents the description of the item.
        item.description = description
        # Represents the gold value of the item.
        item.gValue = gValue
        # Represents the health value of the item.
        item.hValue = hValue
        # Represents the armor value of the item.
        item.aValue = aValue
        # Represents the damage value of the item.
        item.dValue = dValue
        # Represents the mana value of the item.
        item.mValue = mValue
        # Determines whether an item is consumable.
        item.isConsumable = isConsumable

# Weapons

# Common weapons
class Sword(Item):
    def __init__(sword, name="Sword", description="A sword.", gValue=10, hValue=0, aValue=0, dValue=10, mValue=0, isConsumable=False):
        super().__init__(name, description, gValue, hValue, aValue, dValue, mValue, isConsumable)

# Uncommon weapons

# Rare weapons

# Epic weapons

# Legendary weapons

# Armor

# Common armor

# Uncommon armor

# Rare armor

# Epic armor

# Legendary armor

# Consumables