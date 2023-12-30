FROM node:16.14
WORKDIR /app
COPY package*.json ./
RUN npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi
RUN if [ ! -d "/app/.angular" ]; then mkdir /app/.angular; fi

RUN chown -R 1012140000:0 /.npm
RUN chown -R 1012140000:0 /app/.angular
USER 1012140000
COPY . .
CMD ["npm", "start"]
