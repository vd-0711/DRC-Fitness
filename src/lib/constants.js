export const WHATSAPP_NUMBER = "919371036616"; // studio line — same number for call + WhatsApp, intl format, no +
export const WHATSAPP_MSG = encodeURIComponent(
  "Hi DRC Fitness! I'd like to book a trial session. Please let me know available slots."
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export const STUDIO_ADDRESS_LINK = "https://www.google.com/maps/place/?q=place_id:ChIJCUgmCSzBwjsRzXshCZDBfl8";
// Studio phone is the same line as WhatsApp — one number for call + chat.
export const STUDIO_PHONE = "+91 89833 85345";
export const STUDIO_PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;
export const INSTAGRAM_LINK = "https://www.instagram.com/drcfitnesspune/";
export const REVIEWS_LINK = "https://search.google.com/local/reviews?placeid=ChIJCUgmCSzBwjsRzXshCZDBfl8";

export const services = [
  { n: "01", id: "personal-training", t: "Personal Training", d: "One-on-one coaching engineered around your biomechanics, goals, and history. Every set has intent." },
  { n: "02", id: "couple-semi-personal", t: "Couple & Semi-Personal", d: "Train alongside a partner or in a small group of two to three. Shared accountability, individual programming." },
  { n: "03", id: "posture-alignment", t: "Posture & Alignment", d: "Movement screens and corrective work that fix the root, not the symptom. The foundation everything else stands on." },
  { n: "04", id: "strength-conditioning", t: "Strength & Conditioning", d: "Periodised programming with Olympic variations, hypertrophy blocks, and conditioning that translates to life." },
  { n: "05", id: "female-athletic", t: "Female Athletic Training", d: "Specialised protocols for women — strength, sport-specific work, and pre/post-natal considerations." },
  { n: "06", id: "theragun-recovery", t: "Theragun Recovery", d: "Percussive therapy integrated into your session. Recover faster, move better, train harder tomorrow." },
];

// Equipment is photo-first. Drop portrait images (≈1200×1500, 4:5) into
// /public/equipment/ as equip-01.jpg … equip-09.jpg. If a file is missing the
// card degrades gracefully to a brushed-metal panel with the name.
export const equipment = [
  { name: "Technogym Skillrun", img: "/equipment/equip-01.jpg", cat: "Performance" },
  { name: "Ski Trainer", img: "/equipment/equip-02.jpg", cat: "Performance" },
  { name: "Functional Trainer", img: "/equipment/equip-03.jpg", cat: "Functional" },
  { name: "Lat Pulldown", img: "/equipment/equip-04.jpg", cat: "Strength" },
  { name: "Smith Machine", img: "/equipment/equip-05.jpg", cat: "Strength" },
  { name: "Dual Adjustable Pulley", img: "/equipment/equip-06.jpg", cat: "Functional" },
  { name: "Cable Column", img: "/equipment/equip-07.jpg", cat: "Functional" },
  { name: "Free Weights", img: "/equipment/equip-08.jpg", cat: "Strength" },
  { name: "Leg Press", img: "/equipment/equip-09.jpg", cat: "Strength" },
];

export const testimonials = [
  { q: "Top notch machines as per international standards and the coach is knowledgable and passionate. The best training studio I came across in my visit to Pune.", a: "Visiting member, Hong Kong" },
  { q: "Tried their Technogym equipment and loved it instantly. In 9 years of on-and-off workouts, I've never felt this experience. Signed up on the spot.", a: "New member, Pune" },
  { q: "Cable movements are fluid and smooth on all strength machines. Personalised training and continuous guidance. Wellness is luxury.", a: "Member, Kalyani Nagar" },
  { q: "Durgesh has been my trainer for the past 15 years. The workouts are amazing with stunning equipment.", a: "Long-term member" },
];
