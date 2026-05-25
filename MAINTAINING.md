# Maintaining this bundle

**Published mirror** of `mechatronics/projects/spiderbot-recon/visuals/`.
Source is canonical; this bundle is a derivative.

Live: <https://n0xide.github.io/spiderbot-recon-visuals/>

## Direction
Edit source `visuals/` first → mirror to this bundle.

## Outbound `.md` hrefs are stripped here
Strip on every re-mirror — note the `[^>]*` to handle hrefs that carry
extra attributes like `class="btn"`:

```bash
sed -i -E 's|<a href="[^"]*\.md"[^>]*>(.*)</a>|<span style="opacity:0.55;cursor:default" title="Source lives in the private workspace">\1</span>|g' *.html
```

## Before pushing — integrity checklist

```bash
grep -rE 'href="[^"]+\.md"' . --include='*.html' | wc -l       # expect 0
test -f styles.css && test -f shared.js && echo "  shared OK"
python -c "
import re, os
for f in os.listdir('.'):
    if not f.endswith('.html'): continue
    for ref in re.findall(r'href=\"([^\"#]+)\"', open(f, encoding='utf-8').read()):
        if ref.startswith('http'): continue
        if not os.path.exists(ref):
            print(f'BROKEN in {f}: {ref}')
"
```

## Adding a new page
1. Add HTML in source.
2. Copy to bundle.
3. Strip `.md` hrefs.
4. Add sidebar nav entry in EVERY page (sidebar duplicated per-page —
   keep them in sync).
5. Update README's "What's inside" table.
6. Push.

## Style is local
This bundle uses its own theme — don't borrow from sibling bundles.

## Source workspace

```
<workspace-root>/mechatronics/projects/spiderbot-recon/visuals/
<workspace-root>/mechatronics/projects/spiderbot-recon/{README,design,phases,bom,schematic,next}.md
```

Full publish pattern: `<workspace-root>/docs/publish-pattern.md`.
