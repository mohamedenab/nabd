FROM node:16.14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng serve --disable-host-check
COPY . .

CMD ["npm", "start"]
