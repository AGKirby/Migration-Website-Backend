import {Publication, Program, Institution} from '../Entity/Entities.js'

/* Public Utility Function called by DatabaseGateway */
export function rowsToPublicationList(rows) {
    const publicationList = []
    const tagsList = new ItemList()
    for(let i = 0; i < rows.length; i++) {
        // Add Tag to list, if not already in list
        const aTag = rows[i].Tag
        tagsList.addItemIfNew(aTag)
        // If last row or next row is a new Program, push this program to the list
        const lastRow = i+1 >= rows.length
        const nextIdIsNew = !lastRow && rows[i].ID !== rows[i+1].ID
        if(lastRow || nextIdIsNew) {
            const aPublication = rowToPublication(rows[i], tagsList.getList())
            publicationList.push(aPublication)
            // reset tags lists for next program
            tagsList.resetItemsList()
        }
    }
    return publicationList
}

/* Private Helper Function */
function rowToPublication(row, tags = []) {
    return new Publication(
        row.ID,
        row.Title,
        row.Date,
        row.Author,
        row.Box_File_ID,
        tags,
        row.Publication_File
    )
}


/* Public Utility Function called by DatabaseGateway */
export function rowsToProgramList(rows) {
    const programList = []
    const tagsList = new ItemList()
    const institutionsList = new ItemList()
    for(let i = 0; i < rows.length; i++) {
        // Add Tag and Institution to list, if not already in list
        const aTag = rows[i].Tag
        tagsList.addItemIfNew(aTag)
        const anInstitution = rows[i].Institution_Name
        institutionsList.addItemIfNew(anInstitution)
        // If last row or next row is a new Program, push this program to the list
        const lastRow = i+1 >= rows.length
        const nextIdIsNew = !lastRow && rows[i].ID !== rows[i+1].ID
        if(lastRow || nextIdIsNew) {
            const aProgram = rowToProgram(rows[i], institutionsList.getList(), tagsList.getList())
            programList.push(aProgram)
            // reset institutions and tags lists for next program
            institutionsList.resetItemsList()
            tagsList.resetItemsList()
        }
    }
    return programList
}

/* Private Helper Function */
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


/* Public Utility Function called by DatabaseGateway */
export function rowsToInstitutionList(rows) {
    const institutionList = []
    for(let i = 0; i < rows.length; i++) {
        const anInstitution = rowToInstitution(rows[i])
        institutionList.push(anInstitution)
    }
    return institutionList
}

/* Private Helper Function */
function rowToInstitution(row) {
    return new Institution(
        row.ID,
        row.Name,
        row.URL
    )
}



/* Private Helper Class */
class ItemList {
    constructor() {
        /* Static constants ("magic values") */
        this.EMPTY_ITEM = null
        this.ITEM_NOT_FOUND = -1
        /* Non-static, mutable variables */
        this.items = []
    }

    containsItem(anItem) {
        if(anItem === this.EMPTY_ITEM) {
            return true  // do not add null
        }
        if(this.items.indexOf(anItem) === this.ITEM_NOT_FOUND) {
            return false  // not in this.items, so add
        }
        return true  // contained in this.items, do not add
    }

    addItemIfNew(anItem) {
        if(this.containsItem(anItem)) 
            return
        // else new item, so push to list
        this.items.push(anItem)
    }

    getList() {
        return this.items
    }

    resetItemsList() {
        this.items = []
    }
}