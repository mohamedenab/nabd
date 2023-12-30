FROM node:16.14
WORKDIR /app
COPY package*.json ./
RUN npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi
RUN if [ ! -d "/app/.angular" ]; then mkdir /app/.angular; fi

RUN chown -R 1012140000:0 /.npm
RUN chown -R 1012140000:0 /app/.angular
ENV API_URL=https://clinic-reservation-back-git-amrmahmoud33-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com
USER 1012140000
COPY . .
RUN chown -R 1013690000:0 /app/src/environments/environments.ts
RUN sed -i "s|DEFAULT_API_URL|$API_URL|g" /app/src/environments/environments.ts

CMD ["npm", "start"]
