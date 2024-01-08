ARG BUILD_IMAGE=node:alpine3.18
#this smaller with 10mb but one can't attach remote containers to it
#ARG RUN_IMAGE=gcr.io/distroless/nodejs20-debian11
ARG RUN_IMAGE=node:alpine3.18

FROM $BUILD_IMAGE as static

WORKDIR /app

RUN npm i -g pnpm

COPY ["package.json","tsconfig.json","pnpm-lock.yaml","./"] .

RUN pnpm install

COPY . .


RUN pnpm build

FROM $RUN_IMAGE as RUN_IMAGE
#FROM joseluisq/static-web-server:2

WORKDIR /app

#FROM abhin4v/hastatic:latest

#FROM pierrezemb/gostatic
EXPOSE 9110

COPY --from=static /app/dist/server.mjs ./server.mjs
COPY --from=static /app/public/index.html ./public/index.html
#COPY --from=static /app/package.json ./package.json
#COPY --from=static /asma/app/dist/ ./public
CMD [ "server.mjs" ]
#COPY ./configs/ ./public/configs