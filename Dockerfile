
FROM node:alpine


WORKDIR /app


COPY . .


RUN npm install -g pnpm


RUN pnpm install


CMD ["pnpm","run","start:dev"]






