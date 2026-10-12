/* English strings for the Ganita lessons in geometry: G1 G3 G5 G6 G7 G8, and the G2 G4 Prashna and mistakes. */
export const dictionary: Record<string, string> = {
  /* G1 */
  'prashna.G1.q':
    'Two clocks show 3 o’clock: a giant tower clock and a tiny wristwatch. Which clock’s hands make a bigger angle?',
  'prashna.G1.c1': 'The giant tower clock',
  'prashna.G1.c2': 'The tiny wristwatch',
  'prashna.G1.c3': 'Both angles are exactly the same',
  'prashna.G1.a':
    'Both angles are exactly the same! An angle measures how far the hands turn (a quarter turn, 90°), not how long the hands are.',
  'bodha.G1.what':
    'An [[angle|angle]] measures the amount of turn between two lines meeting at a point called the vertex.',
  'bodha.G1.can':
    'You will be able to measure turns, recognize right angles and straight angles, and see that arm length never changes an angle.',
  'bodha.G1.idea':
    'Imagine an arm fixed at one end, turning like the hand of a clock. As it sweeps around, it traces out an angle.',
  'bodha.G1.why':
    'The length of the arms does not change how far you turned. A door opening a crack turns the same amount whether the door is giant or tiny!',
  'bodha.G1.example': 'Three turns on a clock face:',
  'bodha.G1.example1': 'Quarter turn from 12 to 3: 90° (a square corner or right angle).',
  'bodha.G1.example2': 'Half turn from 12 to 6: 180° (a straight line or straight angle).',
  'bodha.G1.example3': 'Full turn from 12 all the way around back to 12: 360° (a full circle).',
  'bodha.G1.where': 'Opening doors, scissors blades, sun shadows, roof slopes, and clock hands.',
  'bodha.G1.sutra': 'An angle is how far you turn, not how long the arms are.',
  'gloss.angle': 'The measure of turn between two rays sharing a common vertex.',
  'gloss.angle.en': 'angle',
  'angles.title': 'Angles as turns',
  'angles.art':
    'A rotating ray sweeping an arc from a vertex, with adjustable arm length and angle readout.',
  'angles.s1': 'Turn the ray to 90° to make a quarter turn (right angle).',
  'angles.s1done': 'Quarter turn made: 90° creates a crisp square corner.',
  'angles.s2': 'Stretch the arm length from short to long. Notice the angle does not change.',
  'angles.s2done': 'The angle stayed at 90°! Longer arms do not make a bigger angle.',
  'angles.s3': 'Compare the giant clock and the tiny watch at 3 o’clock side by side.',
  'angles.s3done': 'Both hands turn exactly 1/4 of a full circle: both are 90°.',
  'mistake.G1.intro': 'Tarun was comparing two angles. One step went wrong. Which one?',
  'mistake.G1.s1': 'He saw a giant door open a small crack of 15°.',
  'mistake.G1.s2': 'He saw a small pencil box lid open wide at 60°.',
  'mistake.G1.s3':
    'He declared that the giant door made a larger angle because the door was bigger.',
  'mistake.G1.fine1': 'Sound observation: the door opened by 15°.',
  'mistake.G1.fine2': 'Sound observation: the box lid opened by 60°.',
  'mistake.G1.found':
    'Here! The pencil box lid opened 60°, which is four times wider than 15°. Angle is amount of turn, not the size of the object.',
  'explain.G1.s':
    'An angle measures the amount of {0}, not how long the arms are. A quarter turn is a {1} angle.',
  'explain.G1.turn': 'turn',
  'explain.G1.length': 'length',
  'explain.G1.weight': 'weight',
  'explain.G1.right': 'right',
  'explain.G1.straight': 'straight',
  'explain.G1.zero': 'zero',
  'explain.G1.hint':
    'Does an angle measure turn or length, and what kind of angle is a quarter turn?',
  'know.G1': 'An angle is how far you turn, not how long the arms are.',

  /* G2 */
  'prashna.G2.q':
    'A 24-metre rope fences a rectangular vegetable garden. Does changing the shape of the rectangle change how much ground it holds?',
  'prashna.G2.c1': 'No, 24 metres of rope always holds the exact same area',
  'prashna.G2.c2': 'Yes, squarer shapes hold more ground (a square holds the most)',
  'prashna.G2.c3': 'Yes, longer thin shapes hold more ground',
  'prashna.G2.a':
    'Yes! The same 24 m perimeter can hold as little as 11 m² (11 × 1) or as much as 36 m² (6 × 6 square). A square encloses the most area!',
  'mistake.G2.intro':
    'Neha was comparing two gardens fenced with 24 metres of rope. One step went wrong. Which one?',
  'mistake.G2.s1': 'Garden A is 10 m by 2 m: perimeter is 10 + 2 + 10 + 2 = 24 m (area = 20 m²).',
  'mistake.G2.s2': 'Garden B is 6 m by 6 m: perimeter is 6 + 6 + 6 + 6 = 24 m (area = 36 m²).',
  'mistake.G2.s3':
    'She said both gardens hold the same amount of ground because both fences are 24 m long.',
  'mistake.G2.fine1': 'Sound calculation: 10 by 2 gives perimeter 24 m and area 20 m².',
  'mistake.G2.fine2': 'Sound calculation: 6 by 6 gives perimeter 24 m and area 36 m².',
  'mistake.G2.found':
    'Here! Both fences are 24 m, but Garden B holds 36 m² while Garden A holds only 20 m². Same perimeter does NOT mean same area!',

  /* G3 */
  'prashna.G3.q':
    'If you push the top card of a deck of cards sideways so the deck leans, does the face area of the cards change?',
  'prashna.G3.c1': 'Yes, it gets bigger',
  'prashna.G3.c2': 'Yes, it gets smaller',
  'prashna.G3.c3': 'No, the area stays exactly the same',
  'prashna.G3.a':
    'No, the area stays exactly the same! Sliding the top sideways changes the shape and perimeter, but every card has the same face area, so the total area never changes.',
  'bodha.G3.what':
    'Take a rectangle and slide its top edge along a straight guide rail: it slants into a [[parallelogram|parallelogram]].',
  'bodha.G3.can':
    'You will be able to see that sliding the top preserves area because the removed triangle perfectly fills the opposite side.',
  'bodha.G3.idea':
    'A triangle overhangs on one side, but an identical triangular gap opens on the other side.',
  'bodha.G3.why':
    'Slice off the overhanging triangle and slide it across: it fits the gap perfectly, reforming the original rectangle!',
  'bodha.G3.example': 'Sliding a rectangle with base 6 and height 4:',
  'bodha.G3.example1': 'Start with a rectangle: base 6, height 4, area = 6 × 4 = 24.',
  'bodha.G3.example2':
    'Slide the top edge right: the perpendicular height stays 4, but slant increases.',
  'bodha.G3.example3': 'The cut triangle fills the gap: area is still 6 × 4 = 24.',
  'bodha.G3.where': 'Leaning stacks of coins, ramps, staircases, and roof trusses.',
  'bodha.G3.sutra':
    'Slide the top along the rail: the cut piece fills the gap, and the area never changes.',
  'gloss.parallelogram':
    'A four-sided flat shape with opposite sides parallel and equal in length.',
  'gloss.parallelogram.en': 'parallelogram',
  'shear.title': 'Slide the top',
  'shear.art':
    'A slidable parallelogram on a guide rail with live area and perimeter readouts and cut-and-shift demonstration.',
  'shear.base': 'Base',
  'shear.height': 'Height',
  'shear.offset': 'Slant slide',
  'shear.area': 'Area',
  'shear.perimeter': 'Perimeter',
  'shear.slant': 'Slant side',
  'shear.cutShift': 'Cut & Shift',
  'shear.reset': 'Reset',
  'shear.s1': 'Slide the top edge along the guide rail to slant the shape.',
  'shear.s1done': 'Top slid: perimeter grew longer, but vertical height and base stayed identical!',
  'shear.s2': 'Tap Cut & Shift to move the overhanging triangle to the left gap.',
  'shear.s2done':
    'The cut piece perfectly fills the gap, restoring the rectangle with area {area}!',
  'shear.s3': 'Explore different base and height combinations.',
  'shear.s3done': 'Area is always base × perpendicular height, no matter how far the top slides!',
  'mistake.G3.intro':
    'Leena was finding the area of a slanted parallelogram. One step went wrong. Which one?',
  'mistake.G3.s1': 'She measured the base of the parallelogram as 6 cm.',
  'mistake.G3.s2': 'She measured the slanted side as 5 cm and multiplied 6 × 5 = 30 cm².',
  'mistake.G3.s3': 'She concluded the area was 30 cm².',
  'mistake.G3.fine1': 'Sound measurement: the base is 6 cm.',
  'mistake.G3.fine3': 'Step 3 follows from Step 2, but the calculation in Step 2 was flawed.',
  'mistake.G3.found':
    'Here! She multiplied by the slanted side (5 cm) instead of the perpendicular height (4 cm). Area is 6 × 4 = 24 cm²!',
  'explain.G3.s':
    'When the top slides along the rail, the {0} stays the same because the base and vertical height do not change. To calculate the area of a parallelogram, we multiply the base by the {1} height.',
  'explain.G3.area': 'area',
  'explain.G3.perimeter': 'perimeter',
  'explain.G3.slant': 'slant',
  'explain.G3.perpendicular': 'perpendicular',
  'explain.G3.slanted': 'slanted',
  'explain.G3.corner': 'corner',
  'explain.G3.hint':
    'Which quantity is conserved under shear, and which height line is used for the area formula?',
  'know.G3':
    'Slide the top along the rail: the cut piece fills the gap, and the area never changes.',

  /* G4 */
  'prashna.G4.q':
    'A four-blade pinwheel turns and looks identical every quarter turn (90°). Can you fold it in half so both sides match?',
  'prashna.G4.c1': 'Yes, along 4 lines',
  'prashna.G4.c2': 'Yes, along 2 lines',
  'prashna.G4.c3': 'No, it has no mirror fold lines even though it looks symmetrical',
  'prashna.G4.a':
    'No! A pinwheel matches after a quarter turn (90°), but folding flips the blades backwards so the halves never match. Rotational symmetry does not require mirror lines.',
  'mistake.G4.intro':
    'Arun was analyzing a four-blade pinwheel kolam. One step went wrong. Which one?',
  'mistake.G4.s1': 'He noticed the pinwheel looks identical when rotated by 90° (quarter turn).',
  'mistake.G4.s2':
    'He claimed that having 4-fold rotational symmetry means it must have 4 mirror fold lines.',
  'mistake.G4.s3': 'He folded it across the diagonal and claimed both halves matched.',
  'mistake.G4.fine1': 'Sound observation: the pinwheel has 4-fold rotational symmetry.',
  'mistake.G4.fine3': 'Step 3 is based on the false claim in Step 2.',
  'mistake.G4.found':
    'Here! A shape can have rotational symmetry without ANY mirror lines. Folding flips the curved blades in the wrong direction!',

  /* G5 */
  'prashna.G5.q':
    'If you connect 6 squares in a 2 by 3 solid rectangle, will it fold into a closed cube box?',
  'prashna.G5.c1': 'Yes, because it has 6 square faces',
  'prashna.G5.c2': 'No, because faces will overlap and leave holes',
  'prashna.G5.c3': 'Only if you cut some squares',
  'prashna.G5.a':
    'No, because faces will overlap and leave holes! Even though a cube has 6 faces, a 2 × 3 block folds squares on top of each other, leaving two opposite faces completely open.',
  'bodha.G5.what':
    'A [[net|net]] is a flat pattern of connected faces that can be folded along its edges into a 3D solid box.',
  'bodha.G5.can':
    'You will be able to test whether 6 connected squares fold into a closed cube or collide and overlap.',
  'bodha.G5.idea':
    'A cube has 6 identical square faces. When laid flat, they must stay joined edge-to-edge.',
  'bodha.G5.why':
    'Not all 6-square shapes work! If two faces land on the same side during folding, they overlap and leave opposite sides open.',
  'bodha.G5.example': 'The classic Latin Cross or T net:',
  'bodha.G5.example1': 'Four squares in a row make the bottom, front, top, and back.',
  'bodha.G5.example2': 'Two side wings fold up to close the left and right faces.',
  'bodha.G5.example3': 'All 6 faces close with zero collisions. Exactly 11 nets fold into a cube!',
  'bodha.G5.where': 'Cardboard packing boxes, sweet boxes, dice, and origami packaging.',
  'bodha.G5.sutra': 'Six squares must fold without collision to close all six faces of a cube.',
  'gloss.net': 'A flat 2D shape that can be folded along edges to form a 3D solid.',
  'gloss.net.en': 'net',
  'cubenet.title': 'Fold a box',
  'cubenet.art':
    'An interactive grid editor to arrange 6 squares, with 3D folding animation and collision detector.',
  'cubenet.squares': 'Squares selected: {count} of 6',
  'cubenet.foldSlider': 'Fold 3D',
  'cubenet.foldAngle': 'Fold angle',
  'cubenet.foldTest': 'Fold 3D Box',
  'cubenet.presetT': 'T-Net (Valid)',
  'cubenet.preset2x3': '2×3 Block (Overlap)',
  'cubenet.presetStairs': 'Stair Net (Valid)',
  'cubenet.clear': 'Clear',
  'cubenet.valid': 'Valid cube net! All 6 faces meet at 90° with zero overlaps.',
  'cubenet.invalid': 'Faces collide! Two or more squares fold onto the same face, leaving holes.',
  'cubenet.need6': 'Select exactly 6 connected squares on the grid to fold a cube.',
  'cubenet.s1': 'Select or arrange 6 squares on the grid.',
  'cubenet.s1done': '6 squares connected. Use the fold slider to test if it closes into a cube!',
  'cubenet.s2': 'Fold the net into a 3D box.',
  'cubenet.s2done': 'Box folded: observe whether faces close cleanly or collide.',
  'cubenet.s3': 'Try different net shapes to find all 11 valid patterns.',
  'cubenet.s3done': 'There are exactly 11 unique nets that fold into a cube!',
  'mistake.G5.intro':
    'Priya drew a pattern of 6 squares to fold a cube box. One step went wrong. Which one?',
  'mistake.G5.s1': 'She drew a solid 2 by 3 rectangle of 6 connected squares.',
  'mistake.G5.s2':
    'She folded the squares and noticed two squares were trying to cover the exact same face.',
  'mistake.G5.s3': 'She declared that having 6 squares guarantees it will always make a cube.',
  'mistake.G5.fine2': 'Sound observation: the squares in a 2x3 block overlap during folding.',
  'mistake.G5.fine3': 'Step 3 is her false claim that any 6 squares form a cube.',
  'mistake.G5.found':
    'Here! A 2 by 3 solid block cannot fold into a cube. The faces collide and overlap, leaving two sides completely unclosed!',
  'explain.G5.s':
    'A cube has {0} square faces that must meet at right angles. For a flat net to close into a cube, no two faces can {1} during folding.',
  'explain.G5.six': 'six',
  'explain.G5.eight': 'eight',
  'explain.G5.four': 'four',
  'explain.G5.overlap': 'overlap',
  'explain.G5.touch': 'touch',
  'explain.G5.separate': 'separate',
  'explain.G5.hint':
    'How many faces does a cube have, and what collision must a folding net avoid?',
  'know.G5': 'Six squares must fold without collision to close all six faces of a cube.',

  /* G6 */
  'prashna.G6.q':
    'A bicycle wheel spoke goes straight from the centre axle to the outer rim and measures 30 cm. How wide is the wheel straight across through the centre?',
  'prashna.G6.c1': '30 cm',
  'prashna.G6.c2': '60 cm',
  'prashna.G6.c3': '90 cm',
  'prashna.G6.a':
    '60 cm! The spoke is a radius (30 cm). The diameter straight across through the centre is two spokes in a straight line: 2 × 30 cm = 60 cm.',
  'bodha.G6.what':
    'A [[circle|circle]] is a round boundary where every single point is the exact same distance from the centre dot.',
  'bodha.G6.can':
    'You will be able to measure radius and diameter and see why diameter is always twice the radius through the centre.',
  'bodha.G6.idea':
    'Tie a rope to a central peg and pull it taut: as you walk around, the stick traces a circle of radius r.',
  'bodha.G6.why':
    'Diameter is two spokes stretched in a straight line passing through the centre: Diameter = 2 × Radius. Any other line across (chord) is shorter.',
  'bodha.G6.example': 'A circle with radius 5 cm:',
  'bodha.G6.example1': 'Radius from centre to rim is 5 cm.',
  'bodha.G6.example2':
    'Straight line through centre to opposite rim is 5 cm + 5 cm = 10 cm (Diameter = 10 cm).',
  'bodha.G6.example3':
    'A line across the circle that misses the centre is only 8 cm — shorter than the diameter!',
  'bodha.G6.where':
    'Bullock cart wheels, coins, bangles, rotary dials, round wells, and circular tracks.',
  'bodha.G6.sutra':
    'Every point on the rim is one radius away; through the centre, diameter is twice the radius.',
  'gloss.circle':
    'A closed curved shape where all boundary points are equidistant from a central point.',
  'gloss.circle.en': 'circle',
  'circle.title': 'Circles: Centre, Radius, Diameter',
  'circle.art':
    'Interactive circle compass with adjustable radius, centre point, and chord offset explorer.',
  'circle.radius': 'Radius: {r} cm',
  'circle.diameter': 'Diameter: {d} cm',
  'circle.chord': 'Chord: {c} cm (Offset: {offset} cm)',
  'circle.radiusSlider': 'Radius (cm)',
  'circle.offsetSlider': 'Distance from Centre (cm)',
  'circle.centreLine': 'Passes Through Centre (Diameter)',
  'circle.offCentreLine': 'Off-Centre Chord',
  'circle.formula': 'd = 2 × r = {d} cm',
  'circle.chordFormula': 'Chord = 2 × √(r² - d²) = {c} cm',
  'circle.s1': 'Adjust the radius slider to see the circle expand or shrink.',
  'circle.s1done': 'Radius set to {r} cm; diameter through the centre is {d} cm.',
  'circle.s2': 'Move the line offset away from the centre.',
  'circle.s2done': 'When the line misses the centre, chord length decreases from {d} cm to {c} cm.',
  'circle.s3': 'Return the line to offset 0 cm through the centre.',
  'circle.s3done':
    'At offset 0 cm, the line passes directly through the centre: it is the diameter!',
  'mistake.G6.intro':
    'Dev was measuring lines across a circle with radius 5 cm. One step went wrong. Which one?',
  'mistake.G6.s1': 'Dev drew a circle with a radius of 5 cm from the centre peg.',
  'mistake.G6.s2':
    'He drew an 8 cm line near the top edge connecting two rim points and called it the diameter.',
  'mistake.G6.s3': 'He concluded that the diameter of this circle is 8 cm.',
  'mistake.G6.fine1': 'Sound step: drawing a circle of radius 5 cm is correct.',
  'mistake.G6.fine3': 'Step 3 is based on his misidentification in Step 2.',
  'mistake.G6.found':
    'Here! A diameter MUST pass directly through the centre dot. A line that misses the centre is an off-centre chord, which is shorter than the true diameter (10 cm)!',
  'explain.G6.s':
    'The distance from the centre to any point on the rim is the {0}. A straight line through the centre connecting opposite points is the diameter, which is {1} the radius.',
  'explain.G6.radius': 'radius',
  'explain.G6.diameter': 'diameter',
  'explain.G6.chord': 'chord',
  'explain.G6.twice': 'twice',
  'explain.G6.half': 'half',
  'explain.G6.equal to': 'equal to',
  'explain.G6.hint':
    'What is the name for centre-to-rim, and how many times the radius is the diameter?',
  'know.G6':
    'Every point on the rim is one radius away; through the centre, diameter is twice the radius.',

  /* G7 */
  'prashna.G7.q':
    'You rearrange all 7 wooden tangram pieces from a square into a tall candle. Does the total wood area change?',
  'prashna.G7.c1': 'Yes, the candle is taller so it has more area',
  'prashna.G7.c2': 'No, rearranging pieces leaves total area exactly unchanged',
  'prashna.G7.c3': 'Yes, the candle has less area because it is narrower',
  'prashna.G7.a':
    'No, rearranging pieces leaves total area exactly unchanged! Dissection preserves area: the 7 pieces occupy the exact same surface whether arranged as a square, candle, boat, or swan.',
  'bodha.G7.what':
    'A [[tangram|tangram]] is an ancient 7-piece puzzle created by cutting a single large square into geometric tiles.',
  'bodha.G7.can':
    'You will be able to rearrange shapes and see why total area remains conserved regardless of the outline.',
  'bodha.G7.idea':
    'The 7 pieces: 2 large triangles, 1 medium triangle, 2 small triangles, 1 square, and 1 parallelogram.',
  'bodha.G7.why':
    'Pieces can combine into other pieces: two small triangles make the square, the parallelogram, or the medium triangle!',
  'bodha.G7.example': 'A square of area 100 square units:',
  'bodha.G7.example1': 'All 7 pieces fit inside the original 10×10 square (Total Area = 100).',
  'bodha.G7.example2': 'Rearranging the 7 pieces forms a sailing boat silhouette.',
  'bodha.G7.example3':
    'Because no pieces were added or removed, the boat still has an area of exactly 100 square units.',
  'bodha.G7.where': 'Floor tile layouts, carpentry joints, origami, and mosaic paving.',
  'bodha.G7.sutra':
    'Rearranging shapes changes the outline, but the total area stays exactly the same.',
  'gloss.tangram':
    'A dissection puzzle consisting of seven flat shapes that can form various silhouettes without overlapping.',
  'gloss.tangram.en': 'tangram',
  'tangram.title': 'Tangrams: Dissection & Area Conservation',
  'tangram.art':
    'Interactive 7-piece tangram mat with silhouette guides and area balance inspector.',
  'tangram.units': 'Total Pieces: 7 | Total Area: {area} units ({pct}%)',
  'tangram.silhouette': 'Silhouette: {name}',
  'tangram.presetSquare': 'Square (Base)',
  'tangram.presetCandle': 'Candle (Tall)',
  'tangram.presetBoat': 'Boat',
  'tangram.presetSwan': 'Swan (Tall Neck)',
  'tangram.s1': 'Explore the 7 pieces arranged as the base square.',
  'tangram.s1done':
    'All 7 pieces fit the square: 2 large triangles, 1 medium, 2 small, 1 square, 1 parallelogram (Total = 16 units).',
  'tangram.s2': 'Switch silhouettes to see shapes reassembled into a candle, boat, or swan.',
  'tangram.s2done': 'Silhouette changed to {name}: total area remains exactly 16 units (100%)!',
  'tangram.s3': 'Compare two small triangles with the square, parallelogram, or medium triangle.',
  'tangram.s3done':
    'Area conservation proved: 2 small triangles (1 + 1) equal the medium triangle (2), square (2), and parallelogram (2)!',
  'mistake.G7.intro':
    'Meera was comparing the tangram square and the tangram swan. One step went wrong. Which one?',
  'mistake.G7.s1':
    'Meera used all 7 tangram pieces to build a square, measuring an area of 100 cm².',
  'mistake.G7.s2':
    'She rearranged all 7 pieces into a swan and claimed the swan has greater area because its neck reaches much higher.',
  'mistake.G7.s3': 'She concluded that tall shapes always have more area than compact squares.',
  'mistake.G7.fine1': 'Sound step: the original square uses all 7 pieces with area 100 cm².',
  'mistake.G7.fine3': 'Step 3 relies on her mistaken reasoning in Step 2.',
  'mistake.G7.found':
    'Here! Height does not determine area. Both silhouettes use the exact same 7 pieces without overlap, so their total surface areas are strictly equal!',
  'explain.G7.s':
    'When pieces are rearranged into a new silhouette, the total area remains {0}. Two small tangram triangles can be joined to form the medium triangle, the parallelogram, or the {1}.',
  'explain.G7.unchanged': 'unchanged',
  'explain.G7.larger': 'larger',
  'explain.G7.smaller': 'smaller',
  'explain.G7.square': 'square',
  'explain.G7.circle': 'circle',
  'explain.G7.hexagon': 'hexagon',
  'explain.G7.hint':
    'Does rearranging change total surface area, and what 2-unit shape can two small triangles make?',
  'know.G7': 'Rearranging shapes changes the outline, but the total area stays exactly the same.',

  /* G8 */
  'prashna.G8.q':
    'Looking straight down from the ceiling at a round water cup, what 2D shape do you see?',
  'prashna.G8.c1': 'A rectangle',
  'prashna.G8.c2': 'A circle',
  'prashna.G8.c3': 'A triangle',
  'prashna.G8.a':
    "A circle! Looking straight down from the ceiling gives a bird's eye (top) view: you see only the circular rim and base, not the vertical wall height.",
  'bodha.G8.what':
    'A solid looks different from each side. Looking down from above you see its top view; from in front, its front view; from the side, its side view.',
  'bodha.G8.can':
    'You will be able to reconstruct 3D structures from top, front, and side views and connect top views to maps.',
  'bodha.G8.idea':
    'A top view looks straight down from above: it shows ground layout and width/depth, like a map!',
  'bodha.G8.why':
    'A front view shows width and height, but hides what lies behind. We need multiple views to describe a 3D structure.',
  'bodha.G8.example': 'A 3-step staircase:',
  'bodha.G8.example1': 'Step 1: Front view shows ascending steps (heights 1, 2, and 3).',
  'bodha.G8.example2': 'Step 2: Side view shows a solid wall rising to height 3.',
  'bodha.G8.example3':
    'Step 3: Top view collapses the vertical drops — it looks like 3 flat rectangles side by side!',
  'bodha.G8.where':
    'Architectural blueprints, floor plans, shadows cast by sunlight, and aerial maps.',
  'bodha.G8.sutra':
    'A top view sees the ground; a front view sees the height; together they describe the whole 3D shape.',
  'gloss.topview':
    'An orthographic projection looking straight down from above, showing width and depth without height.',
  'gloss.topview.en': 'top view',
  'views.title': 'Views from Above: Top, Front, Side',
  'views.art':
    'Interactive 3D block courtyard with synchronized top, front, and side orthographic viewports.',
  'views.top': 'Top View (Plan / Map)',
  'views.front': 'Front View (Elevation)',
  'views.side': 'Side View (Profile)',
  'views.blocks': 'Total Blocks: {count}',
  'views.presetStair': 'Staircase',
  'views.presetTower': 'Tower',
  'views.presetCorner': 'L-Corner',
  'views.presetBridge': 'Bridge Arch',
  'views.jaalToggle': 'Jaal Link: E4 Map Connection',
  'views.s1': 'Explore the 3 orthographic views of the staircase.',
  'views.s1done':
    'Staircase views: Front shows ascending steps (1, 2, 3), but Top view looks like a flat row of 3 squares!',
  'views.s2': 'Switch between different 3D structures to compare their views.',
  'views.s2done':
    'Structure changed to {name}: notice how each vantage point reveals different dimensions.',
  'views.s3': 'Examine how Top View connects to Map Reading (Jaal E4).',
  'views.s3done':
    "Bird's eye perspective: overhead projections are exactly how maps, floor plans, and blueprints work!",
  'mistake.G8.intro':
    'Kabir was drawing the top view of a 3-step block staircase. One step went wrong. Which one?',
  'mistake.G8.s1':
    'Kabir observed the 3-step staircase from the front, noting step heights 1, 2, and 3.',
  'mistake.G8.s2': 'He drew the top view showing step drops and vertical faces between each step.',
  'mistake.G8.s3':
    'He claimed that overhead drawings always display the vertical drops between steps.',
  'mistake.G8.fine1': 'Sound step: observing front step heights 1, 2, and 3 is accurate.',
  'mistake.G8.fine3': 'Step 3 is based on his misprojection in Step 2.',
  'mistake.G8.found':
    'Here! Looking straight down from above collapses vertical height completely. You cannot see vertical drops — the top view is simply 3 flat adjacent squares, like a map!',
  'explain.G8.s':
    'A top view looks straight down from above and shows the shape like a {0}. A front view shows width and {1}, but hides the depth behind.',
  'explain.G8.map': 'map',
  'explain.G8.shadow': 'shadow',
  'explain.G8.mirror': 'mirror',
  'explain.G8.height': 'height',
  'explain.G8.perimeter': 'perimeter',
  'explain.G8.weight': 'weight',
  'explain.G8.hint':
    'What overhead document resembles a top view, and what vertical dimension does a front view show?',
  'know.G8':
    'A top view sees the ground; a front view sees the height; together they describe the whole 3D shape.',

  /* Bench UI (G1 angles) */
  'angles.tab1': '1. Turn the ray',
  'angles.tab2': '2. Arm length',
  'angles.tab3': '3. Clock hands',
  'angles.dec15': '- 15°',
  'angles.inc15': '+ 15°',
  'angles.preset45': '45° (Half right)',
  'angles.preset90': '90° (Quarter)',
  'angles.preset180': '180° (Straight)',
  'angles.preset360': '360° (Full)',
  'angles.nextArm': 'Next: Test Arm Length →',
  'angles.nextClock': 'Next: Compare Clock Hands →',
  'angles.invariance': 'Arm Length: {len}px  |  Angle: 90° (Constant!)',
  'angles.invarianceNote': 'Stretching or shortening the arms does NOT change the turn.',
  'angles.shortArm': 'Short (60px)',
  'angles.longArm': 'Long (160px)',
  'angles.towerLabel': 'Giant Tower Clock',
  'angles.watchLabel': 'Tiny Wristwatch',
  'angles.towerDetail': 'Hands: 60 cm | Angle: 90°',
  'angles.watchDetail': 'Hands: 1 cm | Angle: 90°',
  'angles.type.zero': 'Zero turn (0°)',
  'angles.type.acute': 'Acute angle (< 90°)',
  'angles.type.right': 'Quarter turn / Right angle (90°)',
  'angles.type.obtuse': 'Obtuse angle (between 90° and 180°)',
  'angles.type.straight': 'Half turn / Straight angle (180°)',
  'angles.type.reflex': 'Reflex angle (> 180°)',
  'angles.type.full': 'Full turn (360°)',
  'angles.turnQuarter': '1/4 turn (Quarter turn)',
  'angles.turnHalf': '1/2 turn (Half turn)',
  'angles.turnThreeQuarter': '3/4 turn (Three-quarter turn)',
  'angles.turnFull': 'Full turn',
  'angles.turnGeneric': '{num}/{den} turn',
  'angles.turnZero': '0 turn',
  'angles.slider': 'Angle in degrees',

  /* G3 shear bench */
  'shear.tab1': '1. Slide the top',
  'shear.tab2': '2. Cut & Shift',
  'shear.tab3': '3. Compare & Formula',
  'shear.offsetValue': '{n} cm',
  'shear.offsetHint': '(slide along rail)',
  'shear.slantFormula': '√(h² + offset²)',
  'shear.insight':
    'Area Invariant: Sliding the top increases the slant and perimeter, but Area remains strictly {area} cm² because the base ({base} cm) and perpendicular height ({height} cm) do not change.',
  'shear.guideRail': 'Guide Rail (height = {h} cm)',

  /* G5 cubenet bench */
  'cubenet.tab1': '1. Arrange 6 squares',
  'cubenet.tab2': '2. Fold 3D Box',
  'cubenet.tab3': '3. Find 11 Nets',
  'cubenet.foldHint': '(0° Flat → 90° Closed Box)',
  'cubenet.presetsLabel': 'Quick Test Presets:',
  'cubenet.closedCube': 'Closed 3D Cube (0 Collisions, 6 Faces Sealed)',
  'cubenet.collisionCube': 'Collision! Faces Overlap & Leaves Hole',

  /* G6 circle bench */
  'circle.tab1': '1. Radius & Circle',
  'circle.tab2': '2. Chords vs Diameter',
  'circle.tab3': '3. Verify & Measure',
  'circle.radiusReadout': 'Radius: {r} cm',
  'circle.diameterReadout': 'Diameter: {d} cm (2 × {r} cm)',
  'circle.chordReadout': 'Line across: {c} cm',
  'circle.statusDiameter':
    'Passes Through Centre (Diameter): d = 2 × {r} = {d} cm. This is the longest possible line across the circle!',
  'circle.statusChord':
    'Off-Centre Chord (Misses Centre by {offset} cm): Length = {c} cm. It is shorter than the diameter by {diff} cm.',
  'circle.centreLabel': 'Centre O',
  'circle.decRadius': 'Decrease radius',
  'circle.incRadius': 'Increase radius',
  'circle.radiusAria': 'Circle radius in cm',
  'circle.decOffset': 'Decrease distance from centre',
  'circle.incOffset': 'Increase distance from centre',
  'circle.offsetAria': 'Distance from centre in cm',
  'circle.chipCentre': 'Centre (Diameter = 2r)',
  'circle.chipOffCentre': 'Off-Centre Chord (3 cm)',
  'circle.canvasLabel': 'Circle with radius and chord explorer',
  'circle.chordSvgDiameter': '{d} cm',
  'circle.chordSvgChord': '{c} cm',
  'cubenet.need6msg': 'Select exactly 6 squares to fold.',
  'views.tab1': '1. Staircase Views',
  'views.tab2': '2. Compare 3D Shapes',
  'views.tab3': '3. Jaal E4 Map Link',
  'views.structureLabel': 'Structure: {name}',

  /* G7 tangram bench */
  'tangram.tab1': '1. Square Dissection',
  'tangram.tab2': '2. Silhouettes & Balance',
  'tangram.tab3': '3. Small Triangle Equivalence',
  'tangram.piecesCount': 'Pieces: 7 of 7',
  'tangram.unitsCount': 'Total Units: {u} / 16 (100%)',
  'tangram.areaDisplay': 'Total Area: {a} cm²',
  'tangram.statusConserved':
    'Area Strictly Conserved ({name}): Rearranging 7 pieces creates a new silhouette, but the total area is still 16 units (100 cm²) with zero change!',
  'tangram.statusEquiv':
    'Piece Decomposition Equivalence: 2 Small Triangles (1 + 1 = 2 units) exactly equal 1 Square, 1 Parallelogram, or 1 Medium Triangle!',
  'tangram.presetsLabel': 'Choose Silhouette Preset:',
  'tangram.legendTitle': '7 Dissection Pieces (Total = 16 units)',
  'tangram.legendL1': '2 Large Triangles: 4 units each (8 units total, 50% of square)',
  'tangram.legendL2': '1 Medium Triangle: 2 units (12.5% of square)',
  'tangram.legendL3': '2 Small Triangles: 1 unit each (2 units total)',
  'tangram.legendL4': '1 Square: 2 units (12.5% of square)',
  'tangram.legendL5': '1 Parallelogram: 2 units (12.5% of square)',
  'tangram.eqCanvasLabel': 'Tangram equivalence diagram',
  'tangram.eqLabel1': '2 Small Triangles (1 + 1) = 1 Square (2)',
  'tangram.eqLabel2': '2 Small Triangles (1 + 1) = 1 Medium Triangle (2)',
  'tangram.silhouetteAria': 'Tangram silhouette {name}',
  'tangram.rotatePiece': 'Rotate tangram piece',
  'tangram.movePiece': 'Move tangram piece with arrow keys',
  'tangram.selectPiece': 'Select tangram piece',

  /* G8 views bench */
  'views.presetsLabel': 'Select 3D Structure Preset:',
  'views.statusJaal':
    'Jaal Link (E4 Maps ↔ G8 Top View): Looking straight down from the ceiling collapses all heights into a flat layout — this is exactly how maps and architectural blueprints represent 3D land!',
  'views.statusStairTop':
    'Top View Collapses Drops: Looking straight down at the 3-step staircase hides vertical drops. You see 3 flat adjacent squares in a line!',
  'views.statusOrtho':
    'Orthographic Views ({name}): Top view sees ground footprint; Front view sees width & height; Side view sees depth & height.',

  /* G2 rope equation fragments */
  'rope.perimEq': '{w} + {h} + {w} + {h} = {p} m',
  'rope.areaEq': '{w} × {h} = {a} m²',

  /* Spot-the-mistake equation lines: <s> struck, <r> highlighted. */
  'mistake.G1.eq':
    'A pencil box lid open wide (60°) has a <r>larger angle</r> than a giant door open a crack (15°)',
  'mistake.G2.eq': 'Both have perimeter 24 m, but 6 × 6 = <r>36 m²</r> while 10 × 2 = 20 m²',
  'mistake.G3.eq': 'Area is 6 × 4 = <r>24 cm²</r>, not 6 × 5 = 30 cm²',
  'mistake.G4.eq':
    'Rotational symmetry spins onto itself (90°); it does <r>not</r> require mirror fold lines',
  'mistake.G5.eq':
    'A cube needs 6 faces without collisions; a 2 × 3 block <r>overlaps</r> and leaves two faces open',
  'mistake.G6.eq':
    'A diameter must pass directly through the centre; a chord away from the centre is <r>shorter</r> than 2 × radius',
  'mistake.G7.eq':
    'Height does not determine area; rearranging the same 7 pieces leaves total area <r>strictly equal</r>',
  'mistake.G8.eq':
    'A top view looks straight down from above; vertical steps collapse into a <r>flat grid of squares</r>',
  'views.subTop': "Bird's eye (map)",
  'views.subFront': 'Width × height',
  'views.subSide': 'Depth × height',
};
