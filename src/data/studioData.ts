import { Initiative, PillarDetail } from '../types';

export const INITIATIVES: Initiative[] = [
  {
    id: 'huni',
    projectNumber: 'PROJECT 01',
    status: 'PRODUCT CONCEPT',
    categoryType: 'PRODUCT CONCEPT',
    category: 'Property Management / SaaS',
    title: 'HUNI',
    desc: 'A digital property management platform designed to simplify boarding house operations, tenant management, billing, and reporting.',
  },
  {
    id: 'personal-os',
    projectNumber: 'PROJECT 02',
    status: 'PRODUCT CONCEPT',
    categoryType: 'PRODUCT CONCEPT',
    category: 'Productivity / Personal Software',
    title: 'PERSONAL OS',
    desc: 'A personal productivity system designed to help individuals manage tasks, energy, goals, and daily progress.',
  },
  {
    id: 'sentul-trekking',
    projectNumber: 'PROJECT 03',
    status: 'COMMUNITY PROJECT',
    isCommunity: true,
    categoryType: 'COMMUNITY PROJECT',
    category: 'Community Digitalization / Web Development',
    title: 'SENTUL TREKKING INFORMATION SYSTEM',
    desc: 'A community-oriented information platform providing trekking destination information and booking contact access.',
  },
];

export const PILLARS: PillarDetail[] = [
  {
    id: 'pillar-services',
    pillarNum: 'PILLAR 01',
    directionTag: 'DIRECTION A',
    title: 'DIGITAL SERVICES',
    desc: 'We design and engineer tailored digital solutions that help businesses and organizations operate, innovate, and grow.',
    capabilities: [
      { index: '01', label: 'Software Development' },
      { index: '02', label: 'Web & Mobile Applications' },
      { index: '03', label: 'AI Integration' },
      { index: '04', label: 'Business Automation' },
      { index: '05', label: 'UI/UX Engineering' },
    ],
  },
  {
    id: 'pillar-products',
    pillarNum: 'PILLAR 02',
    directionTag: 'DIRECTION B',
    title: 'DIGITAL PRODUCTS',
    desc: 'We explore, design, and develop independent digital products built to solve everyday problems and create long-term value.',
    capabilities: [
      { index: '01', label: 'SaaS Platforms' },
      { index: '02', label: 'Business Applications' },
      { index: '03', label: 'Productivity Tools' },
      { index: '04', label: 'AI-powered Software' },
    ],
  },
];

export const TRUST_AVATARS = [
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/300f41b1-3de5-4153-afde-06e15e753ad0.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/bfff4cdf-4fda-4491-ada6-62f3b6236492.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/943b121e-fe72-479f-93ae-aa8cd1650f69.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c673306f-2b81-4c3d-a7d2-3df61d481abb.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2e4fcf11-d0fc-4f31-8f7a-dfe751777141.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/ab458fcd-4c2c-426f-8213-21cc3c7274be.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c1fcd833-5ac9-41e9-9352-fead7e64fa24.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4c2b3307-e555-4633-949c-efd3b7e09d82.webp',
];

export const MANIFESTO_WORDS = [
  'Technology', 'should', 'do', 'more', 'than', 'just', 'work.',
  'It', 'should', 'solve', 'problems,', 'remove', 'friction,', 'unlock',
  'new', 'possibilities,', 'and', 'turn', 'ambitious', 'ideas',
  'into', 'meaningful', 'digital', 'products.'
];

