import tkinter as tk
import tkinter.scrolledtext as st
from ctypes import windll
from PIL import Image, ImageTk
from game import *

# Get the user's screen resolution.
windll.shcore.SetProcessDpiAwareness(1)
screen_width = windll.user32.GetSystemMetrics(0)
screen_height = windll.user32.GetSystemMetrics(1)

# Set the font settings.
MAINFONT = ("Georgia", 24)

class App(tk.Tk):
    def __init__(self):

        # Inherit from the Tk class.
        super().__init__()

        # Set the splash screen as the first frame.
        self.frame = SplashScreen(self)
        self.frame.pack()

        # Set a keybind to switch frames.
        self.bind("<Key>", self.delete_splash)
        self.used = False
        
    # Switch frames when the user presses a key.
    def delete_splash(self, event):
        if self.used == False:
            self.switch_frame(StartMenu)
            self.used = True
        else:
            pass

    # Destroy the current frame and create a new one.
    def switch_frame(self, newFrame):
        self.frame.pack_forget()
        self.frame = newFrame(self)
        self.frame.pack(anchor=tk.CENTER)

class SplashScreen(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Open the original splash screen image and create a reference to it.
        original_image = Image.open("graphics/splash_screen.png")
        self.original_image = original_image

        # Resize the image to fit the screen.
        image = original_image.resize((screen_width, screen_height), Image.Resampling.LANCZOS)
        final = ImageTk.PhotoImage(image)
        self.final = final

        # Create a label and set the image option to the image object.
        label = tk.Label(self, image=final)
        label.pack()

class StartMenu(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Create a button to load the game.
        self.start_button = tk.Button(self, text="Load a Save Game", font=MAINFONT, command=lambda: self.load_game(parent))
        self.start_button.pack()

        # Create a button to start a new game.
        self.new_button = tk.Button(self, text="Start a New Game", font=MAINFONT, command=lambda: self.start_a_new_game(parent))
        self.new_button.pack()
        
        # Create a button to view information about the game.
        self.info_button = tk.Button(self, text="View Information", font=MAINFONT, command=lambda: self.view_info(parent))
        self.info_button.pack()

        # Create a button to quit the game.
        self.quit_button = tk.Button(self, text="Quit", font=MAINFONT, command=self.quit)
        self.quit_button.pack()

    def load_game(self, parent):
        load_game()
        global game_state, game_state_player, game_state_locations, game_state_knowledge
        from game import game_state, game_state_player, game_state_locations, game_state_knowledge
        parent.switch_frame(Main)

    def start_a_new_game(self, parent):
        start_new_game()
        global game_state, game_state_player, game_state_locations, game_state_knowledge
        from game import game_state, game_state_player, game_state_locations, game_state_knowledge
        parent.switch_frame(Main)

    def view_info(self, parent):
        parent.switch_frame(Info)

class Main(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)
        
        # Display the left sidebar.
        self.left_sidebar = LeftSidebar(self, bg="dark gray")
        self.left_sidebar.pack(side=tk.LEFT, fill=tk.Y)

        # Display the right sidebar.
        self.right_sidebar = RightSidebar(self, bg="dark gray")
        self.right_sidebar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the main window.
        self.main_window = MainWindow(self, bg="white")
        self.main_window.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

class LeftSidebar(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the player stats in the top.
        self.player_stats = PlayerStats(self, bg = self.background)
        self.player_stats.grid(row=0, column=0, sticky=tk.NSEW)

        # Display the equipment below the player stats.
        self.equipment = Equipment(self, bg = self.background)
        self.equipment.grid(row=1, column=0, sticky=tk.NSEW)

        # Display the spoken elements below the equipment.
        self.spoken_elements = SpokenElements(self, bg = self.background)
        self.spoken_elements.grid(row=2, column=0, sticky=tk.NSEW)

        # Display the spoken spells below the spoken elements.
        self.spoken_spells = SpokenSpells(self, bg = self.background)
        self.spoken_spells.grid(row=3, column=0, sticky=tk.NSEW)

class MainWindow(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a text entry box at the bottom.
        self.text_entry = tk.Entry(self, bg=self.background, font=MAINFONT)
        self.text_entry.pack(side=tk.BOTTOM, fill=tk.X)
        self.text_entry.bind("<Return>", self.get_text)

        # Display a text box at the top.
        self.text_box = st.ScrolledText(self, bg="gray", font=MAINFONT)
        self.text_box.pack(side=tk.TOP, fill=tk.X)
        self.text_box.insert(tk.END, "Welcome to the game!")
        self.text_box.config(state=tk.DISABLED)

    def get_text(self, event):
        text = self.text_entry.get()
        self.text_entry.delete(0, tk.END)
        self.text_box.config(state=tk.NORMAL)
        self.text_box.insert(tk.END, text)
        self.text_box.config(state=tk.DISABLED)
        self.text_box.see(tk.END)
        self.text_entry.focus()

class RightSidebar(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display an invisible divider.
        self.divider = tk.Label(self, text="", font=("Georgia", 4), bg=self.background)
        self.divider.grid(row=0, column=0, sticky=tk.NSEW)

        # Display the known elements.
        self.elements = KnownElements(self, bg=self.background)
        self.elements.grid(row=1, column=0, sticky=tk.NSEW)

        # Display the known spells below the known elements.
        self.spells = KnownSpells(self, bg=self.background)
        self.spells.grid(row=2, column=0, sticky=tk.NSEW)

        # Display the inventory below the known spells.
        self.inventory = Inventory(self, bg=self.background)
        self.inventory.grid(row=3, column=0, sticky=tk.NSEW)

class PlayerStats(tk.Frame):
    def __init__(self, parent, *args, **kwargs):
        
        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display an invisible divider.
        self.divider = tk.Label(self, text="", font=("Georgia", 4), bg=self.background)
        self.divider.grid(row=0, column=0, sticky=tk.NSEW)

        # Create a label for the player's name.
        self.name_label = tk.Label(self, text=f"{game_state_player['Name']}", font=MAINFONT, bg=self.background)
        self.name_label.grid(row=1, column=0, sticky=tk.W)

        # Display the player's level.
        self.level = tk.Label(self, text=f"Level: {game_state_player['Level']}", font=MAINFONT, bg=self.background)
        self.level.grid(row=2, column=0, sticky=tk.W)

        # Display the health of the player.
        self.health = tk.Label(self, text=f"Health: {game_state_player['Current Health']}/{game_state_player['Maximum Health']}", font=MAINFONT, bg=self.background)
        self.health.grid(row=3, column=0, sticky=tk.W)

        # Display the mana of the player.
        self.mana = tk.Label(self, text=f"Mana: {game_state_player['Current Mana']}/{game_state_player['Maximum Mana']}", font=MAINFONT, bg=self.background)
        self.mana.grid(row=4, column=0, sticky=tk.W)

        # Display the gold of the player.
        self.gold = tk.Label(self, text=f"Gold: {game_state_player['Gold']}", font=MAINFONT, bg=self.background)
        self.gold.grid(row=5, column=0, sticky=tk.W)

        # Display an invisible divider.
        self.divider = tk.Label(self, text="", font=("Georgia", 16), bg=self.background)
        self.divider.grid(row=6, column=0, sticky=tk.W)

class Equipment(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the equipment frame.
        self.title = tk.Label(self, text="Equipped Items:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with equipped items.
        self.inventory = EquipmentBox(self, bg=self.background)
        self.inventory.grid(row=1, column=0, sticky=tk.W)

class EquipmentBox(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the equipment frame.
        self.contents = tk.Listbox(self, width=38, height=9, bg="light gray", yscrollcommand=self.scrollbar.set)
        for i in game_state['equippedItems']:
            self.contents.insert(tk.END, f"{i['Name']}: {i['Description']}")
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

class SpokenElements(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the elements frame.
        self.title = tk.Label(self, text="Spoken Elements:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with elements.
        self.elements = SpokenElementsBox(self, bg=self.background)
        self.elements.grid(row=1, column=0, sticky=tk.W)

class SpokenElementsBox(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the elements frame.
        self.contents = tk.Listbox(self, width=38, height=9, bg="light gray", yscrollcommand=self.scrollbar.set)
        for i in game_state['spokenElements']:
            self.contents.insert(tk.END, f"{i['Name']}: {i['Description']}")
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

class SpokenSpells(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the spells frame.
        self.title = tk.Label(self, text="Spoken Spells:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with spells.
        self.spells = SpokenSpellsBox(self, bg=self.background)
        self.spells.grid(row=1, column=0, sticky=tk.W)

class SpokenSpellsBox(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the spells frame.
        self.contents = tk.Listbox(self, width=38, height=9, bg="light gray", yscrollcommand=self.scrollbar.set)
        for i in game_state['spokenSpells']:
            self.contents.insert(tk.END, f"{i['Name']}: {i['Description']}")
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

class KnownElements(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the elements frame.
        self.title = tk.Label(self, text="Known Elements:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with elements.
        self.elements = KnownElementsBox(self, bg=self.background)
        self.elements.grid(row=1, column=0, sticky=tk.W)

class KnownElementsBox(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the elements frame.
        self.contents = tk.Listbox(self, width=38, height=10, bg="light gray", yscrollcommand=self.scrollbar.set)
        for i in game_state['knownElements']:
            self.contents.insert(tk.END, f"{i['Name']}: {i['Description']}")
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

class KnownSpells(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the spells frame.
        self.title = tk.Label(self, text="Known Spells:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with spells.
        self.spells = KnownSpellsBox(self, bg=self.background)
        self.spells.grid(row=1, column=0, sticky=tk.W)

class KnownSpellsBox(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the spells frame.
        self.contents = tk.Listbox(self, width=38, height=10, bg="light gray", yscrollcommand=self.scrollbar.set)
        for i in game_state['knownSpells']:
            self.contents.insert(tk.END, f"{i['Name']}: {i['Description']}")
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

class Inventory(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the inventory frame.
        self.title = tk.Label(self, text="Inventory:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with inventory items.
        self.inventory = InventoryBox(self, bg=self.background)
        self.inventory.grid(row=1, column=0, sticky=tk.W)

class InventoryBox(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the inventory frame.
        self.contents = tk.Listbox(self, width=38, height=20, bg="light gray", yscrollcommand=self.scrollbar.set)
        for i in game_state['inventory']:
            self.contents.insert(tk.END, f"{i['Name']}: {i['Description']}")
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

class Info(tk.Frame):
    def __init__(self, parent, *args, **kwargs):

        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Display the title of the info frame.
        self.title = tk.Label(self, text="Info:", font=MAINFONT, bg=self.background)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Display the contents of the info frame.
        self.contents = tk.Label(self, text="Placeholder", font=MAINFONT, bg=self.background)
        self.contents.grid(row=1, column=0, sticky=tk.W)

def refresh_game_state():
    refresh_game()
    global game_state, game_state_player, game_state_knowledge, game_state_locations
    from game import game_state, game_state_player, game_state_knowledge, game_state_locations

def initialize_user_interface():
    app = App()
    app.title("Spoken Word Sorecery")
    app.iconphoto(False, ImageTk.PhotoImage(Image.open("graphics/splash_screen.png")))
    app.state("zoomed")
    app.mainloop()

if __name__ == "__main__":
    initialize_user_interface()