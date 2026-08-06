import csv
import json
from pathlib import Path

source = Path('/home/ubuntu/Downloads/shop_lake_norman_business_cards.csv')
out = Path('/home/ubuntu/shop-lake-norman-lkn/client/src/lib/businesses.ts')
out.parent.mkdir(parents=True, exist_ok=True)
with source.open(newline='', encoding='utf-8') as f:
    records = list(csv.DictReader(f))
lines = [
    'export type Business = {',
    '  category: string;',
    '  business_name: string;',
    '  business_url: string;',
    '  visiting_card_image_url: string;',
    '};',
    '',
    f'export const businesses: Business[] = {json.dumps(records, ensure_ascii=False, indent=2)};',
    '',
    'export const categories = Array.from(new Set(businesses.map((business) => business.category)));',
]
out.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'Wrote {len(records)} business records to {out}')
