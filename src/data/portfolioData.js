export const personalData = {
  name: "Nguyen Anh Phi",
  shortName: "Anh Phi",
  roleTitle: "AI Engineer",
  subtitle: "3rd-Year Information Technology Major",
  university: "Ho Chi Minh City University of Education (HCMUE)",
  department: "Faculty of Information Technology",
  gpa: "3.56 / 4.00",
  status: "Seeking AI Engineering Internships",
  location: "Ho Chi Minh City, Vietnam",
  email: "phina1011@gmail.com", // TODO: Điền email thật
  github: "https://github.com/AnhPhiNe", // TODO: Điền link GitHub thật
  linkedin: "https://www.linkedin.com/in/anhphine1011/", // TODO: Điền link LinkedIn thật
  leetcode: "https://leetcode.com/u/anhphine/", // TODO: Điền link LeetCode thật

  typingRoles: [
    "AI Engineer",
    "GenAI & Chatbot Developer",
    "Computer Science Educator",
    "Deep Learning Enthusiast"
  ],

  bioSummary: "Focused on building practical, production-oriented GenAI applications — especially hybrid and graph-augmented Retrieval-Augmented Generation (RAG) systems that stay grounded in real data rather than relying on generation alone. My technical foundation spans Python, FastAPI, and applied NLP, guided by one principle: never let an LLM generate what should be looked up with certainty.",

  quickStats: [
    { label: "Current GPA", value: "3.56", unit: "/ 4.00" },
    { label: "TOEIC", value: "___", unit: "/ 990" },
    { label: "Target Role", value: "AI Engineer", unit: "" }
  ]
};

export const terminalCommands = {
  help: [
    "AVAILABLE COMMANDS:",
    "  whoami       - Print personal profile & background",
    "  skills       - Display AI/ML tech stack & domain expertise",
    "  projects     - List featured AI projects",
    "  education    - Show academic standing & certifications",
    "  contact      - Display contact links & email",
    "  clear        - Clear the terminal screen"
  ],
  whoami: [
    `IDENTITY: ${personalData.name} (Born 2005)`,
    `STATUS  : ${personalData.subtitle}`,
    `FOCUS   : ${personalData.typingRoles.join(', ')}`,
    "GOAL    : Building intelligent, practical AI applications for real-world use.",
    "QUOTE   : 'Turning ideas into intelligent systems, one model at a time.'"
  ],
  skills: [
    "CORE AI/ML TECH STACK:",
    "  - Deep Learning Frameworks: PyTorch, TensorFlow",
    "  - GenAI & LLMs            : HuggingFace Transformers, LangChain, Ollama",
    "  - Programming Languages   : Python, JavaScript",
    "  - Tools & Platforms       : Docker, FastAPI, Git",
    "  - Data & Analytics        : Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn"
  ],
  projects: [
    "FEATURED AI PROJECTS:",
    "  1. Chatbot HCMUE | AI-powered chatbot system for HCMUE (Details coming soon)"
  ],
  education: [
    "ACADEMIC CREDENTIALS:",
    `  - ${personalData.university} - ${personalData.department}`,
    `  - GPA: ${personalData.gpa}`,
    "  - TOEIC: Currently studying"
  ],
  contact: [
    "CONTACT INFORMATION:",
    `  - Email   : ${personalData.email}`,
    `  - GitHub  : ${personalData.github}`,
    `  - LinkedIn: ${personalData.linkedin}`,
    `  - LeetCode: ${personalData.leetcode}`
  ]
};


export const featuredProjects = [
  {
    id: "chatbot-hcmue",
    title: "HCMUE Student Handbook Assistant",
    category: "AI / RAG SYSTEM",
    tagline: "A cohort-aware Vietnamese RAG assistant for HCMUE students.",
    images: [
      "/projects/home_page.jpg",
      "/projects/chat_page.jpg",
      "/projects/chat_conversation_01.jpg",
      "/projects/chat_conversation_02.jpg"
    ],
    status: "Live in Production",
    techStack: ["Python", "FastAPI", "Qdrant", "MongoDB", "React/TypeScript", "Redis", "LangFuse"],
    description: "A cohort-aware Vietnamese RAG assistant for HCMUE students, combining hybrid retrieval (BM25 + vector search), graph-augmented context, and a custom evaluation framework to minimize hallucination on high-frequency student questions.",
    github: "https://github.com/AnhPhiNe/student-handbook-rag-chatbot",
    demoLink: "https://www.hcmuebot.id.vn",
  }
];

export const academicTimeline = [
  {
    period: "2023 - Present (Year 3)",
    title: "B.S. in Information Technology",
    institution: "HCMUE (Ho Chi Minh City University of Education)",
    description: "Studying Information Technology with a focus on AI and software development. Current GPA: 3.56/4.00.",
    highlights: ["GPA: 3.56/4.00", "Focus: AI Engineering"]
  }
];

export const achievements = [
  {
    title: "Scientific Research Award (Knowledge Graphs)",
    issuer: "Faculty of Information Technology, HCMUE",
    date: "05/2026",
    description: "Honorable Mention for the research topic: 'Building a Knowledge Graph for Annotating STEM Scientific Images'."
  },
  {
    title: "Perfect 4.00 Semester GPA (3 Consecutive Semesters)",
    issuer: "HCMUE",
    date: "09/2024 - 06/2026",
    description: "Maintained a flawless 4.00/4.00 GPA for three consecutive academic semesters."
  },
  {
    title: "Academic Merit Scholarship (3 Consecutive Semesters)",
    issuer: "HCMUE",
    date: "09/2024 - 06/2026",
    description: "Awarded the university's Academic Merit Scholarship for three consecutive semesters due to outstanding academic excellence."
  },
  {
    title: "Outstanding Student Award",
    issuer: "HCMUE",
    date: "2024 - 2025",
    description: "Awarded the title of Student with Excellent Academic and Training Achievements for exceptional performance."
  },
  {
    title: "Exemplary Union Member (UE Awards)",
    issuer: "Ho Chi Minh City Communist Youth Union",
    date: "2024 - 2025",
    description: "Recognized as an outstanding Youth Union member for active contributions to university and community movements."
  }
];
