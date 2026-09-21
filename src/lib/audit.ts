/**
 * Administrative Activity and Audit Logging Service
 * ponytail: Minimal zero-dependency append-only event log persisted to localStorage.
 */

export interface AuditLogEntry {
  id: string;
  action:
    | 'project_created'
    | 'project_updated'
    | 'project_deleted'
    | 'project_published'
    | 'project_archived'
    | 'project_duplicated'
    | 'media_uploaded'
    | 'media_deleted'
    | 'message_archived'
    | 'message_deleted'
    | 'settings_updated';
  entity: string;
  details: string;
  timestamp: string;
  actor: string;
}

const STORAGE_KEY_AUDIT = 'portfolio_admin_audit_log_v1';

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-init-1',
    action: 'project_published',
    entity: 'alzo',
    details: 'Published ALZO Neurological Care Ecosystem flagship experience',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actor: 'neerav@neerav.os',
  },
  {
    id: 'log-init-2',
    action: 'media_uploaded',
    entity: 'alzo-hero.png',
    details: 'Uploaded asset to Cloudflare R2 bucket (portfolio-assets)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    actor: 'neerav@neerav.os',
  },
  {
    id: 'log-init-3',
    action: 'settings_updated',
    entity: 'system_profile',
    details: 'Configured Dala void theme tokens and verified Cloudflare token',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    actor: 'neerav@neerav.os',
  },
];

export const auditService = {
  getLogs(): AuditLogEntry[] {
    if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUDIT);
      return stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  },

  log(action: AuditLogEntry['action'], entity: string, details: string): void {
    if (typeof window === 'undefined') return;
    try {
      const logs = this.getLogs();
      const newEntry: AuditLogEntry = {
        id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        action,
        entity,
        details,
        timestamp: new Date().toISOString(),
        actor: 'neerav@neerav.os',
      };
      logs.unshift(newEntry);
      if (logs.length > 100) logs.length = 100;
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs));
    } catch (err) {
      console.warn('[Audit] Failed to persist log:', err);
    }
  },

  clearLogs(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY_AUDIT);
  },
};
