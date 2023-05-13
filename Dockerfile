FROM node:18 AS angular
WORKDIR .
COPY . .
RUN npm install; npm install -g @angular/cli
EXPOSE 4200
ENTRYPOINT ng serve --proxy-config proxy.conf.js