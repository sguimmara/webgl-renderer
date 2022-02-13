FROM node:latest as deps

WORKDIR /src

COPY . .

RUN [ "npm", "install"]

FROM deps as linter

RUN [ "npm", "run", "lint" ]

FROM deps as builder

RUN [ "npm", "run", "build" ]