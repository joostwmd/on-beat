FROM --platform=linux/amd64 node:18

WORKDIR /app

COPY /.npmrc /app/
COPY /package*.json /app/
RUN npm ci

COPY /static /app/static

COPY postcss.config.cjs /app/
COPY tailwind.config.ts /app/
COPY svelte.config.js /app/
COPY vite.config.ts /app/
COPY tsconfig.json /app/


COPY /src /app/src
RUN npm run build

CMD [ "node", "/app/build/index.js" ]                                                                 