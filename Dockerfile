FROM node:10.16.3

RUN rm -rf /var/lib/apt/lists/* && apt-get update -y
RUN apt-get install -y telnet vim git
RUN npm install -g nodemon ts-node@8.3.0 typescript pm2

RUN mkdir -p /app
WORKDIR /app

# Copy app files into app folder
COPY . /app
RUN npm install
RUN ls -la /app
VOLUME /app

EXPOSE 4000
