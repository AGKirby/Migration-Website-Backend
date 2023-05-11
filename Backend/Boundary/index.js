import express from 'express'
import cors from 'cors'

const app = express();

const  PORT = 3002;
app.use(cors());
app.use(express.json())

import { getSearchableItems, getAllPublications, getAllArtworks, getAllVideos, getAllExcerpts, getPublicationById, 
         getAllPrograms, getProgramById, getAllInstitutions, getInstitutionById, getAllNewsAndEvents, getNewsAndEventById,
         getAllPeople, getPeopleById } from './DatabaseGateway.js'

// Route to get all publications
app.get("/api/getSearchableItems", (req, res) => {
    getSearchableItems((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
 });

// Route to get all publications
app.get("/api/getAllPublications", (req, res) => {
   getAllPublications((err, result) => {
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});

// Route to get all artwork
app.get("/api/getAllArtworks", (req, res) => {
    getAllArtworks((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get all videos
app.get("/api/getAllVideos", (req, res) => {
    getAllVideos((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get all excerpts
app.get("/api/getAllExcerpts", (req, res) => {
    getAllExcerpts((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get a publication by id
app.get("/api/getPublicationById/:id", (req, res) => {
    const id = req.params.id
    getPublicationById(id, (err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get all programs
app.get("/api/getAllPrograms", (req, res) => {
    getAllPrograms((err, result) => {
          if(err) {
              console.log(err)
          } 
          res.send(result)
      });   
});

// Route to get a program by id
app.get("/api/getProgramById/:id", (req, res) => {
    const id = req.params.id
    getProgramById(id, (err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get all programs
app.get("/api/getAllInstitutions", (req, res) => {
    getAllInstitutions((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get a program by id
app.get("/api/getInstitutionById/:id", (req, res) => {
    const id = req.params.id
    getInstitutionById(id, (err, result) => {
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});

// Route to get all programs
app.get("/api/getAllNewsAndEvents", (req, res) => {
    getAllNewsAndEvents((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get a program by id
app.get("/api/getNewsAndEventById/:id", (req, res) => {
    const id = req.params.id
    getNewsAndEventById(id, (err, result) => {
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});

// Route to get all programs
app.get("/api/getAllPeople", (req, res) => {
    getAllPeople((err, result) => {
         if(err) {
             console.log(err)
         } 
         res.send(result)
     });   
});

// Route to get a program by id
app.get("/api/getPeopleById/:id", (req, res) => {
    const id = req.params.id
    getPeopleById(id, (err, result) => {
        if(err) {
            console.log(err)
        } 
        res.send(result)
    });   
});


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})