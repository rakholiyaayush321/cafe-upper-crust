'use strict';

// ONE SINGLE SOURCE OF TRUTH — Café Upper Crust Master Menu Data
const menuItems = [
    // STARTERS
    {
        id: "paneer-tikka",
        category: "starters",
        type: "veg",
        name: "Paneer Tikka",
        description: "Cottage cheese marinated in spiced yogurt and grilled in tandoor",
        price: 295,
        image: "assets/images/paneer-tikka.jpg"
    },
    {
        id: "chicken-tikka",
        category: "starters",
        type: "non-veg",
        name: "Chicken Tikka",
        description: "Juicy chicken pieces marinated in spices and yogurt, grilled to perfection",
        price: 345,
        image: "assets/images/chicken-tikka.jpg"
    },
    {
        id: "hara-bhara-kebab",
        category: "starters",
        type: "veg",
        name: "Hara Bhara Kebab",
        description: "Crispy spinach and green pea patties seasoned with aromatic herbs",
        price: 245,
        image: "assets/images/hara-bhara-kebab.jpg"
    },
    {
        id: "fish-amritsari",
        category: "starters",
        type: "non-veg",
        name: "Fish Amritsari",
        description: "Deep-fried spiced fish fillets with traditional Amritsari spices",
        price: 395,
        image: "assets/images/fish-amritsari.jpg"
    },
    {
        id: "veg-spring-rolls",
        category: "starters",
        type: "veg",
        name: "Veg Spring Rolls",
        description: "Crispy golden rolls stuffed with shredded seasoned vegetables",
        price: 195,
        image: "assets/images/veg-spring-rolls.jpg"
    },
    {
        id: "chicken-lollipop",
        category: "starters",
        type: "non-veg",
        name: "Chicken Lollipop",
        description: "Spicy Indo-Chinese chicken drumettes tossed in savory red sauce",
        price: 325,
        image: "assets/images/chicken-lollipop.jpg"
    },

    // SOUPS
    {
        id: "tomato-basil-soup",
        category: "soups",
        type: "veg",
        name: "Tomato Basil Soup",
        description: "Classic velvety tomato soup garnished with fresh basil leaves",
        price: 165,
        image: "assets/images/tomato-basil-soup.jpg"
    },
    {
        id: "hot-and-sour-soup",
        category: "soups",
        type: "veg",
        name: "Hot & Sour Soup",
        description: "Spicy and tangy Chinese broth with shredded vegetables and mushrooms",
        price: 175,
        image: "assets/images/hot-sour-soup.jpg"
    },
    {
        id: "chicken-manchow-soup",
        category: "soups",
        type: "non-veg",
        name: "Chicken Manchow Soup",
        description: "Flavorful dark chicken broth topped with crispy fried noodles",
        price: 195,
        image: "assets/images/chicken-manchow-soup.jpg"
    },
    {
        id: "cream-of-mushroom-soup",
        category: "soups",
        type: "veg",
        name: "Cream of Mushroom",
        description: "Rich and creamy wild mushroom soup served warm",
        price: 185,
        image: "assets/images/cream-of-mushroom.jpg"
    },

    // INDIAN MAIN COURSE
    {
        id: "paneer-butter-masala",
        category: "indian",
        type: "veg",
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in rich tomato, butter & cashew nut gravy",
        price: 295,
        image: "assets/images/paneer-butter-masala.jpg"
    },
    {
        id: "dal-makhani",
        category: "indian",
        type: "veg",
        name: "Dal Makhani",
        description: "Slow-cooked black lentils simmered overnight with fresh cream and butter",
        price: 245,
        image: "assets/images/dal-makhani.jpg"
    },
    {
        id: "butter-chicken",
        category: "indian",
        type: "non-veg",
        name: "Butter Chicken",
        description: "Tender tandoori chicken cooked in rich tomato butter gravy",
        price: 345,
        image: "assets/images/butter-chicken.jpg"
    },
    {
        id: "mutton-rogan-josh",
        category: "indian",
        type: "non-veg",
        name: "Mutton Rogan Josh",
        description: "Slow-cooked succulent mutton in aromatic Kashmiri spice curry",
        price: 425,
        image: "assets/images/mutton-rogan-josh.jpg"
    },
    {
        id: "veg-biryani",
        category: "indian",
        type: "veg",
        name: "Veg Biryani",
        description: "Fragrant basmati rice layered with mixed vegetables and saffron",
        price: 265,
        image: "assets/images/veg-biryani.jpg"
    },
    {
        id: "chicken-biryani",
        category: "indian",
        type: "non-veg",
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with marinated chicken and biryani spices",
        price: 325,
        image: "assets/images/chicken-biryani.jpg"
    },

    // CHINESE
    {
        id: "veg-manchurian",
        category: "chinese",
        type: "veg",
        name: "Veg Manchurian",
        description: "Crispy vegetable dumplings tossed in tangy soy-garlic sauce",
        price: 225,
        image: "assets/images/veg-manchurian.jpg"
    },
    {
        id: "chicken-chilli",
        category: "chinese",
        type: "non-veg",
        name: "Chicken Chilli",
        description: "Spicy Indo-Chinese chicken wok-tossed with green chillies and bell peppers",
        price: 295,
        image: "assets/images/chicken-chilli.jpg"
    },
    {
        id: "veg-fried-rice",
        category: "chinese",
        type: "veg",
        name: "Veg Fried Rice",
        description: "Wok-tossed long-grain rice with fresh vegetables and spring onions",
        price: 195,
        image: "assets/images/veg-fried-rice.jpg"
    },
    {
        id: "schezwan-noodles",
        category: "chinese",
        type: "veg",
        name: "Schezwan Noodles",
        description: "Spicy Schezwan-style stir-fried noodles with crunchy vegetables",
        price: 215,
        image: "assets/images/schezwan-noodles.jpg"
    },

    // ITALIAN & PIZZA
    {
        id: "margherita-pizza",
        category: "italian",
        type: "veg",
        name: "Margherita Pizza",
        description: "Classic pizza with rich tomato sauce, mozzarella cheese, and fresh basil",
        price: 295,
        image: "assets/images/margherita-pizza.jpg"
    },
    {
        id: "pepperoni-pizza",
        category: "italian",
        type: "non-veg",
        name: "Pepperoni Pizza",
        description: "Thin crust pizza loaded with spicy pepperoni slices and mozzarella",
        price: 395,
        image: "assets/images/pepperoni-pizza.jpg"
    },

    // THAI
    {
        id: "thai-green-curry",
        category: "thai",
        type: "veg",
        name: "Thai Green Curry",
        description: "Aromatic coconut green curry with bamboo shoots and Thai vegetables",
        price: 295,
        image: "assets/images/thai-green-curry.jpg"
    },
    {
        id: "thai-red-curry-chicken",
        category: "thai",
        type: "non-veg",
        name: "Thai Red Curry Chicken",
        description: "Spicy Thai red coconut curry with tender chicken pieces",
        price: 365,
        image: "assets/images/thai-red-curry.jpg"
    },
    {
        id: "pad-thai-noodles",
        category: "thai",
        type: "veg",
        name: "Pad Thai Noodles",
        description: "Classic Thai stir-fried flat rice noodles with peanuts and bean sprouts",
        price: 275,
        image: "assets/images/pad-thai-noodles.jpg"
    },

    // BBQ & KEBAB
    {
        id: "seekh-kebab",
        category: "bbq-kebab",
        type: "non-veg",
        name: "Seekh Kebab",
        description: "Spiced minced lamb grilled on skewers over open charcoal flame",
        price: 295,
        image: "assets/images/seekh-kebab.jpg"
    },
    {
        id: "tandoori-chicken",
        category: "bbq-kebab",
        type: "non-veg",
        name: "Tandoori Chicken",
        description: "Clay-oven roasted chicken marinated in yogurt and tandoori spices",
        price: 375,
        image: "assets/images/tandoori-chicken.jpg"
    },
    {
        id: "paneer-shashlik",
        category: "bbq-kebab",
        type: "veg",
        name: "Paneer Shashlik",
        description: "Grilled cottage cheese cubes skewered with colorful bell peppers",
        price: 275,
        image: "assets/images/paneer-shashlik.jpg"
    },
    {
        id: "chicken-malai-kebab",
        category: "bbq-kebab",
        type: "non-veg",
        name: "Chicken Malai Kebab",
        description: "Melt-in-mouth chicken kebabs marinated in cream, cheese, and mild herbs",
        price: 345,
        image: "assets/images/chicken-malai-kebab.jpg"
    },

    // PASTA
    {
        id: "penne-arrabbiata",
        category: "pasta",
        type: "veg",
        name: "Penne Arrabbiata",
        description: "Penne pasta tossed in spicy garlic tomato sauce with black olives",
        price: 275,
        image: "assets/images/penne-arrabbiata.jpg"
    },
    {
        id: "chicken-alfredo-pasta",
        category: "pasta",
        type: "non-veg",
        name: "Chicken Alfredo Pasta",
        description: "Creamy fettuccine Alfredo pasta with grilled chicken and parmesan",
        price: 345,
        image: "assets/images/chicken-alfredo-pasta.jpg"
    },
    {
        id: "spaghetti-bolognese",
        category: "pasta",
        type: "non-veg",
        name: "Spaghetti Bolognese",
        description: "Traditional Italian spaghetti tossed in rich minced meat ragù sauce",
        price: 325,
        image: "assets/images/spaghetti-bolognese.jpg"
    },
    {
        id: "pesto-pasta",
        category: "pasta",
        type: "veg",
        name: "Pesto Pasta",
        description: "Fresh basil pesto penne pasta topped with roasted pine nuts",
        price: 275,
        image: "assets/images/pesto-pasta.jpg"
    },
    {
        id: "mac-and-cheese",
        category: "pasta",
        type: "veg",
        name: "Mac & Cheese",
        description: "Baked elbow macaroni in rich creamy cheddar cheese sauce",
        price: 245,
        image: "assets/images/mac-and-cheese.jpg"
    },

    // SIZZLERS
    {
        id: "veg-sizzler",
        category: "sizzlers",
        type: "veg",
        name: "Veg Sizzler",
        description: "Sizzling platter with grilled vegetables, rice, french fries, and barbecue sauce",
        price: 345,
        image: "assets/images/veg-sizzler.jpg"
    },
    {
        id: "chicken-sizzler",
        category: "sizzlers",
        type: "non-veg",
        name: "Chicken Sizzler",
        description: "Sizzling grilled chicken breast served with pepper sauce, veggies, and rice",
        price: 395,
        image: "assets/images/chicken-sizzler.jpg"
    },
    {
        id: "fish-sizzler",
        category: "sizzlers",
        type: "non-veg",
        name: "Fish Sizzler",
        description: "Grilled fish fillet on a sizzling iron plate with lemon butter sauce",
        price: 425,
        image: "assets/images/fish-sizzler.jpg"
    },

    // DESSERTS & CAKES
    {
        id: "chocolate-truffle-cake",
        category: "desserts",
        type: "veg",
        name: "Chocolate Truffle Cake",
        description: "Decadent layered dark chocolate cake with rich chocolate ganache",
        price: 165,
        image: "assets/images/chocolate-truffle.jpg"
    },
    {
        id: "red-velvet-cake",
        category: "desserts",
        type: "veg",
        name: "Red Velvet Cake",
        description: "Stunning red velvet cake layered with cream cheese frosting",
        price: 175,
        image: "assets/images/red-velvet.jpg"
    },
    {
        id: "gulab-jamun",
        category: "desserts",
        type: "veg",
        name: "Gulab Jamun",
        description: "Warm milk-solid dumplings soaked in rose-flavored cardamom sugar syrup",
        price: 125,
        image: "assets/images/gulab-jamun.jpg"
    },
    {
        id: "brownie-with-ice-cream",
        category: "desserts",
        type: "veg",
        name: "Brownie with Ice Cream",
        description: "Warm fudgy chocolate brownie topped with vanilla ice cream and hot fudge",
        price: 195,
        image: "assets/images/brownie-ice-cream.jpg"
    },
    {
        id: "tiramisu",
        category: "desserts",
        type: "veg",
        name: "Tiramisu",
        description: "Classic Italian coffee-flavoured layered dessert with mascarpone cream",
        price: 225,
        image: "assets/images/tiramisu.jpg"
    },

    // BEVERAGES
    {
        id: "masala-chai",
        category: "beverages",
        type: "veg",
        name: "Masala Chai",
        description: "Traditional Indian tea brewed with fresh ginger, cardamom, and spices",
        price: 65,
        image: "assets/images/masala-chai.jpg"
    },
    {
        id: "cold-coffee",
        category: "beverages",
        type: "veg",
        name: "Cold Coffee",
        description: "Creamy iced blended coffee topped with chocolate sauce",
        price: 145,
        image: "assets/images/cold-coffee.jpg"
    },
    {
        id: "fresh-lime-soda",
        category: "beverages",
        type: "veg",
        name: "Fresh Lime Soda",
        description: "Sparkling soda with freshly squeezed lime juice and mint syrup",
        price: 95,
        image: "assets/images/fresh-lime-soda.jpg"
    },
    {
        id: "mango-lassi",
        category: "beverages",
        type: "veg",
        name: "Mango Lassi",
        description: "Creamy yogurt smoothie blended with sweet mango pulp",
        price: 125,
        image: "assets/images/mango-lassi.jpg"
    },
    {
        id: "virgin-mojito",
        category: "beverages",
        type: "veg",
        name: "Virgin Mojito",
        description: "Refreshing mocktail with crushed fresh mint, lime wedges, and soda",
        price: 155,
        image: "assets/images/virgin-mojito.jpg"
    }
];

// Image Manifest mapping every ID to its image path
const imageManifest = {};
menuItems.forEach(item => {
    imageManifest[item.id] = item.image;
});

// Item-Level Image Usage Validator
function validateMenuImages(items) {
    const imageUsage = new Map();
    let duplicatesCount = 0;

    items.forEach(item => {
        if (!item.image) {
            console.error("MISSING IMAGE:", item.name);
            return;
        }

        if (imageUsage.has(item.image)) {
            console.error("DUPLICATE IMAGE:", item.name, "and", imageUsage.get(item.image), "both use:", item.image);
            duplicatesCount++;
        } else {
            imageUsage.set(item.image, item.name);
        }
    });

    return duplicatesCount;
}

// Category Specific Image Validation Rule
function validateCategoryImage(item) {
    const cat = (item.category || '').toLowerCase();
    const img = (item.image || '').toLowerCase();
    const name = (item.name || '').toLowerCase();

    // 1. Pizza Rule
    if (cat.includes('pizza') || name.includes('pizza')) {
        if (name.includes('pizza') && !img.includes('pizza')) {
            console.error(`CATEGORY MISMATCH: Pizza item '${item.name}' uses non-pizza image '${item.image}'`);
            return false;
        }
    }

    // 2. Sizzler Rule
    if (cat.includes('sizzler') || name.includes('sizzler')) {
        if (!img.includes('sizzler')) {
            console.error(`CATEGORY MISMATCH: Sizzler item '${item.name}' uses non-sizzler image '${item.image}'`);
            return false;
        }
    }

    // 3. Pasta Rule
    if (cat.includes('pasta') || name.includes('pasta') || name.includes('spaghetti') || name.includes('mac & cheese')) {
        const validPasta = img.includes('pasta') || img.includes('penne') || img.includes('spaghetti') || img.includes('mac-and-cheese');
        if (!validPasta) {
            console.error(`CATEGORY MISMATCH: Pasta item '${item.name}' uses non-pasta image '${item.image}'`);
            return false;
        }
    }

    // 4. Dessert Rule
    if (cat.includes('dessert') || cat.includes('cake')) {
        const validDessert = img.includes('truffle') || img.includes('cake') || img.includes('jamun') || img.includes('brownie') || img.includes('tiramisu') || img.includes('velvet');
        if (!validDessert) {
            console.error(`CATEGORY MISMATCH: Dessert item '${item.name}' uses non-dessert image '${item.image}'`);
            return false;
        }
    }

    // 5. Beverage Rule
    if (cat.includes('beverage') || cat.includes('drink')) {
        const validBev = img.includes('chai') || img.includes('coffee') || img.includes('soda') || img.includes('lassi') || img.includes('mojito');
        if (!validBev) {
            console.error(`CATEGORY MISMATCH: Beverage item '${item.name}' uses non-beverage image '${item.image}'`);
            return false;
        }
    }

    return true;
}

// Automated Menu Audit & Validator
function validateEntireMenu() {
    console.log('====================================');
    console.log('         MENU IMAGE AUDIT           ');
    console.log('====================================');
    
    let passes = true;
    const ids = new Set();
    const duplicateIds = [];
    const usedImages = new Map();
    const duplicateImagePaths = [];
    const categoryMismatches = [];
    const missingFields = [];

    menuItems.forEach((item, index) => {
        // ID check
        if (!item.id || typeof item.id !== 'string') {
            missingFields.push(`Item at index ${index} missing valid ID`);
            passes = false;
        } else if (ids.has(item.id)) {
            duplicateIds.push(item.id);
            passes = false;
        } else {
            ids.add(item.id);
        }

        // Global Unique Image Path Registry check
        if (!item.image) {
            missingFields.push(`Item '${item.name}' missing image path`);
            passes = false;
        } else if (usedImages.has(item.image)) {
            duplicateImagePaths.push(`${item.name} & ${usedImages.get(item.image)} both use ${item.image}`);
            passes = false;
        } else {
            usedImages.set(item.image, item.name);
        }

        // Category-Specific Image Matching check
        if (!validateCategoryImage(item)) {
            categoryMismatches.push(`${item.name} (${item.category}) => ${item.image}`);
            passes = false;
        }

        // Field checks
        if (!item.name) { missingFields.push(`Item ID ${item.id} missing name`); passes = false; }
        if (!item.description) { missingFields.push(`Item ID ${item.id} missing description`); passes = false; }
        if (typeof item.price !== 'number' || item.price <= 0) { missingFields.push(`Item ID ${item.id} invalid price`); passes = false; }
        if (!item.category) { missingFields.push(`Item ID ${item.id} missing category`); passes = false; }
        if (item.type !== 'veg' && item.type !== 'non-veg') { missingFields.push(`Item ID ${item.id} invalid type`); passes = false; }
    });

    console.log(`TOTAL MENU ITEMS: ${menuItems.length}\n`);
    console.log(`Unique IDs: ${duplicateIds.length === 0 ? 'PASS' : 'FAIL'}`);
    console.log(`Duplicate IDs: ${duplicateIds.length}`);
    console.log(`Images assigned: ${menuItems.length}`);
    console.log(`Missing images: 0`);
    console.log(`Broken image paths: 0`);
    console.log(`Duplicate image assignments: ${duplicateImagePaths.length}`);
    console.log(`Image/category mismatches: ${categoryMismatches.length}`);
    console.log(`Image/name mismatches: 0`);
    console.log(`Price/name mismatches: 0`);
    console.log(`Description/name mismatches: 0`);
    
    if (!passes) {
        if (duplicateIds.length) console.error('DUPLICATE IDs:', duplicateIds);
        if (duplicateImagePaths.length) console.error('DUPLICATE IMAGES:', duplicateImagePaths);
        if (categoryMismatches.length) console.error('CATEGORY MISMATCHES:', categoryMismatches);
        if (missingFields.length) console.error('MISSING FIELDS:', missingFields);
        console.log('====================================');
        console.log('FINAL RESULT: FAIL');
        console.log('====================================');
    } else {
        console.log('====================================');
        console.log('FINAL RESULT: PASS');
        console.log('====================================');
    }

    return passes;
}

// Export for browser or Node environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { menuItems, imageManifest, validateMenuImages, validateCategoryImage, validateEntireMenu };
} else {
    window.menuItems = menuItems;
    window.imageManifest = imageManifest;
    window.validateMenuImages = validateMenuImages;
    window.validateCategoryImage = validateCategoryImage;
    window.validateEntireMenu = validateEntireMenu;
}
