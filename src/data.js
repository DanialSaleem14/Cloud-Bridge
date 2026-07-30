// ---------------------------------------------------------------------------
// All site content lives here. Edit this file to change text, prices, links.
// Nothing else needs touching.
// ---------------------------------------------------------------------------

export const company = {
  name: 'Cloud Bridge',
  fullName: 'Cloud Bridge Tours & Travels',
  tagline: 'We turn your travel dreams into reality. Explore the world with Cloud Bridge.',
  phone: '+92 334 7411370',
  phoneHref: 'tel:+923347411370',
  whatsapp: '923347411370', // <-- REPLACE with the real WhatsApp number (country code, no + or spaces)
  email: 'cloudbridge.officials@gmail.com',
  address: 'Islamabad, Pakistan',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Packages', href: '#packages' },
  { label: 'Services', href: '#services' },
  { label: 'Visa Assistance', href: '#services' },
  { label: 'Umrah', href: '#packages' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
];

export const socials = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'instagram', label: 'Instagram', href: '#' },
  { icon: 'youtube', label: 'YouTube', href: '#' },
  { icon: 'tiktok', label: 'TikTok', href: '#' },
];

// --- Hero ------------------------------------------------------------------

export const hero = {
  titleTop: 'Your Journey,',
  titleScript: 'Our Priority',
  body: 'Explore the world with Cloud Bridge Tours & Travels. We make every journey comfortable, memorable and worry-free.',
  badges: [
    { icon: 'tag-price',    title: 'Best Prices',  sub: 'Guaranteed' },
    { icon: 'handshake',    title: 'Trusted',      sub: 'Travel Partner' },
    { icon: 'headset',      title: '24/7 Support', sub: 'We are here' },
    { icon: 'shield-check', title: 'Safe & Secure', sub: 'Travel' },
  ],
};

export const bookingTabs = [
  { id: 'flights',  label: 'Flights',  icon: 'plane' },
  { id: 'hotels',   label: 'Hotels',   icon: 'hotel' },
  { id: 'packages', label: 'Packages', icon: 'briefcase' },
  { id: 'umrah',    label: 'Umrah',    icon: 'kaaba' },
];

// --- Booking card: fields for each tab -------------------------------------
// Edit labels / options here. BookingCard.jsx renders whatever is written below.
//
//   rows   -> rendered top to bottom.
//             kind 'route'  = 2 fields with a swap button between them
//             kind 'pair'   = 2 fields side by side
//             kind 'single' = 1 full width field
//   field  -> kind 'text' | 'date' | 'select'  (select needs `options`)
//             `disabledWhen` = hide/disable the field for those toggle ids

export const cityOptions = [
  'Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Multan', 'Faisalabad',
  'Sialkot', 'Quetta', 'Skardu', 'Gilgit', 'Dubai', 'Jeddah', 'Madinah',
  'Riyadh', 'Doha', 'Istanbul', 'Kuala Lumpur', 'Bangkok', 'Baku', 'London',
  'Toronto', 'New York', 'Paris', 'Zurich',
];

export const pkDepartureCities = [
  'Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Multan',
  'Faisalabad', 'Sialkot', 'Quetta',
];

const travellerCounts = ['1 Traveller', '2 Travellers', '3 Travellers', '4 Travellers', '5 Travellers', '6+ Travellers'];

export const bookingForms = {
  flights: {
    submitLabel: 'Search Flights',
    toggles: [
      { id: 'oneway', label: 'One Way' },
      { id: 'round',  label: 'Round Trip' },
      { id: 'multi',  label: 'Multi City' },
    ],
    rows: [
      {
        kind: 'route',
        fields: [
          { name: 'from', label: 'From', placeholder: 'Select departure city', icon: 'pin', list: 'cities' },
          { name: 'to',   label: 'To',   placeholder: 'Select destination city', icon: 'pin', list: 'cities' },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'depart', label: 'Depart Date', kind: 'date', placeholder: 'Select date', icon: 'calendar' },
          { name: 'return', label: 'Return Date', kind: 'date', placeholder: 'Select date', icon: 'calendar', disabledWhen: ['oneway'] },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'travellers', label: 'Travellers', kind: 'select', icon: 'user', placeholder: '1 Traveller', options: travellerCounts },
          { name: 'cabin', label: 'Class', kind: 'select', icon: 'plane', placeholder: 'Economy',
            options: ['Economy', 'Premium Economy', 'Business', 'First Class'] },
        ],
      },
    ],
  },

  hotels: {
    submitLabel: 'Search Hotels',
    toggles: [
      { id: 'domestic',      label: 'Pakistan' },
      { id: 'international', label: 'International' },
    ],
    rows: [
      {
        kind: 'single',
        fields: [
          { name: 'destination', label: 'City or Hotel Name', placeholder: 'e.g. Hunza, Dubai, Makkah', icon: 'pin', list: 'cities' },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'checkin',  label: 'Check-in Date',  kind: 'date', placeholder: 'Select date', icon: 'calendar' },
          { name: 'checkout', label: 'Check-out Date', kind: 'date', placeholder: 'Select date', icon: 'calendar' },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'rooms', label: 'Rooms & Guests', kind: 'select', icon: 'bed', placeholder: '1 Room, 2 Guests',
            options: ['1 Room, 1 Guest', '1 Room, 2 Guests', '1 Room, 3 Guests', '2 Rooms, 4 Guests', '3 Rooms, 6 Guests', 'Group Booking (6+)'] },
          { name: 'rating', label: 'Hotel Rating', kind: 'select', icon: 'star', placeholder: 'Any Rating',
            options: ['Any Rating', '3 Star', '4 Star', '5 Star'] },
        ],
      },
    ],
  },

  packages: {
    submitLabel: 'Find Packages',
    toggles: [
      { id: 'domestic',      label: 'Domestic' },
      { id: 'international', label: 'International' },
    ],
    rows: [
      {
        kind: 'pair',
        fields: [
          { name: 'destination', label: 'Destination', placeholder: 'Where do you want to go?', icon: 'pin', list: 'cities' },
          { name: 'type', label: 'Package Type', kind: 'select', icon: 'briefcase', placeholder: 'Select type',
            options: ['Family Tour', 'Honeymoon', 'Group Tour', 'Adventure / Trekking', 'Corporate Trip', 'Custom Package'] },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'date', label: 'Travel Date', kind: 'date', placeholder: 'Select date', icon: 'calendar' },
          { name: 'duration', label: 'Duration', kind: 'select', icon: 'clock', placeholder: 'Select duration',
            options: ['3 - 4 Days', '5 - 7 Days', '8 - 10 Days', '11 - 14 Days', '15+ Days'] },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'travellers', label: 'Travellers', kind: 'select', icon: 'users', placeholder: '2 Travellers', options: travellerCounts },
          { name: 'budget', label: 'Budget (per person)', kind: 'select', icon: 'tag-price', placeholder: 'Select budget',
            options: ['Under PKR 100,000', 'PKR 100,000 - 250,000', 'PKR 250,000 - 500,000', 'PKR 500,000+'] },
        ],
      },
    ],
  },

  umrah: {
    submitLabel: 'Search Umrah Packages',
    toggles: [
      { id: 'withflight', label: 'With Flight' },
      { id: 'landonly',   label: 'Land Package Only' },
    ],
    rows: [
      {
        kind: 'pair',
        fields: [
          { name: 'from', label: 'Departure City', kind: 'select', icon: 'pin', placeholder: 'Select city',
            options: pkDepartureCities, disabledWhen: ['landonly'] },
          { name: 'type', label: 'Package Type', kind: 'select', icon: 'kaaba', placeholder: 'Select type',
            options: ['Economy', 'Standard', 'Deluxe', 'VIP / Executive'] },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'date', label: 'Travel Date', kind: 'date', placeholder: 'Select date', icon: 'calendar' },
          { name: 'duration', label: 'Duration', kind: 'select', icon: 'clock', placeholder: 'Select duration',
            options: ['10 Days', '14 Days', '15 Days', '21 Days', '28 Days'] },
        ],
      },
      {
        kind: 'pair',
        fields: [
          { name: 'pilgrims', label: 'Pilgrims', kind: 'select', icon: 'users', placeholder: '1 Pilgrim',
            options: ['1 Pilgrim', '2 Pilgrims', '3 Pilgrims', '4 Pilgrims', '5 Pilgrims', '6+ Pilgrims'] },
          { name: 'hotel', label: 'Hotel Category', kind: 'select', icon: 'hotel', placeholder: 'Select category',
            options: ['5 Star - Haram View', '5 Star', '4 Star', '3 Star', 'Economy'] },
        ],
      },
    ],
  },
};

// --- Feature strip ---------------------------------------------------------

export const features = [
  { icon: 'cursor-click',  title: 'Easy Booking',  sub: 'Book in just a few clicks' },
  { icon: 'compass',       title: 'Wide Range',    sub: '1000+ Destinations' },
  { icon: 'percent-deal',  title: 'Best Deals',    sub: 'Exclusive offers' },
  { icon: 'headset',       title: 'Customer Care', sub: 'Always here to help' },
];

// --- Services --------------------------------------------------------------

export const services = [
  { icon: 'plane',      title: 'Flight Reservations', sub: 'Domestic & International' },
  { icon: 'hotel',      title: 'Hotel Bookings',      sub: 'Worldwide Hotels' },
  { icon: 'kaaba',      title: 'Umrah Packages',      sub: 'Economy to VIP' },
  { icon: 'map',        title: 'Tour Packages',       sub: 'Domestic & International' },
  { icon: 'visa-doc',   title: 'Visa Assistance',     sub: 'All Countries' },
  { icon: 'insurance',  title: 'Travel Insurance',    sub: 'Safe & Secure' },
  { icon: 'bus',        title: 'Transport Services',  sub: 'Transfers & Rentals' },
  { icon: 'headset',    title: '24/7 Support',        sub: 'We are here' },
];

// --- Destinations ----------------------------------------------------------

export const destinations = [
  { name: 'Turkey',       image: 'dest-turkey',       price: 'PKR 165,000' },
  { name: 'Malaysia',     image: 'dest-malaysia',     price: 'PKR 98,000' },
  { name: 'Switzerland',  image: 'dest-switzerland',  price: 'PKR 320,000' },
  { name: 'Dubai',        image: 'dest-dubai',        price: 'PKR 85,000' },
  { name: 'Saudi Arabia', image: 'dest-saudi-arabia', price: 'PKR 105,000', note: 'Umrah Packages' },
  { name: 'Baku',         image: 'dest-baku',         price: 'PKR 125,000', note: 'Azerbaijan' },
];

// --- About -----------------------------------------------------------------

export const about = {
  eyebrow: 'About Us',
  title: 'Cloud Bridge Tours & Travels',
  body: 'We are a full-service travel agency committed to providing exceptional travel experiences. From flights and hotels to visa assistance and customized tour packages, we handle everything so you can travel with peace of mind.',
  badge: { value: '10+', label: 'Years of Experience' },
  stats: [
    { value: '10+',   label: 'Years Experience' },
    { value: '5000+', label: 'Happy Customers' },
    { value: '1000+', label: 'Successful Trips' },
    { value: '24/7',  label: 'Support' },
  ],
};

// --- Packages --------------------------------------------------------------

const AMENITIES = [
  { icon: 'car',        label: 'Transport' },
  { icon: 'bed',        label: 'Hotel' },
  { icon: 'binoculars', label: 'Guide' },
  { icon: 'utensils',   label: 'Meals' },
];

export const packages = [
  { title: 'Naran Kaghan Tour',  location: 'Pakistan',     duration: '3 Days 2 Nights', image: 'pkg-naran-kaghan', price: 'PKR 15,999',  amenities: AMENITIES },
  { title: 'Hunza Valley Tour',  location: 'Pakistan',     duration: '5 Days 4 Nights', image: 'pkg-hunza-valley', price: 'PKR 24,999',  amenities: AMENITIES },
  { title: 'Swat Valley Tour',   location: 'Pakistan',     duration: '7 Days 6 Nights', image: 'pkg-swat-valley',  price: 'PKR 28,999',  amenities: AMENITIES },
  { title: 'Turkey Tour Package', location: 'Turkey',      duration: '7 Days 6 Nights', image: 'pkg-turkey',       price: 'PKR 165,000', amenities: AMENITIES, featured: true },
  { title: 'Umrah Package',      location: 'Saudi Arabia', duration: '14 Days',         image: 'pkg-umrah',        price: 'PKR 105,000', amenities: AMENITIES },
];

// --- Why choose us ---------------------------------------------------------

export const whyChooseUs = [
  { icon: 'tag-price',    title: 'Best Price Guarantee', sub: 'We ensure the best prices for you.' },
  { icon: 'handshake',    title: 'Trusted & Reliable',   sub: 'Thousands of happy customers trust us.' },
  { icon: 'sliders',      title: 'Customized Packages',  sub: 'Tailor-made packages as per your needs.' },
  { icon: 'headset',      title: '24/7 Customer Support', sub: 'We are available anytime for you.' },
  { icon: 'lock',         title: 'Secure & Safe Travel', sub: 'Your safety and comfort is our priority.' },
  { icon: 'users',        title: 'Experienced Team',     sub: 'Professional and experienced team.' },
];

// --- Testimonials ----------------------------------------------------------

export const testimonials = [
  { name: 'Ahmad Raza', city: 'Lahore, Pakistan',    avatar: 'avatar-ahmad-raza', rating: 5, quote: 'Amazing experience with Cloud Bridge! Everything was perfectly arranged. Highly recommended.' },
  { name: 'Sana Khan',  city: 'Karachi, Pakistan',   avatar: 'avatar-sana-khan',  rating: 5, quote: 'Our Umrah trip was smooth and comfortable. Great service and very cooperative team.' },
  { name: 'Usman Ali',  city: 'Islamabad, Pakistan', avatar: 'avatar-usman-ali',  rating: 5, quote: 'Best travel agency. From booking to travel, everything was hassle-free.' },
];

// --- Partners --------------------------------------------------------------

export const partners = [
  { name: 'Emirates',         image: 'partner-emirates' },
  { name: 'Qatar Airways',    image: 'partner-qatar' },
  { name: 'Turkish Airlines', image: 'partner-turkish' },
  { name: 'Saudia',           image: 'partner-saudia' },
  { name: 'PIA',              image: 'partner-pia' },
];

// --- Footer ----------------------------------------------------------------

export const footer = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Packages', href: '#packages' },
    { label: 'Services', href: '#services' },
    { label: 'Visa Assistance', href: '#services' },
    { label: 'Umrah', href: '#packages' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact Us', href: '#contact' },
  ],
  services: [
    'Flight Reservations',
    'Hotel Bookings',
    'Tour Packages',
    'Umrah Packages',
    'Visa Assistance',
    'Travel Insurance',
    'Transport Services',
  ],
};
