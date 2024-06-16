FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN npm run build
EXPOSE 5001
CMD ["node", "./dist/index.js"]