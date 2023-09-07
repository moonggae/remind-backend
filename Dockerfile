FROM node:18.17.1 AS builder

WORKDIR /app
COPY . .

RUN yarn
RUN yarn run build

FROM node:18.17.1
WORKDIR /usr/src/app
COPY --from=builder /app ./

EXPOSE 443
CMD yarn start:prod