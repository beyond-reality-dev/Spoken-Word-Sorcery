import tkinter as tk
from ctypes import windll
from PIL import Image, ImageTk

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
        self.bind("<Key>", self.on_keypress)
        self.used = False
        
    # Switch frames when the user presses a key.
    def on_keypress(self, event):
        if self.used == False:
            self.switch_frame(Main)
            self.used = True
        else:
            pass

    # Destroy the current frame and create a new one.
    def switch_frame(self, newFrame):
        self.frame.pack_forget()
        self.frame = newFrame(self)
        self.frame.grid(row=0, column=0)

class SplashScreen(tk.Frame):
    def __init__(self, parent):

        # Inherit from the frame class.
        super().__init__(parent)

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

class Main(tk.Frame):
    def __init__(self, parent):

        # Inherit from the frame class.
        super().__init__(parent)
        
        # Display the player stats in the top left corner.
        self.player_stats = PlayerStats(self)
        self.player_stats.grid(row=0, column=0, sticky=tk.W)

        # Display the inventory below the player stats.
        self.inventory = Inventory(self)
        self.inventory.grid(row=1, column=0, sticky=tk.W)

class PlayerStats(tk.Frame):
    def __init__(self, parent):
        
        # Inherit from the frame class.
        super().__init__(parent)

        # Display the title of the player stats frame.
        self.title = tk.Label(self, text="Player Stats:", font=MAINFONT)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Display an invisible divider.
        self.divider = tk.Label(self, text="", font=MAINFONT)
        self.divider.grid(row=1, column=0, sticky=tk.W)

        # Display the health of the player.
        self.health = tk.Label(self, text="Health: 100/100", font=MAINFONT)
        self.health.grid(row=2, column=0, sticky=tk.W)

        # Display the mana of the player.
        self.mana = tk.Label(self, text="Mana: 100/100", font=MAINFONT)
        self.mana.grid(row=3, column=0, sticky=tk.W)

        # Display an invisible divider.
        self.divider = tk.Label(self, text="", font=MAINFONT)
        self.divider.grid(row=4, column=0, sticky=tk.W)

class Inventory(tk.Frame):
    def __init__(self, parent):

        # Inherit from the frame class.
        super().__init__(parent)

        # Display the title of the inventory frame.
        self.title = tk.Label(self, text="Inventory:", font=MAINFONT)
        self.title.grid(row=0, column=0, sticky=tk.W)

        # Create scrolling menu with inventory items.
        self.inventory = InventoryBox(self)
        self.inventory.grid(row=1, column=0, sticky=tk.W)

class InventoryBox(tk.Frame):
    def __init__(self, parent):

        # Inherit from the frame class.
        super().__init__(parent)

        # Display a scrollbar on the right side of the frame.
        self.scrollbar = tk.Scrollbar(self)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # Display the contents of the inventory.
        self.contents = tk.Listbox(self, width=32, height=33, yscrollcommand=self.scrollbar.set)
        for line in range(100):
            self.contents.insert(tk.END, "Item " + str(line))
        self.contents.pack(side=tk.LEFT, fill=tk.BOTH)
        self.scrollbar.config(command=self.contents.yview)

if __name__ == "__main__":
    app = App()
    app.title("Spoken Word Sorecery")
    app.iconphoto(False, ImageTk.PhotoImage(Image.open("graphics/splash_screen.png")))
    app.state("zoomed")
    app.mainloop()