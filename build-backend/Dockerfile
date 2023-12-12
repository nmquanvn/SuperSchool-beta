FROM node:14-alpine
MAINTAINER Hoa Nguyen aka Rico 19424023@student.hcmus.edu.vn
WORKDIR /opt/
COPY ./backend ./backend/
WORKDIR /opt/backend/
RUN npm install
RUN npm i -g nodemon
EXPOSE 3000
CMD ["npm","start"]