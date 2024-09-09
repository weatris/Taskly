type WorkPlaceType = {
  id: string;
  name: string;
  type: 'public' | 'private' | 'closed';
  notes?: string;
  members?: MemberType[];
};

type MemberType = {
  id: string;
  displayName: string;
  email: string;
  permissionLevel: permissionLevelType;
};

type permissionLevelType = 'member' | 'manager' | 'admin' | 'userUser';
