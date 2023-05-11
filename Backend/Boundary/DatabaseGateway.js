import {Publication, Program, Institution} from '../Entity/Entities.js'
import {query, closeDatabaseConnection} from '../Control/DatabaseUtility.js'
import {rowsToPublicationList, rowsToProgramList, rowsToInstitutionList, rowsToNewsAndEventsList, rowsToPeopleList} from '../Control/ConvertDataRowToEntity.js'

const SUCCESSFUL_QUERY = null
const NO_RESULTS = null
const NO_ROWS_SELECTED = 0
const NO_ROWS_MESSAGE = "No rows selected for query"

/**
 * getSearchableItems
 * Queries the database for all entries searchable by the search bar 
 * by selecting all tuples from the Publication table in the database, 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Publication>}  results        Results of the query as a list of Publication objects
 */
export function getSearchableItems(callback) {
    const sql = `SELECT p.ID, p.Title, p.Author, p.Date, p.Box_File_ID, p.Publication_Type, ph.Tag
                 FROM publication p 
                 LEFT JOIN publication_has ph ON p.ID = ph.Publication_ID
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const publicationList = rowsToPublicationList(rows)
            callback(SUCCESSFUL_QUERY, publicationList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getAllPublications
 * Queries the database for all entries from the Publication table
 * with type "Publication", 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Publication>}  results        Results of the query as a list of Publication objects
 */
export function getAllPublications(callback) {
    getAllPublicationsByType("Publication", callback)
}

/**
 * getAllArtworks
 * Queries the database for all entries from the Publication table
 * with type "Artwork", 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Publication>}  results        Results of the query as a list of Publication objects
 */
export function getAllArtworks(callback) {
    getAllPublicationsByType("Artwork", callback)
}

/**
 * getAllVideos
 * Queries the database for all entries from the Publication table
 * with type "Videos", 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Publication>}  results        Results of the query as a list of Publication objects
 */
export function getAllVideos(callback) {
    getAllPublicationsByType("Video", callback)
}

/**
 * getAllExcerpts
 * Queries the database for all entries from the Publication table
 * with type "Excerpts", 
 * and returns all entities in a list of Publication entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Publication>}  results        Results of the query as a list of Publication objects
 */
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
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const publicationList = rowsToPublicationList(rows, type)
            callback(SUCCESSFUL_QUERY, publicationList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getPublicationById
 * Queries the database for an entry from the Publication table
 * with a specified id
 * and returns the entry as a Publication entity object
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {int}                 id             Database ID of the tuple to return.
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {Publication}        result         Result of the query as a Publication object
 */
export function getPublicationById(id, callback) {
    const sql = `SELECT p.ID, p.Title, p.Author, p.Date, p.Box_File_ID, ph.Tag, 
                 p.Publication_File, p.Publication_Type, p.Publication_File_Type 
                 FROM publication p 
                 LEFT JOIN publication_has ph ON p.ID = ph.Publication_ID
                 WHERE p.ID = ?
                 ORDER BY p.ID, ph.Tag;`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const aPublication = rowsToPublicationList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aPublication)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getAllPrograms
 * Queries the database for all entries from the Programs table
 * and returns all entities in a list of Program entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Program>}      results        Results of the query as a list of Program objects
 */
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
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const programList = rowsToProgramList(rows)
            callback(SUCCESSFUL_QUERY, programList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getProgramById
 * Queries the database for an entry from the Program table
 * with a specified id
 * and returns the entry as a Program entity object
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {int}                 id             Database ID of the tuple to return.
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {Program}            result         Result of the query as a Program object
 */
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
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const aProgram = rowsToProgramList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aProgram)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


/**
 * getAllInstitutions
 * Queries the database for all entries from the Institutions table
 * and returns all entities in a list of Institution entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<Institution>}  results        Results of the query as a list of Institution objects
 */
export function getAllInstitutions(callback) {
    const sql = `SELECT i.ID, i.Name, i.Affiliation, i.Location, i.URL 
                 FROM institution i`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const institutionList = rowsToInstitutionList(rows)
            callback(SUCCESSFUL_QUERY, institutionList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getInstitutionById
 * Queries the database for an entry from the Institution table
 * with a specified id
 * and returns the entry as a Institution entity object
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {int}                 id             Database ID of the tuple to return.
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {Institution}        result         Result of the query as a Institution object
 */
export function getInstitutionById(id, callback) {
    const sql = `SELECT i.ID, i.Name, i.Affiliation, i.Location, i.URL 
                 FROM institution i 
                 WHERE i.ID = ?`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const anInstitution = rowsToInstitutionList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, anInstitution)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


/**
 * getAllNewsAndEvents
 * Queries the database for all entries from the NewsAndEvents table
 * and returns all entities in a list of NewsAndEvent entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<NewsAndEvent>} results        Results of the query as a list of NewsAndEvent objects
 */
export function getAllNewsAndEvents(callback) {
    const sql = `SELECT n.ID, n.Name, n.URL 
                 FROM recent_news_and_events n`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const newsAndEventsList = rowsToNewsAndEventsList(rows)
            callback(SUCCESSFUL_QUERY, newsAndEventsList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getNewsAndEventById
 * Queries the database for an entry from the NewsAndEvent table
 * with a specified id
 * and returns the entry as a NewsAndEvent entity object
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {int}                 id             Database ID of the tuple to return.
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {NewsAndEvent}       result         Result of the query as a NewsAndEvent object
 */
export function getNewsAndEventById(id, callback) {
    const sql = `SELECT n.ID, n.Name, n.URL 
                 FROM recent_news_and_events n 
                 WHERE n.ID = ?`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const aNewsAndEvent = rowsToNewsAndEventsList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aNewsAndEvent)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}


/**
 * getAllPeople
 * Queries the database for all entries from the People table
 * and returns all entities in a list of People entity objects
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {list<People>}       results        Results of the query as a list of People objects
 */
export function getAllPeople(callback) {
    const sql = `SELECT p.ID, p.Name, pp.Position, i.Name AS Institution_Name, p.Institution_ID, p.URL 
                 FROM People p 
                 LEFT JOIN People_Position pp ON pp.ID = p.Position_ID
                 LEFT JOIN Institution i ON i.ID = p.Institution_ID
                 ORDER BY p.ID;`
    const inputValues = []
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const peopleList = rowsToPeopleList(rows)
            callback(SUCCESSFUL_QUERY, peopleList)
        })
    } catch(error) {
        console.log("An error occurred!")
        callback(error, NO_RESULTS)
    }
}

/**
 * getNewsAndEventById
 * Queries the database for an entry from the People table
 * with a specified id
 * and returns the entry as a People entity object
 * by calling the callback funtion passed as an argument. 
 * 
 * @param {int}                 id             Database ID of the tuple to return.
 * @param {function}            callback       Calls back with results from database query.
 * 
 * @return {string}             error          Error message, null if query was successful
 * @return {People}             result         Result of the query as a People object
 */
export function getPeopleById(id, callback) {
    const sql = `SELECT p.ID, p.Name, pp.Position, i.Name AS Institution_Name, p.Institution_ID, p.URL 
                 FROM People p 
                 LEFT JOIN People_Position pp ON pp.ID = p.Position_ID
                 LEFT JOIN Institution i ON i.ID = p.Institution_ID
                 WHERE p.ID = ?`
    const inputValues = [id]
    try {
        query(sql, inputValues, (rows) => {
            if(rows.length === NO_ROWS_SELECTED) 
                return callback(NO_ROWS_MESSAGE, NO_RESULTS)
            const aPeople = rowsToPeopleList(rows)[0]  //only one result since queried by primary key
            callback(SUCCESSFUL_QUERY, aPeople)
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