# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json (we’ll add react-scripts automatically inside container)
COPY package.json ./

# Install dependencies + react-scripts (even if it's missing)
RUN npm install react-scripts && npm install

# Copy the rest of your project files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
