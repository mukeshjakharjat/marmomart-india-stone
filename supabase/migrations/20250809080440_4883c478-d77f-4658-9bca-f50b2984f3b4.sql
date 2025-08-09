-- Fix security issues by setting proper search_path for functions

-- Update generate_order_number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'MM' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(nextval('order_sequence')::TEXT, 4, '0');
  RETURN order_num;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = 'public'
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;