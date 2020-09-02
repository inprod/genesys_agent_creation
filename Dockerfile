FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g http-server

COPY . .

EXPOSE 8080

CMD http-server --proxy http://demo-box
