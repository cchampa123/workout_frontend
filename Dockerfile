FROM node:15.8.0

ENV PATH /node_modules/.bin:$PATH
COPY package.json /
COPY package-lock.json /
WORKDIR /app

RUN npm install --silent
