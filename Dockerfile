FROM node:18.16.0-alpine3.16 as build

USER node:node
RUN mkdir /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node ./package*.json ./
ARG INSTALL_ARGS="--no-fund --no-audit --ignore-scripts"
RUN npm clean-install $INSTALL_ARGS

COPY --chown=node ./ ./
RUN npm run build

FROM nginx:1.25.1-alpine
COPY --from=build /home/node/app/dist/bss-web-admin-frontend /usr/share/nginx/html
COPY ./nginx/templates  /etc/nginx/templates

LABEL org.opencontainers.image.source="https://github.com/BSStudio/bss-web-admin-frontend"
LABEL org.opencontainers.image.description="BSS Web admin frontend"
LABEL org.opencontainers.image.licenses="GPL-3.0"
