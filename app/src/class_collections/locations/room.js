class Room {
  constructor(
    name,
    id,
    description,
    width,
    height,
    isLocked = false,
    lockedDescription = "The door is locked."
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.width = width;
    this.height = height;
    this.isLocked = isLocked;
    this.lockedDescription = lockedDescription;
    this.items = {};
    this.exits = {};
  }
}

module.exports = { Room };