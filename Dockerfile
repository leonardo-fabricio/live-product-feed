FROM node:current-alpine AS base

WORKDIR /app

COPY package.json ./

RUN npm install

FROM base AS execution

WORKDIR /app

COPY . .

EXPOSE 9000

CMD [ "npm", "run", "start" ]