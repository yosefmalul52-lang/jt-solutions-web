/** Nav theme: light across the site (Light Premium Digital Studio). */
export type NavShellTheme = "dark" | "light";

export function getNavShellTheme(_pathname: string, _activeHash: string): NavShellTheme {
  return "light";
}
