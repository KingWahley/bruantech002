import { Activity, Cloud, CodeXml, Cpu, LayoutPanelLeft,  ShoppingBag } from "lucide-react";
import images from "./images";

export const featuresData = [
  {
    id: 1,
    title: "Innovation",
    description: "We keep pace with evolving technology trends and deliver solutions that give you a competitive edge.",
    bgColor: "bg-[#EDCBCC]", 
    icon: images.innovationimg,
  },
  {
    id: 2,
    title: "Client Focus",
    description: "Your satisfaction is our top priority. We aim not just to meet, but to surpass your expectations, ensuring every interaction with us is both rewarding and memorable.",
    bgColor: "bg-[#07A2BB]",
    textColor: "text-white",
    icon: images.clientfocusimg,
  },
  {
    id: 3,
    title: "Affordability",
    description: "Through our industry alliances and deep expertise in emerging technology, we help reduce your IT costs without putting your business continuity at risk.",
    bgColor: "bg-[#E7D472]",
    icon: images.affordabilityimg,
  },
  {
    id: 4,
    title: "Scalability",
    description: "Free your team to focus on core business priorities while we handle your day-to-day IT support, management, and monitoring.",
    bgColor: "bg-[#3DB8AA]",
    icon: images.scalabilityimg,
  }
];

export const servicesData = [
  {
    title: "Cloud Engineering",
    description: "Leveraging our cloud expertise, we identify the ideal cloud solutions tailored to your specific business needs and goals.",
    bgColor: "bg-[#FDF3EA]",
    icon: Cloud,
  },
  {
    title: "Software Development",
    description: "Dealing with challenges that off-the-shelf software cannot solve? Done paying for features you never use? We build custom software solutions that align with your workflows, scale with your growth, and satisfy your security and compliance requirements.",
    bgColor: "bg-[#E0F8F2]",
    icon: CodeXml,
  },
  {
    title: "Product Development",
    description: "From early concept through final launch and go-to-market execution, we build and ship your MVP using modern technology and our cross-industry expertise.",
    bgColor: "bg-[#EEECFF]",
    icon: LayoutPanelLeft,
  },
  {
    title: "Digital Marketing",
    description: "Our digital marketing services help you establish a strong online presence and effectively connect with your target audience.",
    bgColor: "bg-[#FDF3EA]",
    icon: Activity,
  },
  {
    title: "E-commerce Solutions",
    description: "We design and develop tailored e-commerce solutions that align with your brand identity and goals, backed by expertise across multiple platforms.",
    bgColor: "bg-[#E0F8F2]",
    icon: ShoppingBag,
  },
  {
    title: "IT Consulting & Advisory",
    description: "Free your team to focus on core business priorities while we handle your day-to-day IT support, management, and monitoring.",
    bgColor: "bg-[#EEECFF]",
    icon: Cpu,
  }
];

export const stepsData = [
  {
    id: 1,
    title: "We schedule a call at a time that suits you",
    image: images.step1,
  },
  {
    id: 2,
    title: "We conduct a discovery and advisory meeting",
    image: images.step2,
  },
  {
    id: 3,
    title: "We prepare a customized proposal",
    image: images.step3,
  }
];


export const pillarsData = [
  {
    id: "people",
    title: "People",
    description: "At Bruantech, our skilled team transforms your ideas into powerful digital solutions, turning vision into reality through innovation, expertise, and technology.",
    icon: images.pillaricon1,
    image: images.pillarimg1,
  },
  {
    id: "purpose",
    title: "Purpose",
    description: "At Bruantech, we envision a future powered by technology, where innovation drives progress, solves challenges, and creates limitless opportunities for businesses and individuals alike.",
    icon: images.pillaricon2,
    image: images.pillarimg2,
  },
  {
    id: "process",
    title: "Process",
    description: "At Bruantech, our streamlined approach ensures seamless execution, transforming your vision into impactful solutions and delivering exceptional results every step of the way.",
    icon: images.pillaricon3,
    image: images.pillarimg3,
  }
];


export const caseStudyCategories = [
  "All",
  "App Design",
  "E-Commerce",
  "Web Design",
  "Cloud Engineering"
];

export const caseStudiesData = [
  {
    slug: "seattle-residences",
    title: "Seattle Residences",
    description: "Created sophisticated email templates and newsletters that reflect Seattle Residences' luxury brand identity.",
    image: images.seattleresidence,
    category: "Web Design"
  },
  {
    slug: "deola-sagoe",
    title: "Deola Sagoe",
    description: "Created a digital experience for Deola Sagoe that blends storytelling, visual design, and brand identity to enhance online engagement.",
    image: images.deolasagoe,
    category: "App Design"
  },
  {
    slug: "teach-a-girl-nigeria",
    title: "Teach A Girl Nigeria (TAG)",
    description: "Designed and developed Teach a Girl NG's website to strengthen their digital presence.",
    image: images.teachagirl,
    category: "Web Design"
  },
  {
    slug: "rohstoff-handel",
    title: "Rohstoff Handel",
    description: "Designed Rohstoff Handel's website and created digital content and campaigns to strengthen their online presence.",
    image: images.rohstoffhandel,
    category: "Web Design"
  },
  {
    slug: "seattle-residences2",
    title: "Seattle Residences2",
    description: "Created sophisticated email templates and newsletters that reflect Seattle Residences' luxury brand identity.",
    image: images.seattleresidence,
    category: "Web Design"
  },
  {
    slug: "deola-sagoe2",
    title: "Deola Sagoe2",
    description: "Created a digital experience for Deola Sagoe that blends storytelling, visual design, and brand identity to enhance online engagement.",
    image: images.deolasagoe,
    category: "E-Commerce"
  },
  {
    slug: "teach-a-girl-nigeria2",
    title: "Teach A Girl Nigeria (TAG)2",
    description: "Designed and developed Teach a Girl NG's website to strengthen their digital presence.",
    image: images.teachagirl,
    category: "Web Design"
  },
  {
    slug: "rohstoff-handel2",
    title: "Rohstoff Handel2",
    description: "Designed Rohstoff Handel's website and created digital content and campaigns to strengthen their online presence.",
    image: images.rohstoffhandel,
    category: "Web Design"
  },
  {
    slug: "never-go-alone",
    title: "Never Go Alone",
    description: "Designed and developed Never Go Alone's website to enhance their digital presence and showcase their premium hand care brand.",
    image: images.nevergoalone,
    category: "E-Commerce",
    process: [
      "We partnered with the premium wellness brand Never Go Alone to revitalize their digital presence and deepen customer engagement through a comprehensive, integrated strategy. Our team designed a visually compelling and user-friendly website that serves as a cornerstone for their brand identity, supported by high-quality imagery, descriptive copy, and multimedia assets that effectively communicate their unique value proposition.",
      "Beyond the website, we drove growth and retention by executing targeted email campaigns that kept subscribers informed about new launches and wellness tips, ultimately fostering long-term customer loyalty. This was complemented by an active social media strategy, where we leveraged influencer partnerships, interactive content, and customer testimonials to broaden their reach and build a vibrant community. By unifying these efforts across all digital platforms, we successfully elevated their online presence and strengthened their connection with their target audience."
    ],
    // Detailed fields for the dynamic page
    featured: true,
    client: "Deola Sagoe",
    location: "Nigeria",
    deliverables: ["Web Design", "Web Development", "Content Ideation and Creation"],
    techStack: [
      { name: "JavaScript", icon: images.javascriptlogo },
      { name: "TypeScript", icon: images.typescriptlogo },
      { name: "Python", icon: images.pythonlogo },
      { name: "React", icon: images.reactlogo },
      { name: "Java", icon: images.javalogo },
      { name: "Django", icon: images.djangologo },
      { name: "Google Cloud", icon: images.googlecloudlogo },
      { name: "Kubernetes", icon: images.kuberneteslogo }
    ],
    gallery: [
      images.ds1,
      images.ds2,
      images.ds3,
    ]
  },
  {
    slug: "seven-by-marie-therese3",
    title: "SevenbyMarieTherese",
    description: "Built a modern e-commerce experience for SevenbyMarieTherese with seamless design and functionality.",
    image: images.seattleresidence,
    category: "E-Commerce"
  },
  {
    slug: "seven-by-marie-therese4",
    title: "SevenbyMarieTherese2",
    description: "Built a modern e-commerce experience for SevenbyMarieTherese with seamless design and functionality.",
    image: images.seattleresidence,
    category: "E-Commerce"
  }
];

export const bruantechBlogs = [
  {
    slug: "launching-your-ecommerce-venture-in-2026",
    title: "Launching Your Ecommerce Venture in 2026: The Complete Starter's Guide",
    excerpt: "Codematic would like to provide you with everything you need for your e-commerce startup in 2023. We understand the difference between starting and starting right.",
    image: images.blog1,
    category: "GOOGLE",
    author: {
      name: "ADMIN",
      role: "Design Director",
      avatar: images.adminavatar,
    },
    date: "Oct 24, 2026",
    readTime: "12 min read",
    content: [
      {
        type: "paragraph",
        text: "One of the questions we receive most frequently as a company is how to launch an e-commerce business. The e-commerce sector has seen extraordinary growth, and this trajectory is expected to continue well into 2026 and beyond. Many business owners — just like you — are eager to make the digital transition. Entering e-commerce is a smart decision given the endless possibilities it offers. That said, success demands careful planning, consistent execution, and a solid understanding of the online retail landscape."
      },
      {
        type: "toc",
        items: [
          "1. Launching an E-commerce Business — What Does It Mean?",
          "2. Steps to Start an Ecommerce Business in 2026",
          "   2.1. 1. Perform Market Research",
          "   2.2. 2. Find a Lucrative Niche",
          "   2.3. 3. Select the Best Products to Offer",
          "   2.4. 4. Define Your Business Model",
          "   2.5. 5. Develop a Professional Online Store",
          "   2.6. 6. Improve Your Site's Search Engine Visibility",
          "   2.7. 7. Set Up Secure Payment and Checkout Processes",
          "   2.8. 8. Create a Marketing Plan",
          "   2.9. 9. Leverage Social Media and Influencer Marketing",
          "   2.10. 10. Deliver Outstanding Customer Support",
          "   2.11. 11. Review Data and Enhance Performance",
          "   2.12. 12. Keep Pace with E-commerce Developments",
          "3. Final Thoughts"
        ]
      },
      {
        type: "italic",
        text: "In this article, Codematic aims to equip you with everything you need to launch your e-commerce business in 2026. We recognize the difference between simply starting out and starting out the right way — and we understand just how critical that distinction is for any business."
      },
      {
        type: "heading2",
        text: "What Is an E-commerce Business and How Do You Launch One?"
      },
      {
        type: "paragraph",
        text: "When we talk about e-commerce, we're referring to the buying and selling of goods and services over the internet. Any business operating in this space qualifies as an e-commerce business — from a jewellery seller on Instagram to a major platform like Amazon. For the purposes of this article, our guide on building a successful e-commerce business will focus on independent ventures, although individuals can certainly start small using existing platforms."
      },
      {
        type: "heading2",
        text: "Steps to Launch Your Ecommerce Business in 2026"
      },
      {
        type: "paragraph",
        text: "There are numerous steps involved in launching an e-commerce business, and if you want to do it properly, none of them should be overlooked. Every component plays a role — skip one and your business may suffer the consequences. At this stage, we assume you already have a business plan in place. Let's now discuss the other essential actions you need to take to get started the right way."
      },
      {
        type: "heading3",
        text: "1. Perform Thorough Market Research"
      },
      {
        type: "paragraph",
        text: "There's truly no better place to begin than with market research. You can't claim to understand how to build an e-commerce business without first getting a solid grasp of your market."
      },
      {
        type: "paragraph",
        text: "It's essential to carry out in-depth market research, particularly in the industry you plan to operate in. Study the current e-commerce landscape, identify your target audience, and assess the competition. Examine consumer behaviour, emerging trends, and preferences to uncover opportunities for differentiation and value creation. The insights from your market research will point you toward the best entry into the market and help clarify the most suitable business model to adopt."
      },
      {
        type: "heading3",
        text: "2. Discover a Profitable Niche"
      },
      {
        type: "paragraph",
        text: "Breaking into e-commerce in 2023 can be challenging given the wide range of options available. Virtually any business can be moved online, which makes choosing the right direction all the more critical. You'll likely encounter many e-commerce business ideas, but finding the right niche is fundamental to your long-term success."
      },
      {
        type: "paragraph",
        text: "When selecting a profitable niche, the objective is to strike a balance between market demand and competitive pressure. Consider targeting specific demographics or offering distinctive products to establish your brand identity and build a loyal customer base."
      },
      {
        type: "heading3",
        text: "3. Pick the Right Products to Offer"
      },
      {
        type: "paragraph",
        text: "Once you've settled on a niche, your product selection will heavily influence how profitable your business becomes. This is why product choice is a critical topic in any e-commerce discussion. Research trending items, analyze their market demand, and evaluate profit margins to rank your options by profitability. You can further validate your choices by considering product quality, sourcing options, shipping logistics, and potential for future expansion."
      },
      {
        type: "heading3",
        text: "4. Define Your Business Model"
      },
      {
        type: "paragraph",
        text: "As the saying goes, 'There's more than one way to skin a cat,' and that holds true here. When thinking about how to start your e-commerce business, take a holistic view. It's not just about what you plan to sell — it's equally about how you intend to sell it."
      },
      {
        type: "heading3",
        text: "5. Create a Professional Store"
      },
      {
        type: "paragraph",
        text: "Building a professional e-commerce website is arguably where this entire conversation should begin — it's that important. A basic website or social media presence alone often isn't sufficient. Since we're focused on building an ideal e-commerce business, the platform you choose is a cornerstone element."
      },
      {
        type: "paragraph",
        text: "Your website is the public face of your e-commerce business. Investing in a professionally designed site that reflects your brand, is easy to use, and is search-engine optimized is essential. Platforms like Shopify, WooCommerce, and BigCommerce offer powerful features, solid security, and scalability — which is why we recommend them. That said, building a professional e-commerce website can be complex even for experienced developers, which is why bringing in outside expertise is often the right move. If you'd like to start this journey with us at Codematic, reach out at hello@codematic.io."
      },
      {
        type: "heading3",
        text: "Wrapping Up"
      },
      {
        type: "paragraph",
        text: "At this point, we hope we've fully addressed your question about launching an e-commerce business. If anything was missed, here's a quick summary: starting an e-commerce business may appear simple, but doing it correctly can be more involved than it seems. Even so, entering the e-commerce space in 2023 presents tremendous opportunities for entrepreneurs."
      },
      {
        type: "paragraph",
        text: "We encourage you to follow the steps we've laid out and start building something remarkable. We understand that some of these steps can be complex and may require extra support — but that's not a problem, because we don't just want to inform you, we want to help you thrive. Send us an email at contact@codematic.io so we can begin a conversation today. In today's digital world, all that's left is your e-commerce business — and we're ready to help you launch it."
      },
    ]
  },
  {
    slug: "google-workspace-vs-microsoft-365",
    title: "Google Workspace vs. Microsoft 365: An In-Depth Look at Pricing and Value for Modern Businesses",
    excerpt: "Codematic would like to provide you with everything you need for your e-commerce startup in 2023. We understand the difference between starting and starting right.",
    image: images.blog2,
    category: "GOOGLE",
    date: "Oct 20, 2026",
    readTime: "8 min read",
    author: { name: "ADMIN", role: "Design Director", avatar: images.adminavatar, },
    content: [{ type: "paragraph", text: "Article content goes here..." }]
  },
  {
    slug: "google-appsheet-ultimate-no-code",
    title: "Google AppSheet - The Ultimate No-Code Solution for Your Business",
    excerpt: "Codematic would like to provide you with everything you need for your e-commerce startup in 2023. We understand the difference between starting and starting right.",
    image: images.blog3,
    category: "GOOGLE",
    date: "Oct 15, 2026",
    readTime: "6 min read",
    author: { name: "ADMIN", role: "Design Director", avatar: images.adminavatar, },
    content: [{ type: "paragraph", text: "Article content goes here..." }]
  },
  {
    slug: "ultimate-guide-migrating-microsoft-365-google",
    title: "The Ultimate Guide to Migrating from Microsoft 365 to Google Workspace",
    excerpt: "Codematic would like to provide you with everything you need for your e-commerce startup in 2023. We understand the difference between starting and starting right.",
    image: images.blog4,
    category: "GOOGLE",
    date: "Oct 10, 2026",
    readTime: "10 min read",
    author: { name: "ADMIN", role: "Design Director", avatar: images.adminavatar, },
    content: [{ type: "paragraph", text: "Article content goes here..." }]
  },
  {
    slug: "unlock-more-value-google-cloud",
    title: "Unlock More Value and Savings for Your Business with Google Cloud",
    excerpt: "Codematic would like to provide you with everything you need for your e-commerce startup in 2023. We understand the difference between starting and starting right.",
    image: images.blog5,
    category: "CLOUD ENGINEERING",
    date: "Oct 05, 2026",
    readTime: "7 min read",
    author: { name: "ADMIN", role: "Design Director", avatar: images.adminavatar, },
    content: [{ type: "paragraph", text: "Article content goes here..." }]
  },
  {
    slug: "software-architecture-scalable-app",
    title: "Software Architecture: Building a Scalable App to Serve Millions of Users",
    excerpt: "In this article, we will explore the principles and best practices of software architecture for building scalable apps. We will also examine real-world examples of how top platforms...",
    image: images.blog6,
    category: "CLOUD ENGINEERING",
    date: "Sep 28, 2026",
    readTime: "14 min read",
    author: { name: "ADMIN", role: "Design Director", avatar: images.adminavatar, },
    content: [{ type: "paragraph", text: "Article content goes here..." }]
  }
];



export const solutionsData = [
  {
    slug: "it-consulting-advisory",
    title: "IT Consulting & Advisory",
    description: "Reclaim your team's time for high-value business initiatives by delegating your daily IT management, monitoring, and support to us.",
    image: images.solimg1,
    bgColor: "bg-[#FDF3EA]"
  },
  {
    slug: "software-development",
    title: "Software Development",
    description: "We provide expert software development services designed to elevate your digital presence and maximize your engagement with target audiences.",
    detailsDescription: "Best practices to build tailored software solutions that drive innovation, improve efficiency, and support sustainable growth.",
    image: images.solimg2,
    heroImage: images.softwaredevimg,
    bgColor: "bg-[#E0F8F2]",
    // FULL DETAILS FOR THIS SPECIFIC SOLUTION
    offerings: [
      {
        title: "Custom Software Development",
        description: "Leveraging our cloud expertise, we identify the ideal cloud solutions tailored to your specific business needs and goals.",
        icon: "MessageSquareCode",
      },
      {
        title: "Web App Development",
        description: "Dealing with challenges that off-the-shelf software cannot solve? Done paying for features you never use? We build custom software solutions that align with your workflows, scale with your growth, and satisfy your security and compliance requirements.",
        icon: "PanelsTopLeft",
      },
      {
        title: "Mobile App Development",
        description: "From early concept through final launch and go-to-market execution, we build and ship your MVP using modern technology and our cross-industry expertise.",
        icon: "Smartphone",
      },
      {
        title: "Enterprise Software",
        description: "Our digital marketing services help you establish a strong online presence and effectively connect with your target audience.",
        icon: "Building2",
      },
      {
        title: "Application Modernization",
        description: "We design and develop tailored e-commerce solutions that align with your brand identity and goals, backed by expertise across multiple platforms.",
        icon: "WandSparkles",
      },
      {
        title: "Technology Consulting",
        description: "Free your team to focus on core business priorities while we handle your day-to-day IT support, management, and monitoring.",
        icon: "Gpu",
      }
    ],
    partnerFeatures: [
      { title: "Continuous Support", description: "24/7 monitoring and proactive maintenance for zero downtime." },
      { title: "Future-Ready Solutions", description: "Architectures designed to adapt to emerging technologies and markets." },
      { title: "Strategic Expertise", description: "Senior-level consulting to align tech investments with business goals." },
      { title: "Security First Approach", description: "Robust security practices designed to protect your data and applications" }
    ],
    approach: [
      { step: 1, title: "Discovery & Planning", description: "Defining goals, user personas, and project scope." },
      { step: 2, title: "Design & Architecture", description: "UI/UX prototyping and system architecture design." },
      { step: 3, title: "Development & Testing", description: "Agile coding sprints and rigorous QA protocols." },
      { step: 4, title: "Deployment", description: "Smooth rollouts with zero-downtime deployment pipelines." },
      { step: 5, title: "Continuous Improvement", description: "Feedback-loop driven updates and scaling support." }
    ],
    techStack: [
      { name: "JavaScript", icon: images.javascriptlogo },
      { name: "TypeScript", icon: images.typescriptlogo },
      { name: "Python", icon: images.pythonlogo },
      { name: "React", icon: images.reactlogo },
      { name: "Java", icon: images.javalogo },
      { name: "Django", icon: images.djangologo },
      { name: "Google Cloud", icon: images.googlecloudlogo },
      { name: "Kubernetes", icon: images.kuberneteslogo }
    ],
  },
  {
    slug: "product-development",
    title: "Product Development",
    description: "Build a strong brand identity that reflects your values and connects with your audience.",
    image: images.solimg3,
    bgColor: "bg-[#EEECFF]"
  },
  {
    slug: "data-analytics-dashboarding",
    title: "Data Analytics & Dashboarding",
    description: "We transform your raw data into actionable insights, empowering you to make smarter decisions and optimize operations.",
    image: images.solimg4,
    bgColor: "bg-[#D9F2F7]"
  },
  {
    slug: "e-commerce-solutions",
    title: "E-commerce Solutions",
    description: "Transform your vision into a reality with a bespoke mobile app designed to reflect your brand and drive your specific business goals.",
    image: images.solimg5,
    bgColor: "bg-[#FDF3EA]"
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Build a powerful online presence that resonates with your customers through our tailored, result-driven web development services.",
    image: images.solimg6,
    bgColor: "bg-[#F1F1F1]"
  },
  {
    slug: "cloud-engineering",
    title: "Cloud Engineering",
    description: "Let our cloud specialists help you choose the best solutions to support your business growth.",
    image: images.solimg7,
    bgColor: "bg-[#F1F1F1]"
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence Engineering",
    description: "We build custom AI and machine learning systems that revolutionize your business.",
    image: images.solimg8,
    bgColor: "bg-[#E0F8F2]"
  },
  {
    slug: "managed-services",
    title: "Managed Services",
    description: "We streamline your IT operations to cut costs and boost efficiency, while delivering the tech solutions you need to outpace the competition.",
    image: images.solimg9,
    bgColor: "bg-[#EEECFF]"
  }
];