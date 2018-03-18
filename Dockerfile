FROM node:9.8.0

COPY * /opt/app/

WORKDIR /opt/app/client
RUN yarn install

WORKDIR /opt/app
RUN yarn install

CMD ["yarn", "dev"]