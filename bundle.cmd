if not exist dist mkdir dist

if "%1"=="-r" (
deno bundle^
  --unstable^
  --importmap=import_map.json^
  --reload^
  src/mod.ts >dist\bundle.ts
) else (
deno bundle^
  --unstable^
  --importmap=import_map.json^
  src/mod.ts >dist\bundle.ts
)
