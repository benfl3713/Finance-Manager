FROM node:12-alpine as build-step
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build:prod

# Final Image
FROM nginx:1.19.2-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY --from=build-step /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker.entrypoint.sh /launch/docker.entrypoint.sh
RUN chmod +x /launch/docker.entrypoint.sh
EXPOSE 80
# run nginx
ENTRYPOINT ["/launch/docker.entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
