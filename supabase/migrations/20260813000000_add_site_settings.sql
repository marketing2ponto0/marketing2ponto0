-- Ensure has_role function exists (idempotent)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Table for site settings (reusing site_texts for simplicity if possible, but user wants logo/favicon specifically)
-- Actually, the build error suggests site_settings didn't exist in the types.
-- I'll use site_texts but with specific keys to avoid schema issues if site_settings is not in the generated types yet.

-- But I already tried to add site_settings. Let's try to add it again properly.
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT SELECT ON public.site_settings TO anon;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'site_settings' AND policyname = 'Allow public read on site_settings'
    ) THEN
        CREATE POLICY "Allow public read on site_settings" ON public.site_settings
            FOR SELECT TO anon, authenticated USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'site_settings' AND policyname = 'Allow admin to manage site_settings'
    ) THEN
        CREATE POLICY "Allow admin to manage site_settings" ON public.site_settings
            FOR ALL TO authenticated
            USING (public.has_role(auth.uid(), 'admin'));
    END IF;
END
$$;

-- Seed default values
INSERT INTO public.site_settings (key, value)
VALUES 
    ('site_logo_url', ''),
    ('site_favicon_url', '')
ON CONFLICT (key) DO NOTHING;
