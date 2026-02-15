-- Update existing data to Serbian
UPDATE companies SET category = CASE 
  WHEN category = 'Transport Company / Carrier' THEN 'Transportna firma / Autoprevoznik'
  WHEN category = 'Freight Forwarder' THEN 'Špediterska firma / Špediter'
  WHEN category = 'Trading Company' THEN 'Trgovinska firma / Proizvođač'
  WHEN category = 'Other' THEN 'Drugo'
  ELSE category
END;;
