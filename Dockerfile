FROM node:10.20.0-alpine

RUN apk add git

RUN mkdir /home/arash

RUN yarn global add knex-migrator grunt grunt-cli ember-cli

COPY . /home/arash

WORKDIR /home/arash

RUN yarn setup

RUN grunt build

RUN grunt prod

RUN grunt release

WORKDIR /home/arash/.build/release

CMD ["yarn", "start-docker"]
