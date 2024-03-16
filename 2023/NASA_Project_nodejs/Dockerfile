# we require a base image for our container
FROM node:lts-alpine
# our working dir
WORKDIR /app
# to take advantage of our docker layers
COPY package*.json ./

COPY SourceCode/Client/package*.json Client/
RUN npm run install-client --only=production

COPY SourceCode/Server/package*.json Server/
RUN npm run install-server --only=production

COPY SourceCode/Client Client/
RUN npm run build --prefix SourceCode/Client

COPY SourceCode/Server Server/


USER node

CMD [ "npm", "start", "--prefix", "SourceCode/Server" ]
EXPOSE 8000