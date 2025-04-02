
import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    title: "Decrypt the First Cipher",
    description: "Fix this broken string reversal function to decode the first hidden word.",
    initialCode: `def reverse_string(text):
    reversed = ""
    for i in range(len(text)):
        reversed = reversed + text[i] 
    return reversed

encrypted = "ENIGMA"
decrypted = reverse_string(encrypted)
print("First clue:", decrypted)  # Output: "ENIGMA" (Wrong)`,
    solution: `def reverse_string(text):
    reversed = ""
    for i in range(len(text)):
        reversed = text[i] + reversed  #
    return reversed

encrypted = "ENIGMA"
decrypted = reverse_string(encrypted)
print("First clue:", decrypted) `,
    hint: "The function logic is correct! Try running it to see what it outputs.",
    clue: "AMGINE",
  },
  {
    id: 2,
    title: "The Forgotten Number",
    description: "Fix the function that incorrectly sums the digits of a number.",
    initialCode: `def sum_digits(number):
    result = 0
    while number > 0:
        digit = number % 10
        result -= digit  
        number = number // 10
    return result

code = 7355
digit_sum = sum_digits(code)
print("Second clue:", chr(digit_sum + 64))  # Output: Invalid char (Wrong)`,
    solution: `def sum_digits(number):
    result = 0
    while number > 0:
        digit = number % 10
        result += digit  # Fixed: Now adding digits
        number = number // 10
    return result

code = 7355
digit_sum = sum_digits(code)
print("Second clue:", chr(digit_sum + 64))  # Output: "T" (7+3+5+5=20)`,
    hint: "Look at how the digits are being accumulated in the result. Are we using the right operator?",
    clue: "T",
  },
  {
    id: 3,
    title: "Hidden in Plain Sight",
    description: "Fix the code to extract uppercase letters from the message.",
    initialCode: `def extract_uppercase(message):
    hidden = ""
    for char in message:
        if char.islower(): 
            hidden += char
    return hidden

message = "ThE CoDe IS Hidden INSIDE"
secret = extract_uppercase(message)
print("Third clue:", secret) `,
    solution: `def extract_uppercase(message):
    hidden = ""
    for char in message:
        if char.isupper():  # Fixed: Now extracting uppercase
            hidden += char
    return hidden

message = "ThE CoDe IS Hidden INSIDE"
secret = extract_uppercase(message)
print("Third clue:", secret)  # Output: "TECISIS"`,
    hint: "The function should be looking for uppercase letters, not lowercase. Check the condition!",
    clue: "TECISIS",
  },
  {
    id: 4,
    title: "The Missing Link",
    description: "Fix the code that's missing a critical operation in the loop.",
    initialCode: `def decode_sequence(sequence):
    result = ""
    position = 0
    while position < len(sequence):
        code = sequence[position]  # Bug: Missing position increment → infinite loop!
        result += chr(code + 64)
    return result  # Never completes!

sequence = [8, 9, 4, 4, 5, 14]
message = decode_sequence(sequence)
print("Fourth clue:", message)  # Crashes (no output)`,
    solution: `def decode_sequence(sequence):
    result = ""
    position = 0
    while position < len(sequence):
        code = sequence[position]
        result += chr(code + 64)
        position += 1  # Fixed: Now increments position
    return result

sequence = [8, 9, 4, 4, 5, 14]
message = decode_sequence(sequence)
print("Fourth clue:", message)  # Output: "HIDDEN"`,
    hint: "The while loop seems to run forever. What's missing to move to the next element in the sequence?",
    clue: "HIDDEN",
  },
  {
    id: 5,
    title: "Recursive Riddle",
    description: "Fix the recursive function that's calculating the wrong value.",
    initialCode: `def recursive_code(n):
    if n <= 1:
        return 1
    return recursive_code(n-1) - recursive_code(n-2)  

result = recursive_code(7)
print("Fifth clue:", chr(result + 64))  # Output: Invalid (Wrong)`,
    solution: `def recursive_code(n):
    if n <= 1:
        return 1
    return recursive_code(n-1) + recursive_code(n-2)  # Fixed: Now adds

result = recursive_code(7)
print("Fifth clue:", chr(result + 64))  # Output: "M" (13th Fibonacci)`,
    hint: "This looks like a fibonacci sequence, but the operation between the recursive calls is wrong.",
    clue: "M",
  },
  {
    id: 6,
    title: "Array of Problems",
    description: "Fix the code that swaps elements in an array incorrectly.",
    initialCode: `def encryption_swap(arr):
    result = arr.copy()
    for i in range(0, len(arr), 2):
        result[i] = arr[i+1] 
        result[i+1] = arr[i]
    return result

code_array = [5, 19, 19, 1, 7, 5]
swapped = encryption_swap(code_array)
message = "".join([chr(num + 64) for num in swapped])
print("Sixth clue:", message)  # Crashes if array length is odd`,
    solution: `def encryption_swap(arr):
    result = arr.copy()
    for i in range(0, len(arr) - 1, 2):  
        result[i] = arr[i+1]
        result[i+1] = arr[i]
    return result

code_array = [5, 19, 19, 1, 7, 5]
swapped = encryption_swap(code_array)
message = "".join([chr(num + 64) for num in swapped])
print("Sixth clue:", message)  # Output: "ESCAPE"`,
    hint: "What happens if the array has an odd length? Check the range of the loop.",
    clue: "ESCAPE",
  },
  {
    id: 7,
    title: "Binary Secrets",
    description: "Fix the binary conversion function that's producing incorrect results.",
    initialCode: `def binary_to_letter(binary_string):
    num = int(binary_string, 10)  
    return chr(num)  # Returns garbage (e.g., "1000101" → 1,000,101)

binary_code = "1000101"
letter = binary_to_letter(binary_code)
print("Seventh clue:", letter)  # Output: Invalid Unicode`,
    solution: `def binary_to_letter(binary_string):
    num = int(binary_string, 2)  # Fixed: Uses base-2 (binary)
    return chr(num)

binary_code = "1000101"
letter = binary_to_letter(binary_code)
print("Seventh clue:", letter)  # Output: "E" (69 in binary)`,
    hint: "The function is trying to convert a binary string to a number. What base should binary use?",
    clue: "E",
  },
  {
    id: 8,
    title: "Dict Detective",
    description: "Fix the dictionary manipulation function that's losing data.",
    initialCode: ` def merge_clues(dict1, dict2):
    result = dict1  # BUG: Doesn't copy, just aliases!
    for key in dict2:
        result[key] = dict2[key]  # Mutates dict1 through alias
    return result

first_part = {"start": "B", "middle": "R"}
second_part = {"middle": "E", "end": "A"}
merged = merge_clues(first_part, second_part)
print("Eighth clue:", merged["start"] + merged["middle"] + merged["end"]) 
# Output: "BEA" but corrupts first_part (original dict is changed)`,
    solution: `def merge_clues(dict1, dict2):
    result = dict1.copy()  # Fixed: Creates a true copy
    for key in dict2:
        result[key] = dict2[key]  # Modifies only the copy
    return result

first_part = {"start": "B", "middle": "R"}
second_part = {"middle": "E", "end": "A"}
merged = merge_clues(first_part, second_part)
print("Eighth clue:", merged["start"] + merged["middle"] + merged["end"]) 
# Output: "BEA" (first_part remains unchanged)`,
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
        if attempt == self.parts:
            self.is_unlocked = False  # Bug: Should set to True
        return self.is_unlocked

lock = CodeLock(["K", "E", "Y"])
unlocked = lock.try_unlock(["K", "E", "Y"])
print("Ninth clue:", lock.get_hint())  # Output: "Locked" (Wrong)`,
    solution: `class CodeLock:
    def __init__(self, code_parts):
        self.parts = code_parts
        self.is_unlocked = False
    
    def try_unlock(self, attempt):
        if attempt == self.parts:
            self.is_unlocked = True  # Fixed: Now unlocks
        return self.is_unlocked

lock = CodeLock(["K", "E", "Y"])
unlocked = lock.try_unlock(["K", "E", "Y"])
print("Ninth clue:", lock.get_hint())  # Output: "KEY"`,
    hint: "When the attempt matches the code parts, what should happen to the lock? Should it lock or unlock?",
    clue: "KEY",
  },
  {
    id: 10,
    title: "Unlock the Lost Code",
    description: "Use all collected clues to solve the final encryption and reveal the lost code of LEGACY.",
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
    decrypted = ""
    for i in range(len(encrypted)):
        key_char = key[i % len(key)]  # Cycles through the key letters
        key_shift = ord(key_char) - ord('A')  # BUG: Missing modulo wrap-around!
        encrypted_char = encrypted[i]
        decrypted_ord = ord(encrypted_char) - key_shift  # BUG: Can produce negative values
        decrypted += chr(decrypted_ord)  # Will fail for non-printable ASCII
    return decrypted

# HINT: Combine clues 2 (T), 5 (M), 7 (E), and 9 (KEY) to form the decryption key.
key = "SECRET"  # Placeholder (player should use "THEMKEY")
encrypted = "WKLVCODEGMXVWDKHDG"
final_message = decode_final_message(key, encrypted)
print("The Lost Code of LEGACY:", final_message)  # Output: Garbage (as intended)`,
    solution: `def decode_final_message(key, encrypted):
    decrypted = ""
    for i in range(len(encrypted)):
        key_char = key[i % len(key)]  # Cycles through the key (e.g., "THEMKEY")
        key_shift = ord(key_char) - ord('A')  # Convert key letter to shift value (0-25)
        encrypted_char = encrypted[i]
        # Decrypt with wrap-around using modulo 26:
        decrypted_ord = (ord(encrypted_char) - ord('A') - key_shift) % 26 + ord('A')
        decrypted += chr(decrypted_ord)
    return decrypted

# Key derived from clues: T (L2) + M (L5) + E (L7) + KEY (L9) = "THEMKEY"
encrypted = "WKLVCODEGMXVWDKHDG"
final_message = decode_final_message("THEMKEY", encrypted)
print("The Lost Code of LEGACY:", final_message)  # Output: "THELEGACYCODEISHERE"`,
    hint: "Look for patterns in the clues - some might form words or keys. For a Caesar-like cipher, you'll need to shift each letter by the corresponding value in the key.",
    clue: "THELEGACYCODEISHERE",
}
];
