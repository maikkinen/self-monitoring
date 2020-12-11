Welcome :)

1. Config
2. Database
3. Running the App
4. Insert data into database (optional)



=================


Section 1: Config

In config/config.js, give a config object as an argument to the config.database.
It will look like something like this:

  config.database = {
    hostname: "an-epic-name-here",
    database: "some-string",
    user: "likely-the-same-as-database",
    password: "a-long-password-here",
    port: 0000
  };

One you're done, please save.


=================


Section 2: Database

Next, please log into your PostgreSQL account and create the following tables to the database.

The database consists of two tables:
  1) users
  2) reporting

Note! 
When copypasting the following statement, please make sure you copy the entire thing below,
including the line starting with "CREATE UNIQUE - -" to the same command.

### so down from here ###

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

### until here ###


Then, create table for reporting records using the following command:

CREATE TABLE reporting (
    id SERIAL PRIMARY KEY,
    userId TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE,
    type TEXT NOT NULL,
    sleepDuration DECIMAL,
    sleepQuality INTEGER,
    mood INTEGER,
    sportsDuration DECIMAL,
    studyingDuration DECIMAL,
    eatingQuality INTEGER
);


=================


Section 3: Running the App

The environment variables have been commented out; 
thus, to run the application, run the following command in the project's root folder:

deno run --allow-read --allow-net --unstable app.js

Note: If you're course staff, and wish to use some internal tools (?) to run the app,
please uncomment test variables in app.js and config/config.js. 

You're Good to go! :) 


=================


Section 3: Insert data into database (optional)

Your life's been made easy - you can fill in some data into the database using the
following queries, if you wish to.

However, feel free to add data at your own. 
To do so, create account into the app, and insert the data "as you would do", 
as a normal user.


=================

