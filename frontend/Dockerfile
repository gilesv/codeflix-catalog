FROM node:15

ENV NPM_CONFIG_LOGLEVEL warn

# Configure and build project
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start"]
