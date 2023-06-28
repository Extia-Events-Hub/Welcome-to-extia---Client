FROM node:14-alpine3.16 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install 
RUN yarn build

FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html