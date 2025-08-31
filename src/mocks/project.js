import { v4 as uuidv4 } from 'uuid';

export const MOCK_PROJECTS = [
  {
    id: uuidv4(),
    name: 'Today',
    desc: 'Every thought, every word, every action plants a seed. How do you wish to feel 1 minute, 1 hour, 1 day from now?',
    isPinned: true,
  },
];
