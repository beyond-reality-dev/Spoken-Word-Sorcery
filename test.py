import tkinter as tk

class MainWindow(tk.Frame):
    def __init__(self, parent):
        tk.Frame.__init__(self, parent)

        # create a frame for the main menu
        self.main_menu = tk.Frame(self)
        self.main_menu.pack()

        # create a button for switching to the settings frame
        self.settings_button = tk.Button(self.main_menu, text="Settings", command=self.open_settings)
        self.settings_button.pack()

        # create a frame for the settings
        self.settings = tk.Frame(self)

        # create a button for switching back to the main menu
        self.back_button = tk.Button(self.settings, text="Back", command=self.open_main_menu)
        self.back_button.pack()

    def open_settings(self):
        # hide the main menu and show the settings
        self.main_menu.pack_forget()
        self.settings.pack()

    def open_main_menu(self):
        # hide the settings and show the main menu
        self.settings.pack_forget()
        self.main_menu.pack()

if __name__ == "__main__":
    root = tk.Tk()
    MainWindow(root).pack()
    root.mainloop()
