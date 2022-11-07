FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY entrypoint.sh ./entrypoint.sh
RUN npm install
RUN chmod +x ./entrypoint.sh
COPY . .
EXPOSE 5173

ENTRYPOINT ["./entrypoint.sh"]