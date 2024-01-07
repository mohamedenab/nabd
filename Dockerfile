FROM node:16.14
WORKDIR /app
COPY package*.json ./
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN npm install
COPY . .

CMD ["npm", "start"]
