# Forms of Migration - Backend

This code has three primary tasks: 
1) It defines the database schema and inserts the initial data
2) It implements the server-side code to query the database and exposes an API to make these queries
3) It implements the client-side for the frontend website portion of the application to make API request for database information

## 1) Database 

### A) Schema

The Database Schema is defined in the [CreateDatabase.sql](Database%20Setup/CreateDatabase.sql), and lists a series of tables that structure the data needed by the frontend website. Many of these tables have been normalized such that discrete attributes that need to be consistent with an enumerated list contains its own table. 

Note that the database is intended to hosted in a MySQL database.

### B) Initial Data

The initial data required of the database is listed in the [InsertInitialData.sql](Database%20Setup/InsertInitialData.sql) and defines the initial data that will be viewable on the frontened website.

## 2) Server-Side Code

### A) Architectural Design Pattern

In this project I followed the Boundary-Control-Entity (BCE) design pattern. This design pattern clusters the code into three primary segments: 
1) Boundary - code that allows this component to interact with other components 
2) Control - code that implements and contains the internal or business logic of the component
3) Entity - code that defines and structures the data utilized by the component

### B) Backend Architecure Diagram

![alt text](https://github.com/AGKirby/Migration-Website-Backend/blob/main/BackendArchitectureDiagram.png?raw=true)

### C) Boundary 

The backend boundary component consists of two parts. 

First is the [index.js](Backend/Boundary/index.js) file that defines the API endpoints that any application, including the frontend website, can make HTTP requests to to retrieve data. 

Second is the [DatabaseGateway.js](Backend/Boundary/DatabaseGateway.js) file that defines functions for all of the database queries required by the frontend website, but is callable by any local file to query the database, including the [index.js](Backend/Boundary/index.js) file.

### D) Control

The backend control component consists of two parts.

First is the [DatabaseUtility.js](Backend/Control/DatabaseUtility.js) file that handles the complexity of actually connecting to and querying the database. 

Second is the [ConvertDataRowToEntity.js](Backend/Control/ConvertDataRowToEntity.js) file that handles the complexity of converting the row object returned by the database query into the defined entity classes used by both the frontend and backend.

Note that this directory also contains a file for querying file blobs from Box, but I was not able to get this functionality to work and instead implemented these blobs as attributes in the database. 

### E) Entity

The backend entity component consists of one file, [Entities.js](Backend/Entity/Entities.js) that defines an entity for each table in the database schema (if that schema was non-normalized) used by the frontend website. These entities are consistent between both the backend and frontend segments.

## 3) Client-Side Code

### A) Boundary

The frontend boundary consists of one file, [DatabaseGateway.js](Frontend/Boundary/DatabaseGateway.js), that defines a series of functions that should handle all of the complexity involved in getting data from the database, so the frontend website just needs to make a function call.

Note that this directory also contains an example of how to make requests to the Database Gateway in a React component, specifically in the case of a search bar, [SearchBar.js](Frontend/Boundary/SearchBar.js).

### B) Control

The frontend control consists of one file, [ConvertJsonToEntity.js](Frontend/Control/ConvertJsonToEntity.js), that provides a series of utility functions for converting the JSON objects returned by the API endpoint into the defined Entity classes.

### C) Entity

The frontend entity component consists of one file, [Entities.js](Frontend/Entity/Entities.js) that defines an entity for each table in the database schema (if that schema was non-normalized) used by the frontend website. These entities are consistent between both the backend and frontend segments.

## 4) Running the Code

### A) Setting up the Database

To set up the database, first run the code from the [CreateDatabase.sql](Database%20Setup/CreateDatabase.sql) file to create the tables, and then insert the initial data by running the code from the [InsertInitialData.sql](Database%20Setup/InsertInitialData.sql) file.

### B) Setting up the Backend API

To host the API endpoints, run `node index.js` on the backend [index.js](Backend/Boundary/index.js) file.

### C) Making requests to the API

Finally, make a request to the API by calling a function from the frontend [DatabaseGateway.js](Frontend/Boundary/DatabaseGateway.js) file, which will asyncronously return the data requested.

You can see an example of this from a React component in the search bar, [SearchBar.js](Frontend/Boundary/SearchBar.js).
