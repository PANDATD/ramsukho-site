import os
import re
import logging

# Set up logging
logging.basicConfig(
    filename='js_minification.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Directory containing the JavaScript files
js_directory = "/path/to/your/project"  # Change this to your project directory

# Function to minify JavaScript content
def minify_js(content):
    # Remove multiline comments /* ... */
    content = re.sub(r'/\*[^*]*\*+(?:[^/*][^*]*\*+)*/', '', content)
    # Remove single-line comments // ...
    content = re.sub(r'//.*', '', content)
    # Remove whitespace around symbols
    content = re.sub(r'\s*([{}:;,=+\-*/()<>])\s*', r'\1', content)
    # Remove unnecessary whitespace
    content = re.sub(r'\s+', ' ', content)
    # Remove leading/trailing whitespace
    return content.strip()

# Function to process all JavaScript files in a directory
def minify_js_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                try:
                    logging.info(f"Minifying file: {file_path}")

                    # Read the original JavaScript file content
                    with open(file_path, "r", encoding="utf-8") as f:
                        original_content = f.read()

                    # Minify the JavaScript content
                    minified_content = minify_js(original_content)

                    # Write the minified content back to the file
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(minified_content)

                    logging.info(f"Minified successfully: {file_path}")

                except Exception as e:
                    logging.error(f"Error processing file {file_path}: {e}")

# Main function to execute the minification process
def main():
    logging.info("Starting JavaScript minification process.")
    minify_js_files(js_directory)
    logging.info("JavaScript minification process completed.")

if __name__ == "__main__":
    main()
