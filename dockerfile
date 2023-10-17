FROM node:16-alpine

WORKDIR /app

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
