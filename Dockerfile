FROM nginx:1.15.9

WORKDIR /app

# Update package lists and install required packages
RUN apt-get update -yq \
    && apt-get install -yq curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash \
    && apt-get install -yq nodejs \
    && apt-get clean

# Copy package.json and install Node.js dependencies
COPY package.json .
RUN npm install

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Copy the build output to the Nginx HTML directory
RUN cp -r /app/dist/hash-pay/* /usr/share/nginx/html

# Expose port 80
EXPOSE 80
