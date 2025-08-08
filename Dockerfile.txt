# Use base image (Ubuntu)
FROM ubuntu:20.04

# Maintainer info
LABEL maintainer="POC"

# Install required packages (Java + wget + unzip + curl)
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    wget \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Java & Tomcat
ENV CATALINA_HOME=/opt/tomcat
ENV PATH=$CATALINA_HOME/bin:$PATH

# Download & install latest Tomcat 9 from archive
RUN export TOMCAT_VERSION=$(curl -s https://archive.apache.org/dist/tomcat/tomcat-9/ \
    | grep -oP 'v9\.\d+\.\d+' \
    | sort -V \
    | tail -n 1 \
    | tr -d 'v') \
    && wget https://archive.apache.org/dist/tomcat/tomcat-9/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz \
    && mkdir -p $CATALINA_HOME \
    && tar xvf apache-tomcat-${TOMCAT_VERSION}.tar.gz -C $CATALINA_HOME --strip-components=1 \
    && rm apache-tomcat-${TOMCAT_VERSION}.tar.gz

# Expose Tomcat port
EXPOSE 8080   

# Start Tomcat
CMD ["catalina.sh", "run"]
