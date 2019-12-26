FROM ubuntu:19.04

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y ruby ruby-dev build-essential
RUN apt-get install -y zlib1g-dev
RUN gem install jekyll bundler nokogiri

RUN bundle -v
RUN gem -v
RUN jekyll -v

WORKDIR /srv/jekyll
COPY ./ /srv/jekyll

RUN bundle install

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--watch", "--force_polling", "--host", "0.0.0.0"]