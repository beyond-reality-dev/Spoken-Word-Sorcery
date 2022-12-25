# Import modules
from function_dump import *
from graphics.graphics_archive.splash_screen import splashScreen
from graphics.graphics_archive.chapter_text import *
from game import *

# The main function
def main():
    # Print the splash screen, load the menu, and start the game.
    global game_state
    clear()
    print(splashScreen)
    input()
    start_menu()

if __name__ == '__main__':
    main()