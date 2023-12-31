FROM nginx:alpine

# Copy the Nginx configuration
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app to the Nginx directory
COPY /dist /usr/share/nginx/html

# Expose port 4200
EXPOSE 4200
