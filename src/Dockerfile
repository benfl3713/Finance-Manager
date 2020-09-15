FROM node:12-alpine as build-step
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --prod

# Final Image
FROM nginx:1.19.2-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
