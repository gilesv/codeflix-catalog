FROM node:15-alpine

# Add bash
RUN apk update
RUN apk upgrade
RUN apk add bash

ENV NPM_CONFIG_LOGLEVEL warn
ENV WAIT_FOR_DB_URL db:5432
ENV WAIT_FOR_TIMEOUT 10

# Configure and build project
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

RUN chmod +x ./.docker/wait-for-it.sh
RUN chmod +x ./.docker/entrypoint.sh

EXPOSE 8080

ENTRYPOINT [".docker/entrypoint.sh"]
CMD ["npm", "run", "start:debug"]
