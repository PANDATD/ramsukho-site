#!/bin/bash
# Define your mapping of file names to alt text
escape_sed() {
    echo "$1" | sed 's/[&/\]/\\&/g; s/"/\\"/g; s/\n/\\n/g'
}

declare -A alt_text_mapping=(
["img-right.svg"]="Right arrow-icon"
["img-left.svg"]="Left arrow-icon"
["FS-1.webp"]="Spacious bedroom in Ramsukh Resort's family suite with a king-size bed, antique chairs, and warm lighting."
["FS-2.webp"]="Cozy living area of the family suite in Ramsukh Resort, featuring comfortable seating, a television, and a window view."
["FD.webp"]="Elegant bedroom in Ramsukh Resort with a large window overlooking lush greenery, featuring a cozy bed and warm lighting fixtures."
["FP-1.webp"]="Cozy bedroom in Ramsukh Resort with a balcony, natural lighting, and a view of the surrounding greenery."
["FP-2.webp"]="Spacious bedroom and living area in Ramsukh Resort with a comfortable sofa and large windows offering scenic views."
["GD-1.webp"]="Garden suite bedroom at Ramsukh Resort with a balcony, flat-screen TV, and stylish decor with a large mirror."
["GD-2.webp"]="Garden suite bedroom and balcony view at Ramsukh Resort with outdoor seating and decorative wall art."
["GS-1.webp"]="Spacious bedroom in the garden suite at Ramsukh Resort with an intricately designed dresser, mirror, and vibrant wall art."
["GS-2.webp"]="Cozy living area in the garden suite at Ramsukh Resort with a striped sofa, television, and kitchenette."
["GS-3.webp"]="Private balcony in the garden suite at Ramsukh Resort featuring outdoor seating and a view of lush greenery."
["TBS-1.webp"]="Elegant bedroom in the terrace suite at Ramsukh Resort featuring soft lighting, ceiling fan, and attached bathroom with forest views."
["TBS-2.webp"]="Cozy bedroom in the terrace suite at Ramsukh Resort with a large window offering serene views of lush greenery."
["TBS-3.webp"]="Spacious living and dining area in the terrace suite at Ramsukh Resort, decorated with artwork and modern furnishings."
["TBS-4.webp"]="Living room in the terrace suite at Ramsukh Resort with a balcony overlooking scenic landscapes and framed photography on the walls."
["VS-1.webp"]="Cozy bedroom in the Valley Suite at Ramsukh Resort with a balcony offering scenic valley views and vibrant wall art."
["VS-2.webp"]="Spacious living area in the Valley Suite at Ramsukh Resort with elegant decor, chandelier, and forest-facing windows."
["VS-3.webp"]="Balcony in the Valley Suite at Ramsukh Resort with wicker furniture, offering expansive views of the surrounding landscape."
["1-Pool.webp"]="Outdoor pool area at Ramsukh Resort with poolside seating and umbrellas, offering a scenic view of the surrounding hills."
["2-Disco-Theque.webp"]="Stylish disco room at Ramsukh Resort with leather seating, colorful lighting, and wooden decor."
["3-Outdoor-Play Area.webp"]="Outdoor children’s play area at Ramsukh Resort with a slide, climbing frames, and shaded trees."
["4-Children-Play-Room.webp"]="Indoor children's playroom at Ramsukh Resort, featuring slides, toys, and colorful activity areas."
["5-Night-Ride.webp"]="Night jeep ride adventure at Ramsukh Resort, offering an exciting experience through forested roads."
["6-Outdoor-fitness zone.webp"]="Outdoor fitness zone at Ramsukh Resort, surrounded by greenery, featuring exercise equipment in a natural setting."
["7-Jungle-Trek.webp"]="Group of hikers on a jungle trek at Ramsukh Resort, exploring the rocky terrain and dense forest."
["8-Spa.webp"]="Serene spa room at Ramsukh Resort with a massage table and a rose petal-filled hot tub for relaxation."
["1-Ramsukh-Forest-canopy.webp"]="Outdoor dining area under forest canopy at Ramsukh Resort, Mahabaleshwar."
["2-Red-black-hall.webp"]="Elegant indoor banquet hall with round tables at Ramsukh Resort, Mahabaleshwar."
["3-Main-conference-hall.webp"]="Spacious conference hall with U-shaped seating arrangement at Ramsukh Resort, Mahabaleshwar."
["3-Ramsukh-reception-lawn.webp"]="Colorful outdoor seating for a wedding reception at Ramsukh Resort, overlooking the valley."
["4-Advait Valley.webp"]="Beautiful wedding venue setup with pink and yellow chairs under decorative canopies at Advait Resort."
["5-Advait-Tree-Canopy.webp"]="Tree canopy wedding setup with detailed decor and seating arrangements at Advait Resort."
["6-Advait-Valley.webp"]="A large outdoor wedding arrangement at Advait Resort with a scenic valley backdrop."
["7-Advait-Lawn.webp"]="Evening wedding setup with vibrant lighting and seating at Advait Resort’s lawn."
["8-Restaurant.webp"]="Ramsukh Resort’s outdoor restaurant beautifully decorated with red curtains and floral arrangements."
["9-Ramsukh Lawn - Sit-down-dinner.webp"]="Ramsukh Resort’s lawn with a long sit-down dinner arrangement lit with string lights for a night event."
["1-Monsoon-valley-view.webp"]="Scenic view of a lush green valley with a waterfall cascading from the cliffside."
["2-Monsoon-clouds.webp"]="Overcast sky with misty clouds seen from a balcony with a wrought iron railing."
["3-Monsoon-pool-deck-view.webp"]="Outdoor seating area on a pool deck with panoramic views of the valley under a bright blue sky."
["panchgani.webp"]="View from Ramsukh Resort overlooking mist-covered mountains and lush green landscapes in Mahabaleshwar."
["TIFFANY-1.webp"]="Outdoor jacuzzi under a gazebo at Ramsukh Resort."
["TIFFANY-2.webp"]="Charming outdoor seating area amidst lush greenery at Ramsukh Resort."
["TIFFANY-3.webp"]="Spacious bedroom with modern decor at Ramsukh Resort."
["FLORENTINE-1.webp"]="Private pool area with lush greenery and seating at Ramsukh Resort in Mahabaleshwar."
["FLORENTINE-2.webp"]="Elegant bathroom featuring a luxurious jacuzzi tub and large vanity mirror at Ramsukh Resort."
["FLORENTINE-3.webp"]="Cozy bedroom with wooden beams and vintage décor at Ramsukh Resort in Mahabaleshwar."
["EARTH-STAR1.webp"]="Cozy private garden with a small pool surrounded by plants at Ramsukh Resort in Mahabaleshwar."
["EARTH-STAR2.webp"]="Outdoor seating area with a scenic view of Mahabaleshwar hills at Ramsukh Resort."
["EARTH-STAR3.webp"]="Wooden jacuzzi area with plants and steps leading to a deck at Ramsukh Resort in Mahabaleshwar."
["EARTH-STAR4.webp"]="Beautiful bedroom with large windows overlooking a private garden at Ramsukh Resort in Mahabaleshwar."
["CULLINAN-1.webp"]="Private swimming pool in a garden setting at Ramsukh Resort in Mahabaleshwar."
["CULLINAN-2.webp"]="Balcony with scenic views and outdoor seating at Ramsukh Resort in Mahabaleshwar."
["CULLINAN-3.webp"]="Outdoor jacuzzi under a shaded area at Ramsukh Resort in Mahabaleshwar."
["CULLINAN-4.webp"]="Rustic bedroom with a vintage sofa and greenery outside at Ramsukh Resort in Mahabaleshwar."
["BLUE-HEART-1.webp"]="Outdoor jacuzzi area with greenery at Ramsukh Resort in Mahabaleshwar."
["BLUE-HEART-2.webp"]="Garden pathway with steps surrounded by greenery at Ramsukh Resort in Mahabaleshwar."
["BLUE-HEART-3.webp"]="Luxurious bedroom with vintage decor and a garden view at Ramsukh Resort in Mahabaleshwar."
["BLUE-HEART-4.webp"]="Elegant bathroom with marble accents and vintage decor at Ramsukh Resort in Mahabaleshwar."
["BLUE-HEART-5.webp"]="Private swimming pool area surrounded by lush greenery at Ramsukh Resort in Mahabaleshwar."
["1-Spa.webp"]="Luxurious spa room at Ramsukh Resort with a massage table and a rose-petal-filled hot tub."
["2-Outdoor-fitness-zone.webp"]="Outdoor fitness zone at Ramsukh Resort, featuring exercise equipment surrounded by nature."
["3-Guided-Yoga-Meditation.webp"]="Guests participating in a guided yoga session at sunrise with scenic valley views."
["4-Daily-guided-Jungle-trek.webp"]="Group of trekkers enjoying a daily jungle trek at Ramsukh Resort."
["5-Bird-watching.webp"]="Colorful bird perched on a branch, spotted during a bird-watching activity at Ramsukh Resort."
["6-Daily-Valley-Walk.webp"]="Guests taking a peaceful valley walk, enjoying scenic views at Ramsukh Resort."
["7-Library.webp"]="Cozy library space with a large wooden table and shelves filled with books at Ramsukh Resort."
["8-Wedding-lawn.webp"]="Spacious lawn area with white and pink chairs for an elegant wedding at Advait Resort."
["Advait-hall.webp"]="Wedding banquet hall with chandeliers and elegant seating arrangements at Advait Resort."  # Add more mappings
)

# Loop through all files in the codebase
for file in $(find "/home/pandatd/Documents/ramsukh(1)/public_html" -name "*.html"); do
    for image in "${!alt_text_mapping[@]}"; do
        # Get and escape the alt text
        alt_text=$(escape_sed "${alt_text_mapping[$image]}")

        # Run sed command with debug option for output
        sed -i -E "s|(<img[^>]*src=\"$image\"[^>]*alt=\")[^\"]*\"|\1$alt_text\"|g" "$file" || echo "Failed at image: $image in file: $file with alt_text: $alt_text"

        # Add alt attribute if missing
        sed -i -E "s|(<img[^>]*src=\"$image\"[^>]*)(>)(?!.*alt=)|\1 alt=\"$alt_text\" \2|g" "$file" || echo "Failed to add alt attribute at image: $image in file: $file with alt_text: $alt_text"
    done
done