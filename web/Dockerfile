FROM node:20.11-alpine3.18

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
RUN chown -R appuser:appgroup /app

COPY --chown=appuser:appgroup package*.json .
RUN npm ci && npm cache clean --force
RUN chown -R appuser:appgroup /app/node_modules

COPY --chown=appuser:appgroup . .

USER appuser

EXPOSE 3001

CMD ["sh", "start.sh"]
