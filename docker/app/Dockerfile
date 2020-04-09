FROM node:10.20.0-alpine

RUN mkdir -p /code

WORKDIR /code

ADD . /code

RUN npm install yarn && \
    yarn && \
    yarn run build && \
    yarn cache clean

CMD ["yarn", "docker"]

EXPOSE 3000
