CREATE POLICY "Admins manage portfolio files" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'portfolio' AND has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (bucket_id = 'portfolio' AND has_role(auth.uid(), 'admin'::app_role));