FROM node:12-alpine

WORKDIR /var/www

COPY ./package*.json ./

RUN npm install

CMD ["npm", "start"]
