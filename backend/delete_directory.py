import os
import sys
import shutil

base_dir = os.path.dirname(os.path.realpath(__file__))

locations = [
    "__pycache__",
    "blog/__pycache__",
    "blog_api/__pycache__",
    "blog_api/migrations",
    "blog_api/urls/__pycache__",
    "user_api/__pycache__",
    "user_api/migrations",
    "user_api/urls/__pycache__",
    "comment_api/__pycache__",
    "comment_api/migrations",
    "comment_api/urls/__pycache__",
    "rating_api/__pycache__",
    "rating_api/migrations",
    "rating_api/urls/__pycache__",
]

for path in locations:
    try:
        path = os.path.join(base_dir, path)
        shutil.rmtree(path)
        print("Deleted: " + path)
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))
