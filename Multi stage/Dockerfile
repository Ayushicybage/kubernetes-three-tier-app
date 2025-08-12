# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production
FROM node:18-slim
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]