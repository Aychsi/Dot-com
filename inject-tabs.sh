#!/bin/bash
# Post-build script to inject tabs.js into index.html
INDEX_FILE="_site/index.html"

if [ -f "$INDEX_FILE" ]; then
  if ! grep -q "tabs.js" "$INDEX_FILE"; then
    sed -i '' 's|</body>|<script src="/assets/tabs.js" defer></script></body>|' "$INDEX_FILE"
    echo "✓ Tabs script injected into $INDEX_FILE"
  else
    echo "✓ Tabs script already present in $INDEX_FILE"
  fi
else
  echo "✗ $INDEX_FILE not found"
fi
