import { userAccessType } from '../common/typing';

const allActions = [
  'boardChatWrite',
  'boardShare',
  'boardCreateList',
  'createTicket',
  'editTicket',
  'memberEdit',
  'boardEdit',
  'boardControl',
  'changePermissionLevels',
] as const;
type allActionsType = (typeof allActions)[number];

const excludePermissionMap: Record<string, allActionsType[]> = {
  owner: [],
  admin: ['changePermissionLevels', 'boardControl'],
  member: ['memberEdit', 'boardEdit', 'changePermissionLevels', 'boardControl'],
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
