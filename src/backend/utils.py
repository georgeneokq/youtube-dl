remove_punctuation_map = dict((ord(char), None) for char in '\/*?:"<>|')

def sanitize_filename(filename: str):
    return filename.translate(remove_punctuation_map)