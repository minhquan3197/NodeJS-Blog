# Environment
ENV DB_CONNECTION=mongodb
ENV DB_HOST=ds031087.mlab.com
ENV DB_PORT=31087
ENV DB_NAME=kori
ENV DB_USERNAME=koriangel3197
ENV DB_PASSWORD=databasevippro1
ENV APP_PORT=8080
# Setup environment linux
FROM node:10.16.3
RUN rm -rf /var/lib/apt/lists/* && apt-get update -y
RUN apt-get install -y telnet vim git nano nginx
RUN systemctl start nginx
RUN systemctl enable nginx

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
RUN tsc

EXPOSE 4000
