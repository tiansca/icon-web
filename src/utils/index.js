import {store} from "@/store";

export function hasPermission(key, type) {
  const permissions = store.state.user.permissions
  return !!(permissions.find && permissions.find(item => item.type === type && item.key === key));
}