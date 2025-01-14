type WorkPlaceType = {
  id: string;
  name: string;
  type: 'public' | 'private' | 'closed';
  notes?: string;
  members?: userType[];
};

type userType = {
  id: string;
  name: string;
  email: string;
};

type permissionLevelType = 'member' | 'manager' | 'admin' | 'userUser';

type groupType = {
  id: string;
  name: string;
};

type configType = {
  groupTypes?: groupType[];
};

type memberType = {
  id: string;
  level: permissionLevelType;
};

type boardAccessType = 'public' | 'private' | 'closed';

type boardType = {
  id: string;
  name: string;
  type?: boardAccessType;
  members: memberType[];
  groups: groupType[];
  tickets: ticketType[];
};

type ticketType = {
  id: string;
  groupId: string;
  order: number;
  groupName?: string;
  name: string;
  description?: string;
  assignedTo?: string[];
  createdAt?: string;
  updatedAt?: string;
};

type chatMessageType = {
  id?: string;
  content?: string;
  ticketId?: string;
  boardId: string;
  isLoading?: boolean;
  user: { id: number; name: string };
};
