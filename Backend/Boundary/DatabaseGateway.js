import {Publication, Artwork, Program, Institution} from '../Entity/Entities.js'
import {query, closeDatabaseConnection} from '../Control/DatabaseUtility.js'


export function getAllPublicatons(callback) {
    const sql = `SELECT p.Start_Date, p.End_Date, p.ID, p.URL, p.Name AS Program_Name, p.Type, i.Name AS Institution_Name, ph.Tag 
                 FROM Program p 
                 LEFT JOIN program_has ph ON p.ID = ph.Program_ID
                 LEFT JOIN institution_hosts ih ON p.ID = ih.Program_ID
                 LEFT JOIN institution i ON i.ID = ih.Institution_ID
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) callback(null)
            const programList = rowsToProgramList(rows)
            callback(programList)
        })
    } catch(error) {
        console.log("An error occurred!")
    }
}

export function getPublicatonById(id, callback) {
    const sql = `SELECT p.Start_Date, p.End_Date, p.ID, p.URL, p.Name AS Program_Name, p.Type, i.Name AS Institution_Name, ph.Tag 
                 FROM Program p 
                 LEFT JOIN program_has ph ON p.ID = ph.Program_ID
                 LEFT JOIN institution_hosts ih ON p.ID = ih.Program_ID
                 LEFT JOIN institution i ON i.ID = ih.Institution_ID
                 WHERE p.ID = ?
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === 0) return callback(null)
            const aProgram = rowsToProgramList(rows)[0]  //only one result since queried by primary key
            callback(aProgram)
        })
    } catch(error) {
        console.log("An error occurred!")
    }
}


// Test Code: 
async function test() {
    getAllPublicatons(printResults)
    getPublicatonById(1, printResults)
    getPublicatonById(3, printResults)
    closeDatabaseConnection()
}

function printResults(results) {
    console.log("Print Results called:")
    console.log(results)
}

test();









/*** Private Helper Methods ****/
function rowsToPublicationList(rows) {
    const publicationList = []
    for(let i = 0; i < rows.length; i++) {
        const aPublication = rowToPublication(rows[i])
        publicationList.push(aPublication)
    }
    return publicationList
}

function rowToPublication(row, artworkIdsContains = [], tags = []) {
    return new Publication(
        row.ID,
        row.Title,
        row.Date,
        row.Author,
        "", // TODO: no url at this time
        artworkIdsContains,
        tags
    )
}


function rowsToArtworkList(rows) {
    const artoworkList = []
    for(let i = 0; i < rows.length; i++) {
        const anArtwork = rowToArtwork(rows[i])
        artoworkList.push(anArtwork)
    }
    return artoworkList
}

function rowToArtwork(row, publicationIdsIn = [], tags = []) {
    return new Artwork(
        row.ID,
        row.Title,
        row.Date,
        row.Author,
        "", // TODO: no url at this time
        publicationIdsIn,
        tags
    )
}


function rowsToProgramList(rows) {
    const programList = []
    let prevId = rows[0] !== undefined ? rows[0].ID : -1;
    let tagsList = []
    let institutionsList = []
    for(let i = 0; i < rows.length; i++) {
        // Add Tag to list
        const newTag = rows[i].Tag
        const addTagToList = newTag !== null && tagsList.indexOf(newTag) === -1
        if(addTagToList) tagsList.push(newTag)
        // Add Institution to list
        const newInstitution = rows[i].Institution_Name
        const addInstitutionToList = newInstitution !== null && institutionsList.indexOf(newInstitution) === -1
        if(addInstitutionToList) institutionsList.push(newInstitution)
        // If last row or next row is a new Program, push this program to the list
        if(i+1 >= rows.length || rows[i+1].ID !== prevId) {
            const aProgram = rowToProgram(rows[i], institutionsList, tagsList)
            programList.push(aProgram)
            // reset institutions and tags lists
            institutionsList = []
            tagsList = []
        }
    }
    return programList
}

function rowToProgram(row, hostingInstitutions = [], tags = []) {
    return new Program(
        row.ID,
        row.Program_Name,
        row.Type,
        row.Start_Date,
        row.End_Date,
        row.URL,
        hostingInstitutions,
        tags
    )
}


function rowsToInstitutionList(rows) {
    const institutionList = []
    for(let i = 0; i < rows.length; i++) {
        const anInstitution = rowToInstitution(rows[i])
        institutionList.push(anInstitution)
    }
    return institutionList
}

function rowToInstitution(row) {
    return new Institution(
        row.ID,
        row.Name,
        row.URL
    )
}