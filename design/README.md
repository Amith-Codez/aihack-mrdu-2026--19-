# design/ · the single source of truth for colour and type

Cowork creates these in step 5 with `hv-design/scripts/palette_build.py`:
- `spec.json` · the few decisions (brand hue, signal hue, themes, contrast targets)
- `tokens.css` · CSS variables for light and dark + the Tailwind v4 `@theme inline` mapping + the colour-patterning layer
- `tokens.json` · every colour as OKLCH and hex (three.js materials, the deck, image prompts use the hex values)
- `palette-preview.html` · swatches, a sample screen and the contrast report: open it in a browser
- `report.txt` · contrast of every checked pair (must say ALL PASS)

Claude Code copies `tokens.css` and `tokens.json` into `web/design/` in build step 0 and never retypes a colour.
To change the palette: edit `spec.json`, run the script again, copy again.
