# Base Location Class
class Location(object):
    def __init__(location, name, description, shop, isCurrent):
        # Represents the name of the location.
        location.name = name
        # Represents the description of the location.
        location.description = description
        # Represents the shop level of the location.
        location.shop = shop
        # Determines whether the location is the current location.
        location.isCurrent = isCurrent

# Starting locations
class Imperial_Academy(Location):
    def __init__(imperial_academy, name="Imperial Academy", description="This is placeholder text!", shop=0, isCurrent=False):
        super().__init__(name, description, shop, isCurrent)