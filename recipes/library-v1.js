// Paycheck Pilot recipe library -- version 1.
// One recipe per Grocery Run meal, keyed by the meal's id. Loaded the first
// time a recipe is opened; the service worker keeps it for offline use.
// Nothing here changes shopping lists: those still come from the meal data
// in index.html. A recipe that's improved later becomes version 2 and this
// version is kept, so saved recipes always have what they pointed at.
//
// Amounts are for 4 servings. Each ingredient is 'qty|unit|name|note':
//   qty   blank for "to taste"; a leading "!" means it doesn't scale
//         (the oil for a pan stays the same for 4 or 8)
//   unit  lb, oz, cup, tbsp, tsp, can, jar, pkg, box, bag, bottle, packet,
//         head, bunch, clove, slice, stick -- or blank for a count
//   name  "tomato/tomatoes" gives the singular and plural
// prep and cook are minutes; cook can also be text ("6-8 hr on Low").
// Safe temperatures follow USDA guidance: poultry 165°F, ground meat 160°F,
// whole cuts of pork and beef 145°F with a 3-minute rest, fish 145°F.
window.PP_RECIPES = { version: 1, recipes: {} };
(function (R) {
  const add = (id, prep, cook, ingredients, steps, tip) => { R[id] = { id, version: 1, servings: 4, prepMin: prep, cookMin: cook, ingredients, steps, tip: tip || '' }; };

  // ---- Chicken ----
  add('chicken-tacos', 10, 15, [
    '1.5|lb|boneless skinless chicken thighs|cut into strips', '2|tbsp|taco seasoning', '1/3|cup|water', '!1|tbsp|vegetable oil|for the pan',
    '8||small flour tortilla/small flour tortillas', '2|cup|shredded lettuce', '2||tomato/tomatoes|diced', '1|cup|shredded cheese', '1/2|cup|salsa'
  ], [
    'Pat the chicken dry and cut it into bite-size strips.',
    'Heat the oil in a large skillet over medium-high heat. Cook the chicken 6–8 minutes, stirring now and then, until browned and cooked through (165°F / 74°C inside).',
    'Stir in the taco seasoning and water. Simmer 2–3 minutes until the sauce coats the chicken.',
    'Meanwhile, shred the lettuce and dice the tomatoes.',
    'Warm the tortillas in a dry skillet, 20–30 seconds per side.',
    'Fill the tortillas with chicken, lettuce, tomato, cheese and salsa.'
  ], 'For 8 or more servings, cook the chicken in two batches so it browns instead of steaming.');

  add('sheet-pan-chicken-and-potatoes', 15, 40, [
    '2|lb|bone-in, skin-on chicken thighs', '2|lb|potatoes|cut into 1-inch pieces', '1|lb|baby carrots', '3|tbsp|olive oil',
    '1 1/2|tsp|garlic powder', '1|tsp|paprika|optional', '1|tsp|salt', '1/2|tsp|black pepper'
  ], [
    'Heat the oven to 425°F (220°C). Line a large rimmed baking sheet with foil.',
    'Toss the potatoes and carrots with 2 tablespoons of the oil and half the garlic powder, salt and pepper. Spread them on the pan.',
    'Pat the chicken dry. Rub with the rest of the oil and seasonings and the paprika. Nestle it skin-side up among the vegetables.',
    'Roast 35–40 minutes, until the potatoes are tender and the chicken reads 165°F (74°C) at the thickest part, away from the bone.',
    'Rest 5 minutes before serving.'
  ], 'For 6 or more servings use two pans so everything roasts instead of steaming.');

  add('chicken-fried-rice', 10, 15, [
    '1|lb|boneless skinless chicken thighs|cut into small pieces', '3|cup|cooked rice|day-old and cold is best', '1 1/2|cup|frozen peas and carrots',
    '3||egg/eggs|beaten', '3|tbsp|soy sauce', '2|tbsp|vegetable oil', '2||green onion/green onions|sliced, optional'
  ], [
    'If you don\'t have leftover rice, cook 1 cup of rice in 2 cups of water and spread it on a plate to cool while you start.',
    'Heat 1 tablespoon of the oil in a large skillet over medium-high heat. Cook the chicken 5–6 minutes until cooked through (165°F / 74°C). Move it to a plate.',
    'Add the rest of the oil. Pour in the eggs and scramble until just set, about 1 minute. Move them to the plate.',
    'Add the peas and carrots and cook 2 minutes. Add the rice, pressing it flat, and let it sizzle 2–3 minutes without stirring.',
    'Stir in the chicken, eggs and soy sauce and toss until hot. Top with green onions.'
  ], 'Cold rice fries best; warm, fresh rice turns mushy.');

  add('chicken-alfredo', 10, 20, [
    '1 1/2|lb|boneless skinless chicken breasts', '12|oz|fettuccine', '15|oz|Alfredo sauce|1 jar', '3|cup|broccoli florets',
    '!1|tbsp|olive oil|for the pan', '1|tsp|salt|plus more for the pasta water', '1/2|tsp|black pepper'
  ], [
    'Bring a large pot of salted water to a boil.',
    'Season the chicken with salt and pepper. Heat the oil in a skillet over medium-high heat and cook the chicken 5–7 minutes per side, until 165°F (74°C) inside. Rest 5 minutes, then slice.',
    'Cook the fettuccine as the box directs. Add the broccoli for the last 3 minutes. Drain.',
    'Warm the Alfredo sauce in the skillet over low heat. Toss in the pasta and broccoli.',
    'Top with the sliced chicken.'
  ], 'Thick breasts cook more evenly if you slice them in half horizontally first.');

  add('bbq-chicken-sandwiches', 5, 20, [
    '1 1/2|lb|boneless skinless chicken breasts', '3/4|cup|BBQ sauce', '1/2|cup|water', '4||hamburger bun/hamburger buns', '3|cup|coleslaw mix',
    '3|tbsp|mayonnaise|for the slaw', '1|tbsp|vinegar|for the slaw', '1|tsp|sugar|for the slaw'
  ], [
    'Put the chicken and water in a saucepan, cover and simmer over medium heat 15–18 minutes, until it reads 165°F (74°C).',
    'Meanwhile, stir the coleslaw mix with the mayonnaise, vinegar and sugar.',
    'Pour off the water. Shred the chicken with two forks right in the pan.',
    'Stir in the BBQ sauce and heat 2–3 minutes.',
    'Pile onto buns and top with slaw.'
  ]);

  add('chicken-noodle-soup', 15, 30, [
    '1|lb|boneless skinless chicken breasts', '8|cup|chicken broth', '3|cup|egg noodles', '1|cup|baby carrots|sliced',
    '2||celery stalk/celery stalks|sliced', '1||onion/onions|diced', '!1|tbsp|olive oil', '1|tsp|dried thyme|optional', '||salt and pepper|to taste'
  ], [
    'Heat the oil in a large pot over medium heat. Cook the onion, carrots and celery 5 minutes until softened.',
    'Add the broth, thyme and whole chicken breasts. Bring to a boil, then simmer 15–20 minutes until the chicken reads 165°F (74°C).',
    'Lift out the chicken and shred it with two forks.',
    'Add the noodles to the pot and simmer 6–8 minutes until tender.',
    'Return the chicken, season with salt and pepper and serve.'
  ], 'Noodles keep soaking up broth; add a splash of water when reheating leftovers.');

  add('chicken-stir-fry', 10, 15, [
    '1 1/2|lb|boneless skinless chicken breasts|cut into bite-size pieces', '1|bag|frozen stir-fry vegetables|about 16 oz', '1/2|cup|teriyaki sauce',
    '1|cup|rice|uncooked', '2|cup|water|for the rice', '2|tbsp|vegetable oil'
  ], [
    'Cook the rice: bring rice and water to a boil, cover, turn to low and cook 18 minutes. Rest 5 minutes.',
    'Heat 1 tablespoon of oil in a large skillet over high heat. Cook the chicken 5–6 minutes until browned and 165°F (74°C). Move to a plate.',
    'Add the rest of the oil and the frozen vegetables. Cook 4–5 minutes until hot and crisp-tender.',
    'Return the chicken, add the teriyaki sauce and toss 1–2 minutes until glossy.',
    'Serve over the rice.'
  ]);

  add('chicken-quesadillas', 10, 20, [
    '1|lb|boneless skinless chicken breasts', '1|tsp|chili powder', '1/2|tsp|salt', '8||flour tortilla/flour tortillas|8-inch',
    '2|cup|shredded cheese', '1/2|cup|salsa', '1/2|cup|sour cream', '!1|tbsp|vegetable oil|for the pan'
  ], [
    'Season the chicken with chili powder and salt. Cook in a skillet with a little oil over medium-high heat, 5–7 minutes per side, to 165°F (74°C). Rest 5 minutes and chop.',
    'Sprinkle cheese and chicken over half of each tortilla and fold.',
    'Cook 2 at a time in the skillet over medium heat, 2–3 minutes per side, until golden and melted.',
    'Keep finished ones warm in a 200°F (95°C) oven.',
    'Cut into wedges. Serve with salsa and sour cream.'
  ], 'More servings means more batches, not longer cooking.');

  add('chicken-enchiladas', 15, 25, [
    '1 1/2|lb|boneless skinless chicken breasts', '8||flour tortilla/flour tortillas|8-inch', '2|can|enchilada sauce|10 oz each',
    '2|cup|shredded cheese', '1|can|black beans|rinsed and drained', '!1|tbsp|vegetable oil'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Simmer the chicken in a covered pan of water 15–18 minutes, until 165°F (74°C). Shred it with two forks.',
    'Mix the chicken with the beans, 1 cup of cheese and ½ cup of the sauce.',
    'Spread ½ cup of sauce in a 9×13 baking dish. Roll the filling in the tortillas and lay them seam-side down.',
    'Pour over the rest of the sauce and cheese. Bake 20–25 minutes until bubbling.'
  ], 'Rotisserie chicken works too: use about 3 cups shredded and skip step 2.');

  add('honey-garlic-drumsticks', 10, 45, [
    '3|lb|chicken drumsticks', '1/3|cup|honey', '1/4|cup|soy sauce', '2|tsp|garlic powder', '1|cup|rice|uncooked', '2|cup|water|for the rice',
    '1|bag|frozen green beans|about 12 oz'
  ], [
    'Heat the oven to 400°F (200°C). Line a baking sheet with foil.',
    'Stir together the honey, soy sauce and garlic powder. Toss the drumsticks in half of it and lay them on the pan.',
    'Bake 40–45 minutes, turning once and brushing with the rest of the sauce for the last 10 minutes, until 165°F (74°C) near the bone.',
    'Meanwhile cook the rice (boil, cover, low 18 minutes) and steam or microwave the green beans.',
    'Serve the drumsticks with rice and green beans.'
  ], 'Honey burns easily; if the tops darken too fast, cover loosely with foil.');

  add('chicken-caesar-wraps', 10, 15, [
    '1|lb|boneless skinless chicken breasts', '4||large flour tortilla/large flour tortillas', '1||head romaine lettuce/heads romaine lettuce|chopped',
    '1/2|cup|Caesar dressing', '1/2|cup|shredded parmesan', '!1|tbsp|olive oil', '||salt and pepper|to taste'
  ], [
    'Season the chicken with salt and pepper. Cook in the oil over medium-high heat 5–7 minutes per side, to 165°F (74°C). Rest 5 minutes and slice.',
    'Toss the romaine with the dressing and parmesan.',
    'Lay the salad and chicken down the middle of each tortilla.',
    'Fold in the sides and roll up tightly. Cut in half.'
  ]);

  add('chicken-pot-pie', 15, 45, [
    '1|lb|boneless skinless chicken breasts', '1|bag|frozen mixed vegetables|about 12 oz', '1|can|cream of chicken soup|10.5 oz',
    '1/2|cup|milk', '1|pkg|refrigerated pie crusts|2 crusts', '1/2|tsp|black pepper'
  ], [
    'Heat the oven to 400°F (200°C).',
    'Simmer the chicken in a covered pan of water 15–18 minutes to 165°F (74°C). Cut into small pieces.',
    'Mix the chicken, vegetables, soup, milk and pepper.',
    'Press one crust into a 9-inch pie pan. Add the filling, top with the second crust, pinch the edges and cut a few slits.',
    'Bake 30–35 minutes until golden. Rest 10 minutes before cutting.'
  ], 'If the edges brown before the middle, cover them with strips of foil.');

  // ---- Beef ----
  add('spaghetti-and-meat-sauce', 5, 25, [
    '1|lb|ground beef', '1||small onion/small onions|diced', '2|clove|garlic|minced', '!1|tbsp|olive oil', '24|oz|pasta sauce',
    '12|oz|spaghetti', '!1|tbsp|salt|for the pasta water', '1||frozen garlic bread loaf/frozen garlic bread loaves'
  ], [
    'Bring a large pot of water to a boil and add the salt.',
    'Heat the oil in a large skillet over medium-high heat. Cook the beef and onion 7–9 minutes, breaking it up, until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Add the garlic for 30 seconds, then the sauce. Simmer on low 10 minutes.',
    'Bake the garlic bread as the package directs.',
    'Cook the spaghetti as the box directs and drain. Serve with the sauce and garlic bread.'
  ], 'For 8 or more servings, use your largest pot so the pasta has room to move.');

  add('cheeseburgers-and-fries', 10, 25, [
    '1 1/2|lb|ground beef', '1|tsp|salt', '1/2|tsp|black pepper', '4||hamburger bun/hamburger buns', '4|slice|cheese', '4||lettuce leaf/lettuce leaves',
    '1||tomato/tomatoes|sliced', '1|bag|frozen fries|about 2 lb', '||ketchup and mustard|for serving'
  ], [
    'Bake the fries as the bag directs (usually 20–25 minutes at 425°F / 220°C).',
    'Shape the beef into 4 patties a little wider than the buns, with a slight dip in the middle. Season both sides.',
    'Cook in a hot skillet or on the grill 4–5 minutes per side, until 160°F (71°C) in the middle.',
    'Add the cheese for the last minute and cover to melt.',
    'Serve on buns with lettuce, tomato and your favorite toppings.'
  ], 'Ground beef is only safe cooked through — check the middle of the thickest patty.');

  add('beef-tacos', 5, 15, [
    '1|lb|ground beef', '2|tbsp|taco seasoning', '2/3|cup|water', '12||taco shell/taco shells', '2|cup|shredded lettuce', '1|cup|shredded cheese', '1/2|cup|salsa'
  ], [
    'Cook the beef in a skillet over medium-high heat 7–9 minutes, breaking it up, until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Stir in the taco seasoning and water. Simmer 5 minutes until thickened.',
    'Warm the shells in a 350°F (175°C) oven for 5 minutes.',
    'Fill with beef, lettuce, cheese and salsa.'
  ]);

  add('beef-chili', 10, 40, [
    '1|lb|ground beef', '1||onion/onions|diced', '2|can|kidney beans|15 oz each, drained', '2|can|diced tomatoes|14.5 oz each',
    '2|tbsp|chili powder', '1|tsp|ground cumin', '1|tsp|salt', '1|cup|water'
  ], [
    'Cook the beef and onion in a large pot over medium-high heat 8–10 minutes, until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Stir in the chili powder, cumin and salt and cook 1 minute.',
    'Add the beans, tomatoes and water. Bring to a boil.',
    'Turn to low and simmer 25–30 minutes, stirring now and then, until thick.',
    'Serve with cheese, sour cream or crackers if you like.'
  ], 'Chili tastes even better the next day. It also works in a slow cooker: brown the beef first, then 6–8 hours on Low.');

  add('beef-and-broccoli', 15, 15, [
    '1 1/2|lb|flank steak|sliced thin against the grain', '4|cup|broccoli florets', '1/3|cup|soy sauce', '2|tbsp|brown sugar', '1|tbsp|cornstarch',
    '1/2|cup|water', '2|tbsp|vegetable oil', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Cook the rice (boil, cover, low 18 minutes, rest 5).',
    'Whisk the soy sauce, brown sugar, cornstarch and ½ cup water.',
    'Heat 1 tablespoon of oil in a large skillet over high heat. Sear the beef in two batches, 1–2 minutes per side, until browned with no red left on the outside (145°F / 63°C). Move to a plate.',
    'Add the rest of the oil and the broccoli with 2 tablespoons of water. Cover and cook 3 minutes.',
    'Return the beef, pour in the sauce and stir 1–2 minutes until thick. Serve over rice.'
  ], 'Partly freezing the steak for 20 minutes makes thin slicing much easier.');

  add('sloppy-joes', 5, 15, [
    '1|lb|ground beef', '1|can|sloppy joe sauce|15 oz', '4||hamburger bun/hamburger buns', '2|cup|baby carrots|for serving'
  ], [
    'Cook the beef in a skillet over medium-high heat 7–9 minutes, breaking it up, until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Stir in the sauce and simmer 5 minutes.',
    'Toast the buns if you like and spoon in the filling.',
    'Serve with baby carrots.'
  ]);

  add('shepherd-s-pie', 20, 50, [
    '1 1/2|lb|ground beef', '3|lb|potatoes|peeled and cut into chunks', '2|cup|frozen peas and carrots', '4|tbsp|butter', '1/2|cup|milk',
    '1|packet|brown gravy mix|or 1 cup beef broth with 1 tbsp flour', '1|cup|water', '1|tsp|salt'
  ], [
    'Heat the oven to 400°F (200°C). Boil the potatoes in salted water 15–18 minutes until very tender. Drain and mash with the butter, milk and salt.',
    'Meanwhile, cook the beef in a large oven-safe skillet 8–10 minutes until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Stir in the gravy mix and water and simmer 2 minutes. Stir in the peas and carrots.',
    'Spread the mashed potatoes over the filling (move it to a baking dish first if your skillet isn\'t oven-safe).',
    'Bake 20–25 minutes until the top is golden. Rest 5 minutes.'
  ]);

  add('pot-roast', 15, '8 hr on Low', [
    '3|lb|chuck roast', '2|lb|potatoes|cut into large chunks', '1|lb|baby carrots', '1||onion/onions|cut into wedges', '2|cup|beef broth',
    '1|tsp|salt', '1/2|tsp|black pepper', '1|tsp|dried thyme|optional', '!1|tbsp|vegetable oil'
  ], [
    'Season the roast with salt, pepper and thyme. Brown it in the oil in a hot skillet, 3–4 minutes per side. (Optional, but it adds flavor.)',
    'Put the potatoes, carrots and onion in the slow cooker. Set the roast on top and pour in the broth.',
    'Cover and cook 8 hours on Low (or 5 hours on High) until the meat pulls apart easily with a fork.',
    'Lift out the roast and vegetables. Spoon the juices over to serve.'
  ], 'In the oven instead: covered pot, 300°F (150°C), about 3½ hours.');

  add('steak-and-baked-potatoes', 10, 60, [
    '2|lb|sirloin steak|about 1 inch thick', '4||russet potato/russet potatoes', '1|tsp|salt', '1/2|tsp|black pepper', '!1|tbsp|vegetable oil',
    '1|bag|salad mix', '1/2|cup|sour cream', '2|tbsp|butter'
  ], [
    'Heat the oven to 425°F (220°C). Scrub the potatoes, poke them with a fork and bake directly on the rack 50–60 minutes until soft.',
    'Take the steak out of the fridge 20 minutes before cooking. Pat dry and season.',
    'Heat the oil in a heavy skillet over high heat. Cook the steak 4–5 minutes per side, to 145°F (63°C) for medium-rare.',
    'Rest the steak 5 minutes, then slice against the grain.',
    'Serve with the potatoes (split, with butter and sour cream) and the salad.'
  ], 'USDA safe minimum for steak is 145°F (63°C) with a 3-minute rest.');

  add('beef-stroganoff', 10, 25, [
    '1|lb|ground beef', '8|oz|mushrooms|sliced', '1||small onion/small onions|diced', '1|cup|beef broth', '1|tbsp|flour', '3/4|cup|sour cream',
    '8|oz|egg noodles', '1/2|tsp|salt', '1/4|tsp|black pepper'
  ], [
    'Cook the noodles as the bag directs and drain.',
    'Cook the beef and onion in a large skillet 7–9 minutes until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Add the mushrooms and cook 5 minutes until soft. Sprinkle in the flour and stir 1 minute.',
    'Stir in the broth and simmer 3–4 minutes until thickened. Turn off the heat and stir in the sour cream, salt and pepper.',
    'Serve over the noodles.'
  ], 'Stir the sour cream in off the heat so it doesn\'t curdle.');

  add('meatloaf-and-green-beans', 15, 65, [
    '2|lb|ground beef', '2||egg/eggs', '3/4|cup|breadcrumbs', '1/2|cup|milk', '1|tsp|salt', '1/2|tsp|black pepper', '1/2|cup|ketchup|plus more for the top',
    '2|lb|potatoes|cut into chunks', '2|tbsp|butter', '1|bag|frozen green beans|about 12 oz'
  ], [
    'Heat the oven to 350°F (175°C).',
    'Mix the beef, eggs, breadcrumbs, milk, salt, pepper and ¼ cup ketchup with your hands just until combined. Shape into a loaf in a baking pan.',
    'Spread the rest of the ketchup on top. Bake about 60 minutes, until 160°F (71°C) in the center. Rest 10 minutes.',
    'Meanwhile boil the potatoes 15–18 minutes until tender, then mash with the butter. Heat the green beans.',
    'Slice the meatloaf and serve.'
  ], 'A larger meatloaf takes longer — go by the 160°F reading, not the clock.');

  add('baked-ziti', 15, 30, [
    '1|lb|ground beef', '1|lb|ziti', '24|oz|pasta sauce', '15|oz|ricotta cheese', '2|cup|shredded mozzarella', '1|tsp|Italian seasoning|optional'
  ], [
    'Heat the oven to 375°F (190°C). Cook the ziti 2 minutes less than the box says and drain.',
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Spoon off the fat and stir in the sauce and seasoning.',
    'Toss the pasta with the meat sauce. Spread half in a 9×13 dish, dot with the ricotta, then add the rest.',
    'Top with the mozzarella. Bake 20–25 minutes until bubbling and melted.'
  ]);

  // ---- Pork ----
  add('pork-chops-and-applesauce', 10, 25, [
    '2|lb|boneless pork chops|about 1 inch thick', '1|tsp|salt', '1/2|tsp|black pepper', '1|tsp|garlic powder', '!1|tbsp|vegetable oil',
    '1|cup|applesauce', '2|lb|potatoes|cut into chunks', '2|tbsp|butter', '1|bag|frozen green beans|about 12 oz'
  ], [
    'Boil the potatoes 15–18 minutes until tender, then mash with the butter.',
    'Pat the chops dry and season with salt, pepper and garlic powder.',
    'Cook in the oil in a hot skillet 4–5 minutes per side, until 145°F (63°C) inside. Rest 3 minutes.',
    'Heat the green beans.',
    'Serve the chops with applesauce, potatoes and green beans.'
  ], 'Pork is safe and juiciest at 145°F with a 3-minute rest — a little pink is fine.');

  add('pulled-pork-sandwiches', 10, '8 hr on Low', [
    '3|lb|pork shoulder', '1|tsp|salt', '1|tsp|paprika', '1/2|cup|water', '1|cup|BBQ sauce|plus more for serving', '8||hamburger bun/hamburger buns', '3|cup|coleslaw mix',
    '3|tbsp|mayonnaise|for the slaw', '1|tbsp|vinegar|for the slaw'
  ], [
    'Rub the pork with salt and paprika and put it in the slow cooker with the water.',
    'Cover and cook 8 hours on Low (or 5–6 on High) until it pulls apart easily — that\'s well past the safe 145°F (63°C), around 195°F (90°C).',
    'Lift out the pork, discard the fat and shred with two forks. Pour off most of the liquid.',
    'Return the pork and stir in the BBQ sauce.',
    'Mix the slaw with the mayonnaise and vinegar. Pile pork and slaw on buns.'
  ], 'Makes plenty — leftovers freeze well for another night.');

  add('sausage-and-peppers', 10, 25, [
    '1 1/2|lb|Italian sausage links', '3||bell pepper/bell peppers|sliced', '1||onion/onions|sliced', '!1|tbsp|olive oil', '4||hoagie roll/hoagie rolls'
  ], [
    'Brown the sausages in the oil in a large skillet over medium heat, 5 minutes, turning.',
    'Add the peppers and onion. Cover and cook 15 minutes, stirring now and then, until the vegetables are soft and the sausage reads 160°F (71°C).',
    'Slice the sausages or leave them whole.',
    'Serve in the rolls with the peppers and onions.'
  ]);

  add('pancakes-and-bacon', 5, 20, [
    '2|cup|pancake mix', '1 1/2|cup|water or milk|check your mix', '1|pkg|bacon|about 12 oz', '4||egg/eggs|optional', '1/2|cup|syrup', '!1|tbsp|butter|for the pan'
  ], [
    'Lay the bacon on a foil-lined baking sheet and bake at 400°F (200°C) for 15–20 minutes until crisp.',
    'Stir the pancake mix and liquid just until combined; small lumps are fine.',
    'Heat a skillet over medium heat with a little butter. Pour ¼ cup batter per pancake. Flip when bubbles form on top, about 2 minutes, and cook 1 minute more.',
    'Fry or scramble the eggs if using.',
    'Serve with syrup.'
  ]);

  add('ham-and-cheese-sliders', 10, 15, [
    '1|lb|deli ham', '12||slider roll/slider rolls', '6|slice|cheese', '3|tbsp|butter|melted', '1|tsp|mustard|optional', '2|cup|baby carrots|for serving'
  ], [
    'Heat the oven to 350°F (175°C).',
    'Without separating them, slice the slab of rolls in half. Put the bottoms in a baking dish.',
    'Layer the ham and cheese, then the tops.',
    'Mix the butter and mustard and brush over the tops. Cover with foil.',
    'Bake 12–15 minutes until the cheese melts. Serve with carrots.'
  ]);

  add('pork-carnitas-bowls', 15, '8 hr on Low', [
    '2|lb|pork shoulder', '1|tsp|salt', '1|tsp|ground cumin', '1|tsp|chili powder', '1/2|cup|orange juice or water', '1|cup|rice|uncooked', '2|cup|water|for the rice',
    '1|can|black beans|drained', '1|cup|salsa', '3||lime/limes'
  ], [
    'Rub the pork with salt, cumin and chili powder. Put it in the slow cooker with the orange juice.',
    'Cover and cook 8 hours on Low until it pulls apart easily (around 195°F / 90°C; safe from 145°F / 63°C). Shred and discard the fat.',
    'For crispy edges, spread the pork on a sheet pan and broil 3–5 minutes.',
    'Cook the rice and warm the beans.',
    'Build bowls with rice, beans, pork, salsa and a squeeze of lime.'
  ]);

  add('sausage-and-white-bean-soup', 10, 25, [
    '1|lb|smoked sausage|sliced', '2|can|white beans|drained', '4|cup|chicken broth', '4|cup|fresh spinach', '1||onion/onions|diced', '2|clove|garlic|minced', '!1|tbsp|olive oil'
  ], [
    'Brown the sausage in the oil in a large pot, 5 minutes.',
    'Add the onion and cook 4 minutes, then the garlic for 30 seconds.',
    'Add the broth and beans. Simmer 10–15 minutes.',
    'Stir in the spinach until it wilts, about 1 minute.',
    'Season with pepper and serve.'
  ], 'Smoked sausage is already cooked; you\'re just heating it through.');

  add('teriyaki-pork-tenderloin', 10, 30, [
    '2|lb|pork tenderloin', '1/2|cup|teriyaki sauce', '1|cup|rice|uncooked', '2|cup|water|for the rice', '4|cup|broccoli florets', '!1|tbsp|vegetable oil'
  ], [
    'Heat the oven to 425°F (220°C). Toss the pork in half the teriyaki sauce.',
    'Brown the pork in the oil in an oven-safe skillet, 2 minutes per side.',
    'Roast 18–22 minutes, brushing with more sauce halfway, until 145°F (63°C). Rest 5 minutes and slice.',
    'Meanwhile cook the rice and steam the broccoli.',
    'Serve the slices over rice with broccoli.'
  ]);

  // ---- Turkey ----
  add('turkey-chili', 10, 35, [
    '1|lb|ground turkey', '1||onion/onions|diced', '2|can|kidney beans|15 oz each, drained', '2|can|diced tomatoes|14.5 oz each',
    '2|tbsp|chili powder', '1|tsp|ground cumin', '1|tsp|salt', '1|cup|water', '!1|tbsp|vegetable oil'
  ], [
    'Heat the oil in a large pot. Cook the turkey and onion 8–10 minutes, breaking it up, until no pink remains (165°F / 74°C).',
    'Stir in the chili powder, cumin and salt for 1 minute.',
    'Add the beans, tomatoes and water and bring to a boil.',
    'Simmer on low 20–25 minutes, stirring now and then, until thick.'
  ]);

  add('turkey-burgers', 10, 25, [
    '1 1/2|lb|ground turkey', '1|tsp|salt', '1/2|tsp|garlic powder', '1/2|tsp|black pepper', '!1|tbsp|vegetable oil', '4||hamburger bun/hamburger buns',
    '4||lettuce leaf/lettuce leaves', '1||tomato/tomatoes|sliced', '1|bag|frozen sweet potato fries|about 20 oz'
  ], [
    'Bake the sweet potato fries as the bag directs.',
    'Gently mix the turkey with the salt, garlic powder and pepper. Shape 4 patties.',
    'Cook in the oil over medium heat 5–6 minutes per side, until 165°F (74°C) in the middle.',
    'Serve on buns with lettuce and tomato.'
  ], 'Turkey burgers must reach 165°F — higher than beef.');

  add('turkey-meatballs-and-pasta', 15, 25, [
    '1|lb|ground turkey', '1||egg/eggs', '1/2|cup|breadcrumbs', '1/2|tsp|salt', '1|tsp|Italian seasoning', '24|oz|pasta sauce', '12|oz|spaghetti'
  ], [
    'Heat the oven to 400°F (200°C). Line a baking sheet with foil.',
    'Mix the turkey, egg, breadcrumbs, salt and seasoning. Roll into 1½-inch balls (about 16).',
    'Bake 15–18 minutes until 165°F (74°C) inside.',
    'Meanwhile cook the spaghetti and warm the sauce. Add the meatballs to the sauce for a few minutes.',
    'Serve over the spaghetti.'
  ]);

  add('turkey-taco-lettuce-wraps', 10, 15, [
    '1|lb|ground turkey', '2|tbsp|taco seasoning', '1/2|cup|water', '1||head romaine lettuce/heads romaine lettuce|leaves separated',
    '1|cup|shredded cheese', '1/2|cup|salsa', '!1|tbsp|vegetable oil'
  ], [
    'Cook the turkey in the oil 8–10 minutes, breaking it up, until no pink remains (165°F / 74°C).',
    'Stir in the taco seasoning and water and simmer 3–5 minutes.',
    'Spoon into lettuce leaves and top with cheese and salsa.'
  ]);

  // ---- Fish and shrimp ----
  add('fish-tacos', 10, 20, [
    '1|box|frozen breaded fish fillets|about 8 pieces', '8||small flour tortilla/small flour tortillas', '2|cup|coleslaw mix', '3||lime/limes',
    '1/2|cup|sour cream', '1|tsp|hot sauce|optional'
  ], [
    'Bake the fish as the box directs, until hot and crisp (145°F / 63°C).',
    'Mix the sour cream with the juice of 1 lime and the hot sauce.',
    'Toss the coleslaw mix with the juice of another lime.',
    'Warm the tortillas. Fill with fish, slaw and sauce. Serve with lime wedges.'
  ]);

  add('baked-salmon-and-rice', 10, 25, [
    '1 1/2|lb|salmon fillets', '1|cup|rice|uncooked', '2|cup|water|for the rice', '1|bunch|asparagus', '2||lemon/lemons|1 sliced, 1 for juice',
    '2|clove|garlic|minced', '2|tbsp|olive oil', '1|tsp|salt', '1/2|tsp|black pepper'
  ], [
    'Heat the oven to 400°F (200°C) and line a baking sheet with foil.',
    'Start the rice: boil rice, water and ½ teaspoon salt; cover, cook on low 18 minutes, rest 5.',
    'Snap the woody ends off the asparagus. Put the salmon skin-side down and the asparagus on the pan. Drizzle with oil, add the garlic, salt and pepper, and lay lemon slices on the salmon.',
    'Bake 12–15 minutes until the salmon flakes easily and reads 145°F (63°C).',
    'Squeeze the other lemon over everything and serve with rice.'
  ]);

  add('tuna-noodle-casserole', 10, 30, [
    '3|can|tuna|5 oz each, drained', '8|oz|egg noodles', '1|can|cream of mushroom soup|10.5 oz', '3/4|cup|milk', '1|cup|frozen peas', '1|cup|shredded cheese'
  ], [
    'Heat the oven to 375°F (190°C). Cook the noodles 2 minutes less than the bag says and drain.',
    'Stir together the soup and milk. Fold in the noodles, tuna and peas.',
    'Spread in a baking dish and top with the cheese.',
    'Bake 20–25 minutes until bubbling.'
  ]);

  add('fish-sticks-and-mac-and-cheese', 5, 20, [
    '1|box|frozen fish sticks|about 24', '2|box|mac and cheese|7.25 oz each', '1|bag|frozen broccoli|about 12 oz'
  ], [
    'Bake the fish sticks as the box directs until hot and crisp.',
    'Make the mac and cheese as the box directs.',
    'Steam or microwave the broccoli.',
    'Serve together.'
  ]);

  add('lemon-tilapia-and-green-beans', 10, 20, [
    '1 1/2|lb|tilapia fillets|thawed', '2||lemon/lemons', '2|tbsp|butter|melted', '1|tsp|garlic powder', '1/2|tsp|salt', '1|bag|frozen green beans',
    '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Heat the oven to 400°F (200°C). Cook the rice (boil, cover, low 18 minutes).',
    'Lay the tilapia in a baking dish. Mix the butter, juice of 1 lemon, garlic powder and salt and pour over.',
    'Bake 10–12 minutes until the fish flakes easily (145°F / 63°C).',
    'Heat the green beans. Serve with lemon wedges.'
  ], 'Thaw frozen fish overnight in the fridge, or in its sealed bag in cold water for 30 minutes.');

  add('shrimp-stir-fry', 10, 12, [
    '1|lb|frozen shrimp|peeled, thawed', '1|bag|frozen stir-fry vegetables', '1/3|cup|soy sauce', '1|tbsp|brown sugar', '1|tsp|cornstarch',
    '2|tbsp|vegetable oil', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Cook the rice. Whisk the soy sauce, sugar, cornstarch and 2 tablespoons water.',
    'Heat 1 tablespoon oil over high heat. Cook the vegetables 4–5 minutes. Move them aside.',
    'Add the rest of the oil and the shrimp. Cook 2–3 minutes, turning, until pink and opaque.',
    'Pour in the sauce and toss 1 minute until glossy. Serve over rice.'
  ], 'Shrimp go rubbery fast — pull them as soon as they turn pink.');

  add('shrimp-scampi', 10, 15, [
    '1|lb|frozen shrimp|peeled, thawed', '12|oz|linguine', '4|tbsp|butter', '4|clove|garlic|minced', '2||lemon/lemons', '!2|tbsp|olive oil',
    '1/2|tsp|red pepper flakes|optional', '1/2|tsp|salt'
  ], [
    'Cook the linguine as the box directs. Save ½ cup of the water, then drain.',
    'Heat the oil and 2 tablespoons butter in a large skillet. Add the shrimp and cook 1–2 minutes per side until pink. Move to a plate.',
    'Add the rest of the butter, the garlic and pepper flakes. Cook 1 minute.',
    'Add the juice of 1 lemon, the pasta water, pasta and shrimp. Toss to coat.',
    'Season and serve with lemon wedges.'
  ]);

  add('shrimp-tacos', 10, 10, [
    '1|lb|frozen shrimp|peeled, thawed', '1|tsp|chili powder', '1/2|tsp|garlic powder', '1/2|tsp|salt', '!1|tbsp|vegetable oil',
    '8||small flour tortilla/small flour tortillas', '2|cup|coleslaw mix', '3||lime/limes'
  ], [
    'Toss the shrimp with the chili powder, garlic powder and salt.',
    'Cook in the oil over high heat 2–3 minutes until pink and opaque.',
    'Toss the slaw with the juice of 1 lime.',
    'Warm the tortillas and fill with shrimp and slaw. Serve with lime wedges.'
  ]);

  // ---- Eggs ----
  add('veggie-omelets-and-toast', 10, 15, [
    '8||egg/eggs', '2||bell pepper/bell peppers|diced', '2|cup|fresh spinach', '1|cup|shredded cheese', '4|tbsp|butter|divided', '8|slice|bread', '1/2|tsp|salt'
  ], [
    'Soften the peppers in 1 tablespoon butter, 4 minutes. Add the spinach until wilted. Set aside.',
    'Beat 2 eggs with a pinch of salt for each omelet.',
    'Melt a little butter in a small nonstick skillet over medium heat. Pour in the eggs and cook, lifting the edges, until almost set.',
    'Add some vegetables and cheese to half, fold and slide onto a plate. Repeat.',
    'Toast the bread and serve.'
  ]);

  add('breakfast-burritos', 10, 20, [
    '8||egg/eggs', '2|cup|frozen hash browns', '4||large flour tortilla/large flour tortillas', '1|cup|shredded cheese', '1/2|cup|salsa', '2|tbsp|butter', '1/2|tsp|salt'
  ], [
    'Cook the hash browns in 1 tablespoon butter in a large skillet until crisp, 8–10 minutes.',
    'Beat the eggs with the salt. Scramble in the rest of the butter over medium-low heat until just set.',
    'Warm the tortillas. Fill with potatoes, eggs, cheese and salsa.',
    'Fold in the sides and roll up.'
  ], 'Wrap extras in foil and freeze for quick breakfasts.');

  add('egg-fried-rice', 5, 12, [
    '3|cup|cooked rice|cold', '4||egg/eggs|beaten', '1 1/2|cup|frozen peas and carrots', '3|tbsp|soy sauce', '2|tbsp|vegetable oil', '2||green onion/green onions|optional'
  ], [
    'If you don\'t have leftover rice, cook 1 cup rice in 2 cups water and spread it out to cool.',
    'Heat 1 tablespoon oil over medium-high heat. Scramble the eggs until just set and move them to a plate.',
    'Add the rest of the oil and the peas and carrots for 2 minutes.',
    'Add the rice and let it sizzle 2–3 minutes. Stir in the eggs and soy sauce until hot.'
  ]);

  add('spinach-quiche-and-salad', 15, 45, [
    '1||refrigerated pie crust/refrigerated pie crusts', '6||egg/eggs', '1|cup|milk', '1 1/2|cup|shredded cheese', '2|cup|fresh spinach|chopped',
    '1/2|tsp|salt', '1|bag|salad mix', '1/4|cup|salad dressing'
  ], [
    'Heat the oven to 375°F (190°C). Press the crust into a 9-inch pie pan.',
    'Scatter the spinach and cheese in the crust.',
    'Whisk the eggs, milk and salt and pour over.',
    'Bake 40–45 minutes until the center is set and a knife comes out clean (160°F / 71°C). Rest 10 minutes.',
    'Serve with the dressed salad.'
  ]);

  // ---- Beans and meatless ----
  add('black-bean-quesadillas', 10, 15, [
    '2|can|black beans|rinsed and drained', '8||flour tortilla/flour tortillas|8-inch', '2|cup|shredded cheese', '1|cup|salsa', '1|tsp|ground cumin|optional',
    '!1|tbsp|vegetable oil|for the pan'
  ], [
    'Lightly mash the beans with a fork. Stir in half the salsa and the cumin.',
    'Spread the beans over half of each tortilla, add cheese and fold.',
    'Cook 2 or 3 at a time in a lightly oiled skillet over medium heat, 2–3 minutes per side, until golden and melted.',
    'Cut into wedges and serve with the rest of the salsa.'
  ]);

  add('vegetarian-chili', 10, 35, [
    '2|can|kidney beans|drained', '1|can|black beans|drained', '2|can|diced tomatoes', '1||onion/onions|diced', '2||bell pepper/bell peppers|diced',
    '2|tbsp|chili powder', '1|tsp|ground cumin', '1|tsp|salt', '1|cup|water', '!1|tbsp|vegetable oil'
  ], [
    'Cook the onion and peppers in the oil in a large pot 6–8 minutes until soft.',
    'Stir in the chili powder, cumin and salt for 1 minute.',
    'Add the beans, tomatoes and water. Simmer 20–25 minutes until thick.'
  ]);

  add('bean-and-rice-burritos', 10, 25, [
    '2|can|pinto beans|drained', '1|cup|rice|uncooked', '2|cup|water|for the rice', '4||large flour tortilla/large flour tortillas', '1 1/2|cup|shredded cheese',
    '1/2|cup|salsa', '1|tsp|ground cumin'
  ], [
    'Cook the rice.',
    'Warm the beans with the cumin and a splash of water, mashing some of them.',
    'Warm the tortillas. Fill with rice, beans, cheese and salsa.',
    'Roll up. For crisp burritos, toast seam-side down in a dry skillet 2 minutes.'
  ]);

  add('pasta-primavera', 10, 20, [
    '12|oz|penne', '2||zucchini/zucchini|sliced', '2||bell pepper/bell peppers|sliced', '1|pint|cherry tomatoes|halved', '3|clove|garlic|minced',
    '3|tbsp|olive oil', '1/2|cup|shredded parmesan', '1/2|tsp|salt'
  ], [
    'Cook the penne as the box directs. Save ½ cup of the water and drain.',
    'Heat the oil in a large skillet. Cook the zucchini and peppers 5–6 minutes until just tender.',
    'Add the tomatoes and garlic for 2 minutes.',
    'Toss in the pasta, a splash of pasta water, the parmesan and salt.'
  ]);

  add('homemade-cheese-pizza', 10, 15, [
    '2||ready-made pizza crust/ready-made pizza crusts|12-inch', '1|cup|pizza sauce', '3|cup|shredded mozzarella', '1|tsp|Italian seasoning|optional',
    '1|bag|salad mix', '1/4|cup|salad dressing'
  ], [
    'Heat the oven as the crust package directs (usually 450°F / 230°C).',
    'Spread the sauce on the crusts and top with mozzarella and seasoning.',
    'Bake 8–12 minutes until bubbling and golden at the edges.',
    'Serve with the dressed salad.'
  ]);

  add('grilled-cheese-and-tomato-soup', 5, 15, [
    '8|slice|bread', '8|slice|cheese', '4|tbsp|butter|softened', '2|can|tomato soup|10.75 oz each', '2|can|water or milk|use the soup can'
  ], [
    'Heat the soup with the water or milk in a saucepan, stirring.',
    'Butter one side of each bread slice. Put 2 slices of cheese between the unbuttered sides.',
    'Cook in a skillet over medium-low heat 3–4 minutes per side until golden and melted.',
    'Cut and serve with the soup for dipping.'
  ]);

  add('lentil-soup', 10, 40, [
    '1 1/2|cup|dried lentils|rinsed', '1|cup|baby carrots|chopped', '2||celery stalk/celery stalks|chopped', '1||onion/onions|diced', '8|cup|vegetable broth',
    '1|tsp|ground cumin', '1|tsp|salt', '!1|tbsp|olive oil'
  ], [
    'Cook the onion, carrots and celery in the oil in a large pot 6 minutes.',
    'Add the cumin for 30 seconds, then the lentils and broth.',
    'Bring to a boil, then simmer partly covered 30–35 minutes until the lentils are soft.',
    'Season with salt and serve.'
  ]);

  add('chickpea-curry', 10, 25, [
    '2|can|chickpeas|drained', '1|can|coconut milk|13.5 oz', '1|can|diced tomatoes', '1||onion/onions|diced', '2|tbsp|curry powder', '1|tsp|salt',
    '!1|tbsp|vegetable oil', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Cook the rice.',
    'Cook the onion in the oil 5 minutes. Add the curry powder for 1 minute.',
    'Add the chickpeas, tomatoes, coconut milk and salt. Simmer 15–20 minutes until thick.',
    'Serve over rice.'
  ]);

  add('tofu-veggie-stir-fry', 15, 15, [
    '28|oz|firm tofu|2 blocks, pressed and cubed', '2|tbsp|cornstarch', '1|bag|frozen stir-fry vegetables', '1/3|cup|soy sauce', '1|tbsp|brown sugar',
    '3|tbsp|vegetable oil', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Cook the rice. Press the tofu between towels for 10 minutes, then cube and toss with the cornstarch.',
    'Fry the tofu in 2 tablespoons oil over medium-high heat 8–10 minutes, turning, until golden. Move to a plate.',
    'Cook the vegetables in the rest of the oil 4–5 minutes.',
    'Add the tofu, soy sauce and sugar and toss 1 minute. Serve over rice.'
  ]);

  add('baked-mac-and-cheese', 10, 35, [
    '1|lb|elbow macaroni', '4|cup|shredded cheddar', '2 1/2|cup|milk', '4|tbsp|butter', '3|tbsp|flour', '1|tsp|salt', '1|bag|frozen broccoli'
  ], [
    'Heat the oven to 350°F (175°C). Cook the macaroni 2 minutes less than the box says; drain.',
    'Melt the butter in the pot, stir in the flour for 1 minute, then whisk in the milk. Simmer 3–4 minutes until thickened.',
    'Off the heat, stir in 3 cups of cheese and the salt until smooth. Stir in the macaroni.',
    'Spread in a baking dish, top with the rest of the cheese and bake 20 minutes.',
    'Serve with steamed broccoli.'
  ]);

  add('loaded-baked-potatoes', 10, 60, [
    '4||large russet potato/large russet potatoes', '1 1/2|cup|shredded cheese', '1/2|cup|sour cream', '2|cup|broccoli florets', '2|tbsp|butter', '1/2|tsp|salt'
  ], [
    'Heat the oven to 425°F (220°C). Scrub the potatoes, poke with a fork and bake on the rack 50–60 minutes until soft.',
    'Steam the broccoli for the last 5 minutes.',
    'Split the potatoes and fluff the insides with butter and salt.',
    'Top with broccoli, cheese and sour cream. Return to the oven 2–3 minutes to melt the cheese.'
  ], 'In a hurry? Microwave the potatoes 8–10 minutes, then crisp them in the oven for 10.');

  add('minestrone', 15, 35, [
    '1|can|white beans|drained', '1|can|kidney beans|drained', '2|can|diced tomatoes', '1|cup|small pasta', '2||zucchini/zucchini|diced',
    '1|cup|baby carrots|chopped', '1||onion/onions|diced', '8|cup|vegetable broth', '1|tsp|Italian seasoning', '!1|tbsp|olive oil'
  ], [
    'Cook the onion and carrots in the oil in a large pot 6 minutes.',
    'Add the broth, tomatoes, beans and seasoning. Bring to a boil and simmer 10 minutes.',
    'Add the pasta and zucchini and simmer 10 minutes more, until the pasta is tender.',
    'Season with salt and pepper.'
  ]);

  add('spinach-stuffed-shells', 20, 30, [
    '20||jumbo pasta shell/jumbo pasta shells', '15|oz|ricotta cheese', '2|cup|fresh spinach|chopped', '1||egg/eggs', '24|oz|pasta sauce',
    '2|cup|shredded mozzarella', '1/2|tsp|salt'
  ], [
    'Heat the oven to 375°F (190°C). Cook the shells as the box directs and drain.',
    'Mix the ricotta, spinach, egg, 1 cup mozzarella and salt.',
    'Spread 1 cup sauce in a 9×13 dish. Fill each shell and set it in the dish.',
    'Pour over the rest of the sauce and cheese. Cover with foil and bake 25 minutes, uncovering for the last 5.'
  ]);

  // ---- Core family meals ----
  add('beef-stew', 20, 120, [
    '2|lb|beef stew meat|1-inch pieces', '3|tbsp|flour', '1|tsp|salt', '1/2|tsp|black pepper', '2|tbsp|vegetable oil', '1||onion/onions|chopped',
    '4|cup|beef broth', '2|tbsp|tomato paste|optional', '2|lb|potatoes|cut into chunks', '1|lb|baby carrots'
  ], [
    'Toss the beef with the flour, salt and pepper.',
    'Brown the beef in the oil in a large pot over medium-high heat, in two batches, 4–5 minutes each. Move to a plate.',
    'Cook the onion 3 minutes. Add the broth and tomato paste, scraping up the browned bits. Return the beef.',
    'Cover and simmer on low 1 hour.',
    'Add the potatoes and carrots and simmer 45–60 minutes more, until the beef is fork-tender (well past the safe 145°F / 63°C).'
  ], 'Slow cooker: brown the beef, then everything in on Low for 8 hours.');

  add('one-pot-chicken-and-rice', 10, 35, [
    '1 1/2|lb|boneless skinless chicken thighs|cut into pieces', '1|cup|long-grain rice|uncooked', '2|cup|chicken broth', '1|cup|frozen peas',
    '1||onion/onions|diced', '1|tsp|garlic powder', '1|tsp|paprika', '1|tsp|salt', '!1|tbsp|vegetable oil'
  ], [
    'Season the chicken with paprika, garlic powder and salt. Brown it in the oil in a large pot with a lid, 5 minutes.',
    'Add the onion for 3 minutes, then stir in the rice for 1 minute.',
    'Pour in the broth and bring to a boil. Cover, turn to low and cook 18–20 minutes.',
    'Scatter the peas on top, cover again and rest 5 minutes off the heat. Check the chicken reads 165°F (74°C), then fluff and serve.'
  ]);

  add('salisbury-steak-and-mashed-potatoes', 15, 30, [
    '1 1/2|lb|ground beef', '1/2|cup|breadcrumbs', '1||egg/eggs', '1|tsp|salt', '8|oz|mushrooms|sliced', '1|packet|brown gravy mix', '1|cup|water',
    '3|lb|potatoes|cut into chunks', '4|tbsp|butter', '1/2|cup|milk', '1|bag|frozen green beans'
  ], [
    'Boil the potatoes 15–18 minutes until tender, then mash with the butter and milk.',
    'Mix the beef, breadcrumbs, egg and salt. Shape into 4 oval patties.',
    'Brown the patties in a large skillet 4 minutes per side. Move to a plate and pour off the fat.',
    'Cook the mushrooms 4 minutes. Whisk in the gravy mix and water and bring to a simmer.',
    'Return the patties, cover and simmer 10 minutes until they reach 160°F (71°C). Serve with potatoes and green beans.'
  ]);

  add('hamburger-steak-and-gravy', 10, 30, [
    '1 1/2|lb|ground beef', '1|tsp|salt', '1/2|tsp|black pepper', '2||onion/onions|sliced', '1|packet|brown gravy mix', '1|cup|water',
    '1|cup|rice|uncooked', '2|cup|water|for the rice', '1|bag|frozen corn'
  ], [
    'Cook the rice.',
    'Season the beef and shape into 4 patties. Brown in a skillet 4 minutes per side; move to a plate.',
    'Cook the onions in the drippings 6–8 minutes until soft.',
    'Whisk in the gravy mix and water. Return the patties, cover and simmer 8–10 minutes to 160°F (71°C).',
    'Heat the corn. Serve the patties and gravy over rice.'
  ]);

  add('roast-chicken-and-vegetables', 15, 90, [
    '1||whole chicken/whole chickens|4–5 lb', '2|lb|potatoes|cut into chunks', '1|lb|baby carrots', '1||onion/onions|cut into wedges',
    '3|tbsp|olive oil', '2|tsp|salt', '1|tsp|black pepper', '1|tsp|garlic powder'
  ], [
    'Heat the oven to 425°F (220°C). Toss the vegetables with 2 tablespoons oil and half the seasoning in a roasting pan.',
    'Pat the chicken dry, rub with the rest of the oil and seasoning and set it breast-side up on the vegetables.',
    'Roast 75–90 minutes, until a thermometer in the thickest part of the thigh reads 165°F (74°C) and the juices run clear.',
    'Rest 15 minutes before carving. Serve with the vegetables and pan juices.'
  ], 'Plan about 20 minutes per pound. Wash hands and surfaces after handling raw chicken.');

  add('cheesy-chicken-and-broccoli-casserole', 15, 60, [
    '1 1/2|lb|boneless skinless chicken breasts|cut into bite-size pieces', '1|cup|long-grain rice|uncooked', '2 1/4|cup|water', '1|can|cream of chicken soup',
    '1|bag|frozen broccoli|thawed', '2|cup|shredded cheese', '1|tsp|salt'
  ], [
    'Heat the oven to 375°F (190°C). Grease a 9×13 dish.',
    'Stir together the rice, water, soup and salt in the dish. Scatter the chicken and broccoli on top.',
    'Cover tightly with foil and bake 45 minutes.',
    'Uncover, stir, top with the cheese and bake 10–15 minutes more, until the rice is tender and the chicken reads 165°F (74°C).'
  ]);

  add('country-fried-steak', 15, 30, [
    '1 1/2|lb|cube steak|4 pieces', '1|cup|flour', '1|tsp|salt', '1/2|tsp|black pepper', '2||egg/eggs', '1/2|cup|milk', '1/2|cup|vegetable oil',
    '1|packet|country gravy mix', '3|lb|potatoes|for mashing', '4|tbsp|butter', '1|bag|frozen corn'
  ], [
    'Boil the potatoes until tender and mash with the butter. Heat the corn.',
    'Season the flour with salt and pepper. Beat the eggs with the milk.',
    'Dredge each steak in flour, dip in egg, then flour again.',
    'Fry in the hot oil over medium-high heat 3–4 minutes per side until golden and 160°F (71°C) inside (cube steak is tenderized, so cook it through).',
    'Make the gravy as the packet directs and spoon over the steaks.'
  ]);

  add('smothered-pork-chops', 10, 30, [
    '2|lb|boneless pork chops', '1|tsp|salt', '1/2|tsp|black pepper', '!1|tbsp|vegetable oil', '1||onion/onions|sliced', '1|can|cream of mushroom soup',
    '1/2|cup|milk', '1|cup|rice|uncooked', '2|cup|water|for the rice', '1|bag|frozen green beans'
  ], [
    'Cook the rice.',
    'Season the chops and brown them in the oil 3 minutes per side. Move to a plate.',
    'Cook the onion 5 minutes. Stir in the soup and milk.',
    'Return the chops, cover and simmer 10–12 minutes until 145°F (63°C). Rest 3 minutes.',
    'Heat the green beans. Serve the chops and gravy over rice.'
  ]);

  add('baked-chicken-and-mashed-potatoes', 15, 50, [
    '3|lb|chicken drumsticks', '2|tbsp|olive oil', '1|tsp|salt', '1|tsp|paprika', '1|tsp|garlic powder', '3|lb|potatoes|cut into chunks',
    '4|tbsp|butter', '1/2|cup|milk', '1|bag|frozen corn'
  ], [
    'Heat the oven to 425°F (220°C). Toss the drumsticks with oil and seasoning on a foil-lined pan.',
    'Bake 40–45 minutes, turning once, until 165°F (74°C) near the bone.',
    'Meanwhile boil the potatoes until tender and mash with the butter and milk.',
    'Heat the corn and serve.'
  ]);

  add('stuffed-peppers', 20, 50, [
    '4||large bell pepper/large bell peppers', '1|lb|ground beef', '1|cup|cooked rice', '24|oz|pasta sauce', '1|cup|shredded mozzarella', '1/2|tsp|salt'
  ], [
    'Heat the oven to 375°F (190°C). Cut the tops off the peppers and remove the seeds.',
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain, then stir in the rice, salt and 1 cup of sauce.',
    'Stand the peppers in a baking dish, fill them and pour the rest of the sauce around them.',
    'Cover with foil and bake 35 minutes. Uncover, top with cheese and bake 10–15 minutes more until the peppers are tender.'
  ]);

  add('chicken-tenders-and-fries', 5, 25, [
    '1|bag|frozen chicken tenders|about 24 oz', '1|bag|frozen fries|about 2 lb', '2|cup|baby carrots', '1/2|cup|ranch dressing'
  ], [
    'Heat the oven as the bags direct (usually 400–425°F / 200–220°C).',
    'Bake the tenders and fries on separate pans, turning halfway, until crisp. Uncooked frozen tenders must reach 165°F (74°C) — check the package.',
    'Serve with carrots and ranch.'
  ]);

  add('sweet-and-sour-chicken', 15, 20, [
    '1 1/2|lb|boneless skinless chicken breasts|cut into pieces', '2|tbsp|cornstarch', '2|tbsp|vegetable oil', '2||bell pepper/bell peppers|chopped',
    '1|can|pineapple chunks|20 oz, drained', '1|cup|sweet and sour sauce', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Cook the rice.',
    'Toss the chicken with the cornstarch. Cook in the oil over medium-high heat 6–7 minutes until golden and 165°F (74°C).',
    'Add the peppers for 3 minutes, then the pineapple and sauce.',
    'Simmer 2 minutes until glossy. Serve over rice.'
  ]);

  add('philly-cheesesteak-sandwiches', 10, 15, [
    '1 1/2|lb|shaved steak', '2||bell pepper/bell peppers|sliced', '1||onion/onions|sliced', '2|tbsp|vegetable oil', '8|slice|provolone cheese',
    '4||hoagie roll/hoagie rolls', '1/2|tsp|salt'
  ], [
    'Cook the peppers and onion in 1 tablespoon oil 6–8 minutes until soft. Move to a plate.',
    'Add the rest of the oil and the steak. Cook 3–4 minutes, breaking it up, until no pink remains (145°F / 63°C — thin steak gets there fast). Season.',
    'Mix in the vegetables and divide into 4 piles. Lay 2 slices of cheese on each and cover 1 minute to melt.',
    'Scoop each pile into a roll.'
  ], 'Shaved steak is thin, so it cooks through in minutes.');

  add('chicken-salad-sandwiches', 15, 20, [
    '1 1/2|lb|boneless skinless chicken breasts', '1/2|cup|mayonnaise', '2||celery stalk/celery stalks|diced', '1|cup|grapes|halved',
    '1/2|tsp|salt', '4||croissant/croissants'
  ], [
    'Simmer the chicken in a covered pan of water 15–18 minutes until 165°F (74°C). Cool, then chop.',
    'Mix the chicken with the mayonnaise, celery, grapes and salt.',
    'Chill if you have time. Split the croissants and fill.'
  ], 'Keep chicken salad refrigerated and eat within 3–4 days.');

  // ---- Mexican inspired ----
  add('chicken-fajitas', 15, 15, [
    '1 1/2|lb|boneless skinless chicken breasts|sliced into strips', '2|tbsp|fajita seasoning', '3||bell pepper/bell peppers|sliced', '1||onion/onions|sliced',
    '2|tbsp|vegetable oil', '8||small flour tortilla/small flour tortillas', '1/2|cup|sour cream'
  ], [
    'Toss the chicken with the seasoning.',
    'Cook the peppers and onion in 1 tablespoon oil over high heat 5–6 minutes. Move to a plate.',
    'Add the rest of the oil and the chicken. Cook 6–7 minutes until 165°F (74°C).',
    'Return the vegetables and toss. Serve in warm tortillas with sour cream.'
  ]);

  add('beef-fajitas', 15, 15, [
    '1 1/2|lb|flank steak|sliced thin against the grain', '2|tbsp|fajita seasoning', '3||bell pepper/bell peppers|sliced', '1||onion/onions|sliced',
    '2|tbsp|vegetable oil', '8||small flour tortilla/small flour tortillas', '1/2|cup|salsa'
  ], [
    'Toss the steak with the seasoning.',
    'Cook the peppers and onion in 1 tablespoon oil over high heat 5–6 minutes. Move to a plate.',
    'Sear the steak in the rest of the oil in two batches, 2–3 minutes, until browned (145°F / 63°C).',
    'Toss with the vegetables and serve in warm tortillas with salsa.'
  ]);

  add('beef-enchiladas', 15, 25, [
    '1|lb|ground beef', '1||onion/onions|diced', '8||flour tortilla/flour tortillas|8-inch', '2|can|enchilada sauce|10 oz each', '2|cup|shredded cheese'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Cook the beef and onion 8–10 minutes until no pink remains (160°F / 71°C). Drain and stir in ½ cup sauce and 1 cup cheese.',
    'Spread ½ cup sauce in a 9×13 dish. Roll the filling in the tortillas and lay them seam-side down.',
    'Top with the rest of the sauce and cheese. Bake 20–25 minutes until bubbling.'
  ]);

  add('taco-soup', 10, 30, [
    '1|lb|ground beef', '1|can|pinto beans|undrained', '1|can|black beans|undrained', '1|can|corn|undrained', '2|can|diced tomatoes',
    '2|tbsp|taco seasoning', '1|cup|water', '2|cup|tortilla chips|for serving'
  ], [
    'Cook the beef in a large pot 7–9 minutes until no pink remains (160°F / 71°C). Drain.',
    'Add the taco seasoning, beans, corn, tomatoes and water.',
    'Bring to a boil and simmer 20 minutes.',
    'Serve with crushed tortilla chips, and cheese or sour cream if you have them.'
  ], 'Freezes well for up to 3 months.');

  add('chicken-burrito-bowls', 15, 25, [
    '1 1/2|lb|boneless skinless chicken thighs', '1|tbsp|taco seasoning', '!1|tbsp|vegetable oil', '1|cup|rice|uncooked', '2|cup|water|for the rice',
    '1|can|black beans|drained', '1|can|corn|drained', '1|cup|salsa', '1|cup|shredded cheese'
  ], [
    'Cook the rice.',
    'Rub the chicken with the seasoning. Cook in the oil 5–6 minutes per side to 165°F (74°C). Rest 5 minutes and slice.',
    'Warm the beans and corn.',
    'Build bowls with rice, beans, corn, chicken, salsa and cheese.'
  ]);

  add('chicken-burritos', 15, 25, [
    '1|lb|boneless skinless chicken breasts', '1|tbsp|taco seasoning', '1|cup|rice|uncooked', '2|cup|water|for the rice', '1|can|refried beans',
    '4||large flour tortilla/large flour tortillas', '1|cup|shredded cheese', '1/2|cup|salsa', '!1|tbsp|vegetable oil'
  ], [
    'Cook the rice. Warm the refried beans.',
    'Season the chicken and cook in the oil 5–7 minutes per side to 165°F (74°C). Rest and chop.',
    'Spread beans down each tortilla, then rice, chicken, cheese and salsa.',
    'Fold in the sides and roll up. Toast seam-side down in a dry skillet 2 minutes if you like.'
  ]);

  add('beef-burritos', 10, 20, [
    '1|lb|ground beef', '2|tbsp|taco seasoning', '1/2|cup|water', '1|can|refried beans', '4||large flour tortilla/large flour tortillas',
    '1|cup|shredded cheese', '1/2|cup|salsa'
  ], [
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain.',
    'Stir in the seasoning and water and simmer 5 minutes. Warm the beans.',
    'Spread beans on each tortilla, add beef, cheese and salsa.',
    'Roll up and toast seam-side down in a dry skillet 2 minutes.'
  ]);

  add('cheese-quesadillas', 5, 15, [
    '8||flour tortilla/flour tortillas|8-inch', '3|cup|shredded cheese', '1/2|cup|salsa', '1/2|cup|sour cream', '!1|tbsp|butter|for the pan'
  ], [
    'Sprinkle cheese over half of each tortilla and fold.',
    'Cook 2 at a time in a lightly buttered skillet over medium heat, 2–3 minutes per side, until golden and melted.',
    'Cut into wedges. Serve with salsa and sour cream.'
  ]);

  add('bean-and-cheese-enchiladas', 10, 25, [
    '2|can|refried beans', '8||flour tortilla/flour tortillas|8-inch', '2|can|enchilada sauce', '3|cup|shredded cheese', '1|tsp|ground cumin'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Stir the cumin and 1 cup of cheese into the beans.',
    'Spread ½ cup sauce in a 9×13 dish. Fill and roll the tortillas and lay them seam-side down.',
    'Top with the rest of the sauce and cheese. Bake 20–25 minutes until bubbling.'
  ]);

  add('beef-and-bean-nachos', 10, 15, [
    '1|lb|ground beef', '2|tbsp|taco seasoning', '1/2|cup|water', '1|bag|tortilla chips|about 12 oz', '1|can|refried beans', '2|cup|shredded cheese',
    '1/2|cup|salsa', '1/2|cup|sour cream'
  ], [
    'Heat the oven to 400°F (200°C).',
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain, add the seasoning and water and simmer 3 minutes.',
    'Spread the chips on a large sheet pan. Dot with spoonfuls of beans and beef, then cover with cheese.',
    'Bake 6–8 minutes until melted. Top with salsa and sour cream.'
  ]);

  // ---- Pasta ----
  add('lasagna', 25, 70, [
    '1|lb|ground beef', '12||lasagna noodle/lasagna noodles', '48|oz|pasta sauce|2 jars', '15|oz|ricotta cheese', '1||egg/eggs', '4|cup|shredded mozzarella',
    '1|tsp|Italian seasoning', '1||frozen garlic bread loaf/frozen garlic bread loaves'
  ], [
    'Heat the oven to 375°F (190°C). Cook the noodles as the box directs and lay them flat on foil.',
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain and stir in the sauce.',
    'Mix the ricotta, egg, seasoning and 1 cup mozzarella.',
    'In a 9×13 dish layer: 1 cup sauce, 4 noodles, half the ricotta, 1 cup mozzarella, sauce. Repeat, then finish with noodles, sauce and the rest of the cheese.',
    'Cover with foil and bake 45 minutes; uncover for 15 more. Rest 15 minutes before cutting. Bake the garlic bread meanwhile.'
  ], 'Oven-ready (no-boil) noodles skip step 1 — add ½ cup water to the sauce.');

  add('ravioli-bake', 5, 35, [
    '25|oz|frozen cheese ravioli', '24|oz|pasta sauce', '2|cup|shredded mozzarella', '1|bag|salad mix', '1/4|cup|salad dressing'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Spread a little sauce in a 9×13 dish. Layer half the frozen ravioli, half the sauce and half the cheese. Repeat.',
    'Cover with foil and bake 25 minutes. Uncover and bake 10 minutes more until bubbling.',
    'Serve with the dressed salad.'
  ], 'No need to boil the ravioli first.');

  add('cheesy-beef-pasta-bake', 10, 30, [
    '1|lb|ground beef', '1|lb|penne', '24|oz|pasta sauce', '2|cup|shredded mozzarella'
  ], [
    'Heat the oven to 375°F (190°C). Cook the penne 2 minutes less than the box says; drain.',
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain and stir in the sauce.',
    'Mix with the pasta, spread in a baking dish and top with cheese.',
    'Bake 20 minutes until melted and bubbling.'
  ]);

  add('chicken-parmesan', 20, 30, [
    '1 1/2|lb|boneless skinless chicken breasts', '2||egg/eggs', '1|cup|breadcrumbs', '1/2|cup|shredded parmesan|optional, mixed into the crumbs',
    '24|oz|pasta sauce', '1 1/2|cup|shredded mozzarella', '12|oz|spaghetti', '3|tbsp|olive oil'
  ], [
    'Heat the oven to 425°F (220°C). Slice the breasts in half horizontally so they\'re thin and even.',
    'Dip each piece in beaten egg, then the crumbs. Lay on an oiled baking sheet and drizzle with oil.',
    'Bake 15 minutes. Spoon a little sauce and mozzarella on each and bake 5–8 minutes more, until 165°F (74°C) inside.',
    'Meanwhile cook the spaghetti and warm the rest of the sauce.',
    'Serve the chicken over spaghetti with sauce.'
  ]);

  add('goulash', 10, 30, [
    '1|lb|ground beef', '1||onion/onions|diced', '2|cup|elbow macaroni|uncooked', '2|can|diced tomatoes', '1|can|tomato sauce|15 oz', '2|cup|water',
    '1|tbsp|Italian seasoning', '1|tsp|salt'
  ], [
    'Cook the beef and onion in a large pot 8–10 minutes until no pink remains (160°F / 71°C). Drain.',
    'Add the tomatoes, tomato sauce, water and seasoning. Bring to a boil.',
    'Stir in the macaroni, cover and simmer 15–18 minutes, stirring now and then, until tender.',
    'Rest 5 minutes to thicken.'
  ]);

  add('cheeseburger-macaroni', 5, 25, [
    '1|lb|ground beef', '2|cup|elbow macaroni|uncooked', '1|can|tomato sauce|8 oz', '2|cup|milk', '1 1/2|cup|water', '2|cup|shredded cheese', '1|tsp|salt', '1/2|tsp|onion powder'
  ], [
    'Cook the beef in a large skillet 7–9 minutes until no pink remains (160°F / 71°C). Drain.',
    'Stir in the macaroni, tomato sauce, milk, water, salt and onion powder. Bring to a boil.',
    'Cover and simmer on low 12–15 minutes, stirring often, until the pasta is tender.',
    'Stir in the cheese until melted.'
  ], 'Like the boxed kind, from scratch.');

  // ---- Budget ----
  add('red-beans-and-rice', 10, 40, [
    '1|lb|smoked sausage|sliced', '2|can|kidney beans|undrained', '1||onion/onions|diced', '1||bell pepper/bell peppers|diced', '2||celery stalk/celery stalks|diced',
    '2|tsp|Cajun seasoning', '1|cup|water', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Cook the rice.',
    'Brown the sausage in a large pot 5 minutes.',
    'Add the onion, pepper and celery and cook 6–8 minutes until soft.',
    'Add the beans, seasoning and water. Simmer 20–25 minutes, mashing some beans to thicken.',
    'Serve over rice.'
  ]);

  add('ham-and-beans-with-cornbread', 15, '2–2½ hr', [
    '1|lb|dried navy beans|soaked overnight', '1||ham hock/ham hocks', '1||onion/onions|diced', '8|cup|water', '1|tsp|salt|add at the end',
    '1|box|cornbread mix', '1||egg/eggs|for the cornbread', '1/3|cup|milk|for the cornbread'
  ], [
    'Drain the soaked beans. Put them in a large pot with the ham hock, onion and water.',
    'Bring to a boil, then simmer partly covered 1½–2 hours until the beans are creamy.',
    'Pull the meat off the hock, chop it and return it. Season with salt.',
    'Bake the cornbread as the box directs while the beans finish.'
  ], 'No time to soak? Boil the beans 2 minutes, then let them sit covered 1 hour.');

  add('potato-soup', 15, 30, [
    '3|lb|potatoes|peeled and diced', '1||onion/onions|diced', '4|cup|chicken broth', '2|cup|milk', '1 1/2|cup|shredded cheese', '6|slice|bacon',
    '2|tbsp|butter', '1|tsp|salt'
  ], [
    'Cook the bacon in a large pot until crisp. Crumble and set aside; pour off all but 1 tablespoon fat.',
    'Add the butter and onion and cook 5 minutes.',
    'Add the potatoes and broth. Simmer 15–18 minutes until very soft.',
    'Mash some potatoes right in the pot to thicken. Stir in the milk and salt and heat through (don\'t boil).',
    'Serve topped with cheese and bacon.'
  ]);

  add('vegetable-soup', 15, 35, [
    '1|bag|frozen mixed vegetables', '2|can|diced tomatoes', '2|lb|potatoes|diced', '1||onion/onions|diced', '8|cup|vegetable broth',
    '1|tsp|Italian seasoning', '1|tsp|salt', '!1|tbsp|olive oil', '8|slice|bread|for serving'
  ], [
    'Cook the onion in the oil in a large pot 5 minutes.',
    'Add the potatoes, broth, tomatoes and seasoning. Simmer 15 minutes.',
    'Add the frozen vegetables and simmer 10 minutes more until the potatoes are tender.',
    'Season with salt and serve with bread.'
  ]);

  add('chicken-and-rice-bake', 10, 60, [
    '2|lb|boneless skinless chicken thighs', '1|cup|long-grain rice|uncooked', '1|can|cream of mushroom soup', '1 1/2|cup|chicken broth',
    '1|bag|frozen broccoli', '1|tsp|garlic powder', '1|tsp|paprika', '1/2|tsp|salt'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Stir the rice, soup and broth together in a 9×13 dish. Lay the chicken on top and season.',
    'Cover tightly with foil and bake 50 minutes.',
    'Scatter the broccoli around the chicken, cover again and bake 10 minutes more, until the rice is tender and the chicken reads 165°F (74°C).'
  ]);

  add('split-pea-soup', 15, '1½–2 hr', [
    '1|lb|dried split peas|rinsed', '1||ham hock/ham hocks', '1|cup|baby carrots|chopped', '1||onion/onions|diced', '2||celery stalk/celery stalks|diced',
    '8|cup|water', '1|tsp|salt|add at the end'
  ], [
    'Put everything except the salt in a large pot.',
    'Bring to a boil, then simmer partly covered 1½–2 hours, stirring now and then, until the peas break down.',
    'Pull the meat off the hock, chop it and stir it back in.',
    'Season with salt. Thin with water if it\'s too thick.'
  ]);

  add('kielbasa-and-cabbage', 10, 30, [
    '1 1/2|lb|kielbasa|sliced', '1||head cabbage/heads cabbage|chopped', '2|lb|potatoes|diced', '1||onion/onions|sliced', '2|tbsp|butter', '1/2|cup|water', '1/2|tsp|salt'
  ], [
    'Brown the kielbasa in a large pot 5 minutes. Move to a plate.',
    'Add the butter, onion and potatoes and cook 5 minutes.',
    'Add the cabbage, water and salt. Cover and cook 15–20 minutes, stirring now and then, until tender.',
    'Return the kielbasa and heat through.'
  ], 'Kielbasa is fully cooked; you\'re just browning and heating it.');

  add('tuna-melts-and-tomato-soup', 10, 15, [
    '2|can|tuna|drained', '1/3|cup|mayonnaise', '8|slice|bread', '4|slice|cheese', '3|tbsp|butter', '2|can|tomato soup', '2|can|water|use the soup can'
  ], [
    'Heat the soup with the water.',
    'Mix the tuna and mayonnaise.',
    'Butter one side of each slice. Build sandwiches with tuna and cheese, buttered sides out.',
    'Cook over medium-low heat 3–4 minutes per side until golden and melted. Serve with the soup.'
  ]);

  add('salmon-patties-and-corn', 15, 15, [
    '2|can|salmon|14.75 oz each, drained', '2||egg/eggs', '3/4|cup|breadcrumbs', '1/2|tsp|salt', '3|tbsp|vegetable oil', '1|bag|frozen corn', '1|box|mac and cheese'
  ], [
    'Make the mac and cheese and heat the corn.',
    'Flake the salmon, removing any large bones and skin. Mix with the eggs, breadcrumbs and salt.',
    'Shape into 8 patties.',
    'Fry in the oil over medium heat 3–4 minutes per side until golden and hot through (160°F / 71°C with the egg).'
  ]);

  add('shrimp-and-sausage-jambalaya', 15, 35, [
    '1|lb|frozen shrimp|peeled, thawed', '1|lb|smoked sausage|sliced', '1|cup|long-grain rice|uncooked', '1|can|diced tomatoes', '1||bell pepper/bell peppers|diced',
    '1||onion/onions|diced', '2|cup|chicken broth', '2|tsp|Cajun seasoning', '!1|tbsp|vegetable oil'
  ], [
    'Brown the sausage in the oil in a large pot 5 minutes.',
    'Add the onion and pepper and cook 5 minutes. Stir in the rice and seasoning for 1 minute.',
    'Add the tomatoes and broth. Bring to a boil, cover and simmer on low 20 minutes.',
    'Stir in the shrimp, cover and cook 4–5 minutes until pink and opaque and the rice is tender.'
  ]);

  // ---- Stretch to payday ----
  add('rice-and-bean-bowls', 5, 25, [
    '1|cup|rice|uncooked', '2|cup|water|for the rice', '2|can|black beans|drained', '1|can|corn|drained', '1|cup|salsa', '1|cup|shredded cheese', '1|tsp|ground cumin'
  ], [
    'Cook the rice.',
    'Warm the beans and corn with the cumin.',
    'Build bowls with rice, beans and corn, salsa and cheese.'
  ]);

  add('hot-dogs-and-baked-beans', 5, 15, [
    '8||hot dog/hot dogs', '8||hot dog bun/hot dog buns', '1|can|baked beans|28 oz', '2|cup|baby carrots'
  ], [
    'Heat the beans in a saucepan, stirring.',
    'Grill, pan-fry or boil the hot dogs until steaming hot all the way through (165°F / 74°C).',
    'Serve in buns with the beans and carrots.'
  ], 'Hot dogs are pre-cooked but should still be heated until steaming.');

  add('ramen-stir-fry-with-egg', 5, 12, [
    '4|pkg|ramen noodles|use half the flavor packets', '1|bag|frozen stir-fry vegetables', '3||egg/eggs', '2|tbsp|soy sauce', '!1|tbsp|vegetable oil'
  ], [
    'Boil the noodles 2 minutes (no flavor packet yet) and drain.',
    'Cook the vegetables in the oil over high heat 4 minutes.',
    'Push them aside and scramble the eggs until set.',
    'Add the noodles, soy sauce and 2 flavor packets. Toss until hot.'
  ], 'Using half the flavor packets keeps the salt down.');

  add('egg-and-potato-hash', 5, 20, [
    '4|cup|frozen hash browns', '1||onion/onions|diced', '1||bell pepper/bell peppers|diced', '8||egg/eggs', '1|cup|shredded cheese', '2|tbsp|vegetable oil', '1/2|tsp|salt'
  ], [
    'Cook the hash browns, onion and pepper in the oil in a large skillet 10–12 minutes until crisp.',
    'Make 8 wells and crack an egg into each. Season.',
    'Cover and cook on low 5–7 minutes until the whites are set and yolks are firm.',
    'Sprinkle with cheese and serve.'
  ]);

  add('egg-salad-sandwiches', 15, 12, [
    '8||egg/eggs', '1/3|cup|mayonnaise', '1|tsp|mustard', '1/2|tsp|salt', '8|slice|bread', '2|cup|baby carrots'
  ], [
    'Cover the eggs with water, bring to a boil, then cover, turn off the heat and wait 12 minutes.',
    'Cool them in cold water, peel and chop.',
    'Mix with the mayonnaise, mustard and salt.',
    'Make sandwiches and serve with carrots.'
  ]);

  add('blt-sandwiches', 10, 15, [
    '1|pkg|bacon|about 12 oz', '8|slice|bread|toasted', '4||lettuce leaf/lettuce leaves', '2||tomato/tomatoes|sliced', '1/4|cup|mayonnaise'
  ], [
    'Bake the bacon on a foil-lined pan at 400°F (200°C) 15–20 minutes until crisp.',
    'Toast the bread and spread with mayonnaise.',
    'Layer bacon, lettuce and tomato.'
  ]);

  add('french-bread-pizza', 5, 15, [
    '1||loaf French bread/loaves French bread', '1|cup|pizza sauce', '2|cup|shredded mozzarella', '1|pkg|pepperoni|about 6 oz'
  ], [
    'Heat the oven to 425°F (220°C).',
    'Split the loaf in half lengthwise, then into 4 pieces. Lay cut-side up on a baking sheet.',
    'Spread with sauce and top with cheese and pepperoni.',
    'Bake 10–12 minutes until bubbling.'
  ]);

  // ---- Breakfast for dinner ----
  add('pancakes-and-sausage', 5, 20, [
    '2|cup|pancake mix', '1 1/2|cup|milk|check your mix', '1|pkg|breakfast sausage links|about 12 oz', '1/2|cup|syrup', '!1|tbsp|butter'
  ], [
    'Cook the sausage links in a skillet over medium heat 10–12 minutes, turning, until browned and 160°F (71°C).',
    'Stir the pancake mix and milk just until combined.',
    'Cook ¼ cup batter per pancake on a buttered griddle, flipping when bubbles form.',
    'Serve with the sausage and syrup.'
  ]);

  add('biscuits-and-gravy', 10, 20, [
    '1|lb|breakfast sausage|bulk roll', '1|can|refrigerated biscuits|8 count', '1/4|cup|flour', '3|cup|milk', '1/2|tsp|black pepper', '4||egg/eggs|optional, for serving'
  ], [
    'Bake the biscuits as the can directs.',
    'Cook the sausage in a large skillet 7–9 minutes, breaking it up, until no pink remains (160°F / 71°C). Don\'t drain.',
    'Sprinkle in the flour and stir 1 minute. Slowly stir in the milk and simmer 3–5 minutes until thick. Add the pepper.',
    'Split the biscuits and cover with gravy. Serve with fried or scrambled eggs.'
  ]);

  add('scrambled-eggs-and-toast', 5, 10, [
    '10||egg/eggs', '2|tbsp|milk', '2|tbsp|butter', '1/2|tsp|salt', '8|slice|bread', '4||apple/apples|sliced'
  ], [
    'Beat the eggs, milk and salt.',
    'Melt the butter in a nonstick skillet over medium-low heat. Add the eggs and stir slowly until softly set, 3–4 minutes.',
    'Toast and butter the bread.',
    'Serve with sliced apples.'
  ]);

  add('breakfast-casserole', 15, 50, [
    '1|lb|breakfast sausage|bulk', '4|cup|frozen hash browns', '8||egg/eggs', '2|cup|milk', '1 1/2|cup|shredded cheese', '1/2|tsp|salt'
  ], [
    'Heat the oven to 350°F (175°C). Grease a 9×13 dish.',
    'Cook the sausage 7–9 minutes until no pink remains (160°F / 71°C). Drain.',
    'Spread the hash browns in the dish, then the sausage and cheese.',
    'Whisk the eggs, milk and salt and pour over.',
    'Bake 45–50 minutes until set in the center (160°F / 71°C). Rest 10 minutes.'
  ], 'Assemble the night before, refrigerate and add 10 minutes to the bake.');

  add('french-toast-and-bacon', 5, 20, [
    '8|slice|bread', '4||egg/eggs', '1|cup|milk', '1|tsp|cinnamon', '1|pkg|bacon', '1/2|cup|syrup', '!2|tbsp|butter'
  ], [
    'Bake the bacon on a foil-lined pan at 400°F (200°C) 15–20 minutes until crisp.',
    'Whisk the eggs, milk and cinnamon in a shallow dish.',
    'Dip each slice for a few seconds per side.',
    'Cook on a buttered griddle over medium heat 2–3 minutes per side until golden. Serve with syrup and bacon.'
  ]);

  // ---- Sheet pan ----
  add('sheet-pan-sausage-and-vegetables', 15, 30, [
    '1 1/2|lb|smoked sausage|sliced', '2|lb|potatoes|cut into ¾-inch pieces', '2||bell pepper/bell peppers|chopped', '1||head broccoli/heads broccoli|cut into florets',
    '3|tbsp|olive oil', '1|tsp|garlic powder', '1|tsp|salt'
  ], [
    'Heat the oven to 425°F (220°C).',
    'Toss the potatoes with half the oil and seasoning and roast 15 minutes.',
    'Add the sausage, peppers and broccoli with the rest of the oil and seasoning. Roast 15 minutes more until the potatoes are tender and the sausage is browned.'
  ], 'Use two pans for 6 or more servings.');

  add('sheet-pan-teriyaki-chicken', 10, 30, [
    '2|lb|boneless skinless chicken thighs', '1/2|cup|teriyaki sauce', '2||head broccoli/heads broccoli|cut into florets', '!1|tbsp|vegetable oil',
    '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Heat the oven to 425°F (220°C). Cook the rice.',
    'Toss the chicken with half the sauce and lay it on a lined sheet pan. Roast 12 minutes.',
    'Add the broccoli tossed with the oil. Roast 10–12 minutes more, until the chicken reads 165°F (74°C).',
    'Brush with the rest of the sauce and serve over rice.'
  ]);

  add('italian-chicken-and-potatoes', 15, 40, [
    '2|lb|boneless skinless chicken thighs', '2|lb|potatoes|cut into chunks', '2||zucchini/zucchini|sliced', '1/2|cup|Italian dressing'
  ], [
    'Heat the oven to 425°F (220°C).',
    'Toss the potatoes with a third of the dressing and roast 15 minutes.',
    'Add the chicken and zucchini, tossed with the rest of the dressing.',
    'Roast 20–25 minutes more, until the potatoes are tender and the chicken reads 165°F (74°C).'
  ]);

  add('cajun-chicken-and-veggies', 15, 25, [
    '1 1/2|lb|boneless skinless chicken breasts|cut into chunks', '2||bell pepper/bell peppers|chopped', '2||zucchini/zucchini|chopped', '1||onion/onions|chopped',
    '2|tbsp|olive oil', '2|tsp|Cajun seasoning', '1|cup|rice|uncooked', '2|cup|water|for the rice'
  ], [
    'Heat the oven to 425°F (220°C). Cook the rice.',
    'Toss the chicken and vegetables with the oil and seasoning on a large sheet pan.',
    'Roast 20–25 minutes, stirring once, until the chicken reads 165°F (74°C).',
    'Serve over rice.'
  ]);

  // ---- Slow cooker ----
  add('slow-cooker-chili', 15, '6–8 hr on Low', [
    '2|lb|ground beef', '1||onion/onions|diced', '2|can|kidney beans|drained', '2|can|diced tomatoes', '1|can|tomato sauce|15 oz', '3|tbsp|chili powder',
    '2|tsp|ground cumin', '1|tsp|salt'
  ], [
    'Brown the beef and onion in a skillet 8–10 minutes until no pink remains (160°F / 71°C). Drain.',
    'Put everything in the slow cooker and stir.',
    'Cover and cook 6–8 hours on Low or 3–4 on High.'
  ], 'Always brown ground meat first — raw ground beef shouldn\'t go into a slow cooker.');

  add('slow-cooker-bbq-chicken-and-potatoes', 10, '6 hr on Low', [
    '2|lb|boneless skinless chicken breasts', '1|cup|BBQ sauce', '4||large russet potato/large russet potatoes', '1|bag|frozen corn', '2|tbsp|butter'
  ], [
    'Put the chicken in the slow cooker and pour the sauce over. Wrap the potatoes in foil and set them on top.',
    'Cover and cook 6 hours on Low, until the chicken reads 165°F (74°C) and the potatoes are soft.',
    'Shred the chicken in the sauce.',
    'Heat the corn. Split the potatoes, add butter and top with chicken.'
  ]);

  add('mississippi-chicken', 10, '6 hr on Low', [
    '2|lb|boneless skinless chicken breasts', '1|packet|ranch seasoning', '1|packet|brown gravy mix', '6||pepperoncini pepper/pepperoncini peppers|plus a splash of the juice',
    '4|tbsp|butter', '3|lb|potatoes|for mashing', '1/2|cup|milk'
  ], [
    'Put the chicken in the slow cooker. Sprinkle with both seasoning packets, then add the peppers, a splash of their juice and the butter.',
    'Cover and cook 6 hours on Low, until the chicken reads 165°F (74°C) and shreds easily.',
    'Shred the chicken in the juices.',
    'Boil and mash the potatoes with milk. Serve the chicken over them.'
  ]);

  add('white-chicken-chili', 10, '6 hr on Low', [
    '1 1/2|lb|boneless skinless chicken breasts', '2|can|white beans|drained', '1|can|diced green chiles|4 oz', '4|cup|chicken broth', '1||onion/onions|diced',
    '2|tsp|ground cumin', '1|tsp|salt', '1/2|cup|sour cream'
  ], [
    'Put everything except the sour cream in the slow cooker.',
    'Cover and cook 6 hours on Low (3 on High), until the chicken reads 165°F (74°C).',
    'Shred the chicken in the pot. Stir in the sour cream.',
    'Mash a few beans against the side to thicken if you like.'
  ]);

  add('slow-cooker-chicken-tortilla-soup', 10, '6 hr on Low', [
    '1 1/2|lb|boneless skinless chicken breasts', '1|can|black beans|drained', '1|can|corn|drained', '2|can|diced tomatoes', '4|cup|chicken broth',
    '2|tbsp|taco seasoning', '2|cup|tortilla chips|for serving'
  ], [
    'Put everything except the chips in the slow cooker.',
    'Cover and cook 6 hours on Low, until the chicken reads 165°F (74°C).',
    'Shred the chicken in the pot.',
    'Serve topped with crushed chips.'
  ]);

  add('slow-cooker-beef-and-noodles', 15, '8 hr on Low', [
    '2|lb|beef stew meat', '4|cup|beef broth', '1|can|cream of mushroom soup', '1|tsp|salt', '1/2|tsp|black pepper', '12|oz|egg noodles', '1|bag|frozen peas'
  ], [
    'Put the beef, broth, soup, salt and pepper in the slow cooker.',
    'Cover and cook 8 hours on Low, until the beef is fork-tender (well past the safe 145°F / 63°C).',
    'Turn to High. Stir in the noodles and peas, cover and cook 20–30 minutes until the noodles are tender.'
  ]);

  add('slow-cooker-chicken-and-dumplings', 10, '5–6 hr on Low', [
    '1 1/2|lb|boneless skinless chicken breasts', '1|can|cream of chicken soup', '4|cup|chicken broth', '1|bag|frozen mixed vegetables',
    '1|can|refrigerated biscuits|8 count, cut into quarters'
  ], [
    'Put the chicken, soup and broth in the slow cooker. Cover and cook 4–5 hours on Low, until the chicken reads 165°F (74°C).',
    'Shred the chicken in the pot and stir in the vegetables.',
    'Turn to High. Scatter the biscuit pieces on top, cover and cook 45–60 minutes until the dumplings are cooked through (no doughy centers).'
  ]);

  // ---- Household staples ----
  add('spaghetti-and-meatballs', 20, 25, [
    '1|lb|ground beef', '1||egg/eggs', '1/2|cup|breadcrumbs', '1/4|cup|shredded parmesan|plus more for serving', '1/2|tsp|salt', '24|oz|pasta sauce', '12|oz|spaghetti'
  ], [
    'Heat the oven to 400°F (200°C). Line a baking sheet with foil.',
    'Mix the beef, egg, breadcrumbs, parmesan and salt. Roll into 16 balls.',
    'Bake 15–18 minutes until 160°F (71°C) inside.',
    'Cook the spaghetti. Simmer the meatballs in the sauce 5 minutes.',
    'Serve over spaghetti with parmesan.'
  ]);

  add('tater-tot-casserole', 10, 45, [
    '1|lb|ground beef', '1|can|cream of mushroom soup', '1|bag|frozen green beans', '1 1/2|cup|shredded cheese', '1|bag|frozen tater tots|about 32 oz', '1/2|tsp|salt'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain and stir in the soup, green beans and salt.',
    'Spread in a 9×13 dish, add the cheese and cover with tater tots in rows.',
    'Bake 35–40 minutes until the tots are crisp and golden.'
  ]);

  add('fried-chicken', 20, 40, [
    '3|lb|bone-in chicken pieces', '2|cup|buttermilk', '2|cup|flour', '2|tsp|salt', '1|tsp|paprika', '1|tsp|garlic powder', '!3|cup|vegetable oil|for frying',
    '3|lb|potatoes|for mashing', '4|tbsp|butter', '1|bag|frozen corn'
  ], [
    'Soak the chicken in the buttermilk at least 30 minutes (or overnight in the fridge).',
    'Mix the flour and seasonings. Lift each piece from the buttermilk and coat well.',
    'Heat about ½ inch of oil in a heavy skillet to 325–350°F (165–175°C). Fry the chicken in batches, 12–15 minutes per side, until deep golden and 165°F (74°C) near the bone.',
    'Drain on a rack. Meanwhile boil and mash the potatoes and heat the corn.'
  ], 'Hot oil is dangerous: never leave it, keep a lid nearby, and never use water on an oil fire. For less mess, finish browned pieces in a 375°F (190°C) oven.');

  add('baked-ham-dinner', 15, 90, [
    '3|lb|boneless cooked ham', '1/4|cup|brown sugar', '2|tbsp|mustard', '3|lb|potatoes|for mashing', '4|tbsp|butter', '1|bag|frozen green beans', '8||dinner roll/dinner rolls'
  ], [
    'Heat the oven to 325°F (165°C). Put the ham in a baking dish with ½ cup water and cover with foil.',
    'Bake about 20 minutes per pound, until 140°F (60°C) in the center (it\'s already cooked; you\'re reheating).',
    'Mix the sugar and mustard, brush over the ham and bake uncovered 15 minutes more.',
    'Meanwhile mash the potatoes with butter and heat the green beans and rolls.'
  ], 'A ham that isn\'t labeled "fully cooked" needs 145°F (63°C) instead.');

  add('pork-loin-roast', 15, 75, [
    '3|lb|pork loin roast', '2|lb|potatoes|cut into chunks', '1|lb|baby carrots', '1||onion/onions|cut into wedges', '3|tbsp|olive oil', '2|tsp|salt',
    '1|tsp|garlic powder', '1/2|tsp|black pepper'
  ], [
    'Heat the oven to 375°F (190°C).',
    'Toss the vegetables with half the oil and seasoning in a roasting pan.',
    'Rub the pork with the rest and set it on the vegetables.',
    'Roast 60–75 minutes, until 145°F (63°C) in the center. Rest 10 minutes before slicing.'
  ]);

  add('chicken-and-noodles', 15, 40, [
    '1 1/2|lb|boneless skinless chicken breasts', '8|cup|chicken broth', '1|can|cream of chicken soup', '24|oz|frozen egg noodles', '3|lb|potatoes|for mashing',
    '4|tbsp|butter', '1/2|tsp|black pepper'
  ], [
    'Simmer the chicken in the broth 18–20 minutes until 165°F (74°C). Lift it out and shred.',
    'Stir the soup into the broth and bring to a boil. Add the frozen noodles and simmer 20 minutes, stirring often, until tender and thick.',
    'Return the chicken and pepper.',
    'Meanwhile boil and mash the potatoes with butter. Serve the noodles over them, Midwest style.'
  ]);

  add('beef-tips-and-rice', 10, 90, [
    '1 1/2|lb|beef stew meat', '1||onion/onions|sliced', '1|packet|brown gravy mix', '2|cup|water', '!1|tbsp|vegetable oil', '1|cup|rice|uncooked',
    '2|cup|water|for the rice', '1|bag|frozen green beans'
  ], [
    'Brown the beef in the oil in a heavy pot, in two batches. Add the onion for 3 minutes.',
    'Whisk the gravy mix into the water and pour it over. Cover and simmer on low 75–90 minutes, until fork-tender (well past the safe 145°F / 63°C).',
    'Cook the rice and heat the green beans.',
    'Serve the beef tips and gravy over rice.'
  ]);

  add('taco-salad', 10, 15, [
    '1|lb|ground beef', '2|tbsp|taco seasoning', '1/2|cup|water', '1||head romaine lettuce/heads romaine lettuce|chopped', '2||tomato/tomatoes|diced',
    '1|cup|shredded cheese', '3|cup|tortilla chips', '1/2|cup|salsa'
  ], [
    'Cook the beef 7–9 minutes until no pink remains (160°F / 71°C). Drain, add the seasoning and water and simmer 3 minutes.',
    'Pile lettuce in bowls. Top with beef, tomatoes, cheese and crushed chips.',
    'Spoon salsa over as the dressing.'
  ]);

  add('pepperoni-pizza', 10, 15, [
    '2||ready-made pizza crust/ready-made pizza crusts|12-inch', '1|cup|pizza sauce', '4|cup|shredded mozzarella', '1|pkg|pepperoni|about 6 oz', '1|bag|salad mix'
  ], [
    'Heat the oven as the crust package directs (usually 450°F / 230°C).',
    'Spread sauce on the crusts and top with cheese and pepperoni.',
    'Bake 8–12 minutes until bubbling.',
    'Serve with salad.'
  ]);

  add('chili-dogs', 5, 15, [
    '8||hot dog/hot dogs', '8||hot dog bun/hot dog buns', '1|can|chili|15 oz', '1|cup|shredded cheese', '1||small onion/small onions|diced'
  ], [
    'Heat the chili in a saucepan.',
    'Grill or pan-fry the hot dogs until steaming hot (165°F / 74°C).',
    'Put each in a bun and top with chili, cheese and onion.'
  ]);

  add('hoagies-sub-sandwiches', 15, 0, [
    '1|lb|deli ham', '1/2|lb|salami', '4||hoagie roll/hoagie rolls', '8|slice|provolone cheese', '2|cup|shredded lettuce', '2||tomato/tomatoes|sliced',
    '1/4|cup|Italian dressing'
  ], [
    'Split the rolls.',
    'Layer the cheese, ham and salami.',
    'Add lettuce and tomato and drizzle with dressing.',
    'Close, press down and cut in half.'
  ], 'Deli meats are ready to eat — keep them cold and use within 3–5 days of opening.');

  add('pierogies-and-kielbasa', 5, 20, [
    '1|box|frozen pierogies|about 16', '1|lb|kielbasa|sliced', '1||onion/onions|sliced', '2|tbsp|butter', '1/2|cup|sour cream', '1|bag|frozen green beans'
  ], [
    'Brown the kielbasa in a large skillet 5 minutes. Move to a plate.',
    'Melt the butter and cook the onion 5 minutes.',
    'Add the frozen pierogies and cook 5–6 minutes per side until golden and hot through (or boil them first as the box directs).',
    'Return the kielbasa. Heat the green beans and serve with sour cream.'
  ]);

  add('swedish-meatballs', 5, 25, [
    '24|oz|frozen meatballs|fully cooked', '12|oz|egg noodles', '1|packet|brown gravy mix', '1 1/2|cup|water', '1/2|cup|sour cream', '1|bag|frozen peas'
  ], [
    'Heat the meatballs as the bag directs, until 165°F (74°C).',
    'Cook the noodles and the peas.',
    'Whisk the gravy mix and water in a skillet and simmer until thick. Turn off the heat and stir in the sour cream.',
    'Add the meatballs to the sauce and serve over noodles.'
  ]);

  add('chicken-wings', 10, 50, [
    '3|lb|chicken wings', '1|tbsp|baking powder|for crisp skin', '1|tsp|salt', '1/2|cup|buffalo sauce', '4||celery stalk/celery stalks', '2|cup|baby carrots',
    '1/2|cup|ranch dressing', '1|bag|frozen fries'
  ], [
    'Heat the oven to 425°F (220°C). Pat the wings very dry and toss with baking powder and salt.',
    'Bake on a rack over a foil-lined pan 45–50 minutes, turning once, until crisp and 165°F (74°C).',
    'Bake the fries on another rack.',
    'Toss the wings in the buffalo sauce. Serve with celery, carrots and ranch.'
  ], 'Use baking powder, not baking soda.');

  add('chef-salad', 15, 12, [
    '1/2|lb|deli turkey|cut into strips', '1/2|lb|deli ham|cut into strips', '4||egg/eggs', '1|bag|salad mix', '4|slice|cheese|cut into strips',
    '2||tomato/tomatoes|cut into wedges', '1/2|cup|ranch dressing'
  ], [
    'Hard-boil the eggs: cover with water, bring to a boil, cover, turn off the heat and wait 12 minutes. Cool and slice.',
    'Fill bowls with salad mix.',
    'Arrange the turkey, ham, cheese, eggs and tomatoes on top.',
    'Serve with dressing.'
  ]);

  add('cobb-salad', 20, 20, [
    '1|lb|boneless skinless chicken breasts', '6|slice|bacon', '4||egg/eggs', '1||head romaine lettuce/heads romaine lettuce|chopped', '2||avocado/avocados|diced',
    '2||tomato/tomatoes|diced', '1/2|cup|blue cheese dressing', '!1|tbsp|olive oil', '1/2|tsp|salt'
  ], [
    'Hard-boil the eggs (boil, cover off the heat 12 minutes), cool and chop.',
    'Cook the bacon until crisp and crumble.',
    'Season the chicken and cook in the oil 5–7 minutes per side to 165°F (74°C). Rest and dice.',
    'Arrange the chicken, bacon, eggs, avocado and tomatoes in rows over the romaine. Serve with dressing.'
  ]);

  add('tortellini-soup', 10, 25, [
    '1|lb|Italian sausage|casings removed', '20|oz|frozen cheese tortellini', '1|can|diced tomatoes', '8|cup|chicken broth', '4|cup|fresh spinach'
  ], [
    'Brown the sausage in a large pot 7–9 minutes, breaking it up, until no pink remains (160°F / 71°C). Spoon off the fat.',
    'Add the broth and tomatoes and bring to a boil.',
    'Add the tortellini and simmer as the bag directs, about 5 minutes.',
    'Stir in the spinach until wilted.'
  ]);

  add('waffles-and-eggs', 10, 20, [
    '2|cup|waffle mix', '1 1/2|cup|milk|check your mix', '6||egg/eggs|for serving', '1/2|cup|syrup', '1|pint|strawberries|sliced', '!1|tbsp|butter'
  ], [
    'Heat the waffle iron. Mix the batter as the box directs.',
    'Cook the waffles until golden; keep them warm in a 200°F (95°C) oven.',
    'Scramble or fry the eggs in the butter until set.',
    'Serve with syrup and strawberries.'
  ]);

  add('shrimp-fried-rice', 10, 15, [
    '1|lb|frozen shrimp|peeled, thawed', '3|cup|cooked rice|cold', '1 1/2|cup|frozen peas and carrots', '3||egg/eggs|beaten', '3|tbsp|soy sauce', '2|tbsp|vegetable oil'
  ], [
    'If you don\'t have leftover rice, cook 1 cup rice in 2 cups water and spread it out to cool.',
    'Cook the shrimp in 1 tablespoon oil 2–3 minutes until pink and opaque. Move to a plate.',
    'Scramble the eggs until just set and move to the plate.',
    'Add the rest of the oil, the peas and carrots, then the rice. Let it sizzle 2–3 minutes.',
    'Stir in the shrimp, eggs and soy sauce until hot.'
  ]);

  add('oven-baked-fish-fillets', 10, 30, [
    '1|bag|frozen fish fillets|breaded, about 8', '2|lb|potatoes|cut into wedges', '2|tbsp|olive oil', '1/2|tsp|salt', '1|bag|frozen peas', '2||lemon/lemons|cut into wedges'
  ], [
    'Heat the oven to 425°F (220°C). Toss the potato wedges with oil and salt and roast 15 minutes.',
    'Add the fish to the pan and bake as the bag directs (usually 15–18 minutes) until crisp and 145°F (63°C).',
    'Heat the peas.',
    'Serve with lemon wedges.'
  ]);

  // ---- More turkey ----
  add('turkey-sloppy-joes', 5, 15, [
    '1|lb|ground turkey', '1|can|sloppy joe sauce|15 oz', '4||hamburger bun/hamburger buns', '2|cup|baby carrots', '!1|tbsp|vegetable oil'
  ], [
    'Cook the turkey in the oil 8–10 minutes, breaking it up, until no pink remains (165°F / 74°C).',
    'Stir in the sauce and simmer 5 minutes.',
    'Spoon onto buns and serve with carrots.'
  ]);

  add('turkey-club-sandwiches', 10, 15, [
    '1|lb|deli turkey', '8|slice|bacon', '12|slice|bread|toasted', '4||lettuce leaf/lettuce leaves', '2||tomato/tomatoes|sliced', '1/4|cup|mayonnaise'
  ], [
    'Bake the bacon on a foil-lined pan at 400°F (200°C) 15–20 minutes until crisp.',
    'Toast the bread and spread with mayonnaise.',
    'Layer: toast, turkey, lettuce, toast, bacon, tomato, toast.',
    'Cut into quarters and hold with toothpicks.'
  ]);

  add('roast-turkey-breast-dinner', 15, 105, [
    '3|lb|bone-in turkey breast', '2|tbsp|butter|softened', '1|tsp|salt', '1/2|tsp|black pepper', '1|box|stuffing mix', '3|lb|potatoes|for mashing',
    '4|tbsp|butter|for the potatoes', '1|bag|frozen green beans', '1|can|cranberry sauce'
  ], [
    'Heat the oven to 350°F (175°C). Rub the turkey with butter, salt and pepper and set it in a roasting pan.',
    'Roast about 1½–1¾ hours, until 165°F (74°C) in the thickest part (not touching bone). Rest 15 minutes before slicing.',
    'Meanwhile make the stuffing as the box directs, mash the potatoes with butter and heat the green beans.',
    'Serve with cranberry sauce.'
  ], 'A frozen turkey breast needs 1–2 days to thaw in the fridge.');

  add('turkey-and-vegetable-rice-skillet', 5, 25, [
    '1|lb|ground turkey', '1|bag|frozen mixed vegetables', '1|cup|long-grain rice|uncooked', '2|cup|chicken broth', '2|tbsp|soy sauce', '!1|tbsp|vegetable oil'
  ], [
    'Cook the turkey in the oil 8–10 minutes until no pink remains (165°F / 74°C).',
    'Stir in the rice for 1 minute, then the broth and soy sauce. Bring to a boil.',
    'Cover and simmer on low 18 minutes.',
    'Stir in the vegetables, cover and cook 5 minutes more until hot and the rice is tender.'
  ]);

  // ---- More fish and seafood ----
  add('tuna-salad-sandwiches', 10, 0, [
    '3|can|tuna|drained', '1/3|cup|mayonnaise', '2||celery stalk/celery stalks|diced', '1/2|tsp|salt', '8|slice|bread', '2|cup|baby carrots'
  ], [
    'Mix the tuna, mayonnaise, celery and salt.',
    'Spread on bread to make sandwiches.',
    'Serve with carrots.'
  ], 'Keep tuna salad cold and eat within 3–4 days.');

  add('cornmeal-fried-catfish', 15, 25, [
    '1 1/2|lb|catfish fillets|thawed', '1|cup|cornmeal', '1|tsp|salt', '1|tsp|Cajun seasoning|optional', '!1|cup|vegetable oil|for frying',
    '3|cup|coleslaw mix', '3|tbsp|mayonnaise|for the slaw', '1|bag|frozen hush puppies'
  ], [
    'Bake the hush puppies as the bag directs. Toss the slaw with the mayonnaise.',
    'Mix the cornmeal, salt and seasoning. Pat the fish dry and coat it well.',
    'Heat the oil in a heavy skillet over medium-high heat. Fry the fish 3–4 minutes per side until golden and it flakes easily (145°F / 63°C).',
    'Drain on paper towels and serve with slaw and hush puppies.'
  ], 'Never leave hot oil unattended.');

  add('clam-chowder', 15, 30, [
    '3|can|chopped clams|6.5 oz each, with juice', '3|lb|potatoes|peeled and diced', '4|slice|bacon|chopped', '1||onion/onions|diced', '2|cup|half-and-half',
    '2|tbsp|flour', '1|cup|water', '1/2|tsp|salt'
  ], [
    'Cook the bacon in a large pot until crisp. Add the onion and cook 4 minutes.',
    'Stir in the flour for 1 minute. Add the clam juice (from the cans), water and potatoes.',
    'Simmer 15 minutes until the potatoes are tender.',
    'Stir in the clams and half-and-half and heat until steaming — don\'t boil.'
  ]);

  add('shrimp-and-grits', 10, 20, [
    '1|lb|frozen shrimp|peeled, thawed', '1|cup|quick grits', '4|cup|water', '1|cup|shredded cheddar', '4|slice|bacon|chopped', '2||green onion/green onions|sliced',
    '1/2|tsp|salt', '1/2|tsp|Cajun seasoning|optional'
  ], [
    'Bring the water and salt to a boil. Whisk in the grits, cover and cook on low 5–7 minutes, stirring now and then. Stir in the cheese.',
    'Cook the bacon in a skillet until crisp. Move to a plate.',
    'Season the shrimp and cook in the bacon fat 2–3 minutes until pink and opaque.',
    'Spoon the shrimp over the grits and top with bacon and green onions.'
  ]);

  // ---- Recommended sides ----
  // Which ingredients (by position) and steps belong to a dinner's
  // recommended side. Picking another side (or No side) leaves these out,
  // replacing a step with the text given, or dropping it (null).
  const side = (id, ing, steps) => { R[id].side = { ing, steps }; };
  side('honey-garlic-drumsticks', [4, 5, 6], { 3: null, 4: "Serve the drumsticks." });
  side('spaghetti-and-meat-sauce', [7], { 3: null, 4: "Cook the spaghetti as the box directs and drain. Serve with the sauce." });
  side('cheeseburgers-and-fries', [7], { 0: null });
  side('sloppy-joes', [3], { 3: null });
  side('steak-and-baked-potatoes', [1, 5, 6, 7], { 0: null, 4: "Serve the steak." });
  side('meatloaf-and-green-beans', [7, 8, 9], { 3: null });
  side('pork-chops-and-applesauce', [5, 6, 7, 8], { 0: null, 3: null, 4: "Serve the chops." });
  side('ham-and-cheese-sliders', [5], { 4: "Bake 12–15 minutes until the cheese melts." });
  side('teriyaki-pork-tenderloin', [2, 3, 4], { 3: null, 4: "Serve the slices." });
  side('turkey-burgers', [8], { 0: null });
  side('baked-salmon-and-rice', [1, 2], { 1: null, 4: "Squeeze the other lemon over everything and serve." });
  side('fish-sticks-and-mac-and-cheese', [1, 2], { 1: null, 2: null });
  side('lemon-tilapia-and-green-beans', [5, 6, 7], { 0: "Heat the oven to 400°F (200°C).", 3: "Serve with lemon wedges." });
  side('spinach-quiche-and-salad', [6, 7], { 4: null });
  side('homemade-cheese-pizza', [4, 5], { 3: null });
  side('baked-mac-and-cheese', [6], { 4: null });
  side('salisbury-steak-and-mashed-potatoes', [7, 8, 9, 10], { 0: null, 4: "Return the patties, cover and simmer 10 minutes until they reach 160°F (71°C)." });
  side('hamburger-steak-and-gravy', [6, 7, 8], { 0: null, 4: "Serve the patties with the gravy." });
  side('country-fried-steak', [8, 9, 10], { 0: null });
  side('smothered-pork-chops', [7, 8, 9], { 0: null, 4: "Serve the chops with the gravy." });
  side('baked-chicken-and-mashed-potatoes', [5, 6, 7, 8], { 2: null, 3: null });
  side('chicken-tenders-and-fries', [1, 2], { 1: "Bake the tenders, turning halfway, until crisp. Uncooked frozen tenders must reach 165°F (74°C) — check the package.", 2: "Serve with ranch." });
  side('lasagna', [7], { 4: "Cover with foil and bake 45 minutes; uncover for 15 more. Rest 15 minutes before cutting." });
  side('ravioli-bake', [3, 4], { 3: null });
  side('salmon-patties-and-corn', [5, 6], { 0: null });
  side('hot-dogs-and-baked-beans', [3], { 2: "Serve in buns with the beans." });
  side('egg-salad-sandwiches', [5], { 3: "Make the sandwiches." });
  side('scrambled-eggs-and-toast', [5], { 3: null });
  side('slow-cooker-bbq-chicken-and-potatoes', [3], { 3: "Split the potatoes, add butter and top with chicken." });
  side('mississippi-chicken', [5, 6], { 3: "Serve the chicken with its juices." });
  side('fried-chicken', [7, 8, 9], { 3: "Drain on a rack before serving." });
  side('baked-ham-dinner', [3, 4, 5, 6], { 3: null });
  side('chicken-and-noodles', [4, 5], { 3: null });
  side('beef-tips-and-rice', [5, 6, 7], { 2: null, 3: "Serve the beef tips with the gravy." });
  side('pepperoni-pizza', [4], { 3: null });
  side('pierogies-and-kielbasa', [5], { 3: "Return the kielbasa and serve with sour cream." });
  side('swedish-meatballs', [5], { 1: "Cook the noodles." });
  side('chicken-wings', [7], { 2: null });
  side('oven-baked-fish-fillets', [4], { 2: null });
  side('turkey-sloppy-joes', [3], { 2: "Spoon onto buns." });
  side('roast-turkey-breast-dinner', [5, 6, 7], { 2: "Meanwhile make the stuffing as the box directs." });
  side('tuna-salad-sandwiches', [5], { 2: null });
  side('cornmeal-fried-catfish', [5, 6, 7], { 0: null, 3: "Drain on paper towels and serve." });
})(window.PP_RECIPES.recipes);
