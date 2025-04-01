import { userAccessType } from '../common/typing';

const allActions = [
  'boardChatWrite',
  'boardShare',
  'boardCreateGroup',
  'createTicket',
  'editTicket',
  'memberEdit',
  'boardEdit',
  'boardDelete',
  'boardControl',
  'changePermissionLevels',
] as const;
type allActionsType = (typeof allActions)[number];

const excludePermissionMap: Record<string, allActionsType[]> = {
  owner: [],
  admin: ['changePermissionLevels', 'boardDelete', 'boardControl'],
  member: [
    'memberEdit',
    'boardEdit',
    'boardDelete',
    'changePermissionLevels',
    'boardControl',
  ],
  guest: [...allActions],
};

export const permissionControl = ({
  userAccess,
  key,
}: {
  userAccess: userAccessType;
  key: allActionsType;
}) => {
  const level = userAccess.accessLevel;
  if (excludePermissionMap[level]) {
    return !excludePermissionMap[level].includes(key);
  }
  return false;
};
