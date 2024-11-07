import os

# Specify the root directory where you want to start renaming files
root_directory = "/home/pandatd/Documents/ramsukh(1)/public_html"  # Replace with your root directory path or "." for the current directory

# Walk through each directory and subdirectory
for dirpath, _, filenames in os.walk(root_directory):
    for filename in filenames:
        # Check if the file ends with .jpg (case-insensitive)
        if filename.lower().endswith(".jpg"):
            # Create the new file name by replacing .jpg with .webp
            new_filename = filename.rsplit(".", 1)[0] + ".webp"

            # Get full paths
            old_file = os.path.join(dirpath, filename)
            new_file = os.path.join(dirpath, new_filename)

            # Rename the file
            os.rename(old_file, new_file)
            print(f'Renamed: "{old_file}" to "{new_file}"')

print("Renaming complete.")
