/**
 * Internationalization (i18n) Module
 * Handles language switching between English and Spanish
 */

(function() {
  'use strict';

  // Embedded translations
  window.TRANSLATIONS = {
    en: {
      "nav": {
        "home": "Home",
        "menu": "Menu",
        "reservations": "Reservations",
        "gallery": "Gallery",
        "about": "About",
        "contact": "Contact",
        "cart": "Cart"
      },
      "pages": {
        "menu_title": "Our Menu",
        "menu_subtitle": "Authentic Japanese flavors crafted with passion and precision",
        "reservations_title": "Book a Table",
        "reservations_subtitle": "Reserve your spot for an unforgettable dining experience",
        "gallery_title": "Our Gallery",
        "gallery_subtitle": "A visual journey through our culinary artistry",
        "about_title": "Our Story",
        "about_subtitle": "How a simple love for great food became a neighborhood favorite",
        "contact_title": "Get in Touch",
        "contact_subtitle": "We'd love to hear from you. Visit, call, or send us a message.",
        "cart_title": "Your Cart",
        "cart_subtitle": "Review your order before checkout",
        "cat_all": "All",
        "cat_rolls": "Sushi Rolls",
        "cat_sashimi": "Sashimi",
        "cat_ramen": "Ramen",
        "cat_appetizers": "Appetizers",
        "cat_desserts": "Desserts"
      },
      "hero": {
        "badge": "🔥 New: Weekend Chef's Tasting Menu — Reserve Now",
        "title_part1": "Where Fresh Meets",
        "title_part2": "Unforgettable",
        "description": "A neighborhood favorite since day one.",
        "btn_menu": "Explore Our Menu",
        "btn_reserve": "Book a Table"
      },
      "about": {
        "title_part1": "We Don't Just Cook —",
        "title_part2": "We Care",
        "paragraph1": "Every great restaurant starts with one simple belief.",
        "paragraph2": "We want you to feel the warmth and care.",
        "btn_learn": "Learn More About Us →",
        "stat_years": "Years of Excellence",
        "stat_customers": "Happy Customers",
        "stat_dishes": "Unique Dishes",
        "story_title": "It Started With One Simple Idea",
        "story_p1": "Great food doesn't need a complicated story. It just needs someone who cares enough to get it right.",
        "story_p2": "From day one, we committed to fresh ingredients and generous portions.",
        "story_p3": "Today, we're proud of what we've built — and even more excited about what's next. The best is still ahead.",
        "chef_title": "Meet the Head Chef",
        "chef_p1": "With years of experience across some of the finest kitchens in the country.",
        "chef_p2": "Their philosophy is simple: \"Use the best ingredients, respect them, and let the flavors speak for themselves.\"",
        "chef_p3": "When not in the kitchen, our chef is constantly exploring.",
        "chef_quote": "\"Cooking isn't just about feeding people. It's about creating moments they'll remember.\"",
        "values_title": "What We Stand For",
        "values_subtitle": "The principles that guide everything we do",
        "value_authenticity": "Authenticity",
        "value_authenticity_text": "No shortcuts, no compromises. We follow traditional Japanese methods.",
        "value_quality": "Quality First",
        "value_quality_text": "Premium ingredients only. Our fish is sushi-grade.",
        "value_hospitality": "Hospitality",
        "value_hospitality_text": "Omotenashi—Japanese hospitality—is in our DNA.",
        "value_sustainability": "Sustainability",
        "value_sustainability_text": "We source responsibly, minimize waste, and support sustainable fishing practices.",
        "cta_title": "Experience It Yourself",
        "cta_subtitle": "Book a table and taste the difference that passion makes",
        "cta_btn": "Reserve Your Table →"
      },
      "featured": {
        "title": "Customer Favorites",
        "subtitle": "Our most-loved dishes",
        "dish1_name": "Signature House Special",
        "dish1_desc": "Our most-ordered dish.",
        "dish1_badge": "🔥 #1 Seller",
        "dish2_name": "Chef's Daily Special",
        "dish2_desc": "Changes with the seasons.",
        "dish2_badge": "⭐ Chef's Pick",
        "dish3_name": "House Comfort Bowl",
        "dish3_desc": "Warm, hearty, and deeply satisfying.",
        "dish4_name": "Premium Selection",
        "dish4_desc": "The best of what we offer.",
        "dish4_badge": "✨ Premium",
        "add_to_cart": "+ Add",
        "btn_full_menu": "View Full Menu →"
      },
      "whyUs": {
        "title": "Why People Choose Us",
        "subtitle": "What keeps diners coming back",
        "feature1_title": "Fresh Every Day",
        "feature1_text": "Ingredients arrive daily.",
        "feature2_title": "Experienced Kitchen",
        "feature2_text": "Years of professional experience.",
        "feature3_title": "Quality Sourcing",
        "feature3_text": "We partner with local farms.",
        "feature4_title": "Fast & Reliable",
        "feature4_text": "Pickup, delivery, or dine-in."
      },
      "testimonials": {
        "title": "Word of Mouth",
        "subtitle": "What customers are saying",
        "review1_text": "My husband and I have been coming here for years.",
        "review1_author": "Sarah K.",
        "review1_info": "Loyal customer · Downtown LA",
        "review2_text": "I've reviewed over 200 restaurants.",
        "review2_author": "Michael R.",
        "review2_info": "Food Critic, LA Food Weekly",
        "review3_text": "Ordered catering for my parents' 40th anniversary.",
        "review3_author": "Jennifer L.",
        "review3_info": "Catering Order · Verified"
      },
      "cta": {
        "title": "Ready for an Unforgettable Meal?",
        "subtitle": "Book your table now or order online",
        "btn_reserve": "Reserve a Table",
        "btn_order": "Order Online"
      },
      "footer": {
        "description": "Authentic Japanese cuisine crafted with passion.",
        "quickLinks": "Quick Links",
        "hours": "Opening Hours",
        "hours_mon_thu": "Mon - Thu: 11:00 AM - 10:00 PM",
        "hours_fri_sat": "Fri - Sat: 11:00 AM - 11:00 PM",
        "hours_sun": "Sunday: 12:00 PM - 9:00 PM",
        "contact": "Contact Us",
        "copyright": "© 2026 Your Restaurant Name. All rights reserved."
      },
      "common": {
        "back_to_top": "Back to top",
        "item_added": "Item added to cart!",
        "whatsapp_tooltip": "Order on WhatsApp"
      },
      "menu": {
        "section_rolls": "Signature Rolls",
        "section_sashimi": "Sashimi & Nigiri",
        "section_ramen": "Ramen & Hot Bowls",
        "section_appetizers": "Appetizers & Sides",
        "section_desserts": "Desserts",
        "add_to_cart": "+ Add to Cart",
        "click_for_details": "Click card for details",
        "click_flip_back": "Click to flip back",
        "calories": "Calories",
        "protein": "Protein",
        "carbs": "Carbs",
        "fat": "Fat",
        "dragon_roll_name": "Dragon Roll",
        "dragon_roll_desc": "Shrimp tempura inside, topped with avocado, eel, and spicy mayo.",
        "rainbow_roll_name": "Rainbow Roll",
        "rainbow_roll_desc": "California roll base topped with tuna, salmon, yellowtail, avocado, and wasabi mayo.",
        "volcano_roll_name": "Volcano Roll",
        "volcano_roll_desc": "Spicy crab mix, cucumber, topped with baked scallops and jalapeño.",
        "spider_roll_name": "Spider Roll",
        "spider_roll_desc": "Crispy soft shell crab, fresh avocado, cucumber, and spicy mayo.",
        "philadelphia_roll_name": "Philadelphia Roll",
        "philadelphia_roll_desc": "Fresh Atlantic salmon, cream cheese, and ripe avocado.",
        "tempura_crunch_roll_name": "Tempura Crunch Roll",
        "tempura_crunch_roll_desc": "Tempura shrimp, cream cheese inside, topped with crunchy tempura flakes.",
        "salmon_sashimi_name": "Salmon Sashimi (5pcs)",
        "salmon_sashimi_desc": "Premium Norwegian salmon, sushi-grade, thinly sliced.",
        "tuna_sashimi_name": "Tuna Sashimi (5pcs)",
        "tuna_sashimi_desc": "Bluefin tuna, sushi-grade, rich and tender.",
        "chefs_sashimi_platter_name": "Chef's Sashimi Platter",
        "chefs_sashimi_platter_desc": "Chef's selection of 15 premium sashimi pieces.",
        "nigiri_set_name": "Nigiri Set (8pcs)",
        "nigiri_set_desc": "8 pieces of chef's choice nigiri with wasabi and pickled ginger.",
        "tonkotsu_ramen_name": "Tonkotsu Ramen",
        "tonkotsu_ramen_desc": "Rich pork bone broth, chashu pork, soft-boiled egg, bamboo shoots.",
        "miso_ramen_name": "Miso Ramen",
        "miso_ramen_desc": "Savory miso broth, seasoned ground pork, sweet corn, bean sprouts.",
        "spicy_tantanmen_name": "Spicy Tantanmen",
        "spicy_tantanmen_desc": "Spicy sesame broth, seasoned ground pork, bok choy, crushed peanuts.",
        "vegetable_tempura_bowl_name": "Vegetable Tempura Bowl",
        "vegetable_tempura_bowl_desc": "Assorted crispy tempura vegetables over steamed rice.",
        "garlic_edamame_name": "Garlic Edamame",
        "garlic_edamame_desc": "Steamed young soybeans tossed with garlic salt and sesame oil.",
        "pork_gyoza_name": "Pork Gyoza (6pcs)",
        "pork_gyoza_desc": "Pan-fried pork and vegetable dumplings with ponzu dipping sauce.",
        "takoyaki_name": "Takoyaki (8pcs)",
        "takoyaki_desc": "Octopus-filled batter balls with takoyaki sauce, mayo, bonito flakes.",
        "miso_soup_name": "Miso Soup",
        "miso_soup_desc": "Traditional miso broth with silken tofu, wakame seaweed, and green onion.",
        "matcha_ice_cream_name": "Matcha Ice Cream",
        "matcha_ice_cream_desc": "Creamy Japanese matcha green tea ice cream, 3 generous scoops.",
        "mochi_assortment_name": "Mochi Assortment (6pcs)",
        "mochi_assortment_desc": "6 pieces of assorted mochi: strawberry, mango, green tea.",
        "tempura_ice_cream_name": "Tempura Ice Cream",
        "tempura_ice_cream_desc": "Hot crispy fried batter shell with cold ice cream inside.",
        "japanese_cheesecake_name": "Japanese Cheesecake",
        "japanese_cheesecake_desc": "Light, fluffy, jiggly cotton cheesecake.",
        "cta_omakase_title": "Can't Decide? Try Our Omakase!",
        "cta_omakase_subtitle": "Let our chef surprise you with a curated tasting experience",
        "cta_omakase_btn": "Book Omakase Experience →"
      },
      "contact": {
        "form_title": "Send Us a Message",
        "label_name": "Full Name *",
        "label_email": "Email *",
        "label_subject": "Subject",
        "label_message": "Message *",
        "opt_general": "General Inquiry",
        "opt_catering": "Catering Request",
        "opt_feedback": "Feedback",
        "opt_careers": "Careers",
        "opt_other": "Other",
        "btn_send": "Send Message",
        "success_title": "Message Sent!",
        "success_text": "Thank you for reaching out. We'll get back to you within 24 hours.",
        "btn_back_home": "Back to Home",
        "location_title": "📍 Location",
        "hours_title": "⏰ Opening Hours",
        "hours_mon_thu_label": "Monday - Thursday:",
        "hours_fri_sat_label": "Friday - Saturday:",
        "hours_sun_label": "Sunday:",
        "phone_email_title": "📞 Phone & Email",
        "label_phone": "Phone:",
        "label_email_addr": "Email:",
        "parking_title": "🚗 Parking & Transit",
        "parking_text": "Free parking available in the rear lot.",
        "map_title": "Map Integration",
        "map_subtitle": "Embed Google Maps here"
      },
      "gallery": {
        "filter_all": "All",
        "filter_sushi": "Sushi Art",
        "filter_restaurant": "Restaurant",
        "filter_chefs": "Our Chefs",
        "filter_events": "Events",
        "item_dragon_title": "Dragon Roll",
        "item_dragon_desc": "Signature creation with avocado and eel",
        "item_ambiance_title": "Warm Ambiance",
        "item_ambiance_desc": "Modern Japanese minimalist design",
        "item_rainbow_title": "Rainbow Roll",
        "item_rainbow_desc": "Assorted sashimi on California roll",
        "item_chef_work_title": "Master Chef at Work",
        "item_chef_work_desc": "Years of training in every movement",
        "item_salmon_title": "Salmon Sashimi",
        "item_salmon_desc": "Premium Norwegian salmon, sushi-grade",
        "item_events_title": "Private Events",
        "item_events_desc": "Celebrate special moments with us",
        "item_ramen_title": "Tonkotsu Ramen",
        "item_ramen_desc": "Rich pork broth with handmade noodles",
        "item_bar_title": "Sushi Bar",
        "item_bar_desc": "Watch our chefs craft your meal",
        "item_tanaka_title": "Chef Tanaka",
        "item_tanaka_desc": "20 years of sushi mastery",
        "item_nigiri_title": "Nigiri Collection",
        "item_nigiri_desc": "8-piece chef's selection",
        "group_dining_title": "Group Dining",
        "group_dining_desc": "Perfect for gatherings and celebrations",
        "evening_ambiance_title": "Evening Ambiance",
        "evening_ambiance_desc": "Romantic lighting for date nights",
        "item_volcano_title": "Volcano Roll",
        "item_volcano_desc": "Spicy crab with baked scallops",
        "behind_scenes_title": "Behind the Scenes",
        "behind_scenes_desc": "Fresh ingredients prepared daily",
        "item_tuna_title": "Tuna Sashimi",
        "item_tuna_desc": "Bluefin tuna, sushi-grade perfection",
        "outdoor_seating_title": "Outdoor Seating",
        "outdoor_seating_desc": "Al fresco dining experience",
        "cta_title": "Ready to Experience It Yourself?",
        "cta_subtitle": "Book your table today and taste the artistry",
        "cta_btn_reserve": "Reserve a Table",
        "cta_btn_menu": "View Menu"
      },
      "reservations": {
        "form_title": "Book a Table",
        "label_first_name": "First Name *",
        "label_last_name": "Last Name *",
        "label_email": "Email *",
        "label_phone": "Phone *",
        "label_date": "Date *",
        "label_time": "Time *",
        "label_guests": "Number of Guests *",
        "label_occasion": "Occasion",
        "label_requests": "Special Requests",
        "btn_confirm": "Confirm Reservation",
        "success_title": "Reservation Confirmed!",
        "success_text": "We've sent a confirmation email with all the details.",
        "btn_back_home": "Back to Home",
        "opt_select_time": "Select time",
        "opt_select_guests": "Select",
        "opt_1_guest": "1 Guest",
        "opt_2_guests": "2 Guests",
        "opt_3_guests": "3 Guests",
        "opt_4_guests": "4 Guests",
        "opt_5_guests": "5 Guests",
        "opt_6_guests": "6 Guests",
        "opt_7_plus": "7+ Guests (Private Dining)",
        "opt_select_occasion": "Select (optional)",
        "occasion_birthday": "Birthday",
        "occasion_anniversary": "Anniversary",
        "occasion_business": "Business Dinner",
        "occasion_date": "Date Night",
        "occasion_celebration": "Celebration",
        "occasion_other": "Other",
        "info_title": "Good to Know",
        "info_intro": "We recommend booking at least 24 hours in advance.",
        "info_hours_title": "Hours",
        "info_hours_text": "Mon-Thu: 11AM-10PM\nFri-Sat: 11AM-11PM\nSun: 12PM-9PM",
        "info_large_parties_title": "Large Parties",
        "info_large_parties_text": "For groups of 7+, we offer private dining rooms.",
        "info_omakase_title": "Omakase Experience",
        "info_omakase_text": "Our chef's tasting menu is available Thu-Sat.",
        "info_cancellation_title": "Cancellation",
        "info_cancellation_text": "Please cancel or reschedule at least 4 hours in advance.",
        "info_help_title": "Need Help?",
        "info_help_text": "Call us at (555) 123-4567"
      },
      "cart": {
        "empty_title": "Your cart is empty",
        "empty_text": "Looks like you haven't added any items yet.",
        "btn_browse": "Browse Menu"
      }
    },
    es: {
      "nav": {
        "home": "Inicio",
        "menu": "Menú",
        "reservations": "Reservaciones",
        "gallery": "Galería",
        "about": "Nosotros",
        "contact": "Contacto",
        "cart": "Carrito"
      },
      "pages": {
        "menu_title": "Nuestro Menú",
        "menu_subtitle": "Auténticos sabores japoneses elaborados con pasión y precisión",
        "reservations_title": "Reservar una Mesa",
        "reservations_subtitle": "Reserva tu lugar para una experiencia gastronómica inolvidable",
        "gallery_title": "Nuestra Galería",
        "gallery_subtitle": "Un viaje visual por nuestra arte culinaria",
        "about_title": "Nuestra Historia",
        "about_subtitle": "Cómo un simple amor por la buena comida se convirtió en el favorito del vecindario",
        "contact_title": "Contáctanos",
        "contact_subtitle": "Nos encantaría saber de ti. Visítanos, llámanos o envíanos un mensaje.",
        "cart_title": "Tu Carrito",
        "cart_subtitle": "Revisa tu pedido antes del checkout",
        "cat_all": "Todo",
        "cat_rolls": "Rollos de Sushi",
        "cat_sashimi": "Sashimi",
        "cat_ramen": "Ramen",
        "cat_appetizers": "Aperitivos",
        "cat_desserts": "Postres"
      },
      "hero": {
        "badge": "🔥 Nuevo: Menú Degustación del Chef — Reserva Ahora",
        "title_part1": "Donde lo Fresco se Encuentra con",
        "title_part2": "lo Inolvidable",
        "description": "El favorito del vecindario desde el primer día.",
        "btn_menu": "Explorar Nuestro Menú",
        "btn_reserve": "Reservar una Mesa"
      },
      "about": {
        "title_part1": "No Solo Cocinamos —",
        "title_part2": "Nos Importa",
        "paragraph1": "Todo gran restaurante comienza con una simple creencia.",
        "paragraph2": "Queremos que sientas la calidez y el cuidado.",
        "btn_learn": "Conoce Más Sobre Nosotros →",
        "stat_years": "Años de Excelencia",
        "stat_customers": "Clientes Felices",
        "stat_dishes": "Platos Únicos",
        "story_title": "Comenzó Con Una Simple Idea",
        "story_p1": "La buena comida no necesita una historia complicada.",
        "story_p2": "Desde el primer día, nos comprometimos con ingredientes frescos.",
        "story_p3": "Hoy, estamos orgullosos de lo que hemos construido.",
        "chef_title": "Conoce al Chef Principal",
        "chef_p1": "Con años de experiencia en algunas de las mejores cocinas del país.",
        "chef_p2": "Su filosofía es simple: \"Usa los mejores ingredientes, respétalos y deja que los sabores hablen por sí mismos.\"",
        "chef_p3": "Cuando no está en la cocina, nuestro chef está explorando constantemente.",
        "chef_quote": "\"Cocinar no se trata solo de alimentar a las personas. Se trata de crear momentos que recordarán.\"",
        "values_title": "Lo Que Defendemos",
        "values_subtitle": "Los principios que guían todo lo que hacemos",
        "value_authenticity": "Autenticidad",
        "value_authenticity_text": "Sin atajos, sin compromisos. Seguimos métodos tradicionales japoneses.",
        "value_quality": "Cal Primero",
        "value_quality_text": "Solo ingredientes premium. Nuestro pescado es de grado sushi.",
        "value_hospitality": "Hospitalidad",
        "value_hospitality_text": "Omotenashi—la hospitalidad japonesa—está en nuestro ADN.",
        "value_sustainability": "Sostenibilidad",
        "value_sustainability_text": "Abastecemos responsablemente, minimizamos los residuos.",
        "cta_title": "Experiméntalo Tú Mismo",
        "cta_subtitle": "Reserva una mesa y prueba la diferencia que hace la pasión",
        "cta_btn": "Reserva Tu Mesa →"
      },
      "featured": {
        "title": "Favoritos de los Clientes",
        "subtitle": "Nuestros platos más queridos",
        "dish1_name": "Especialidad de la Casa",
        "dish1_desc": "Nuestro plato más pedido.",
        "dish1_badge": "🔥 #1 Vendido",
        "dish2_name": "Especial del Día del Chef",
        "dish2_desc": "Cambia con las estaciones.",
        "dish2_badge": "⭐ Selección del Chef",
        "dish3_name": "Tazón de Confort de la Casa",
        "dish3_desc": "Cálido, sustancioso y profundamente satisfactorio.",
        "dish4_name": "Selección Premium",
        "dish4_desc": "Lo mejor que ofrecemos.",
        "dish4_badge": "✨ Premium",
        "add_to_cart": "+ Agregar",
        "btn_full_menu": "Ver Menú Completo →"
      },
      "whyUs": {
        "title": "Por Qué la Gente Nos Elige",
        "subtitle": "Lo que hace que los comensales sigan volviendo",
        "feature1_title": "Fresco Cada Día",
        "feature1_text": "Los ingredientes llegan diariamente.",
        "feature2_title": "Cocina Experimentada",
        "feature2_text": "Años de experiencia profesional.",
        "feature3_title": "Abastecimiento de Calidad",
        "feature3_text": "Nos asociamos con granjas locales.",
        "feature4_title": "Rápido y Confiable",
        "feature4_text": "Para recoger, entregar o comer en el restaurante."
      },
      "testimonials": {
        "title": "De Boca en Boca",
        "subtitle": "Lo que dicen los clientes",
        "review1_text": "Mi esposo y yo hemos venido aquí durante años.",
        "review1_author": "Sarah K.",
        "review1_info": "Cliente leal · Centro de LA",
        "review2_text": "He reseñado más de 200 restaurantes.",
        "review2_author": "Michael R.",
        "review2_info": "Crítico de Comida, LA Food Weekly",
        "review3_text": "Pedí catering para el 40° aniversario de mis padres.",
        "review3_author": "Jennifer L.",
        "review3_info": "Pedido de Catering · Verificado"
      },
      "cta": {
        "title": "¿Listo para una Comida Inolvidable?",
        "subtitle": "Reserva tu mesa ahora o pide en línea",
        "btn_reserve": "Reservar una Mesa",
        "btn_order": "Pedir en Línea"
      },
      "footer": {
        "description": "Auténtica cocina japonesa elaborada con pasión.",
        "quickLinks": "Enlaces Rápidos",
        "hours": "Horario de Apertura",
        "hours_mon_thu": "Lun - Jue: 11:00 AM - 10:00 PM",
        "hours_fri_sat": "Vie - Sáb: 11:00 AM - 11:00 PM",
        "hours_sun": "Domingo: 12:00 PM - 9:00 PM",
        "contact": "Contáctanos",
        "copyright": "© 2026 Tu Nombre de Restaurante. Todos los derechos reservados."
      },
      "common": {
        "back_to_top": "Volver arriba",
        "item_added": "¡Artículo agregado al carrito!",
        "whatsapp_tooltip": "Pedir por WhatsApp"
      },
      "menu": {
        "section_rolls": "Rollos Especiales",
        "section_sashimi": "Sashimi y Nigiri",
        "section_ramen": "Ramen y Tazones Calientes",
        "section_appetizers": "Aperitivos y Acompañamientos",
        "section_desserts": "Postres",
        "add_to_cart": "+ Agregar al Carrito",
        "click_for_details": "Haz clic en la tarjeta para ver detalles",
        "click_flip_back": "Haz clic para volver",
        "calories": "Calorías",
        "protein": "Proteína",
        "carbs": "Carbohidratos",
        "fat": "Grasa",
        "dragon_roll_name": "Dragon Roll",
        "dragon_roll_desc": "Tempura de camarón por dentro, cubierto con aguacate y anguila.",
        "rainbow_roll_name": "Rainbow Roll",
        "rainbow_roll_desc": "Base de California roll cubierto con atún, salmón y aguacate.",
        "volcano_roll_name": "Volcano Roll",
        "volcano_roll_desc": "Mezcla de cangrejo picante, pepino, cubierto con vieiras al horno.",
        "spider_roll_name": "Spider Roll",
        "spider_roll_desc": "Cangrejo de caparazón blando crujiente, aguacate fresco y pepino.",
        "philadelphia_roll_name": "Philadelphia Roll",
        "philadelphia_roll_desc": "Salmón fresco del Atlántico, queso crema y aguacate.",
        "tempura_crunch_roll_name": "Tempura Crunch Roll",
        "tempura_crunch_roll_desc": "Tempura de camarón, queso crema por dentro, cubierto con hojuelas crujientes.",
        "salmon_sashimi_name": "Sashimi de Salmón (5 piezas)",
        "salmon_sashimi_desc": "Salmón noruego premium, de grado sushi, finamente cortado.",
        "tuna_sashimi_name": "Sashimi de Atún (5 piezas)",
        "tuna_sashimi_desc": "Atún rojo, de grado sushi, rico y tierno.",
        "chefs_sashimi_platter_name": "Bandeja de Sashimi del Chef",
        "chefs_sashimi_platter_desc": "Selección del chef de 15 piezas premium de sashimi.",
        "nigiri_set_name": "Set de Nigiri (8 piezas)",
        "nigiri_set_desc": "8 piezas de nigiri a elección del chef con wasabi.",
        "tonkotsu_ramen_name": "Tonkotsu Ramen",
        "tonkotsu_ramen_desc": "Caldo de hueso de cerdo rico, chashu de cerdo, huevo cocido.",
        "miso_ramen_name": "Miso Ramen",
        "miso_ramen_desc": "Caldo de miso sabroso, cerdo molido sazonado y maíz dulce.",
        "spicy_tantanmen_name": "Tantanmen Picante",
        "spicy_tantanmen_desc": "Caldo de sésamo picante, cerdo molido y bok choy.",
        "vegetable_tempura_bowl_name": "Tazón de Tempura de Verduras",
        "vegetable_tempura_bowl_desc": "Verduras crujientes de tempura sobre arroz al vapor.",
        "garlic_edamame_name": "Edamame con Ajo",
        "garlic_edamame_desc": "Soja joven al vapor salteada con sal de ajo.",
        "pork_gyoza_name": "Gyoza de Cerdo (6 piezas)",
        "pork_gyoza_desc": "Dumplings de cerdo y verduras fritos con salsa ponzu.",
        "takoyaki_name": "Takoyaki (8 piezas)",
        "takoyaki_desc": "Bolas de masa rellenas de pulpo con salsa takoyaki.",
        "miso_soup_name": "Sopa de Miso",
        "miso_soup_desc": "Caldo tradicional de miso con tofu sedoso y alga wakame.",
        "matcha_ice_cream_name": "Helado de Matcha",
        "matcha_ice_cream_desc": "Helado cremoso de té verde matcha japonés, 3 bolas.",
        "mochi_assortment_name": "Surtido de Mochi (6 piezas)",
        "mochi_assortment_desc": "6 piezas de mochi variado: fresa, mango, té verde.",
        "tempura_ice_cream_name": "Helado de Tempura",
        "tempura_ice_cream_desc": "Cáscara de masa frita crujiente caliente con helado frío.",
        "japanese_cheesecake_name": "Cheesecake Japonés",
        "japanese_cheesecake_desc": "Cheesecake de algodón ligero, esponjoso y tembloroso.",
        "cta_omakase_title": "¿No puedes decidir? ¡Prueba nuestro Omakase!",
        "cta_omakase_subtitle": "Deja que nuestro chef te sorprenda",
        "cta_omakase_btn": "Reserva la Experiencia Omakase →"
      },
      "contact": {
        "form_title": "Envíanos un Mensaje",
        "label_name": "Nombre Completo *",
        "label_email": "Correo Electrónico *",
        "label_subject": "Asunto",
        "label_message": "Mensaje *",
        "opt_general": "Consulta General",
        "opt_catering": "Solicitud de Catering",
        "opt_feedback": "Comentarios",
        "opt_careers": "Carreras",
        "opt_other": "Otro",
        "btn_send": "Enviar Mensaje",
        "success_title": "¡Mensaje Enviado!",
        "success_text": "Gracias por contactarnos. Te responderemos dentro de 24 horas.",
        "btn_back_home": "Volver al Inicio",
        "location_title": "📍 Ubicación",
        "hours_title": "⏰ Horario de Apertura",
        "hours_mon_thu_label": "Lunes - Jueves:",
        "hours_fri_sat_label": "Viernes - Sábado:",
        "hours_sun_label": "Domingo:",
        "phone_email_title": "📞 Teléfono y Correo",
        "label_phone": "Teléfono:",
        "label_email_addr": "Correo:",
        "parking_title": "🚗 Estacionamiento y Transporte",
        "parking_text": "Estacionamiento gratuito disponible en el lote trasero.",
        "map_title": "Integración de Mapa",
        "map_subtitle": "Incrusta Google Maps aquí"
      },
      "gallery": {
        "filter_all": "Todo",
        "filter_sushi": "Arte de Sushi",
        "filter_restaurant": "Restaurante",
        "filter_chefs": "Nuestros Chefs",
        "filter_events": "Eventos",
        "item_dragon_title": "Dragon Roll",
        "item_dragon_desc": "Creación especial con aguacate y anguila",
        "item_ambiance_title": "Ambiente Acogedor",
        "item_ambiance_desc": "Diseño minimalista japonés moderno",
        "item_rainbow_title": "Rainbow Roll",
        "item_rainbow_desc": "Sashimi variado sobre California roll",
        "item_chef_work_title": "Chef Maestro en Acción",
        "item_chef_work_desc": "Años de entrenamiento en cada movimiento",
        "item_salmon_title": "Sashimi de Salmón",
        "item_salmon_desc": "Salmón noruego premium, grado sushi",
        "item_events_title": "Eventos Privados",
        "item_events_desc": "Celebra momentos especiales con nosotros",
        "item_ramen_title": "Tonkotsu Ramen",
        "item_ramen_desc": "Caldo de cerdo rico con fideos hechos a mano",
        "item_bar_title": "Barra de Sushi",
        "item_bar_desc": "Observa a nuestros chefs preparar tu comida",
        "item_tanaka_title": "Chef Tanaka",
        "item_tanaka_desc": "20 años de maestría en sushi",
        "item_nigiri_title": "Colección de Nigiri",
        "item_nigiri_desc": "Selección del chef de 8 piezas",
        "group_dining_title": "Comida en Grupo",
        "group_dining_desc": "Perfecto para reuniones y celebraciones",
        "evening_ambiance_title": "Ambiente Nocturno",
        "evening_ambiance_desc": "Iluminación romántica para cenas románticas",
        "item_volcano_title": "Volcano Roll",
        "item_volcano_desc": "Cangrejo picante con vieiras al horno",
        "behind_scenes_title": "Detrás de Escena",
        "behind_scenes_desc": "Ingredientes frescos preparados diariamente",
        "item_tuna_title": "Sashimi de Atún",
        "item_tuna_desc": "Atún rojo, perfección de grado sushi",
        "outdoor_seating_title": "Asientos al Aire Libre",
        "outdoor_seating_desc": "Experiencia gastronómica al aire libre",
        "cta_title": "¿Listo para Experimentarlo Tú Mismo?",
        "cta_subtitle": "Reserva tu mesa hoy y prueba la artesanía",
        "cta_btn_reserve": "Reservar una Mesa",
        "cta_btn_menu": "Ver Menú"
      },
      "reservations": {
        "form_title": "Reservar una Mesa",
        "label_first_name": "Nombre *",
        "label_last_name": "Apellido *",
        "label_email": "Correo Electrónico *",
        "label_phone": "Teléfono *",
        "label_date": "Fecha *",
        "label_time": "Hora *",
        "label_guests": "Número de Invitados *",
        "label_occasion": "Ocasión",
        "label_requests": "Solicitudes Especiales",
        "btn_confirm": "Confirmar Reservación",
        "success_title": "¡Reservación Confirmada!",
        "success_text": "Hemos enviado un correo de confirmación con todos los detalles.",
        "btn_back_home": "Volver al Inicio",
        "opt_select_time": "Seleccionar hora",
        "opt_select_guests": "Seleccionar",
        "opt_1_guest": "1 Invitado",
        "opt_2_guests": "2 Invitados",
        "opt_3_guests": "3 Invitados",
        "opt_4_guests": "4 Invitados",
        "opt_5_guests": "5 Invitados",
        "opt_6_guests": "6 Invitados",
        "opt_7_plus": "7+ Invitados (Comedor Privado)",
        "opt_select_occasion": "Seleccionar (opcional)",
        "occasion_birthday": "Cumpleaños",
        "occasion_anniversary": "Aniversario",
        "occasion_business": "Cena de Negocios",
        "occasion_date": "Cita Romántica",
        "occasion_celebration": "Celebración",
        "occasion_other": "Otro",
        "info_title": "Bueno Saber",
        "info_intro": "Recomendamos reservar con al menos 24 horas de anticipación.",
        "info_hours_title": "Horarios",
        "info_hours_text": "Lun-Jue: 11AM-10PM\nVie-Sáb: 11AM-11PM\nDom: 12PM-9PM",
        "info_large_parties_title": "Grupos Grandes",
        "info_large_parties_text": "Para grupos de 7+, ofrecemos salas de comedor privadas.",
        "info_omakase_title": "Experiencia Omakase",
        "info_omakase_text": "Nuestro menú de degustación está disponible Jue-Sáb.",
        "info_cancellation_title": "Cancelación",
        "info_cancellation_text": "Por favor cancela o reprograma con al menos 4 horas de anticipación.",
        "info_help_title": "¿Necesitas Ayuda?",
        "info_help_text": "Llámanos al (555) 123-4567"
      },
      "cart": {
        "empty_title": "Tu carrito está vacío",
        "empty_text": "Parece que aún no has agregado ningún artículo.",
        "btn_browse": "Explorar Menú"
      }
    }
  };

  // i18n class
  class I18n {
    constructor() {
      this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
      this.translations = window.TRANSLATIONS;
      this.isRTL = false;
      console.log('[i18n] Constructor created, lang:', this.currentLang);
    }

    init() {
      try {
        console.log('[i18n] Initializing...');
        if (!this.translations || !this.translations[this.currentLang]) {
          console.error('[i18n] Translations missing!');
          return;
        }
        this.applyTranslations();
        this.updateLanguageSelector();
        this.setLanguageDirection();
        console.log('[i18n] ✅ Initialized successfully');
      } catch (e) {
        console.error('[i18n] ❌ Init error:', e);
      }
    }

    getStoredLanguage() {
      try {
        return localStorage.getItem('preferred-language');
      } catch (e) {
        return null;
      }
    }

    storeLanguage(lang) {
      try {
        localStorage.setItem('preferred-language', lang);
      } catch (e) {
        console.warn('[i18n] Could not store language');
      }
    }

    detectBrowserLanguage() {
      const browserLang = navigator.language || navigator.userLanguage;
      return browserLang && browserLang.startsWith('es') ? 'es' : 'en';
    }

    t(key) {
      if (!key) return key;
      const keys = key.split('.');
      let value = this.translations[this.currentLang];
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key; // Return key if translation not found
        }
      }
      return value;
    }

    applyTranslations() {
      const elements = document.querySelectorAll('[data-i18n]');
      let count = 0;
      
      elements.forEach(el => {
        // Skip if has child elements with data-i18n
        if (el.querySelector('[data-i18n]')) return;
        
        const key = el.getAttribute('data-i18n');
        const translation = this.t(key);
        
        if (translation && translation !== key) {
          el.textContent = translation;
          count++;
        }
      });

      console.log(`[i18n] Translated ${count}/${elements.length} elements`);
    }

    switchLanguage(lang) {
      try {
        if (lang === this.currentLang) {
          console.log('[i18n] Already using:', lang);
          return;
        }
        if (!this.translations[lang]) {
          console.error('[i18n] Language not available:', lang);
          return;
        }

        console.log('[i18n] Switching to:', lang);
        this.currentLang = lang;
        this.storeLanguage(lang);
        this.applyTranslations();
        this.updateLanguageSelector();
        this.setLanguageDirection();

        document.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { language: lang } 
        }));

        console.log('[i18n] ✅ Switched to:', lang);
      } catch (e) {
        console.error('[i18n] ❌ Switch error:', e);
      }
    }

    updateLanguageSelector() {
      document.querySelectorAll('.lang-option').forEach(option => {
        const isActive = option.getAttribute('data-lang') === this.currentLang;
        option.classList.toggle('active', isActive);
      });

      const display = document.querySelector('.current-lang');
      if (display) {
        display.textContent = this.currentLang.toUpperCase();
      }
    }

    setLanguageDirection() {
      const rtlLangs = ['ar', 'he', 'fa', 'ur'];
      this.isRTL = rtlLangs.includes(this.currentLang);
      document.documentElement.setAttribute('dir', this.isRTL ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', this.currentLang);
    }
  }

  // Create global instance
  window.i18n = new I18n();

  // Initialize and bind language selector
  function initI18n() {
    if (window.i18nInitialized) return;
    window.i18nInitialized = true;
    window.i18n.init();
    
    // Bind language selector clicks
    bindLanguageSelector();
  }
  
  function bindLanguageSelector() {
    // Handle language option clicks
    document.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        const lang = this.getAttribute('data-lang');
        console.log('[i18n] 🌐 Clicked:', lang);
        await window.i18n.switchLanguage(lang);
        document.querySelectorAll('.lang-selector').forEach(el => el.classList.remove('open'));
      });
    });

    // Handle toggle clicks
    document.querySelectorAll('.lang-selector-toggle').forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.closest('.lang-selector').classList.toggle('open');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.lang-selector')) {
        document.querySelectorAll('.lang-selector').forEach(el => el.classList.remove('open'));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }

})();
