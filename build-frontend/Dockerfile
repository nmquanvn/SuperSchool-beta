FROM node:14-alpine
MAINTAINER Hoa Nguyen aka Rico 19424023@student.hcmus.edu.vn
WORKDIR /opt/
COPY ./frontend ./frontend/
WORKDIR /opt/frontend/
RUN npm install
RUN npm i -g nodemon
EXPOSE 3001
CMD ["npm","start"]