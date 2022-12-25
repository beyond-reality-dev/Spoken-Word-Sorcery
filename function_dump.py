import sys
import time
import threading
import msvcrt 
import keyboard
from os import system
from os import name

# Function for printing with a skippable typing effect.
def typing_print(text, speed=0.01):
  done = False
  def type_out():
      for char in text:
          if done:
            break
          sys.stdout.write(char)
          sys.stdout.flush()
          time.sleep(speed)
      else:
        sys.stdout.write('\x1b[1A')
  t1 = threading.Thread(target=type_out)
  t1.start()
  while not done:
      keyboard.wait('ctrl')
      done = True
      print("\r" + text)
      break

# Function for taking an input and printing text with a typing effect.
def typing_input(text, speed=0.01):
  flush_input()
  for character in text:
    sys.stdout.write(character)
    sys.stdout.flush()
    time.sleep(speed)
  else:
    sys.stdout.write('\x1b[1A')
    sys.stdout.write('\x1b[1A')
    print("\n" + text + "\n")
    sys.stdout.write('\x1b[1A')
  value = input()
  print("\n")
  sys.stdout.write('\x1b[1A')
  return value

# Function for a flashing message with "..."
def flash(text, seconds):
  for i in range(seconds):
    print(text + "   ")
    sys.stdout.write('\x1b[1A')
    time.sleep(0.25)
    print(text + ".  ")
    sys.stdout.write('\x1b[1A')
    time.sleep(0.25)
    print(text + ".. ")
    sys.stdout.write('\x1b[1A')
    time.sleep(0.25)
    print(text + "...")
    sys.stdout.write('\x1b[1A')
    time.sleep(0.25)

# Function for italiacizing text.
def italicize(text):
  return "\x1b[3m" + text + "\x1b[23m"

# Function for resetting spacing after a branching choice.
def reset_spacing():
  print("\n")
  sys.stdout.write('\x1b[1A')
  sys.stdout.write('\x1b[1A')

# Function for flushing the input buffer.
def flush_input():
  while msvcrt.kbhit():
    msvcrt.getch()

# Function for clearing the screen.
def clear():
    if name == 'nt':
        _ = system('cls')
    else:
        _ = system('clear')