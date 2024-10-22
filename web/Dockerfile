FROM node:20.11-alpine3.18

COPY package*.json ./tmp
RUN cd /tmp && npm ci
RUN mkdir -p /app && cp -a /tmp/node_modules /app
WORKDIR /app
EXPOSE 3001