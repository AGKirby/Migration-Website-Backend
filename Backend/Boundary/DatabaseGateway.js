import {Publication, Program, Institution} from '../Entity/Entities.js'
import {query, closeDatabaseConnection} from '../Control/DatabaseUtility.js'
import {rowsToPublicationList, rowsToProgramList, rowsToInstitutionList, rowsToNewsAndEventsList} from '../Control/ConvertDataRowToEntity.js'

const SUCCESSFUL_QUERY = null
const NO_RESULTS = null

export function getSearchableItems(callback) {
    const sql = `SELECT p.ID, p.Title, p.Author, p.Date, p.Box_File_ID, p.Publication_Type, ph.Tag
                 FROM publication p 
                 LEFT JOIN publication_has ph ON p.ID = ph.Publication_ID
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) callback(NO_RESULTS)
            const publicationList = rowsToPublicationList(rows)
            callback(SUCCESSFUL_QUERY, publicationList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

export function getAllPublications(callback) {
    getAllPublicationsByType("Publication", callback)
}

export function getAllArtworks(callback) {
    getAllPublicationsByType("Artwork", callback)
}

export function getAllVideos(callback) {
    getAllPublicationsByType("Video", callback)
}

export function getAllExcerpts(callback) {
    getAllPublicationsByType("Excerpt", callback)
}

function getAllPublicationsByType(type, callback) {
    const sql = `SELECT p.ID, p.Title, p.Author, p.Date, p.Box_File_ID, ph.Tag, p.Publication_File, p.Publication_File_Type 
                 FROM publication p 
                 LEFT JOIN publication_has ph ON p.ID = ph.Publication_ID
                 WHERE p.Publication_Type = ?
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = [type]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) callback(NO_RESULTS)
            const publicationList = rowsToPublicationList(rows, type)
            callback(SUCCESSFUL_QUERY, publicationList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

export function getPublicationById(id, callback) {
    const sql = `SELECT p.ID, p.Title, p.Author, p.Date, p.Box_File_ID, ph.Tag, p.Publication_File 
                 FROM publication p 
                 LEFT JOIN publication_has ph ON p.ID = ph.Publication_ID
                 WHERE p.ID = ?
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) return callback(NO_RESULTS)
            const aPublication = rowsToPublicationList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aPublication)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


export function getAllPrograms(callback) {
    const sql = `SELECT p.ID, p.Name AS Program_Name, p.Type, p.Start_Date, p.End_Date, p.URL, i.Name AS Institution_Name, ph.Tag 
                 FROM Program p 
                 LEFT JOIN program_has ph ON p.ID = ph.Program_ID
                 LEFT JOIN institution_hosts ih ON p.ID = ih.Program_ID
                 LEFT JOIN institution i ON i.ID = ih.Institution_ID
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) callback(NO_RESULTS)
            const programList = rowsToProgramList(rows)
            callback(SUCCESSFUL_QUERY, programList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

export function getProgramById(id, callback) {
    const sql = `SELECT p.ID, p.Name AS Program_Name, p.Type, p.Start_Date, p.End_Date, p.URL, i.Name AS Institution_Name, ph.Tag 
                 FROM Program p 
                 LEFT JOIN program_has ph ON p.ID = ph.Program_ID
                 LEFT JOIN institution_hosts ih ON p.ID = ih.Program_ID
                 LEFT JOIN institution i ON i.ID = ih.Institution_ID
                 WHERE p.ID = ?
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) return callback(NO_RESULTS)
            const aProgram = rowsToProgramList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aProgram)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


export function getAllInstitutions(callback) {
    const sql = `SELECT i.ID, i.Name, i.URL 
                 FROM institution i`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) callback(NO_RESULTS)
            const institutionList = rowsToInstitutionList(rows)
            callback(SUCCESSFUL_QUERY, institutionList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

export function getInstitutionById(id, callback) {
    const sql = `SELECT i.ID, i.Name, i.URL 
                 FROM institution i 
                 WHERE i.ID = ?`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) return callback(NO_RESULTS)
            const anInstitution = rowsToInstitutionList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, anInstitution)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


export function getAllNewsAndEvents(callback) {
    const sql = `SELECT n.ID, n.Name, n.URL 
                 FROM recent_news_and_events n`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) callback(NO_RESULTS)
            const newsAndEventsList = rowsToNewsAndEventsList(rows)
            callback(SUCCESSFUL_QUERY, newsAndEventsList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

export function getNewsAndEventById(id, callback) {
    const sql = `SELECT n.ID, n.Name, n.URL 
                 FROM recent_news_and_events n 
                 WHERE n.ID = ?`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) return callback(NO_RESULTS)
            const aNewsAndEvent = rowsToNewsAndEventsList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aNewsAndEvent)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


// Test Code: 
async function test() {
    /* Test Publications */
    // getAllPublications((results) => {
    //     console.log("Test Publications: ")
    //     printResults(results)
    // })
    // getPublicationById(1, printResults)
    // getPublicationById(13, printResults)
    // getAllArtworks(printResults)
    // getAllExcerpts(printResults)
    // /* Test Programas */
    // getAllPrograms((results) => {
    //     console.log("Test Programs: ")
    //     printResults(results)
    // })
    // getProgramById(4, printResults)
    // getProgramById(5, printResults)
    // /* Test Institutions */
    // getAllInstitutions((results) => {
    //     console.log("Test Institutes: ")
    //     printResults(results)
    // })
    // getInstitutionById(1, printResults)
    // getInstitutionById(3, printResults)
    getPublicationById(1, async aPublication => {
        console.log("Publication", aPublication)
        console.log(aPublication.blobFile)
        console.log(await aPublication.readFileData())
    })
    console.log("Done.")
    // closeDatabaseConnection()
}

function printResults(results) {
    console.log("Print Results called:", results)
}

// test();