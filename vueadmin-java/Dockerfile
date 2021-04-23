FROM java:8

EXPOSE 8085

ADD vueadmin-java-0.0.1-SNAPSHOT.jar app.jar
RUN bash -c 'touch /app.jar'

ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=link"]