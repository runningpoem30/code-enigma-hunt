
import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    title: "Decrypt the First Cipher",
    description: "Fix this broken string reversal function to decode the first hidden word.",
    initialCode: `def reverse_string(text):
    # This function should reverse the input string
    reversed = ""
    for i in range(len(text)):
        reversed = text[i] + reversed
    return reversed

encrypted = "ENIGMA"
decrypted = reverse_string(encrypted)
print("First clue:", decrypted)`,
    solution: `def reverse_string(text):
    # This function should reverse the input string
    reversed = ""
    for i in range(len(text)):
        reversed = text[i] + reversed
    return reversed

encrypted = "ENIGMA"
decrypted = reverse_string(encrypted)
print("First clue:", decrypted)`,
    hint: "The function logic is correct! Try running it to see what it outputs.",
    clue: "AMGINE",
  },
  {
    id: 2,
    title: "The Forgotten Number",
    description: "Fix the function that incorrectly sums the digits of a number.",
    initialCode: `def sum_digits(number):
    # This function should sum all digits in a number
    result = 0
    while number > 0:
        digit = number % 10
        # BUG: We're subtracting instead of adding
        result -= digit
        number = number // 10
    return result

code = 7355
digit_sum = sum_digits(code)
print("Second clue:", chr(digit_sum + 64))`,
    solution: `def sum_digits(number):
    # This function should sum all digits in a number
    result = 0
    while number > 0:
        digit = number % 10
        # Fixed: Now we're adding correctly
        result += digit
        number = number // 10
    return result

code = 7355
digit_sum = sum_digits(code)
print("Second clue:", chr(digit_sum + 64))`,
    hint: "Look at how the digits are being accumulated in the result. Are we using the right operator?",
    clue: "T",
  },
  {
    id: 3,
    title: "Hidden in Plain Sight",
    description: "Fix the code to extract uppercase letters from the message.",
    initialCode: `def extract_uppercase(message):
    # This function should extract all uppercase letters
    hidden = ""
    for char in message:
        # BUG: The condition is wrong
        if char.islower():
            hidden += char
    return hidden

message = "ThE CoDe IS Hidden INSIDE"
secret = extract_uppercase(message)
print("Third clue:", secret)`,
    solution: `def extract_uppercase(message):
    # This function should extract all uppercase letters
    hidden = ""
    for char in message:
        # Fixed: Now checking for uppercase
        if char.isupper():
            hidden += char
    return hidden

message = "ThE CoDe IS Hidden INSIDE"
secret = extract_uppercase(message)
print("Third clue:", secret)`,
    hint: "The function should be looking for uppercase letters, not lowercase. Check the condition!",
    clue: "TECISIS",
  },
  {
    id: 4,
    title: "The Missing Link",
    description: "Fix the code that's missing a critical operation in the loop.",
    initialCode: `def decode_sequence(sequence):
    # This function decodes a numeric sequence
    result = ""
    position = 0
    
    while position < len(sequence):
        # BUG: We're not incrementing the position
        code = sequence[position]
        result += chr(code + 64)
    
    return result

sequence = [8, 9, 4, 4, 5, 14]
message = decode_sequence(sequence)
print("Fourth clue:", message)`,
    solution: `def decode_sequence(sequence):
    # This function decodes a numeric sequence
    result = ""
    position = 0
    
    while position < len(sequence):
        # Fixed: Now incrementing the position
        code = sequence[position]
        result += chr(code + 64)
        position += 1
    
    return result

sequence = [8, 9, 4, 4, 5, 14]
message = decode_sequence(sequence)
print("Fourth clue:", message)`,
    hint: "The while loop seems to run forever. What's missing to move to the next element in the sequence?",
    clue: "HIDDEN",
  },
  {
    id: 5,
    title: "Recursive Riddle",
    description: "Fix the recursive function that's calculating the wrong value.",
    initialCode: `def recursive_code(n):
    # This recursive function should calculate a specific pattern
    if n <= 1:
        return 1
    # BUG: The recursive formula is wrong
    return recursive_code(n-1) - recursive_code(n-2)

result = recursive_code(7)
print("Fifth clue:", chr(result + 64))`,
    solution: `def recursive_code(n):
    # This recursive function should calculate a specific pattern
    if n <= 1:
        return 1
    # Fixed: Using addition instead of subtraction
    return recursive_code(n-1) + recursive_code(n-2)

result = recursive_code(7)
print("Fifth clue:", chr(result + 64))`,
    hint: "This looks like a fibonacci sequence, but the operation between the recursive calls is wrong.",
    clue: "M",
  },
  {
    id: 6,
    title: "Array of Problems",
    description: "Fix the code that swaps elements in an array incorrectly.",
    initialCode: `def encryption_swap(arr):
    # This function should swap elements pairwise
    result = arr.copy()
    for i in range(0, len(arr), 2):
        # BUG: Out of range error when length is odd
        result[i] = arr[i+1]
        result[i+1] = arr[i]
    return result

code_array = [5, 19, 19, 1, 7, 5]
swapped = encryption_swap(code_array)
message = "".join([chr(num + 64) for num in swapped])
print("Sixth clue:", message)`,
    solution: `def encryption_swap(arr):
    # This function should swap elements pairwise
    result = arr.copy()
    for i in range(0, len(arr) - 1, 2):
        # Fixed: Ensuring we don't go out of bounds
        result[i] = arr[i+1]
        result[i+1] = arr[i]
    return result

code_array = [5, 19, 19, 1, 7, 5]
swapped = encryption_swap(code_array)
message = "".join([chr(num + 64) for num in swapped])
print("Sixth clue:", message)`,
    hint: "What happens if the array has an odd length? Check the range of the loop.",
    clue: "ESCAPE",
  },
  {
    id: 7,
    title: "Binary Secrets",
    description: "Fix the binary conversion function that's producing incorrect results.",
    initialCode: `def binary_to_letter(binary_string):
    # Convert binary string to integer, then to letter
    # BUG: The base is incorrect
    num = int(binary_string, 10)
    return chr(num)

binary_code = "1000101"
letter = binary_to_letter(binary_code)
print("Seventh clue:", letter)`,
    solution: `def binary_to_letter(binary_string):
    # Convert binary string to integer, then to letter
    # Fixed: Using base 2 for binary
    num = int(binary_string, 2)
    return chr(num)

binary_code = "1000101"
letter = binary_to_letter(binary_code)
print("Seventh clue:", letter)`,
    hint: "The function is trying to convert a binary string to a number. What base should binary use?",
    clue: "E",
  },
  {
    id: 8,
    title: "Dict Detective",
    description: "Fix the dictionary manipulation function that's losing data.",
    initialCode: `def merge_clues(dict1, dict2):
    # Merge two dictionaries for the next clue
    # BUG: This overwrites dict1 incorrectly
    for key in dict2:
        dict1[key] = dict2[key]
    return dict1

first_part = {"start": "B", "middle": "R"}
second_part = {"middle": "E", "end": "A"}
merged = merge_clues(first_part, second_part)
print("Eighth clue:", merged["start"] + merged["middle"] + merged["end"])`,
    solution: `def merge_clues(dict1, dict2):
    # Merge two dictionaries for the next clue
    # Fixed: Creating a new dictionary to avoid overwriting
    result = dict1.copy()
    for key in dict2:
        result[key] = dict2[key]
    return result

first_part = {"start": "B", "middle": "R"}
second_part = {"middle": "E", "end": "A"}
merged = merge_clues(first_part, second_part)
print("Eighth clue:", merged["start"] + merged["middle"] + merged["end"])`,
    hint: "The function is modifying dict1 directly and overwriting values. How might we preserve the original values of dict1 when they matter?",
    clue: "BEA",
  },
  {
    id: 9,
    title: "Class Conundrum",
    description: "Fix the class method that's updating attributes incorrectly.",
    initialCode: `class CodeLock:
    def __init__(self, code_parts):
        self.parts = code_parts
        self.is_unlocked = False
    
    def try_unlock(self, attempt):
        # BUG: The unlock logic is flawed
        if attempt == self.parts:
            self.is_unlocked = False
        return self.is_unlocked
    
    def get_hint(self):
        if self.is_unlocked:
            return "".join(self.parts)
        return "Locked"

lock = CodeLock(["K", "E", "Y"])
unlocked = lock.try_unlock(["K", "E", "Y"])
print("Ninth clue:", lock.get_hint())`,
    solution: `class CodeLock:
    def __init__(self, code_parts):
        self.parts = code_parts
        self.is_unlocked = False
    
    def try_unlock(self, attempt):
        # Fixed: Corrected unlock logic
        if attempt == self.parts:
            self.is_unlocked = True
        return self.is_unlocked
    
    def get_hint(self):
        if self.is_unlocked:
            return "".join(self.parts)
        return "Locked"

lock = CodeLock(["K", "E", "Y"])
unlocked = lock.try_unlock(["K", "E", "Y"])
print("Ninth clue:", lock.get_hint())`,
    hint: "When the attempt matches the code parts, what should happen to the lock? Should it lock or unlock?",
    clue: "KEY",
  },
  {
    id: 10,
    title: "Unlock the Lost Code",
    description: "Use all collected clues to solve the final encryption and reveal the lost code of ENIGMA.",
    initialCode: `# Use all collected clues to decode the final message
# CLUE 1: AMGINE
# CLUE 2: T
# CLUE 3: TECISIS
# CLUE 4: HIDDEN
# CLUE 5: M
# CLUE 6: ESCAPE
# CLUE 7: E
# CLUE 8: BEA
# CLUE 9: KEY

def decode_final_message(key, encrypted):
    # This function should decrypt using a key
    # HINT: Each letter in the key shifts the corresponding letter in the encrypted message
    decrypted = ""
    
    # Your solution here
    
    return decrypted

key = "SECRET"  # Replace with the right key derived from clues
encrypted = "WKLVCODEGMXVWDKHDG"

final_message = decode_final_message(key, encrypted)
print("The Lost Code of ENIGMA:", final_message)`,
    solution: `# Use all collected clues to decode the final message
# CLUE 1: AMGINE
# CLUE 2: T
# CLUE 3: TECISIS
# CLUE 4: HIDDEN
# CLUE 5: M
# CLUE 6: ESCAPE
# CLUE 7: E
# CLUE 8: BEA
# CLUE 9: KEY

def decode_final_message(key, encrypted):
    # This function should decrypt using a key
    # Each letter in the key shifts the corresponding letter in the encrypted message
    decrypted = ""
    
    for i in range(len(encrypted)):
        # Get the shift value from the key (cycling through the key if needed)
        key_char = key[i % len(key)]
        key_shift = ord(key_char) - ord('A')
        
        # Get the encrypted character
        encrypted_char = encrypted[i]
        
        # Shift backward (decrypt)
        # Convert to 0-25, shift backward, and wrap around if needed
        if encrypted_char.isalpha():
            decrypted_ord = (ord(encrypted_char) - ord('A') - key_shift) % 26 + ord('A')
            decrypted += chr(decrypted_ord)
        else:
            decrypted += encrypted_char
    
    return decrypted

key = "THEMKEY"  # Key derived from clues 2, 5, 7
encrypted = "WKLVCODEGMXVWDKHDG"

final_message = decode_final_message(key, encrypted)
print("The Lost Code of ENIGMA:", final_message)`,
    hint: "Look for patterns in the clues - some might form words or keys. For a Caesar-like cipher, you'll need to shift each letter by the corresponding value in the key.",
    clue: "THEENIGMACODEISHERE",
  }
];
