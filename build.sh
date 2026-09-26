#!/bin/sh
set -e
PRICE='<script src="/price-split.js"></script>'
for v in a b; do
  mkdir -p "$v"
  sed "s#</body>#$PRICE<script>window.YW_VARIANT=\"$v\";</script><script src=\"/track.js\"></script></body>#" index.html > "$v/index.html"
  grep -q "YW_VARIANT=\"$v\"" "$v/index.html"
done
sed "s#</body>#$PRICE<script src=\"/track.js\"></script></body>#" index.html > index.built.html
mv index.built.html index.html
grep -q "price-split.js" index.html
grep -q "track.js" index.html
