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
        self.bind("<Key>", self.delete_splash)
        self.used = False
        
    # Switch frames when the user presses a key.
    def delete_splash(self, event):
        if self.used == False:
            self.switch_frame(Main)
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

        # Display the inventory below the player stats.
        self.inventory = Inventory(self, bg = self.background)
        self.inventory.grid(row=1, column=0, sticky=tk.NSEW)

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
        self.text_box = tk.Text(self, bg="gray", font=MAINFONT)
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

        # Display the inventory below the player stats.
        self.inventory = Inventory(self, bg = self.background)
        self.inventory.pack(side=tk.TOP)

class PlayerStats(tk.Frame):
    def __init__(self, parent, *args, **kwargs):
        
        # Inherit from the frame class.
        super().__init__(parent, *args, **kwargs)

        # Configure the frame.
        self.background = kwargs.get("bg")
        self.configure(bg=self.background)

        # Create a label for the player's name.
        self.name_label = tk.Label(self, text="Placeholder", font=MAINFONT, bg=self.background)
        self.name_label.grid(row=0, column=0, sticky=tk.W)

        # Display the health of the player.
        self.health = tk.Label(self, text="Health: 100/100", font=MAINFONT, bg=self.background)
        self.health.grid(row=1, column=0, sticky=tk.W)

        # Display the mana of the player.
        self.mana = tk.Label(self, text="Mana: 100/100", font=MAINFONT, bg=self.background)
        self.mana.grid(row=2, column=0, sticky=tk.W)

        # Display an invisible divider.
        self.divider = tk.Label(self, text="", font=MAINFONT, bg=self.background)
        self.divider.grid(row=3, column=0, sticky=tk.W)

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

        # Display the contents of the inventory.
        self.contents = tk.Listbox(self, width=36, height=36, bg="light gray", yscrollcommand=self.scrollbar.set)
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