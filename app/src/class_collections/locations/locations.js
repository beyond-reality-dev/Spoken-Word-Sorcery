class Room { 
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.items = [];
    this.exits = {};
  }
}

module.exports = Room;