#!/bin/sh
set -e
for v in a b; do
  mkdir -p "$v"
  sed "s#</body>#<script>window.YW_VARIANT=\"$v\";</script><script src=\"/track.js\"></script></body>#" index.html > "$v/index.html"
  grep -q "YW_VARIANT=\"$v\"" "$v/index.html"
done
