# Stage 1: Build the Angular app
FROM node:14 AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Create the final lightweight image
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the Nginx server
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
