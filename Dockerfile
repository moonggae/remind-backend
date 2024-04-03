FROM node:20.12.0 AS builder

WORKDIR /app
COPY . .

RUN yarn
RUN yarn run build

FROM node:20.12.0
WORKDIR /usr/src/app
COPY --from=builder /app ./

EXPOSE 443
CMD yarn start:prod