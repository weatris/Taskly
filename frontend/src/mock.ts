export const workplaces: WorkPlaceType[] = [
  {
    id: 'wp1',
    name: 'Tech Innovators Hub',
    type: 'public',
    notes: 'Open for everyone to collaborate on tech innovations.',
    members: [
      {
        id: 'm1',
        name: 'Alice Smith',
        email: 'alice@techhub.com',
      },
      {
        id: 'm2',
        name: 'Bob Johnson',
        email: 'bob@techhub.com',
      },
    ],
  },
  {
    id: 'wp2',
    name: 'Designers Collective',
    type: 'private',
    notes: 'Invite-only workplace for top designers.',
    members: [
      {
        id: 'm3',
        name: 'Carol Lee',
        email: 'carol@designers.com',
      },
      {
        id: 'm4',
        name: 'David Kim',
        email: 'david@designers.com',
      },
    ],
  },
  {
    id: 'wp3',
    name: 'Health Research Lab',
    type: 'closed',
    notes: 'Closed workspace for confidential medical research.',
    members: [
      {
        id: 'm5',
        name: 'Eva Brown',
        email: 'eva@healthlab.com',
      },
    ],
  },
  {
    id: 'wp4',
    name: 'Creative Writers Guild',
    type: 'public',
    members: [
      {
        id: 'm6',
        name: 'Frank White',
        email: 'frank@writersguild.com',
      },
      {
        id: 'm7',
        name: 'Grace Green',
        email: 'grace@writersguild.com',
      },
    ],
  },
  {
    id: 'wp5',
    name: 'Marketing Pro Network',
    type: 'private',
    notes: 'A private community for marketing professionals to exchange ideas.',
    members: [
      {
        id: 'm8',
        name: 'Henry Black',
        email: 'henry@marketingpro.com',
      },
      {
        id: 'm9',
        name: 'Ivy Blue',
        email: 'ivy@marketingpro.com',
      },
    ],
  },
];

export const users: userType[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  },
  {
    id: 'u3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
  },
  {
    id: 'u4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
  },
  {
    id: 'u5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
  },
];

export const boards: boardType[] = [
  {
    id: '1',
    name: 'Team Alpha',
    type: 'private',
    members: [
      { id: 'u1', level: 'member' },
      { id: 'u2', level: 'member' },
      { id: 'u3', level: 'member' },
    ],
    config: {
      groupTypes: [
        { id: 'tt1', name: 'todo' },
        { id: 'tt2', name: 'bug' },
        { id: 'tt3', name: 'task' },
      ],
    },
  },
  {
    id: '2',
    name: 'Team Beta',
    members: [
      { id: 'u4', level: 'member' },
      { id: 'u5', level: 'member' },
    ],
    config: {
      groupTypes: [
        { id: 'tt1', name: 'todo' },
        { id: 'tt2', name: 'bug' },
        { id: 'tt3', name: 'task' },
      ],
    },
  },
  {
    id: '3',
    name: 'Team Gamma',
    members: [
      { id: 'u2', level: 'member' },
      { id: 'u5', level: 'member' },
      { id: 'u3', level: 'member' },
    ],
    config: {
      groupTypes: [
        { id: 'tt1', name: 'todo' },
        { id: 'tt2', name: 'bug' },
        { id: 'tt3', name: 'task' },
      ],
    },
  },
];

export const tickets: ticketType[] = [
  {
    id: 't1',
    group: 'tt1',
    name: 'Setup project environment',
    description:
      'Install dependencies and configure the project environment for development.',
    assignedTo: ['u1', 'u2'],
  },
  {
    id: 't2',
    group: 'tt2',
    name: 'Fix login issue',
    description: 'Users are unable to log in with their credentials.',
    assignedTo: ['u3'],
  },
  {
    id: 't3',
    group: 'tt3',
    name: 'Create user profile page',
    description:
      'Design and develop the user profile page with editable fields.',
    assignedTo: ['u4', 'u5'],
  },
  {
    id: 't4',
    group: 'tt1',
    name: 'Write unit tests',
    description: 'Write unit tests for the authentication module.',
    assignedTo: ['u1'],
  },
  {
    id: 't5',
    group: 'tt2',
    name: 'Resolve API timeout issue',
    description: 'Investigate and fix the API timeout issue on the dashboard.',
    assignedTo: ['u2', 'u5'],
  },
  {
    id: 't6',
    group: 'tt3',
    name: 'Update README file',
    description:
      'Add instructions for setting up the project and troubleshooting common issues.',
    assignedTo: ['u3', 'u4'],
  },
];
