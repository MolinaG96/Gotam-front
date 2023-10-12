FROM node:16-alpine

WORKDIR /app

ENV NEXT_PUBLIC_API_URL=valor_por_defecto
ENV NEXT_PUBLIC_CLOUDINARY=valor_por_defecto
ENV NEXT_PUBLIC_CLOUDINARY_FOLDER=valor_por_defecto
ENV NEXT_PUBLIC_CLOUD_NAME=valor_por_defecto
ENV NEXT_PUBLIC_UPLOAD_PRESET=valor_por_defecto

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
