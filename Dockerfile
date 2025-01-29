FROM node:18

WORKDIR /app

COPY server/package.json server/package-lock.json ./

RUN npm install

COPY server/ ./

EXPOSE 8000

CMD ["node", "app.js"]
