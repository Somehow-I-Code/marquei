FROM node:20.11-alpine3.18
WORKDIR /app

COPY package*.json . 
COPY prisma ./prisma

RUN npm install --no-optional && npm cache clean --force
RUN npx prisma generate
RUN rm -rf prisma

RUN chown -R node:node node_modules/.prisma

# USER node

EXPOSE 8080
