FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install --production

COPY . .

RUN npm run build


RUN npx prisma generate


EXPOSE 3000

CMD ["npm","run", "start:migrate"]