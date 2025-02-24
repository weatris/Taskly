export type WorkPlaceType = {
  id: string;
  name: string;
  type: 'public' | 'private' | 'closed';
  notes?: string;
  members?: userType[];
};

export type userType = {
  id: string;
  name: string;
  email: string;
};

export const permissionLevels = ['member', 'admin', 'owner'] as const;
export type permissionLevelType = (typeof permissionLevels)[number];

export type groupType = {
  id: string;
  name: string;
};

export type ticketGroupType = {
  groupId: string;
  groupName: string;
  tickets: ticketType[];
};

export type configType = {
  groupTypes?: groupType[];
};

export type memberType = {
  id: string;
  email: string;
  name: string;
  level: permissionLevelType;
  description: string;
};

export type boardAccessType = 'public' | 'private' | 'closed';

export type boardType = {
  id: string;
  name: string;
  description: string;
  type?: boardAccessType;
  members: memberType[];
  groups: groupType[];
  tickets: ticketType[];
};

export type dateType = Date | null | undefined;

export type ticketType = {
  id: string;
  groupId: string;
  order: number;
  groupName?: string;
  name: string;
  description?: string;
  assignedTo?: string[];
  createdAt?: string;
  updatedAt?: string;
  markers: string[];
  startDate?: dateType;
  endDate?: dateType;
};

export type chatMessageType = {
  id?: string;
  content?: string;
  ticketId?: string;
  boardId: string;
  isLoading?: boolean;
  user: { id: string; name: string };
};

export type markerType = {
  id: string;
  name: string;
  color: string;
  description: string;
  boardId: string;
};

export type possiblePermissionLevelTypes = permissionLevelType | 'guest';
export type userAccessType = {
  accessLevel: possiblePermissionLevelTypes;
};
