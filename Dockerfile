FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./

RUN NODE_OPTIONS="--max-old-space-size=4096" npm install

RUN if [ ! -d "/.npm" ]; then mkdir /.npm; fi
RUN if [ ! -d "/app/.angular" ]; then mkdir /app/.angular; fi

RUN chown -R 1012140000:0 /.npm
RUN chown -R 1012140000:0 /app/.angular

USER 1012140000
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx-custom.conf /etc/nginx/conf.d/
RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build --prod

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 4200

