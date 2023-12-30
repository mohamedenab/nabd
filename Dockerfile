# Stage 1: Build Angular App
FROM node:latest-alpine as build

WORKDIR /app

COPY package*.json ./

RUN NODE_OPTIONS="--max-old-space-size=4096" npm install

COPY . .

# Build Angular app
RUN npm install -g @angular/cli && \
    ng build --prod

# Stage 2: Create Nginx Image
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 4200
