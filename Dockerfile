FROM docker.insops.net/instructure/ruby-passenger:2.2
USER root

# Install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org-server

# Install nodejs
RUN mkdir -p /usr/local/node
RUN curl -O http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz && \
    tar --strip-components 1 -xzf node-v0.12.2-linux-x64.tar.gz -C /usr/local/node && \
    rm node-v0.12.2-linux-x64.tar.gz
ENV PATH /usr/local/node/bin:$PATH

# Add some Additional NGINX Config Parameters
COPY deploy/nginx/web.conf /usr/src/nginx/conf.d/web.conf

# Setup the app
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN chown -R docker:docker /usr/src/app

USER docker

CMD npm start