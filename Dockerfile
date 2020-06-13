FROM node:10.20.0-alpine

RUN apk add --no-cache git

RUN mkdir /home/app

RUN yarn global add knex-migrator grunt grunt-cli ember-cli

WORKDIR /home/app

COPY . .

RUN yarn setup

RUN grunt prod

WORKDIR /home/app/.build/release

CMD ["yarn", "start-docker"]
