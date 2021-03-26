FROM node:12

RUN npm i -g nest

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

EXPOSE 8080
CMD ["npm", "run", "start:debug"]
