from datetime import timedelta

remove_punctuation_map = dict((ord(char), None) for char in '\/*?:"<>|')

def sanitize_filename(filename: str):
    return filename.translate(remove_punctuation_map)

"""
params:
    duration_string: string representing duration, in format HH:MM:DD
"""
def timestamp_to_seconds(duration_string: str):
    h, m, s = duration_string.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

def seconds_to_timestamp(duration_seconds: int):
    return '{:0>8}'.format(str(timedelta(seconds=duration_seconds)))