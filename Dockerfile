# Setup environment linux
FROM node:10.16.3
RUN rm -rf /var/lib/apt/lists/* && apt-get update -y
RUN apt-get install -y telnet vim git nano

# Environment
ENV DB_CONNECTION=mongodb
ENV DB_HOST=ds031087.mlab.com
ENV DB_PORT=31087
ENV DB_NAME=kori
ENV DB_USERNAME=
ENV DB_PASSWORD=
ENV NODE_ENV=production
ENV APP_PORT=8200

# Install global npm
RUN npm install -g nodemon ts-node typescript

# Create and copy directory source
RUN mkdir -p /app
WORKDIR /app
COPY . /app

# Install and run npm
RUN npm install

# Check file
RUN ls -la /app

# Start app
VOLUME /app
RUN tsc

EXPOSE 8200
