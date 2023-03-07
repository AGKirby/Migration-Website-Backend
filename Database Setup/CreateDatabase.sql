CREATE TABLE Publication_Type 
(
  Publication_Type VARCHAR(32) NOT NULL,
  PRIMARY KEY(Publication_Type)
);

CREATE TABLE Publication
(
  ID INT NOT NULL,
  Title VARCHAR(32) NOT NULL,
  Author VARCHAR(64),
  Date DATE NOT NULL,
  Box_File_ID VARCHAR(32) NOT NULL,
  Publication_Type VARCHAR(32) NOT NULL,
  Publication_File BLOB,
  Publication_File_Type VARCHAR(45),
  PRIMARY KEY (ID),
  FOREIGN KEY (Publication_Type) REFERENCES Publication_Type(Publication_Type)
);


CREATE TABLE Program
(
  ID INT NOT NULL,
  Name VARCHAR(32) NOT NULL,
  Type VARCHAR(32) NOT NULL,
  Start_Date DATE NOT NULL,
  End_Date DATE NOT NULL,
  URL VARCHAR(64) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE Institution
(
  ID INT NOT NULL,
  Name VARCHAR(32) NOT NULL,
  URL VARCHAR(64) NOT NULL,
  PRIMARY KEY (ID)
);


CREATE TABLE Institution_Hosts
(
  Program_ID INT NOT NULL,
  Institution_ID INT NOT NULL,
  PRIMARY KEY (Program_ID, Institution_ID),
  FOREIGN KEY (Program_ID) REFERENCES Program(ID),
  FOREIGN KEY (Institution_ID) REFERENCES Institution(ID)
);



CREATE TABLE Tag
(
  Tag VARCHAR(32) NOT NULL,
  PRIMARY KEY (Tag)
);

CREATE TABLE publication_has
(
  Publication_ID INT NOT NULL,
  Tag VARCHAR(32) NOT NULL,
  PRIMARY KEY (Publication_ID, Tag),
  FOREIGN KEY (Publication_ID) REFERENCES Publication(ID),
  FOREIGN KEY (Tag) REFERENCES Tag(Tag)
);

CREATE TABLE program_has
(
  Program_ID INT NOT NULL,
  Tag VARCHAR(32) NOT NULL,
  PRIMARY KEY (Program_ID, Tag),
  FOREIGN KEY (Tag) REFERENCES Tag(Tag),
  FOREIGN KEY (Program_ID) REFERENCES Program(ID)
);