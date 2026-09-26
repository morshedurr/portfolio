import { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Morshedur Rahman Khan",
    titles: [
      "Lecturer, Information Technology & Management",
      "Erasmus+ KA171 Scholar (Sweden)",
      "Business & IT Systems Specialist",
      "Solutions & Operations Architect"
    ],
    tagline: "Bridging the gap between cutting-edge information technology, strategic business management, and impactful academic research.",
    bio: "Information Technology & Management graduate and university lecturer with a CGPA of 3.90/4.00 (Ranked 4th) and international academic experience through the fully funded Erasmus+ KA171 programme at Mälardalen University, Sweden. My background combines Information Technology, Information Systems, Management, programming, cloud computing, analytics, and research. Experienced in university teaching, academic research, technology-based projects, and leadership. Interested in Information Systems, IT Management, Business Analytics, and Digital Transformation.",
    subBio: "With experience directing multi-platform e-commerce businesses in the United States and educating future tech leaders at Daffodil International University, I thrive at the intersection of technological innovation, operational strategy, and student-centered pedagogical excellence.",
    email: "morshedkhan269@gmail.com",
    phone: "+880 1828313587",
    location: "Daffodil Smart City (DSC), Birulia, Savar, Dhaka, Bangladesh",
    linkedin: "https://www.linkedin.com/in/morshedur-rahman/",
    website: "https://www.morshedur.com/",
    resumeUrl: "/Morshedur_Rahman_Khan_CV.pdf",
    profileImage: "/profile-placeholder.png",
    keyExpertise: [
      "Information Systems, MIS, & Strategic IT Management",
      "Business & Data Analytics (Power BI, SmartPLS, Excel)",
      "Cloud Solutions Architecture (AWS Certified) & Software Engineering",
      "University Teaching, Student Mentoring, & Academic Research",
      "Cross-Platform E-commerce Operations (Amazon, Shopify, TikTok Shop)",
      "Agile Project Management, Event Direction, & Public Relations"
    ],
    academicSpotlight: {
      title: "Erasmus+ Fully Funded Scholar",
      description: "Selected for the prestigious Erasmus+ KA171 International Credit Mobility Programme at Mälardalen University in Sweden. Completed advanced coursework in OOP, IoT, Data Security, and Machine Learning.",
      badge: "International Academic Excellence"
    }
  },

  workExperience: [
    {
      id: "exp-1",
      role: "Lecturer, Information Technology & Management",
      company: "Daffodil International University",
      location: "Dhaka, Bangladesh",
      period: "14/05/2026 – Present",
      isCurrent: true,
      badge: "Faculty / Academic",
      order: 1,
      highlights: [
        "Teach 4 management & IT courses (HRM, Principles of Management, MIS, and Production & Operations Management), applying active-learning and student-centred methods.",
        "Honoured with Award for Innovative Teaching Practices and Creative Initiatives during Summer 2026 for departmental development.",
        "Advised ITM Summit 2026 on logistics, event management, and branding for the department's flagship industry-academia event.",
        "Supported departmental promotion through content development and student mentoring in scriptwriting.",
        "Liaised with the Admission Office, contributing to a 5% increase in ITM admissions through strategic programme communication."
      ]
    },
    {
      id: "exp-2",
      role: "Business Manager (Promoted from Remote IT Manager)",
      company: "Convenient Club Inc",
      location: "Miami Gardens, Florida, United States (Remote)",
      period: "01/07/2024 – 30/04/2026",
      isCurrent: false,
      badge: "US Operations & IT",
      order: 2,
      highlights: [
        "Promoted from Remote IT Manager to Business Manager, overseeing end-to-end IT systems, e-commerce, POS, CRM, inventory, and digital operations.",
        "Directed purchasing, suppliers, logistics, website maintenance, and digital marketing across Amazon, Shopify, and TikTok Shop.",
        "Managed QuickBooks, Clover POS, and comprehensive business accounts with detailed financial reporting.",
        "Supervised a 3-member remote team and coordinated staff, international vendors, and daily technology-enabled business operations."
      ]
    },
    {
      id: "exp-3",
      role: "E-commerce Merchant",
      company: "EVALY & DARAZ",
      location: "Cox's Bazar, Bangladesh",
      period: "01/2020 – 01/2022",
      isCurrent: false,
      badge: "E-Commerce",
      order: 3,
      highlights: [
        "Handled customer queries, processed deliveries, resolved product issues tactfully, and maintained high customer satisfaction.",
        "Generated monthly sales and inventory reports using MS Excel and MS Word to guide merchandising strategy."
      ]
    },
    {
      id: "exp-4",
      role: "Assistant Receptionist",
      company: "Mermaid Beach Resort",
      location: "Cox's Bazar, Bangladesh",
      period: "03/2016 – 03/2017",
      isCurrent: false,
      badge: "Hospitality & Operations",
      order: 4,
      highlights: [
        "Greeted visitors and handled communications in person, by phone, and via email with stellar hospitality standards.",
        "Ensured office security following rigorous safety procedures and assisted in managing administrative office expenses."
      ]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science (BSc) in Information Technology & Management",
      institution: "Daffodil International University",
      location: "Dhaka, Bangladesh",
      period: "01/01/2022 – 15/03/2026",
      cgpa: "3.90 / 4.00",
      rank: "Ranked 4th in the Programme",
      eqfLevel: "EQF Level 6",
      badge: "Valedictorian Standing",
      order: 1,
      description: "Comprehensive interdisciplinary curriculum combining Information Systems, Software Development, Cloud Infrastructure, and Modern Business Operations.",
      highlights: [
        "Core Courses: Information Systems, MIS, Data Structures & Algorithms, Database Systems, Computer Networking, Cloud Computing, IoT, Machine Learning, Business Analytics, Project Management, and Digital Technology.",
        "Consistently recognized on the Dean's Honour List across semesters for academic distinction."
      ]
    },
    {
      id: "edu-2",
      degree: "Erasmus+ KA171 International Credit Mobility – Semester Exchange",
      institution: "Mälardalen University",
      location: "Västerås, Sweden",
      period: "01/08/2023 – 31/01/2024",
      eqfLevel: "EQF Level 6",
      badge: "Fully Funded Scholarship",
      order: 2,
      description: "Selected for the prestigious, highly competitive Erasmus+ KA171 European Commission Scholarship to study advanced computer science and systems in Sweden.",
      highlights: [
        "Completed rigorous coursework in Object-Oriented Programming, Internet of Things (IoT), Data Communication and Security, and Machine Learning Concepts.",
        "Achieved 18.5 European credits officially recognized by Daffodil International University.",
        "Expanded global perspectives and cross-cultural leadership by collaborating with international research teams and visiting 5 European countries."
      ]
    }
  ],

  awards: [
    {
      id: "award-1",
      title: "Award for Outstanding Performance in Innovative Initiatives & Creative Practices",
      organization: "Daffodil International University",
      date: "Summer 2026",
      category: "Teaching Excellence",
      color: "border-amber-400 bg-amber-50/50",
      description: "Faculty honour awarded for innovative student-centred teaching practices, active-learning course methodologies, and creative contributions to departmental development during Summer 2026.",
      imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=900&q=80",
      order: 1
    },
    {
      id: "award-2",
      title: "Erasmus+ KA171 European Commission Scholarship Fellowship",
      organization: "European Commission / Mälardalen University, Sweden",
      date: "2023 – 2024",
      category: "International Fellowship",
      color: "border-blue-400 bg-blue-50/50",
      description: "Awarded the highly competitive, fully funded Erasmus+ KA171 scholarship to study advanced Computer Science in Sweden. Featured in The Daily Star on March 21, 2025 ('From Bangladesh to Europe: Erasmus+ exchange programme for undergraduate students').",
      imageUrl: "/Erasmus+ KA171 International Credit Mobility – Semester Exchange.png",
      credentialUrl: "https://www.thedailystar.net/youth/campus/news/bangladesh-europe-erasmus-exchange-programme-undergraduate-students-3853501",
      order: 2
    },
    {
      id: "award-3",
      title: "Project Management Case Competition – Champion (2023) & Runner-Up (2025)",
      organization: "BrainMagneto / Department of ITM, Daffodil International University",
      date: "2023 & 2025",
      category: "Case Championship",
      color: "border-indigo-400 bg-indigo-50/50",
      description: "Clinched Champion in 2023 and Runner-Up in 2025 in the flagship BrainMagneto competition, demonstrating advanced agile delivery, crisis mitigation, and strategic project management.",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
      order: 3
    },
    {
      id: "award-4",
      title: "Champion in Case Study Competition: “The Struggle of Small-Scale Farmers”",
      organization: "CIS Tech Ltd",
      date: "01/06/2025",
      category: "Industry Innovation",
      color: "border-emerald-400 bg-emerald-50/50",
      description: "Secured 1st place champion position by designing an innovative direct-to-supermarket digital supply chain model and cold-chain marketplace connecting rural farmer collectives with urban supermarkets.",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80",
      order: 4
    },
    {
      id: "award-5",
      title: "Champion in 4th International Robotech Olympiad",
      organization: "Daffodil International University / Robotech Valley",
      date: "05/07/2024",
      category: "Technology Olympiad",
      color: "border-blue-400 bg-blue-50/50",
      description: "Secured 1st place champion position in the competitive quiz and technology innovation challenge at this prestigious international robotics summit.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
      order: 5
    },
    {
      id: "award-6",
      title: "Executive Leadership – BASIS Students Forum (BSF)",
      organization: "Bangladesh Association of Software and Information Services (BASIS)",
      date: "2023 – 2025",
      category: "Industry Leadership",
      color: "border-purple-400 bg-purple-50/50",
      description: "Selected as Executive Member of the BASIS Students Forum, bridging university IT students with national software industry leaders, hosting technical workshops, and fostering tech talent.",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=80",
      credentialUrl: "https://basis.org.bd",
      order: 6
    },
    {
      id: "award-7",
      title: "Quarter Finalist – Prof. Aminul Islam Memorial Debate Festival",
      organization: "DIU Debating Club",
      date: "2022",
      category: "Debate & Communication",
      color: "border-amber-400 bg-amber-50/50",
      description: "Won 3 rigorous knockout rounds among 20 competitive university teams and completed Quarter-final, demonstrating persuasive argumentation and public speaking mastery.",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
      order: 7
    },
    {
      id: "award-8",
      title: "Business Case Competition – FMCG Route-to-Market Strategy",
      organization: "Savoy Ice Cream Factory Ltd / DIU",
      date: "2022",
      category: "Business Strategy",
      color: "border-teal-400 bg-teal-50/50",
      description: "Analyzed consumer behavior and retail logistics to propose dynamic marketing and route-to-market strategies for FMCG cold-chain operations.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      order: 8
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "GreenTrack – Carbon Footprint Monitoring Web App",
      role: "Project Initiator & AI-Assisted Developer",
      description: "Initiated and led the development of a sustainability-focused web app to track, calculate, and visualize carbon emissions for individuals and enterprises. Leveraged AI tools (Bolt, ChatGPT) for code generation, architectural design, UI prototyping, and responsive deployment.",
      demoUrl: "https://greentrack-gd.vercel.app/",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      tags: ["React", "Vite", "Carbon Analytics", "AI-Assisted Dev", "Sustainability", "Vercel"],
      featured: true,
      order: 1
    },
    {
      id: "proj-2",
      title: "Direct-to-Retail Agri-Supply Chain Optimization",
      role: "Lead Strategist & Systems Designer",
      description: "Designed a digital marketplace framework and cold-chain logistics coordination model connecting rural farming collectives directly with urban supermarket networks, minimizing intermediary loss.",
      tags: ["Supply Chain", "MIS", "Market Research", "Business Analytics"],
      featured: true,
      order: 2
    }
  ],

  research: [
    {
      id: "res-1",
      title: "Undergraduate Research Programme (URP)",
      institution: "DIU Belt Road and Research Center",
      period: "01/07/2023 – 31/12/2023",
      description: "Participated in academic research activities involving literature review, research design, empirical data collection, statistical modeling, and development of research-oriented skills in an interdisciplinary IT & Management context.",
      order: 1
    },
    {
      id: "res-2",
      title: "Field-Based Academic Research & Data Collection",
      institution: "Faculty of Graduate Studies, Daffodil International University",
      period: "2022",
      description: "Participated in field-based academic research and data collection, mastering research methodology, respondent engagement, ethical data protocols, and quantitative analysis.",
      order: 2
    }
  ],

  leadership: [
    {
      id: "lead-1",
      role: "Head, Registration & Communication",
      organization: "ITM Summit 2023 / 2026",
      period: "22/05/2023 – 30/07/2025",
      badge: "Summit Leadership",
      description: "Coordinated attendee registration and communications for 200+ delegates and industry professionals while directing a 10-member student operations committee.",
      order: 1
    },
    {
      id: "lead-2",
      role: "Secretary, External Communication & Public Relations",
      organization: "DIU Model United Nations Association (DIUMUNA)",
      period: "01/02/2022 – 30/12/2023",
      badge: "Public Diplomacy",
      description: "Spearheaded external communications, press outreach, brainstorming sessions, and the design and distribution of official PR brochures, newsletters, and digital campaign videos.",
      order: 2
    },
    {
      id: "lead-3",
      role: "Secretary, Research & Information",
      organization: "ITM Department Club",
      period: "01/09/2022 – 31/12/2022",
      badge: "Research Mentorship",
      description: "Connected research-focused undergraduate students with senior faculty mentors and facilitated journal publication and workshop opportunities.",
      order: 3
    },
    {
      id: "lead-4",
      role: "Head of Guest & Judges Management",
      organization: "Hult Prize at Daffodil International University",
      period: "01/09/2022 – 01/03/2023",
      badge: "International Competition",
      description: "Oversaw end-to-end hospitality, VIP guest travel logistics, accommodations, and panel coordination for international business case judges.",
      order: 4
    },
    {
      id: "lead-5",
      role: "Founding Member",
      organization: "Aparanho (Non-Profit Social Organization)",
      period: "2019 – 2022",
      badge: "Social Impact",
      description: "Youth-led non-profit that mobilized food distribution, warm winter blankets, and emergency shelter assistance to over 1,000 underprivileged and homeless individuals.",
      order: 5
    }
  ],

  technicalSkills: [
    { name: "Information Systems & MIS", level: 95 },
    { name: "IT Management & Digital Transformation", level: 92 },
    { name: "Power BI & Business Analytics", level: 90 },
    { name: "Advanced Excel & Financial Modeling", level: 92 },
    { name: "Python & Data Structures", level: 85 },
    { name: "Database Management & SQL", level: 88 },
    { name: "AWS Cloud & Solutions Architecture", level: 86 },
    { name: "E-Commerce Platforms & POS (Shopify, Amazon, Clover)", level: 94 }
  ],

  softSkills: [
    { name: "University Teaching & Student Mentoring", level: 95 },
    { name: "Agile Project Management (PMI Principles)", level: 92 },
    { name: "Academic Research & Data Collection", level: 90 },
    { name: "Public Speaking & PR Communications", level: 94 },
    { name: "Cross-Cultural & Remote Team Leadership", level: 92 },
    { name: "Event Management & Logistics Coordination", level: 95 }
  ],

  skillCategories: [
    {
      id: "sc-1",
      title: "Information Systems & Digital Strategy",
      description: "Enterprise IT, digital transformation, and business systems management",
      order: 1,
      skills: [
        "Management Information Systems (MIS)",
        "IT Management & Digital Transformation",
        "Business Process Reengineering",
        "E-Commerce Management (Amazon, Shopify, TikTok Shop)",
        "Enterprise POS & CRM Operations (Clover, QuickBooks)",
        "Technology Consulting & Vendor Coordination"
      ]
    },
    {
      id: "sc-2",
      title: "Data Analytics & Business Intelligence",
      description: "Data-driven decision making and statistical modeling",
      order: 2,
      skills: [
        "Power BI & Interactive Dashboards",
        "Advanced Excel Modeling & Analytics",
        "SmartPLS & Structural Equation Modeling",
        "Business & Web Analytics",
        "Empirical Data Collection & Survey Methodologies",
        "Market Research & Financial Reporting"
      ]
    },
    {
      id: "sc-3",
      title: "Cloud Infrastructure & Software Engineering",
      description: "Modern cloud architecture, networking, and programming",
      order: 3,
      skills: [
        "AWS Cloud Architecture (Associate Level)",
        "Python & Object-Oriented Programming (OOP)",
        "Data Structures & Algorithms",
        "Relational Databases & SQL Querying",
        "Internet of Things (IoT) & Smart Devices",
        "Data Communications & Network Security"
      ]
    },
    {
      id: "sc-4",
      title: "Academic Pedagogy & Leadership",
      description: "University lecturing, project leadership, and community organization",
      order: 4,
      skills: [
        "Active-Learning & Student-Centred Pedagogy",
        "Academic Mentorship & Research Guidance",
        "Agile Project Management & Scrum",
        "Event Logistics & Large-Scale Conference Direction",
        "Public Relations & Media Communications",
        "Cross-Cultural Team Coordination"
      ]
    }
  ],

  languages: [
    { 
      name: "English", 
      level: "Proficient (C2 / C1)", 
      proficiencyNote: "Listening: C2 | Reading: C2 | Writing: C2 | Spoken: C1" 
    },
    { 
      name: "Bengali", 
      level: "Native", 
      proficiencyNote: "Mother Tongue (Full Professional Proficiency)" 
    }
  ],

  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services Training and Certification",
      issueDate: "17/09/2026",
      badge: "Cloud Architecture",
      description: "Validated expertise in architecting resilient, high-performing, secure, and cost-optimized distributed systems on AWS.",
      order: 1
    },
    {
      id: "cert-2",
      name: "Fundamentals of Agile Project Management",
      issuer: "Project Management Institute (PMI)",
      issueDate: "05/06/2024",
      badge: "Agile & Scrum",
      description: "Mastered core Agile principles, Scrum cadence, user story estimation, and adaptive project lifecycle delivery.",
      order: 2
    },
    {
      id: "cert-3",
      name: "Undergraduate Research Program (URP) Certification",
      issuer: "DIU Belt Road and Research Center",
      issueDate: "2022",
      badge: "Academic Research",
      description: "Excellence in research methodology, data visualization techniques, and interdisciplinary analysis.",
      order: 3
    },
    {
      id: "cert-4",
      name: "Data Collector Certification",
      issuer: "Faculty of Graduate Studies, Daffodil International University",
      issueDate: "2022",
      badge: "Data Collection",
      description: "Certified proficiency in rigorous field data collection, quantitative polling, and ethical research protocols.",
      order: 4
    }
  ],

  references: [
    {
      id: "ref-1",
      name: "Dr. Nusrat Jahan",
      role: "Associate Professor and Head",
      department: "Department of Information Technology & Management (ITM)",
      institution: "Daffodil International University",
      relationship: "Former instructor and current departmental head who has known me since 2022 and can assess academic performance, technical abilities, teaching, research, and leadership.",
      email: "headitm@daffodilvarsity.edu.bd",
      phone: "(+880) 1847334996",
      order: 1
    },
    {
      id: "ref-2",
      name: "Ms. Moni Akter",
      role: "Senior Lecturer",
      department: "Department of Information Technology & Management (ITM)",
      institution: "Daffodil International University",
      relationship: "Faculty colleague familiar with academic credentials, teaching methods, student-engagement initiatives, and departmental contributions.",
      email: "akter.itm@diu.edu.bd",
      phone: "(+880) 1617378602",
      order: 2
    }
  ],
  teachingCourses: [
    {
      id: "course-1",
      code: "ITM 311",
      title: "Management Information Systems (MIS)",
      department: "Department of Information Technology & Management",
      institution: "Daffodil International University",
      term: "Summer 2026 – Present",
      level: "Undergraduate (3rd Year)",
      description: "Explores enterprise systems architecture, decision support systems, cloud integration, relational databases, and the strategic alignment between modern IT assets and organizational competitiveness.",
      topics: ["Enterprise Systems (ERP/CRM)", "Database & SQL Integration", "IT Strategy & Business Alignment", "Cloud & Information Infrastructure", "Business Process Optimization"],
      order: 1
    },
    {
      id: "course-2",
      code: "MGT 101",
      title: "Principles of Management",
      department: "Department of Information Technology & Management",
      institution: "Daffodil International University",
      term: "Summer 2026 – Present",
      level: "Undergraduate (1st Year)",
      description: "Comprehensive foundational study of managerial planning, organizational structures, leadership paradigms, ethical governance, and control mechanisms in technology-oriented enterprises.",
      topics: ["Strategic Planning & Vision", "Organizational Design & Culture", "Managerial Decision Theory", "Leadership & Motivation Models", "Corporate Ethics & Social Responsibility"],
      order: 2
    },
    {
      id: "course-3",
      code: "HRM 201",
      title: "Human Resource Management (HRM)",
      department: "Department of Information Technology & Management",
      institution: "Daffodil International University",
      term: "Summer 2026 – Present",
      level: "Undergraduate (2nd Year)",
      description: "Covers contemporary talent acquisition, performance appraisal frameworks, labor psychology, high-performance work practices, and data-driven human resource analytics.",
      topics: ["Talent Sourcing & Recruitment", "HR Analytics & Information Systems", "Performance Management & KPIs", "Training & Professional Development", "Employee Relations & Compliance"],
      order: 3
    },
    {
      id: "course-4",
      code: "OPS 302",
      title: "Production & Operations Management",
      department: "Department of Information Technology & Management",
      institution: "Daffodil International University",
      term: "Summer 2026 – Present",
      level: "Undergraduate (3rd Year)",
      description: "Quantitative and qualitative methods for manufacturing and service operations, supply chain logistics, Total Quality Management (TQM), inventory optimization, and lean systems.",
      topics: ["Supply Chain Architecture", "Inventory Control & Demand Forecasting", "Total Quality Management (TQM)", "Capacity Planning & Bottleneck Analysis", "Lean Operations & Process Flow"],
      order: 4
    }
  ],

  sectionsOrder: [
    'hero',
    'about',
    'teaching',
    'research',
    'awards',
    'projects',
    'education',
    'experience',
    'skills',
    'leadership',
    'references',
    'contact'
  ],

  sectionVisibility: {
    hero: true,
    about: true,
    teaching: true,
    research: true,
    education: true,
    experience: true,
    awards: true,
    projects: true,
    leadership: true,
    skills: true,
    certifications: true,
    references: true,
    contact: true
  }
};
