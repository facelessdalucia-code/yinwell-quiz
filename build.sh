#!/bin/sh
set -e
for v in a b; do
  mkdir -p "$v"
  sed "s#</body>#<script>window.YW_VARIANT=\"$v\";</script><script src=\"/track.js\"></script></body>#" index.html > "$v/index.html"
  grep -q "YW_VARIANT=\"$v\"" "$v/index.html"
done
sed "s#</body>#<script src=\"/track.js\"></script></body>#" index.html > index.built.html
mv index.built.html index.html
grep -q "track.js" index.html
