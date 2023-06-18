FROM node:19.8.1-alpine3.17

RUN npm install -g nodemon

WORKDIR /web-app/servers

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 5555

CMD ["npm", "run", "dev"]