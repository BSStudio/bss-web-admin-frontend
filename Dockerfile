FROM node:18.12.1-alpine3.16 as build

USER node:node
RUN mkdir /home/node/app
RUN chown node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node ./package*.json ./
ARG INSTALL_ARGS="--no-fund --no-audit --ignore-scripts"
RUN npm clean-install $INSTALL_ARGS

COPY --chown=node ./ ./
RUN npm run build

FROM nginx:1.23.3-alpine
COPY --from=build /home/node/app/dist/bss-web-admin-frontend /usr/share/nginx/html
