FROM node:16-alpine

WORKDIR /app

ENV NEXT_PUBLIC_API_URL=valor_por_defecto

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
