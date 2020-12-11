# Welcome :) # 

1. Config
2. Database
3. Running the App
4. Insert data into database (optional)

=================

Download the zip file and extract all to a folder of your choise.

### Section 1: Config ### 

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


### Section 2: Database ###

Next, please log into your PostgreSQL account and create the following two tables into the database.

The database consists of these tables:
  1) users
  2) reporting

Note! 
When copypasting the following statement, please make sure you copy the entire thing below,
including the line starting with "CREATE UNIQUE - -" to the same command.

#### start from here ... ####

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

#### ... until here ####


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


### Section 3: Running the App ###

The environment variables have been commented out; 
thus, to run the application, run the following command in the project's root folder:

deno run --allow-read --allow-net --unstable app.js

Note: If you're course staff, and wish to use some internal tools (?) to run the app,
please uncomment test variables in app.js and config/config.js. 

You're Good to go! :) 


=================


### Section 4: Insert data into database (optional) ###

Your life's been made easy - once you've completed steps 1-3, just one more thing to do.
Please, create yourself an accoutn within the app.

Then, you can fill in some data into the database using the
following queries, if you wish to. The commands are formatted so that they're an easy copy-paste in VS code :)

(So please note that the queries are made assuming that a user account with id number 1 exists.)

However, feel free to add data at your own. 
To do so, create account into the app, and insert the data as you would do as "a normal user".


================= 

INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-20', 'morning', 8.4, 5, 5, null, null, null);

And then, replace the part starting with 'VALUES' with the following ones:

VALUES (1, '2020-11-21', 'morning', 5.6, 2, 4, null, null, null);
VALUES (1, '2020-11-22', 'morning', 9.0, 4, 5, null, null, null);
VALUES (1, '2020-11-23', 'morning', 8.5, 4, 3, null, null, null);
VALUES (1, '2020-11-24', 'morning', 9.0, 5, 4, null, null, null);



INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-25', 'morning', 7.6, 4, 5, null, null, null);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-26', 'morning', 7.6, 2, 4, null, null, null);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-27', 'morning', 7.0, 5, 3, null, null, null);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-28', 'morning', 7.5, 4, 3, null, null, null);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-29', 'morning', 7.0, 3, 3, null, null, null);



INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-20', 'evening', null, null, 5, 1, 6, 4);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-21', 'evening', null, null, 4, 1, 4, 4);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-22', 'evening', null, null, 3, 1, 8, 4);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-23', 'evening', null, null, 5, 1, 5, 4);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-24', 'evening', null, null, 5, 1, 8, 4);



INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-25', 'evening', null, null, 5, 1, 7, 4);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-26', 'evening', null, null, 4, 0, 9, 3);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-27', 'evening', null, null, 3, 1, 8, 3);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-28', 'evening', null, null, 5, 0, 8.7, 2);
INSERT INTO reporting(userid, timestamp, type, sleepDuration, sleepQuality, mood, sportsDuration, studyingDuration, eatingQuality) 
VALUES (1, '2020-11-29', 'evening', null, null, 5, 1, 8, 2);



