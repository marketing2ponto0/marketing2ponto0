CREATE TABLE public.portfolio_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type text NOT NULL DEFAULT 'image',
  media_url text NOT NULL,
  poster_url text,
  caption text,
  order_index integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT portfolio_slides_media_type_check CHECK (media_type IN ('image','video'))
);

GRANT SELECT ON public.portfolio_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_slides TO authenticated;
GRANT ALL ON public.portfolio_slides TO service_role;

ALTER TABLE public.portfolio_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active slides" ON public.portfolio_slides
FOR SELECT USING ((active = true) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage slides" ON public.portfolio_slides
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER portfolio_slides_updated_at
BEFORE UPDATE ON public.portfolio_slides
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();