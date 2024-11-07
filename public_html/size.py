import os
from PIL import Image
from datetime import datetime

class Logger:
    """Logger for tracking actions with timestamps."""
    def __init__(self, verbose=True):
        self.verbose = verbose
    
    def log(self, message):
        if self.verbose:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}")

def compress_image(image_path, quality=85):
    """Compresses the image at the given path, saving it with the specified quality."""
    try:
        with Image.open(image_path) as img:
            img = img.convert("RGB")  # Ensure compatibility with JPEG format
            img.save(image_path, "JPEG", optimize=True, quality=quality)
        return True
    except Exception as e:
        logger.log(f"Error compressing {image_path}: {e}")
        return False

def compress_images_in_folder(folder_path, quality=85, verbose=True):
    """Compress all images in the folder and subfolders, modifying them in place."""
    global logger
    logger = Logger(verbose)
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
    compressed_count = 0

    for root, _, files in os.walk(folder_path):
        for file in files:
            if any(file.lower().endswith(ext) for ext in image_extensions):
                image_path = os.path.join(root, file)
                if compress_image(image_path, quality=quality):
                    compressed_count += 1
                    logger.log(f"Compressed: {image_path}")
    
    logger.log(f"Total images compressed: {compressed_count}")

# Usage
repo_path = r"C:\Users\Admin\OneDrive\Documents\ramsukh_website_work\img"  # Replace with your GitHub repo path
compress_images_in_folder(repo_path, quality=65, verbose=True)
