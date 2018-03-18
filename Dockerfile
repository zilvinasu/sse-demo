FROM node:9.8.0

ADD . /opt/app/

WORKDIR /opt/app/client
RUN yarn install
RUN yarn build

WORKDIR /opt/app
RUN yarn install

CMD ["yarn", "server"]
