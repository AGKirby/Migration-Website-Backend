CREATE TABLE Publication
(
  ID INT NOT NULL,
  Title VARCHAR(32) NOT NULL,
  Author VARCHAR(32),
  Date DATE NOT NULL,
  Box_File_ID INT NOT NULL,
  File_Type VARCHAR(32) NOT NULL,
  PRIMARY KEY (ID)
  FOREIGN KEY (File_Type) REFERENCES File_Type(File_Type)
);

CREATE TABLE File_Type 
(
  File_Type VARCHAR(32) NOT NULL,
  PRIMARY KEY(File_Type)
)

-- CREATE TABLE Artwork
-- (
--   ID INT NOT NULL,
--   Title VARCHAR(32) NOT NULL,
--   Author VARCHAR(32) NOT NULL,
--   Date DATE NOT NULL,
--   Box_File_ID INT NOT NULL,
--   PRIMARY KEY (ID)
-- );

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
  Name VARCHAR(32) NOT NULL,
  URL VARCHAR(64) NOT NULL,
  ID INT NOT NULL,
  PRIMARY KEY (ID)
);



-- CREATE TABLE artwork_in
-- (
--   Artwork_ID INT NOT NULL,
--   Publication_ID INT NOT NULL,
--   PRIMARY KEY (Artwork_ID, Publication_ID),
--   FOREIGN KEY (Artwork_ID) REFERENCES Artwork(ID),
--   FOREIGN KEY(Publication_ID) REFERENCES Publication(ID)
-- );

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

CREATE TABLE artwork_has
(
  Artwork_ID INT NOT NULL,
  Tag VARCHAR(32) NOT NULL,
  PRIMARY KEY (Artwork_ID, Tag),
  FOREIGN KEY (Artwork_ID) REFERENCES Artwork(ID),
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