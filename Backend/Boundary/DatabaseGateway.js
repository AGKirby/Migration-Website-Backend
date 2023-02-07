import {Publication, Artwork, Program, Institution} from '../Entity/Entities.js'
import {query, closeDatabaseConnection} from '../Control/DatabaseUtility.js'
import {rowsToPublicationList, rowsToProgramList, rowsToInstitutionList} from '../Control/ConvertDataRowToEntity.js'


export function getAllPrograms(callback) {
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

export function getProgramById(id, callback) {
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
