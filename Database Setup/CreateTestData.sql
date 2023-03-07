-- Publication_Type initial values
INSERT INTO publication_type (Publication_Type) VALUES ("Publication"); 
INSERT INTO publication_type (Publication_Type) VALUES ("Artwork");
INSERT INTO publication_type (Publication_Type) VALUES ("Video");  -- Including Audio
INSERT INTO publication_type (Publication_Type) VALUES ("Excerpt");


-- Publication initial values
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (1, "Press Kit", "Jennifer Reimer Recio", DATE('2022-03-16'), "1005900768212", "Publication", LOAD_FILE('C:\Users\adamg\Documents\College\12 Winter 2023\Capstone\MigrationWebsiteBackend\Database Setup\Blobs\HelloWorld.txt'), "text/plain");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (2, "Press Release 1", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-17'), "932526455922", "Publication");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (3, "Press Release 2", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-17'), "932528780670", "Publication");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (4, "Forms of Migration Book 7", "Jennifer Reimer Recio,Stefan Maneval", DATE('2021-11-29'), "1123077771078", "Excerpt");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (5, "Forms of Migration Poster", "Jennifer Reimer Recio,Stefan Maneval", DATE('2021-11-29'), "1039795186507", "Excerpt");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (6, "Presentation Picture 1", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-09'), "932130707070", "Artwork");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (7, "Presentation Picture 2", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-09'), "932127297481", "Artwork");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (8, "Presentation Picture 3", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-09'), "932124586914", "Artwork");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (9, "Presentation Picture 4", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-09'), "932129618852", "Artwork");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (10, "Presentation Picture 5", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-09'), "932128656751", "Artwork");
INSERT INTO publication (ID, Title, Author, Date, Box_File_ID, Publication_Type) 
    VALUES (11, "Presentation Picture 6", "Jennifer Reimer Recio,Stefan Maneval", DATE('2022-03-09'), "932127325547", "Artwork");


-- Program initial values
INSERT INTO program (ID, Name, Type, Start_Date, End_Date, URL)
    VALUES (1, "Forms of Migration Conference", "Conference", DATE('2023-03-17'), DATE('2023-03-17'), "oregonstate.edu");
INSERT INTO program (ID, Name, Type, Start_Date, End_Date, URL)
    VALUES (2, "Migration Tour 1", "Tour", DATE('2023-05-27'), DATE('2023-05-27'), "oregonstate.edu");
INSERT INTO program (ID, Name, Type, Start_Date, End_Date, URL)
    VALUES (3, "Migration Tour 2", "Tour", DATE('2023-06-03'), DATE('2023-06-03'), "oregonstate.edu");
INSERT INTO program (ID, Name, Type, Start_Date, End_Date, URL)
    VALUES (4, "Student Migration Camp", "Camp", DATE('2023-06-12'), DATE('2023-06-16'), "oregonstate.edu");


-- Institution initial values
INSERT INTO institution (ID, Name, URL)
    VALUES (1, "Oregon State University", "oregonstate.edu");
INSERT INTO institution (ID, Name, URL)
    VALUES (2, "OSU Cascades", "osucascades.edu");


-- Institution_Hosts initial values
INSERT INTO institution_hosts (Program_ID, Institution_ID) VALUES(1, 1);
INSERT INTO institution_hosts (Program_ID, Institution_ID) VALUES(2, 1);
INSERT INTO institution_hosts (Program_ID, Institution_ID) VALUES(3, 1);
INSERT INTO institution_hosts (Program_ID, Institution_ID) VALUES(4, 2);


-- Tag initial values
INSERT INTO Tag (Tag) VALUES ("Oregon State");
INSERT INTO Tag (Tag) VALUES ("Mediterranean");
INSERT INTO Tag (Tag) VALUES ("United States");
INSERT INTO Tag (Tag) VALUES ("East Asia");
INSERT INTO Tag (Tag) VALUES ("Press Information");
INSERT INTO Tag (Tag) VALUES ("Art");
INSERT INTO Tag (Tag) VALUES ("Laws");


-- Publication_Has initial values
INSERT INTO publication_has (Publication_ID, Tag) VALUES (1, "Oregon State");
INSERT INTO publication_has (Publication_ID, Tag) VALUES (1, "United States");
INSERT INTO publication_has (Publication_ID, Tag) VALUES (1, "Press Information");
INSERT INTO publication_has (Publication_ID, Tag) VALUES (2, "Oregon State");
INSERT INTO publication_has (Publication_ID, Tag) VALUES (2, "Press Information");
INSERT INTO publication_has (Publication_ID, Tag) VALUES (3, "Oregon State");
INSERT INTO publication_has (Publication_ID, Tag) VALUES (3, "Press Information");


-- Program_Has initial values
INSERT INTO program_has (Program_ID, Tag) VALUES (1, "United States");
INSERT INTO program_has (Program_ID, Tag) VALUES (1, "Press Information");
INSERT INTO program_has (Program_ID, Tag) VALUES (2, "Oregon State");
INSERT INTO program_has (Program_ID, Tag) VALUES (3, "Oregon State");
INSERT INTO program_has (Program_ID, Tag) VALUES (4, "Oregon State");
INSERT INTO program_has (Program_ID, Tag) VALUES (4, "United States");

