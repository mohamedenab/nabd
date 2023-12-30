# Stage 1: Build Angular App
FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

# Increase Node.js heap memory
ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN npm install

COPY . .

# Build Angular app for production without AOT
RUN npm install -g @angular/cli && \
    ng build --prod --aot=false

# Stage 2: Create Nginx Image
FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200
