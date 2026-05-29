export const WHATSAPP_NUMBER = "918983385345"; // intl format, no +
export const WHATSAPP_MSG = encodeURIComponent(
  "Hi DRC Fitness! I'd like to book a trial session. Please let me know available slots."
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export const STUDIO_ADDRESS_LINK = "https://www.google.com/maps/place/?q=place_id:ChIJCUgmCSzBwjsRzXshCZDBfl8";
export const STUDIO_PHONE = "+919371036616";
export const STUDIO_PHONE_LINK = "tel:+919371036616";
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

export const equipment = [
  { name: "Technogym Skillrun", videoSrc: "/video/equipment-01.mp4", poster: "/video/equipment-01-poster.jpg" },
  { name: "Technogym Kinesis", videoSrc: "/video/equipment-02.mp4", poster: "/video/equipment-02-poster.jpg" },
  { name: "Olympic Platform", videoSrc: "/video/equipment-03.mp4", poster: "/video/equipment-03-poster.jpg" },
  { name: "Specialty Bars", videoSrc: "/video/equipment-04.mp4", poster: "/video/equipment-04-poster.jpg" },
  { name: "Glute Drive", videoSrc: "/video/equipment-05.mp4", poster: "/video/equipment-05-poster.jpg" },
  { name: "Pneumatic Resistance", videoSrc: "/video/equipment-06.mp4", poster: "/video/equipment-06-poster.jpg" },
  { name: "Skillmill", videoSrc: "/video/equipment-07.mp4", poster: "/video/equipment-07-poster.jpg" },
  { name: "Free Weights", videoSrc: "/video/equipment-08.mp4", poster: "/video/equipment-08-poster.jpg" },
  { name: "Recovery Suite", videoSrc: "/video/equipment-09.mp4", poster: "/video/equipment-09-poster.jpg" },
];

export const testimonials = [
  { q: "Top notch machines as per international standards and the coach is knowledgable and passionate. The best training studio I came across in my visit to Pune.", a: "Visiting member, Hong Kong" },
  { q: "Tried their Technogym equipment and loved it instantly. In 9 years of on-and-off workouts, I've never felt this experience. Signed up on the spot.", a: "New member, Pune" },
  { q: "Cable movements are fluid and smooth on all strength machines. Personalised training and continuous guidance. Wellness is luxury.", a: "Member, Kalyani Nagar" },
  { q: "Durgesh has been my trainer for the past 15 years. The workouts are amazing with stunning equipment.", a: "Long-term member" },
];
