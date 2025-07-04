const mongoose = require('mongoose');

// Create sample user ObjectIds
const sampleUserIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId()
];

const mentors = [
  {
    _id: new mongoose.Types.ObjectId(),
    user: sampleUserIds[0],
    name: "John Doe",
    title: "Senior Software Engineer",
    experience: 10,
    education: "M.S. in Computer Science, Stanford University",
    categories: ["Technology", "Engineering"],
    expertise: ["Web Development", "Mobile App Development", "Cloud Computing"],
    ratings: 4.8,
    reviewCount: 35,
    hourlyRate: 75,
    availability: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
    languages: ["English", "Spanish"],
    image: "/mentors/john-doe.jpg",
    bio: "Over 10 years of experience in software development and architecture. Specializes in web technologies and cloud solutions. Passionate about mentoring new developers."
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: sampleUserIds[1],
    name: "Jane Smith",
    title: "Finance Director",
    experience: 15,
    education: "MBA in Finance, Harvard Business School",
    categories: ["Economics", "Business"],
    expertise: ["Financial Analysis", "Investment Banking", "Corporate Strategy"],
    ratings: 4.9,
    reviewCount: 42,
    hourlyRate: 90,
    availability: ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
    languages: ["English", "French"],
    image: "/mentors/jane-smith.jpg",
    bio: "Finance expert with extensive experience in investment banking and corporate finance. Helps professionals navigate the complex world of finance and investment."
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: sampleUserIds[2],
    name: "Dr. Alex Brown",
    title: "Clinical Psychologist",
    experience: 12,
    education: "Ph.D. in Clinical Psychology, Columbia University",
    categories: ["Psychology", "Medical"],
    expertise: ["Clinical Psychology", "Cognitive Behavioral Therapy", "Mental Health"],
    ratings: 4.7,
    reviewCount: 28,
    hourlyRate: 85,
    availability: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    languages: ["English"],
    image: "/mentors/alex-brown.jpg",
    bio: "Licensed clinical psychologist with a focus on cognitive behavioral therapy. Helps students and professionals understand the field of psychology and career paths."
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: sampleUserIds[3],
    name: "Dr. Maria Rodriguez",
    title: "Research Scientist",
    experience: 14,
    education: "Ph.D. in Molecular Biology, MIT",
    categories: ["Science", "Medical"],
    expertise: ["Molecular Biology", "Genetics", "Cancer Research"],
    ratings: 4.9,
    reviewCount: 31,
    hourlyRate: 80,
    availability: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
    languages: ["English", "Spanish"],
    image: "/mentors/maria-rodriguez.jpg",
    bio: "Research scientist with experience at top research institutions. Guides aspiring scientists through academic and industry research career paths."
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: sampleUserIds[4],
    name: "Robert Chen",
    title: "Public Administrator",
    experience: 18,
    education: "Master's in Public Administration, Georgetown University",
    categories: ["Government", "Economics"],
    expertise: ["Public Policy", "Government Relations", "International Development"],
    ratings: 4.6,
    reviewCount: 25,
    hourlyRate: 70,
    availability: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    languages: ["English", "Mandarin"],
    image: "/mentors/robert-chen.jpg",
    bio: "Experienced public administrator with background in government and international organizations. Helps navigate the complexities of public service careers."
  }
];

module.exports = mentors; 