FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# Expose the port that the node server will use
EXPOSE 8282
CMD [ "npm", "start" ]