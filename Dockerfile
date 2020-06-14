FROM node:12-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies

COPY package*.json ./
RUN npm install
RUN rm -f .npmrc

# Copying source files
COPY . .

# EXPOSE PORT
EXPOSE 8080

# Running the app
CMD [ "node", "app.js" ]
