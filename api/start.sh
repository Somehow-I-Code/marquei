#!/bin/sh

echo "installing dependencies and starting the server"
npm ci && npm cache clean --force
npx prisma generate
exec npx nodemon --watch package.json --watch package-lock.json --exec "if [ package.json -nt node_modules ] || [ package-lock.json -nt node_modules ]; then npm ci && npm cache clean --force; fi; npm run dev"