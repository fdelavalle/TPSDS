FROM node:18-alpine as dev

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]

FROM dev as build

RUN npm run build
CMD ["npm", "run", "start"]