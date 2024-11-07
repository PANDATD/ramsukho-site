import os
import re


alt_text_mapping = {
    "img-right.svg": "Right arrow-icon",
    "img-left.svg": "Left arrow-icon",
    "FS-1.webp": "Spacious bedroom in Ramsukh Resort's family suite with a king-size bed, antique chairs, and warm lighting.",
    "FS-2.webp": "Cozy living area of the family suite in Ramsukh Resort, featuring comfortable seating, a television, and a window view.",
    "FD.webp": "Elegant bedroom in Ramsukh Resort with a large window overlooking lush greenery, featuring a cozy bed and warm lighting fixtures.",
    "FP-1.webp": "Cozy bedroom in Ramsukh Resort with a balcony, natural lighting, and a view of the surrounding greenery.",
    "FP-2.webp": "Spacious bedroom and living area in Ramsukh Resort with a comfortable sofa and large windows offering scenic views.",
    "GD-1.webp": "Garden suite bedroom at Ramsukh Resort with a balcony, flat-screen TV, and stylish decor with a large mirror.",
    "GD-2.webp": "Garden suite bedroom and balcony view at Ramsukh Resort with outdoor seating and decorative wall art.",
    "GS-1.webp": "Spacious bedroom in the garden suite at Ramsukh Resort with an intricately designed dresser, mirror, and vibrant wall art.",
    "GS-2.webp": "Cozy living area in the garden suite at Ramsukh Resort with a striped sofa, television, and kitchenette.",
    "GS-3.webp": "Private balcony in the garden suite at Ramsukh Resort featuring outdoor seating and a view of lush greenery.",
    "TBS-1.webp": "Elegant bedroom in the terrace suite at Ramsukh Resort featuring soft lighting, ceiling fan, and attached bathroom with forest views.",
    "TBS-2.webp": "Cozy bedroom in the terrace suite at Ramsukh Resort with a large window offering serene views of lush greenery.",
    "TBS-3.webp": "Spacious living and dining area in the terrace suite at Ramsukh Resort, decorated with artwork and modern furnishings.",
    "TBS-4.webp": "Living room in the terrace suite at Ramsukh Resort with a balcony overlooking scenic landscapes and framed photography on the walls.",
    "VS-1.webp": "Cozy bedroom in the Valley Suite at Ramsukh Resort with a balcony offering scenic valley views and vibrant wall art.",
    "VS-2.webp": "Spacious living area in the Valley Suite at Ramsukh Resort with elegant decor, chandelier, and forest-facing windows.",
    "VS-3.webp": "Balcony in the Valley Suite at Ramsukh Resort with wicker furniture, offering expansive views of the surrounding landscape.",
    "1-Pool.webp": "Outdoor pool area at Ramsukh Resort with poolside seating and umbrellas, offering a scenic view of the surrounding hills.",
    "2-Disco-Theque.webp": "Stylish disco room at Ramsukh Resort with leather seating, colorful lighting, and wooden decor.",
    "3-Outdoor-Play Area.webp": "Outdoor children’s play area at Ramsukh Resort with a slide, climbing frames, and shaded trees.",
    "4-Children-Play-Room.webp": "Indoor children's playroom at Ramsukh Resort, featuring slides, toys, and colorful activity areas.",
    "5-Night-Ride.webp": "Night jeep ride adventure at Ramsukh Resort, offering an exciting experience through forested roads.",
    "6-Outdoor-fitness zone.webp": "Outdoor fitness zone at Ramsukh Resort, surrounded by greenery, featuring exercise equipment in a natural setting.",
    "7-Jungle-Trek.webp": "Group of hikers on a jungle trek at Ramsukh Resort, exploring the rocky terrain and dense forest.",
    "8-Spa.webp": "Serene spa room at Ramsukh Resort with a massage table and a rose petal-filled hot tub for relaxation.",
    "1-Ramsukh-Forest-canopy.webp": "Outdoor dining area under forest canopy at Ramsukh Resort, Mahabaleshwar.",
    "2-Red-black-hall.webp": "Elegant indoor banquet hall with round tables at Ramsukh Resort, Mahabaleshwar.",
    "3-Main-conference-hall.webp": "Spacious conference hall with U-shaped seating arrangement at Ramsukh Resort, Mahabaleshwar.",
    "1-Ramsukh-Forest-canopy.webp": "Forest canopy setup with colorful decor and furniture for an event at Ramsukh Resort, Mahabaleshwar.",
    "3-Ramsukh-reception-lawn.webp": "Colorful outdoor seating for a wedding reception at Ramsukh Resort, overlooking the valley.",
    "4-Advait Valley.webp": "Beautiful wedding venue setup with pink and yellow chairs under decorative canopies at Advait Resort.",
    "5-Advait-Tree-Canopy.webp": "Tree canopy wedding setup with detailed decor and seating arrangements at Advait Resort.",
    "6-Advait-Valley.webp": "A large outdoor wedding arrangement at Advait Resort with a scenic valley backdrop.",
    "7-Advait-Lawn.webp": "Evening wedding setup with vibrant lighting and seating at Advait Resort’s lawn.",
    "8-Restaurant.webp": "Ramsukh Resort’s outdoor restaurant beautifully decorated with red curtains and floral arrangements.",
    "9-Ramsukh Lawn - Sit-down-dinner.webp": "Ramsukh Resort’s lawn with a long sit-down dinner arrangement lit with string lights for a night event.",
    "1-Monsoon-valley-view.webp": "Scenic view of a lush green valley with a waterfall cascading from the cliffside.",
    "2-Monsoon-clouds.webp": "Overcast sky with misty clouds seen from a balcony with a wrought iron railing.",
    "3-Monsoon-pool-deck-view.webp": "Outdoor seating area on a pool deck with panoramic views of the valley under a bright blue sky.",
    "panchgani.webp": "View from Ramsukh Resort overlooking mist-covered mountains and lush green landscapes in Mahabaleshwar.",
    "TIFFANY-1.webp": "Outdoor jacuzzi under a gazebo at Ramsukh Resort.",
    "TIFFANY-2.webp": "Charming outdoor seating area amidst lush greenery at Ramsukh Resort.",
    "TIFFANY-3.webp": "Spacious bedroom with modern decor at Ramsukh Resort.",
    "FLORENTINE-1.webp": "Private pool area with lush greenery and seating at Ramsukh Resort in Mahabaleshwar.",
    "FLORENTINE-2.webp": "Elegant bathroom featuring a luxurious jacuzzi tub and large vanity mirror at Ramsukh Resort.",
    "FLORENTINE-3.webp": "Cozy bedroom with wooden beams and vintage décor at Ramsukh Resort in Mahabaleshwar.",
    "EARTH-STAR1.webp": "Cozy private garden with a small pool surrounded by plants at Ramsukh Resort in Mahabaleshwar.",
    "EARTH-STAR2.webp": "Outdoor seating area with a scenic view of Mahabaleshwar hills at Ramsukh Resort.",
    "EARTH-STAR3.webp": "Wooden jacuzzi area with plants and steps leading to a deck at Ramsukh Resort in Mahabaleshwar.",
    "EARTH-STAR4.webp": "Beautiful bedroom with large windows overlooking a private garden at Ramsukh Resort in Mahabaleshwar.",
    "CULLINAN-1.webp": "Private swimming pool in a garden setting at Ramsukh Resort in Mahabaleshwar.",
    "CULLINAN-2.webp": "Balcony with scenic views and outdoor seating at Ramsukh Resort in Mahabaleshwar.",
    "CULLINAN-3.webp": "Outdoor jacuzzi under a shaded area at Ramsukh Resort in Mahabaleshwar.",
    "CULLINAN-4.webp": "Rustic bedroom with a vintage sofa and greenery outside at Ramsukh Resort in Mahabaleshwar.",
    "BLUE-HEART-1.webp": "Outdoor jacuzzi area with greenery at Ramsukh Resort in Mahabaleshwar.",
    "BLUE-HEART-2.webp": "Garden pathway with steps surrounded by greenery at Ramsukh Resort in Mahabaleshwar.",
    "BLUE-HEART-3.webp": "Luxurious bedroom with vintage decor and a garden view at Ramsukh Resort in Mahabaleshwar.",
    "BLUE-HEART-4.webp": "Elegant bathroom with marble accents and vintage decor at Ramsukh Resort in Mahabaleshwar.",
    "BLUE-HEART-5.webp": "Private swimming pool area surrounded by lush greenery at Ramsukh Resort in Mahabaleshwar.",
    "1-Spa.webp": "Luxurious spa room at Ramsukh Resort with a massage table and a rose-petal-filled hot tub.",
    "2-Outdoor-fitness-zone.webp": "Outdoor fitness zone at Ramsukh Resort, featuring exercise equipment surrounded by nature.",
    "3-Guided-Yoga-Meditation.webp": "Guests participating in a guided yoga session at sunrise with scenic valley views.",
    "4-Daily-guided-Jungle-trek.webp": "Group of trekkers enjoying a daily jungle trek at Ramsukh Resort.",
    "5-Bird-watching.webp": "Colorful bird perched on a branch, spotted during a bird-watching activity at Ramsukh Resort.",
    "6-Daily-Valley-Walk.webp": "Guests taking a peaceful valley walk, enjoying scenic views at Ramsukh Resort.",
    "7-Library.webp": "Cozy library space with a large wooden table and shelves filled with books at Ramsukh Resort.",
    "8-WILDLIFE-DOCUMENTARY-SCREENING.webp": "Wildlife documentary screening at Ramsukh Resort with a large projector display.",
    "9-Stroll-in-resort.webp": "Beautifully lit resort garden path with a gazebo and seating area at Ramsukh Resort.",
    "Conference-sider.webp": "Conference hall with U-shaped seating arrangement for business meetings at Ramsukh Resort.",
    "Advait-lawn.webp": "Outdoor wedding seating setup on the lawn at Ramsukh Resort, Mahabaleshwar, with vibrant canopy and seating arrangements.",
    "Advait-tree-canopy.webp": "Wedding ceremony setup under a tree canopy with colorful decor and seating at Ramsukh Resort, Mahabaleshwar.",
    "Conerence-hall.webp": "Elegant indoor conference hall with round tables and chandeliers at Ramsukh Resort, Mahabaleshwar.",
    "NB-1.webp": "Cozy nook in Ramsukh Resort, Mahabaleshwar, featuring comfortable seating and greenery.",
    "NB-2.webp": "Beautiful outdoor seating area surrounded by nature at Ramsukh Resort, Mahabaleshwar.",
    "Ramsukh reception lawn.webp": "Large wedding reception seating arrangement on the lawn at Ramsukh Resort, Mahabaleshwar, with colorful decor.",
    "Ramsukh-forest canopy.webp": "Outdoor dining under the forest canopy at Ramsukh Resort, Mahabaleshwar, with round tables and red chairs.",
    "Ramsukhpooldeck.webp": "Pool deck wedding event with festive decorations and poolside seating at Ramsukh Resort, Mahabaleshwar.",
    "Red and Black Hall.webp": "Red and black-themed indoor wedding hall with round tables and stylish lighting at Ramsukh Resort, Mahabaleshwar.",
    "Small lawn and sunrise deck.webp": "Scenic sunrise deck with small lawn seating area at Ramsukh Resort, Mahabaleshwar.",
    "AB.webp": "Elegant villa at Ramsukh Resort with a large lawn and scenic surroundings in Mahabaleshwar, Wai, Satara, Maharashtra.",
    "Advait valley.webp": "Aerial view of a wedding setup on the edge of a valley at Ramsukh Resort with breathtaking views of the landscape in Mahabaleshwar, Wai, Satara, Maharashtra.",
    "TH-1.webp": "Cozy bedroom with wooden paneling and soft lighting at Ramsukh Resort in Mahabaleshwar.",
    "TH-2.webp": "Seating area with large windows offering panoramic views of Ramsukh Resort in Mahabaleshwar.",
    "TH-3.webp": "Luxurious bathroom with a view of lush green hills at Ramsukh Resort in Mahabaleshwar.",
    "TH-4.webp": "Balcony with wicker seating and scenic valley views at Ramsukh Resort in Mahabaleshwar.",
    "PH-1.webp": "Luxurious bedroom with vintage decor and wooden beams at Ramsukh Resort in Mahabaleshwar.",
    "PH-2.webp": "Spacious bathroom with an elegant bathtub and rustic decor at Ramsukh Resort in Mahabaleshwar.",
    "PH-3.webp": "Private outdoor seating area surrounded by nature at Ramsukh Resort in Mahabaleshwar.",
    "MAH-1.webp": "Luxurious suite with traditional decor and large windows at Ramsukh Resort.",
    "MAH-2.webp": "Private outdoor seating area surrounded by lush greenery at Ramsukh Resort.",
    "MAH-3.webp": "Modern bathroom with a glass-enclosed shower and scenic window views at Ramsukh Resort.",
    "IXORA-1.webp": "Spacious bedroom with wooden decor and balcony view at Ramsukh Resort, Mahabaleshwar.",
    "IXORA-2.webp": "Scenic balcony seating area surrounded by lush greenery at Ramsukh Resort, Mahabaleshwar.",
    "IXORA-3.webp": "Elegant bathroom with jacuzzi and large windows at Ramsukh Resort, Mahabaleshwar.",
    "AB-1.webp": "Spacious two-story villa with a green lawn and mountain backdrop at Ramsukh Resort.",
    "AB-2.webp": "Private poolside view with loungers and scenic mountains at Ramsukh Resort.",
    "AB-3.webp": "Elegant living and dining area with large glass doors opening to the lawn at Ramsukh Resort.",
    "AB-4.webp": "Luxurious bedroom with garden views and stylish decor at Ramsukh Resort.",
    "AB-5.webp": "Cozy bedroom with a four-poster bed and scenic valley views at Ramsukh Resort.",
    "AB-6.webp": "Comfortable bedroom with a balcony offering panoramic mountain views at Ramsukh Resort.",
    "AB-7.webp": "Stylish bedroom with large windows and valley views at Ramsukh Resort.",
    "AB-8.webp": "Living area with modern furnishings and a large television at Ramsukh Resort.",
    "AB-9.webp": "Outdoor seating area on a terrace with panoramic valley views at Ramsukh Resort.",
    "AB-10.webp": "Spacious lawn overlooking the valley and mountains at Ramsukh Resort.",
    "NB-1.webp": "Outdoor view of a Ramsukh Resort villa with lush greenery and decorative furniture.",
    "NB-2.webp": "Spacious bedroom at Ramsukh Resort with a mountain view and pool access.",
    "NB-3.webp": "Cozy bedroom at Ramsukh Resort with a large window and garden view.",
    "NB-4.webp": "Bedroom at Ramsukh Resort with a scenic view of green hills.",
    "NB-5.webp": "Elegant seating area in a Ramsukh Resort villa surrounded by trees.",
    "NB-6.webp": "Private pool at Ramsukh Resort villa with a sunset backdrop.",
    "NB-7.webp": "Modern kitchen with wooden cabinets at Ramsukh Resort.",
    "back.png": "Scenic view of the Ramsukh Resort with greenery and a peaceful garden setting.",
    "bed_room_view.webp": "Cozy bedroom with a view of lush greenery through large windows at Ramsukh Resort.",
    "ramsukh_bed_room_2.webp": "Luxurious bedroom with traditional decor and a balcony overlooking the forest at Ramsukh Resort.",
    "ramsukh_garden_view.webp": "Beautiful garden area with seating arrangements outside Ramsukh Resort in Mahabaleshwar.",
    "ramsukh_swiming_pool_view.webp": "View of the swimming pool with resort buildings in the background at Ramsukh Resort.",
    "ramsukh_vally.webp": "Scenic view of the valley and lush greenery around Ramsukh Resort in Mahabaleshwar.",
    "ramsukh_vally_view.webp": "Stunning valley view with greenery and hills from Ramsukh Resort.",
    "ramsukh_vally_view_bed_room.webp": "Luxurious bedroom with large windows showcasing a beautiful valley view at Ramsukh Resort.",
    "right.png": "Exterior view of Ramsukh Resort showcasing the natural surroundings and architectural details.",
    "waterfall.webp": "Majestic waterfall flowing down a lush green mountainside near Ramsukh Resort." ,
  }
def replace_alt_text_in_file(file_path, alt_text_mapping):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        img_tag_pattern = re.compile(r'<img\s+[^>]*src="([^"]+)"[^>]*>', re.IGNORECASE)

        def replace_alt(match):
            img_tag = match.group(0)
            src_value = match.group(1)
            file_name = os.path.basename(src_value)

            if file_name in alt_text_mapping:
                new_alt_text = alt_text_mapping[file_name]
                if 'alt="' in img_tag:
                    updated_img_tag = re.sub(r'alt="[^"]*"', f'alt="{new_alt_text}"', img_tag)
                else:
                    updated_img_tag = img_tag.replace('<img', f'<img alt="{new_alt_text}"', 1)
                return updated_img_tag
            return img_tag

        updated_content = img_tag_pattern.sub(replace_alt, content)

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"Successfully processed: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")

def process_directory(directory, alt_text_mapping):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    html_files_found = False
    for root, dirs, files in os.walk(directory):
        for file_name in files:
            if file_name.endswith(('.html', '.htm')):
                html_files_found = True
                file_path = os.path.join(root, file_name)
                replace_alt_text_in_file(file_path, alt_text_mapping)

    if not html_files_found:
        print("No HTML files found in the specified directory.")

# Update the root directory to point to where your HTML files are located
root_directory = r"/home/pandatd/Documents/ramsukh(1)/public_html"  # Remove /img

# Run the replacement process
print(f"Starting process in directory: {root_directory}")
process_directory(root_directory, alt_text_mapping)
print("Process completed")
