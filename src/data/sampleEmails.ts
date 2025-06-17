import { Email } from '../types/Email';

export const sampleEmails: Email[] = [
  {
    id: '1',
    subject: 'Senior Frontend Developer Position - TechCorp',
    sender: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com'
    },
    receivedDate: '2024-12-15T10:30:00Z',
    content: 'Hi there,\n\nWe were impressed by your portfolio and would love to discuss a Senior Frontend Developer position with our team. The role offers competitive compensation, remote work flexibility, and the opportunity to work on cutting-edge projects.\n\nWould you be available for a call this week?\n\nBest regards,\nSarah Johnson\nTalent Acquisition Manager',
    htmlContent: '<p>Hi there,</p><p>We were impressed by your <strong>portfolio</strong> and would love to discuss a <em>Senior Frontend Developer</em> position with our team. The role offers:</p><ul><li>Competitive compensation</li><li>Remote work flexibility</li><li>Cutting-edge projects</li></ul><p>Would you be available for a call this week?</p><p>Best regards,<br><strong>Sarah Johnson</strong><br>Talent Acquisition Manager</p>',
    category: 'job-offer',
    isPublic: true
  },
  {
    id: '2',
    subject: 'Amazing work on the React dashboard project!',
    sender: {
      name: 'Mike Chen',
      email: 'mike@startupxyz.com'
    },
    receivedDate: '2024-12-10T14:22:00Z',
    content: 'Hey,\n\nI wanted to reach out and tell you how impressed we were with the React dashboard you built for us. The attention to detail, performance optimization, and user experience exceeded our expectations.\n\nWe\'ll definitely be recommending you to other companies in our network. Thank you for the excellent work!\n\nCheers,\nMike Chen\nCTO, StartupXYZ',
    htmlContent: '<p>Hey,</p><p>I wanted to reach out and tell you how impressed we were with the <strong>React dashboard</strong> you built for us. The attention to:</p><ul><li>Detail</li><li>Performance optimization</li><li>User experience</li></ul><p>exceeded our expectations.</p><p>We\'ll definitely be <em>recommending you</em> to other companies in our network. Thank you for the excellent work!</p><p>Cheers,<br><strong>Mike Chen</strong><br>CTO, StartupXYZ</p>',
    category: 'testimonial',
    isPublic: true
  },
  {
    id: '3',
    subject: 'Collaboration Opportunity - Design System Project',
    sender: {
      name: 'Emma Rodriguez',
      email: 'emma@designstudio.co'
    },
    receivedDate: '2024-12-08T09:15:00Z',
    content: 'Hello,\n\nWe\'re launching a new design system project and would love to collaborate with you on the frontend implementation. Your expertise in React and component architecture would be invaluable.\n\nThe project timeline is 8-10 weeks with flexible remote work. Interested in learning more?\n\nBest,\nEmma Rodriguez\nCreative Director',
    htmlContent: '<p>Hello,</p><p>We\'re launching a new <strong>design system project</strong> and would love to collaborate with you on the frontend implementation. Your expertise in:</p><ul><li>React</li><li>Component architecture</li></ul><p>would be invaluable.</p><p>The project timeline is <em>8-10 weeks</em> with flexible remote work. Interested in learning more?</p><p>Best,<br><strong>Emma Rodriguez</strong><br>Creative Director</p>',
    category: 'collaboration',
    isPublic: true
  },
  {
    id: '4',
    subject: 'Speaking Invitation - ReactConf 2024',
    sender: {
      name: 'David Park',
      email: 'david@reactconf.org'
    },
    receivedDate: '2024-12-05T16:45:00Z',
    content: 'Hi,\n\nWe\'d like to invite you to speak at ReactConf 2024 about your innovative approach to state management in large-scale applications. Your blog posts on this topic have gained significant attention in the community.\n\nThe conference is scheduled for June 15-17, 2024 in San Francisco. We cover all expenses and provide an honorarium.\n\nWould you be interested?\n\nRegards,\nDavid Park\nProgram Committee Chair',
    htmlContent: '<p>Hi,</p><p>We\'d like to invite you to speak at <strong>ReactConf 2024</strong> about your innovative approach to <em>state management in large-scale applications</em>. Your blog posts on this topic have gained significant attention in the community.</p><p>The conference is scheduled for <strong>June 15-17, 2024</strong> in San Francisco. We cover:</p><ul><li>All expenses</li><li>Honorarium</li></ul><p>Would you be interested?</p><p>Regards,<br><strong>David Park</strong><br>Program Committee Chair</p>',
    category: 'speaking',
    isPublic: true
  },
  {
    id: '5',
    subject: 'Freelance Web Development Project',
    sender: {
      name: 'Lisa Thompson',
      email: 'lisa@ecommercepro.com'
    },
    receivedDate: '2024-12-01T11:20:00Z',
    content: 'Hello,\n\nWe found your profile through a referral and are interested in hiring you for a complete e-commerce website rebuild. The project involves React, Node.js, and payment integration.\n\nBudget is $15,000-20,000 with a 12-week timeline. Are you available to discuss this opportunity?\n\nThanks,\nLisa Thompson\nProject Manager',
    htmlContent: '<p>Hello,</p><p>We found your profile through a referral and are interested in hiring you for a <strong>complete e-commerce website rebuild</strong>. The project involves:</p><ul><li>React</li><li>Node.js</li><li>Payment integration</li></ul><p>Budget is <strong>$15,000-20,000</strong> with a <em>12-week timeline</em>. Are you available to discuss this opportunity?</p><p>Thanks,<br><strong>Lisa Thompson</strong><br>Project Manager</p>',
    category: 'collaboration',
    isPublic: true
  }
];