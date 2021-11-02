FROM node:14.18.0 AS ui-build

WORKDIR /
COPY . .

RUN npm rebuild node-sass
RUN npm install && npm run build


FROM node:14.18.0 AS server-build
WORKDIR /root/
COPY --from=ui-build ./dist ./dist
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/server.js ./server/


EXPOSE 8000

CMD ["node", "./server/server.js"]
