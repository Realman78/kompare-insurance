FROM node:18-slim as frontend-builder
WORKDIR /app
COPY ./kompare-frontend/package*.json ./
RUN npm install
COPY ./kompare-frontend/ .
RUN npm run build

FROM node:18-slim as backend-builder
WORKDIR /usr/src/app
COPY ./kompare-backend/package*.json ./
RUN npm install
COPY ./kompare-backend/ .
COPY --from=frontend-builder /app/build ./build
RUN npm run build 

FROM node:18-slim
WORKDIR /usr/src/app
COPY --from=backend-builder /usr/src/app .
EXPOSE 8080
CMD ["npm", "start"]
