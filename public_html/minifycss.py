import os
import re
import logging

# Set up logging
logging.basicConfig(
    filename='css_minification.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Directory containing the CSS files
css_directory = "/home/pandatd/Documents/ramsukh(1)/"  # Change this to your project directory

# Function to minify CSS content
def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*[^*]*\*+(?:[^/*][^*]*\*+)*/', '', content)
    # Remove whitespace around symbols
    content = re.sub(r'\s*([{}:;,])\s*', r'\1', content)
    # Remove trailing semicolons in CSS blocks
    content = re.sub(r';\}', '}', content)
    # Remove unnecessary whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove leading/trailing whitespace
    return content.strip()

# Function to process all CSS files in a directory
def minify_css_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".css"):
                file_path = os.path.join(root, file)
                try:
                    logging.info(f"Minifying file: {file_path}")

                    # Read the original CSS file content
                    with open(file_path, "r", encoding="utf-8") as f:
                        original_content = f.read()

                    # Minify the CSS content
                    minified_content = minify_css(original_content)

                    # Write the minified content back to the file
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(minified_content)

                    logging.info(f"Minified successfully: {file_path}")

                except Exception as e:
                    logging.error(f"Error processing file {file_path}: {e}")

# Main function to execute the minification process
def main():
    logging.info("Starting CSS minification process.")
    minify_css_files(css_directory)
    logging.info("CSS minification process completed.")

if __name__ == "__main__":
    main()
