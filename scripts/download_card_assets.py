import csv
import hashlib
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

CSV_PATH = Path('/home/ubuntu/Downloads/shop_lake_norman_business_cards.csv')
ASSET_DIR = Path('/home/ubuntu/shop-lake-norman-lkn/client/public/business-cards')
DATA_PATH = Path('/home/ubuntu/shop-lake-norman-lkn/client/src/lib/businesses.ts')
ASSET_DIR.mkdir(parents=True, exist_ok=True)
rows = list(csv.DictReader(CSV_PATH.open(newline='', encoding='utf-8')))

def safe_name(category, name, url):
    base = re.sub(r'[^a-z0-9]+', '-', f'{category}-{name}'.lower()).strip('-')[:80]
    suffix = hashlib.sha1(url.encode()).hexdigest()[:8]
    ext = Path(url.split('?')[0]).suffix.lower()
    return f'{base}-{suffix}{ext if ext in {".jpg", ".jpeg", ".png", ".webp", ".gif"} else ".jpg"}'

def fetch(item):
    index, row = item
    url = row['visiting_card_image_url'].strip()
    if not url:
        return index, row, 'missing'
    filename = safe_name(row['category'], row['business_name'], url)
    target = ASSET_DIR / filename
    try:
        if not target.exists():
            req = urllib.request.Request(url, headers={'User-Agent': 'ShopLakeNormanLKN-AssetMigration/1.0'})
            with urllib.request.urlopen(req, timeout=5) as response:
                data = response.read()
            if not data:
                raise ValueError('empty response')
            target.write_bytes(data)
        row['visiting_card_image_url'] = f'/business-cards/{filename}'
        return index, row, 'ok'
    except Exception as exc:
        print(f'FAILED {row["business_name"]}: {exc}', flush=True)
        return index, row, 'failed'

results = [None] * len(rows)
counts = {'ok': 0, 'failed': 0, 'missing': 0}
with ThreadPoolExecutor(max_workers=16) as pool:
    futures = [pool.submit(fetch, item) for item in enumerate(rows)]
    for future in as_completed(futures):
        index, row, status = future.result()
        results[index] = row
        counts[status] += 1

with DATA_PATH.open('w', encoding='utf-8') as out:
    out.write("export type Business = { category: string; business_name: string; business_url: string; visiting_card_image_url: string };\n")
    out.write("export const businesses: Business[] = [\n")
    for row in results:
        def js(value): return '"' + value.replace('\\', '\\\\').replace('"', '\\"') + '"'
        out.write(f"  {{ category: {js(row['category'])}, business_name: {js(row['business_name'])}, business_url: {js(row['business_url'])}, visiting_card_image_url: {js(row['visiting_card_image_url'])} }},\n")
    out.write("];\n")
    out.write("export const categories = " + repr(sorted({row['category'] for row in results})) + ";\n")
print(f'rows={len(rows)} local_assets={counts["ok"]} failed={counts["failed"]} missing_url={counts["missing"]}')
