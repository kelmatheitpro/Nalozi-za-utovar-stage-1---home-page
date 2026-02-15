-- Update company_category enum with Serbian categories
ALTER TYPE company_category RENAME TO company_category_old;

CREATE TYPE company_category AS ENUM (
    'Transportna firma / Autoprevoznik',
    'Špediterska firma / Špediter', 
    'Transportna / Špediterska firma / Logistička firma',
    'Trgovinska firma / Proizvođač',
    'Trgovinska firma / Uvoznik, izvoznik',
    'Firme za prevoz i selidbe robe',
    'Drugo'
);

-- Add temporary column with new type
ALTER TABLE public.companies ADD COLUMN category_new company_category;

-- Update new column with mapped values
UPDATE public.companies SET category_new = 
    CASE 
        WHEN category::text = 'Transport Company / Carrier' THEN 'Transportna firma / Autoprevoznik'::company_category
        WHEN category::text = 'Freight Forwarder' THEN 'Špediterska firma / Špediter'::company_category
        WHEN category::text = 'Trading Company' THEN 'Trgovinska firma / Proizvođač'::company_category
        WHEN category::text = 'Other' THEN 'Drugo'::company_category
        ELSE 'Transportna firma / Autoprevoznik'::company_category
    END;

-- Drop old column and rename new one
ALTER TABLE public.companies DROP COLUMN category;
ALTER TABLE public.companies RENAME COLUMN category_new TO category;
ALTER TABLE public.companies ALTER COLUMN category SET NOT NULL;

-- Drop old type
DROP TYPE company_category_old;;
