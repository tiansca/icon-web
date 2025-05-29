import {store} from "@/store";

export function hasPermission(key, type) {
  const permissions = store.state.user.permissions
  return !!(permissions.find && permissions.find(item => item.type === type && item.key === key));
}

// 设置token
export function setCookie(
  name,
  value,
  exp = Date.now() + 7 * 24 * 60 * 60 * 1000, // 默认7天后过期
  path = "/",
  domain = "",
  secure = false,
  sameSite = "Lax"
) {
  if (!name) {
    return;
  }
  const encodedValue = encodeURIComponent(value);
  let cookieStr = `${name}=${encodedValue}`;

  // 处理过期时间
  if (exp) {
    const date = new Date();
    date.setTime(exp);
    cookieStr += `; expires=${date.toUTCString()}`;
  }

  // 附加其他属性
  cookieStr += `; path=${path}`;
  if (domain) cookieStr += `; domain=${domain}`;
  if (secure) cookieStr += "; Secure";
  cookieStr += `; SameSite=${sameSite}`;
  document.cookie = cookieStr;
}

// 获取cookie
export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}