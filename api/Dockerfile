FROM node:20.11-alpine3.18

# Create a non-root user with home directory and no password
RUN adduser -D -s /bin/bash appuser

# Copy package files and install dependencies
COPY package*.json ./tmp
RUN cd /tmp && npm ci

# Copy the node_modules to /app
RUN mkdir -p /app && cp -a /tmp/node_modules /app

# Set working directory and adjust ownership to the non-root user
WORKDIR /app
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Copy Prisma files with appuser ownership
COPY --chown=appuser:appuser prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Clean up Prisma files
RUN rm -rf ./prisma

# Expose port 8080
EXPOSE 8080
