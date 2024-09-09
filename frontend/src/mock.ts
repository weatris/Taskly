export const workplaces: WorkPlaceType[] = [
  {
    id: 'wp1',
    name: 'Tech Innovators Hub',
    type: 'public',
    notes: 'Open for everyone to collaborate on tech innovations.',
    members: [
      {
        id: 'm1',
        displayName: 'Alice Smith',
        email: 'alice@techhub.com',
        permissionLevel: 'admin',
      },
      {
        id: 'm2',
        displayName: 'Bob Johnson',
        email: 'bob@techhub.com',
        permissionLevel: 'manager',
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
        displayName: 'Carol Lee',
        email: 'carol@designers.com',
        permissionLevel: 'member',
      },
      {
        id: 'm4',
        displayName: 'David Kim',
        email: 'david@designers.com',
        permissionLevel: 'manager',
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
        displayName: 'Eva Brown',
        email: 'eva@healthlab.com',
        permissionLevel: 'admin',
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
        displayName: 'Frank White',
        email: 'frank@writersguild.com',
        permissionLevel: 'member',
      },
      {
        id: 'm7',
        displayName: 'Grace Green',
        email: 'grace@writersguild.com',
        permissionLevel: 'admin',
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
        displayName: 'Henry Black',
        email: 'henry@marketingpro.com',
        permissionLevel: 'userUser',
      },
      {
        id: 'm9',
        displayName: 'Ivy Blue',
        email: 'ivy@marketingpro.com',
        permissionLevel: 'manager',
      },
    ],
  },
];
