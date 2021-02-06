#!/bin/sh

reload=0

while getopts "r" opt; do
  case "$opt" in
  r)
    reload=1
  esac
done

if [ "$reload" -eq "1" ]; then
  deno run \
    --allow-net \
    --unstable \
    --importmap=import_map.json \
    --reload \
    src/mod.ts
else
  deno run \
    --allow-net \
    --unstable \
    --importmap=import_map.json \
    src/mod.ts
fi
