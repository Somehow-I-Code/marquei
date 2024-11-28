FROM node:20.11-alpine3.18

WORKDIR /app
RUN chown -R node:node /app

COPY --chown=node:node package*.json . 
RUN npm install 
RUN chown -R node:node /app/node_modules

COPY --chown=node:node . .

USER node

EXPOSE 8080

CMD ["sh", "start.sh"]
