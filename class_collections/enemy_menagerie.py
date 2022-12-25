# Base Enemy Class
class Enemy(object):
    def __init__(enemy, name, health, armor, strength, range, gold):
        # Represents the name of the enemy
        enemy.name = name
        # Represents the health of the enemy
        enemy.health = health
        # Represents the armor of the enemy
        enemy.armor = armor
        # Represents the strength of the enemy
        enemy.strength = strength
        # Represents the range of the enemy
        enemy.range = range
        # Represents the gold of the enemy
        enemy.gold = gold

# Basic enemies

class Bandit(Enemy):
    def __init__(bandit, name="Bandit", health=100, armor=0, strength=10, range=0, gold=10):
        super().__init__(name, health, armor, strength, range, gold)