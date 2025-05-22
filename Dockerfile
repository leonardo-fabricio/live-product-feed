FROM node:20-alpine3.19 AS base

FROM base as dependences

WORKDIR /app

COPY package.json ./

RUN npm install --production

FROM base as buildAndRun

WORKDIR /app

COPY . .
COPY --from=dependences /app/node_modules ./node_modules
COPY --from=dependences /app/package.json ./package.json

EXPOSE 8080

CMD [ "npm", "run", "socket" ]