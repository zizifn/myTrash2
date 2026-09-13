export const APP_NAME = 'myTrash2'

/**
 * Marker used to verify the workspace package was bundled into the app.
 */
export const WORKSPACE_MARKER = 'workspace-package-ok'

export function formatAppTitle(subtitle?: string): string {
  return subtitle ? `${APP_NAME} — ${subtitle}` : APP_NAME
}
