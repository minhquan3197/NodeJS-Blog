# Setup environment linux
FROM node:10.16.3
RUN rm -rf /var/lib/apt/lists/* && apt-get update -y
RUN apt-get install -y telnet vim git nano

# Environment
ENV NODE_ENV=development

# Install global npm
RUN npm install -g nodemon ts-node typescript pm2

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

CMD tsc

# Expose will open port between container with container in docker network
# Expose not publish with host
EXPOSE 5000

CMD pm2-runtime start ecosystem.config.js
