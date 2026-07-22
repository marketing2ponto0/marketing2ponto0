
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS email_notification_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS email_notified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_last_error text;
