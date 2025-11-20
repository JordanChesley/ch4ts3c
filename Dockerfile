FROM node:25-alpine

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["npm", "start"]