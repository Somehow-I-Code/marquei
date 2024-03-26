FROM node:20.11-alpine3.18
WORKDIR /app
COPY package*.json . 
RUN npm install --no-optional && npm cache clean --force
EXPOSE 8080