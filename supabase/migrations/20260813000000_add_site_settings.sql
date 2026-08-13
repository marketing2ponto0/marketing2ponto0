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

-- Seed default values if they don't exist
INSERT INTO public.site_settings (key, value)
VALUES 
    ('site_logo_url', ''),
    ('site_favicon_url', '')
ON CONFLICT (key) DO NOTHING;
