FROM node:15.8.0

ENV PATH /node_modules/.bin:$PATH
COPY package.json /
COPY yarn.lock /
WORKDIR /app

RUN npm install --silent
