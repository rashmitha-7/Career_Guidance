const categories = [
  {
    id: 'engineering',
    name: "engineering",
    img: "/engineer.jpg",
    description: "Innovate and build the future with diverse engineering disciplines and career paths. Explore specializations like software, mechanical, civil, and electrical engineering, and find resources for professional development.",
    count: 25,
    subcategories: [
      { name: "Sound", description: "Explore careers in acoustic engineering and sound design." },
      { name: "Industrial", description: "Focus on optimizing complex processes, systems, and organizations." },
      { name: "Mechanical", description: "Design, analyze, and manufacture mechanical systems." },
      { name: "Electrical", description: "Work with electricity, electronics, and electromagnetism." },
      { name: "Civil", description: "Design, construct, and maintain physical and naturally built environments." },
      { name: "Electronics and Communication", description: "Deal with electronic devices, circuits, and communication systems." },
      { name: "Computer Science", description: "Study computation and information processing." },
      { name: "Electronics & Instrumentation", description: "Focus on design and development of electronic instruments." }
    ]
  },
  {
    id: 'medical',
    name: "medical-science",
    img: "/medical.jpg",
    description: "Dive into healthcare careers, from clinical practice to cutting-edge medical research. Discover paths in medicine, nursing, pharmacy, public health, and allied health professions with essential study guides.",
    count: 15,
    subcategories: [
      { name: "General Practice", description: "Provide primary healthcare to individuals and families." },
      { name: "Surgery", description: "Perform operations to treat diseases, injuries, or deformities." },
      { name: "Nursing", description: "Care for individuals, families, and communities to promote health." },
      { name: "Pharmacy", description: "Dispense medications and provide drug information." }
    ]
  },
  {
    id: 'science',
    name: "research-scientist",
    img: "/science.jpg",
    description: "Uncover the mysteries of the universe through scientific inquiry and discovery. Explore fields like biology, chemistry, physics, environmental science, and data analysis. Find resources on experimental design and academic writing.",
    count: 30,
    subcategories: [
      { name: "Biology", description: "Study living organisms and their vital processes." },
      { name: "Chemistry", description: "Investigate the properties and reactions of matter." },
      { name: "Physics", description: "Explore the fundamental constituents of the universe." },
      { name: "Environmental Science", description: "Study how humans interact with their environment." }
    ]
  },
  {
    id: 'sports',
    name: "sports-management-athletics",
    img: "/sports.jpg",
    description: "Combine your passion for sports with professional careers in management, coaching, fitness, and sports science. Access training guides, industry insights, and career development tools for athletes and administrators.",
    count: 12,
    subcategories: [
      { name: "Coaching", description: "Train and guide athletes in various sports." },
      { name: "Sports Marketing", description: "Promote sports teams, events, and products." },
      { name: "Fitness Training", description: "Develop and lead fitness programs for individuals." },
      { name: "Athletic Directing", description: "Manage sports programs and facilities." }
    ]
  },
  {
    id: 'mathematics',
    name: "mathematics-data-science",
    img: "/maths.jpg",
    description: "Master the world of numbers, logic, and data analysis. Explore careers in actuarial science, statistics, cryptography, and quantitative finance. Resources include advanced problem-solving techniques and computational methods.",
    count: 18,
    subcategories: [
      { name: "Actuarial Science", description: "Assess financial risks in insurance and finance." },
      { name: "Statistics", description: "Collect, analyze, and interpret data." },
      { name: "Data Analysis", description: "Examine data to find patterns and draw conclusions." },
      { name: "Quantitative Finance", description: "Apply mathematical models to financial markets." }
    ]
  },
  {
    id: 'economics',
    name: "economics-commerce",
    img: "/economic.jpg",
    description: "Understand markets, financial systems, and global trade. Pursue careers in finance, banking, business analysis, and international commerce. Find resources on market trends, investment strategies, and economic policy.",
    count: 22,
    subcategories: [
      { name: "Finance", description: "Manage money and investments." },
      { name: "Banking", description: "Provide financial services to individuals and businesses." },
      { name: "Business Analysis", description: "Analyze business needs and recommend solutions." },
      { name: "International Trade", description: "Facilitate commerce across national borders." }
    ]
  },
  {
    id: 'government',
    name: "public-service-government",
    img: "/government.jpg",
    description: "Serve your community and nation through careers in public administration, policy-making, law enforcement, and civil service. Learn about governance, public policy, and leadership in various government sectors.",
    count: 14,
    subcategories: [
      { name: "Public Administration", description: "Manage public programs and services." },
      { name: "Policy Making", description: "Develop and implement public policies." },
      { name: "Law Enforcement", description: "Maintain law and order." },
      { name: "Civil Service", description: "Work in various government agencies and departments." }
    ]
  }
];

module.exports = categories; 