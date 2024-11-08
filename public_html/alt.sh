#!/bin/bash
for file in *.html; do
# Run sed replacements for each image with empty alt attributes in all .html files
    sed -i 's/src="[^"]*\/img-right.svg" alt=""/src="img\/img-right.svg" alt="Right arrow-icon"/g' *.html
    sed -i 's/src="[^"]*\/img-left.svg" alt=""/src="img\/img-left.svg" alt="Left arrow-icon"/g' *.html
    sed -i 's/src="[^"]*\/FS-1.webp" alt=""/src="FS-1.webp" alt="Spacious bedroom in Ramsukh Resort'"'"'s family suite with a king-size bed, antique chairs, and warm lighting."/g' *.html
    sed -i 's/src="[^"]*\/FS-2.webp" alt=""/src="FS-2.webp" alt="Cozy living area of the family suite in Ramsukh Resort, featuring comfortable seating, a television, and a window view."/g' *.html
    sed -i 's/src="[^"]*\/FD.webp" alt=""/src="FD.webp" alt="Elegant bedroom in Ramsukh Resort with a large window overlooking lush greenery, featuring a cozy bed and warm lighting fixtures."/g' *.html
    sed -i 's/src="[^"]*\/FP-1.webp" alt=""/src="FP-1.webp" alt="Cozy bedroom in Ramsukh Resort with a balcony, natural lighting, and a view of the surrounding greenery."/g' *.html
    sed -i 's/src="[^"]*\/FP-2.webp" alt=""/src="FP-2.webp" alt="Spacious bedroom and living area in Ramsukh Resort with a comfortable sofa and large windows offering scenic views."/g' *.html
    sed -i 's/src="[^"]*\/GD-1.webp" alt=""/src="GD-1.webp" alt="Garden suite bedroom at Ramsukh Resort with a balcony, flat-screen TV, and stylish decor with a large mirror."/g' *.html
    sed -i 's/src="[^"]*\/GD-2.webp" alt=""/src="GD-2.webp" alt="Garden suite bedroom and balcony view at Ramsukh Resort with outdoor seating and decorative wall art."/g' *.html
    sed -i 's/src="[^"]*\/GS-1.webp" alt=""/src="GS-1.webp" alt="Spacious bedroom in the garden suite at Ramsukh Resort with an intricately designed dresser, mirror, and vibrant wall art."/g' *.html
    sed -i 's/src="[^"]*\/GS-2.webp" alt=""/src="GS-2.webp" alt="Cozy living area in the garden suite at Ramsukh Resort with a striped sofa, television, and kitchenette."/g' *.html
    sed -i 's/src="[^"]*\/GS-3.webp" alt=""/src="GS-3.webp" alt="Private balcony in the garden suite at Ramsukh Resort featuring outdoor seating and a view of lush greenery."/g' *.html
    sed -i 's/src="[^"]*\/TBS-1.webp" alt=""/src="TBS-1.webp" alt="Elegant bedroom in the terrace suite at Ramsukh Resort featuring soft lighting, ceiling fan, and attached bathroom with forest views."/g' *.html
    sed -i 's/src="[^"]*\/TBS-2.webp" alt=""/src="TBS-2.webp" alt="Cozy bedroom in the terrace suite at Ramsukh Resort with a large window offering serene views of lush greenery."/g' *.html
    sed -i 's/src="[^"]*\/TBS-3.webp" alt=""/src="TBS-3.webp" alt="Spacious living and dining area in the terrace suite at Ramsukh Resort, decorated with artwork and modern furnishings."/g' *.html
    sed -i 's/src="[^"]*\/TBS-4.webp" alt=""/src="TBS-4.webp" alt="Living room in the terrace suite at Ramsukh Resort with a balcony overlooking scenic landscapes and framed photography on the walls."/g' *.html
    sed -i 's/src="[^"]*\/VS-1.webp" alt=""/src="VS-1.webp" alt="Cozy bedroom in the Valley Suite at Ramsukh Resort with a balcony offering scenic valley views and vibrant wall art."/g' *.html
    sed -i 's/src="[^"]*\/VS-2.webp" alt=""/src="VS-2.webp" alt="Spacious living area in the Valley Suite at Ramsukh Resort with elegant decor, chandelier, and forest-facing windows."/g' *.html
    sed -i 's/src="[^"]*\/VS-3.webp" alt=""/src="VS-3.webp" alt="Balcony in the Valley Suite at Ramsukh Resort with wicker furniture, offering expansive views of the surrounding landscape."/g' *.html
    sed -i 's/src="[^"]*\/1-Pool.webp" alt=""/src="1-Pool.webp" alt="Outdoor pool area at Ramsukh Resort with poolside seating and umbrellas, offering a scenic view of the surrounding hills."/g' *.html
    sed -i 's/src="[^"]*\/2-Disco-Theque.webp" alt=""/src="2-Disco-Theque.webp" alt="Stylish disco room at Ramsukh Resort with leather seating, colorful lighting, and wooden decor."/g' *.html
    sed -i 's/src="[^"]*\/3-Outdoor-Play Area.webp" alt=""/src="3-Outdoor-Play Area.webp" alt="Outdoor children’s play area at Ramsukh Resort with a slide, climbing frames, and shaded trees."/g' *.html
    sed -i 's/src="[^"]*\/4-Children-Play-Room.webp" alt=""/src="4-Children-Play-Room.webp" alt="Indoor children'"'"'s playroom at Ramsukh Resort, featuring slides, toys, and colorful activity areas."/g' *.html
    sed -i 's/src="[^"]*\/5-Night-Ride.webp" alt=""/src="5-Night-Ride.webp" alt="Night jeep ride adventure at Ramsukh Resort, offering an exciting experience through forested roads."/g' *.html
    sed -i 's/src="[^"]*\/6-Outdoor-fitness zone.webp" alt=""/src="6-Outdoor-fitness zone.webp" alt="Outdoor fitness zone at Ramsukh Resort, surrounded by greenery, featuring exercise equipment in a natural setting."/g' *.html
    sed -i 's/src="[^"]*\/7-Jungle-Trek.webp" alt=""/src="7-Jungle-Trek.webp" alt="Group of hikers on a jungle trek at Ramsukh Resort, exploring the rocky terrain and dense forest."/g' *.html
    sed -i 's/src="[^"]*\/8-Spa.webp" alt=""/src="8-Spa.webp" alt="Serene spa room at Ramsukh Resort with a massage table and a rose petal-filled hot tub for relaxation."/g' *.html
    sed -i 's/src="[^"]*\/1-Ramsukh-Forest-canopy.webp" alt=""/src="1-Ramsukh-Forest-canopy.webp" alt="Outdoor dining area under forest canopy at Ramsukh Resort, Mahabaleshwar."/g' *.html
    sed -i 's/src="[^"]*\/2-Red-black-hall.webp" alt=""/src="2-Red-black-hall.webp" alt="Elegant indoor banquet hall with round tables at Ramsukh Resort, Mahabaleshwar."/g' *.html
    sed -i 's/src="[^"]*\/3-Main-conference-hall.webp" alt=""/src="3-Main-conference-hall.webp" alt="Spacious conference hall with U-shaped seating arrangement at Ramsukh Resort, Mahabaleshwar."/g' *.html
    sed -i 's/src="[^"]*\/3-Ramsukh-reception-lawn.webp" alt=""/src="3-Ramsukh-reception-lawn.webp" alt="Colorful outdoor seating for a wedding reception at Ramsukh Resort, overlooking the valley."/g' *.html
    sed -i 's/src="[^"]*\/4-Advait Valley.webp" alt=""/src="4-Advait Valley.webp" alt="Beautiful wedding venue setup with pink and yellow chairs under decorative canopies at Advait Resort."/g' *.html
    sed -i 's/src="[^"]*\/5-Advait-Tree-Canopy.webp" alt=""/src="5-Advait-Tree-Canopy.webp" alt="Tree canopy wedding setup with detailed decor and seating arrangements at Advait Resort."/g' *.html
    sed -i 's/src="[^"]*\/6-Advait-Valley.webp" alt=""/src="6-Advait-Valley.webp" alt="A large outdoor wedding arrangement at Advait Resort with a scenic valley backdrop."/g' *.html
    sed -i 's/src="[^"]*\/7-Advait-Lawn.webp" alt=""/src="7-Advait-Lawn.webp" alt="Evening wedding setup with vibrant lighting and seating at Advait Resort’s lawn."/g' *.html
    sed -i 's/src="[^"]*\/8-Restaurant.webp" alt=""/src="8-Restaurant.webp" alt="Ramsukh Resort’s outdoor restaurant beautifully decorated with red curtains and floral arrangements."/g' *.html
    sed -i 's/src="[^"]*\/9-Ramsukh Lawn - Sit-down-dinner.webp" alt=""/src="9-Ramsukh Lawn - Sit-down-dinner.webp" alt="Ramsukh Resort’s lawn with a long sit-down dinner arrangement lit with string lights for a night event."/g' *.html
done
