FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set strict-ssl false \
    && npm install --verbose

COPY . .
CMD ["npm", "start"]