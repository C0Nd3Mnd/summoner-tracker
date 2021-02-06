if "%1"=="-r" (
deno run^
  --allow-net^
  --allow-read^
  --unstable^
  --importmap=import_map.json^
  --reload^
  src/mod.ts
) else (
deno run^
  --allow-net^
  --allow-read^
  --unstable^
  --importmap=import_map.json^
  src/mod.ts
)
