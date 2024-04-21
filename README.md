
# Requirements

In order to run this project, you need to have recent versions of :

```
Maven 3.9, Java 21, npm 8.2^, Node 20.12^, MySQL
```

# Installation

## Client application

```bash
  cd app
  npm install
  npm run dev
```

To run the POC, you have to run 2 browser in order to have 2 websocket sessions

You need to create a chat, refresh the other browser to see the chat that has been created

You can now join the chat with the 2 browsers and chat

## API 

You can load the database structure in /api/db.sql which is a SQL script.

Before starting the API, you have to change credentials of database in application properties

```
spring.datasource.url=jdbc:mysql://yourip:port/database_name
spring.datasource.username=YOURUSERNAME
spring.datasource.password=YOURPASSWORD
```

Then you can run the API

```bash
  cd api
  mvn clean install
  java -jar "yourfilename"
```
Make sure your API is running on 8080 port, cause the APP is configured to run on this port.
