#!/bin/sh

# log a text so you know the script is running
echo "installing dependencies and starting the server"

# install dependencies
npm install

# generate prisma client javascript files
npx prisma generate > /dev/null

# start the server and watch for changes in package.json and package-lock.json
# if those files are changed, reinstall the dependencies
exec npx nodemon --watch package.json --watch package-lock.json --exec "if [ package.json -nt node_modules ] || [ package-lock.json -nt node_modules ]; then npm install; fi; npm run dev"
