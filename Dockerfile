FROM node:12-alpine

WORKDIR /api

COPY ./package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 3000
CMD npm start