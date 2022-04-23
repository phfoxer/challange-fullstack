FROM node:lts-alpine
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install -g npm@8.7.0
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm","start","--host","0.0.0.0"] /app/node_modules/.bin/npm start --host 0.0.0.0 --disable-host-check
# FROM node:alpine
#  RUN mkdir /home/node/app && chown node:node /home/node/app
#  RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
#  WORKDIR  /home/node/app
#  USER node
#  COPY package*.json /home/node/app/
#  RUN npm install -g @angular/cli
#  RUN npm ci --quiet
#  COPY --chown=node:node . .
#  EXPOSE 4200 49153

#  FROM node:alpine
#  WORKDIR /usr/src/app
#  COPY package*.json .
#  RUN npm install -g @angular/cli 
#  RUN npm install

#  COPY . .

#  EXPOSE 4200

 # CMD ["ng","serve","--host","0.0.0.0"] /usr/src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disable-host-check