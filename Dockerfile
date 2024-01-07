FROM nginx:1.15.9

WORKDIR /app

# RUN apt-get update -yq \
#         && apt-get install -yq curl gnupg \
#         && curl -sL https://deb.nodesource.com/setup_16.x | bash \
#         && apt-get install -yq nodejs \
#         && apt-get clean

COPY package.json .

RUN npm install

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the rest of the application
COPY . .

RUN npm run build

# Copy the build output to the Nginx HTML directory
RUN cp -r /app/dist/hash-pay/* /usr/share/nginx/html

EXPOSE 80
