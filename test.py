import tkinter as tk

class MainWindow(tk.Tk):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # create main frame
        self.main_frame = tk.Frame(self)
        self.main_frame.pack(side='top', fill='both', expand=True)

        # create left sidebar
        self.left_sidebar = tk.Frame(self, bg='gray')
        self.left_sidebar.pack(side='left', fill='y')

        # create right sidebar
        self.right_sidebar = tk.Frame(self, bg='gray')
        self.right_sidebar.pack(side='right', fill='y')

class Game(MainWindow):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # create centered frame for text box and entry widget
        self.centered_frame = tk.Frame(self.main_frame)
        self.centered_frame.pack(side='top', fill='x')

        # add text box to centered frame
        self.text_box = tk.Text(self.centered_frame)
        self.text_box.pack(side='top', fill='x')

        # add entry widget to centered frame
        self.entry = tk.Entry(self.centered_frame)
        self.entry.pack(side='top', fill='x')

        # add widgets to left sidebar
        self.left_sidebar_label = tk.Label(self.left_sidebar, text='Left Sidebar')
        self.left_sidebar_label.pack()

        # add widgets to right sidebar
        self.right_sidebar_label = tk.Label(self.right_sidebar, text='Right Sidebar')
        self.right_sidebar_label.pack()

if __name__ == '__main__':
    app = Game()
    app.mainloop()
