FROM node:latest

WORKDIR /src

COPY . .

RUN [ "npm", "install"]
RUN [ "npm", "run", "lint" ]
RUN [ "npm", "run", "build" ]