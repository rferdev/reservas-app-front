FROM node:alpine3.18 as builder
RUN mkdir /code
WORKDIR /code
COPY . /code
RUN npm install
RUN npm run build

FROM nginx:alpine3.18-slim
COPY --from=builder /code/dist /usr/share/nginx/html