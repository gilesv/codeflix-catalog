FROM node:12

RUN npm i -g nest

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .

RUN cd .docker && ls -la
RUN chmod +x ./.docker/wait-for-it.sh

# Default database host and port
ENV WAIT_FOR_DB_URL db:5432
ENV WAIT_FOR_TIMEOUT 10

EXPOSE 8080

# Wait for database to be available in order to start app
ENTRYPOINT .docker/wait-for-it.sh $WAIT_FOR_DB_URL \
    -t $WAIT_FOR_TIMEOUT --strict -- \
    npm run start:debug

