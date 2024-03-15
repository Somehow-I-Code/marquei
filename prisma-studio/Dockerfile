FROM node:20.11-alpine3.18
WORKDIR /app
RUN npm init -y
RUN npm install prisma
EXPOSE 5555
CMD ["npx", "prisma", "studio"]