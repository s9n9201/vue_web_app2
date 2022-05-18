FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 1014
ENTRYPOINT nginx -g "daemon off;"