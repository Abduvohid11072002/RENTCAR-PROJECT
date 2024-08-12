FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN npx prisma generate

CMD ["pnpm","run","start:dev"]






