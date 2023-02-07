import {Publication, Program, Institution} from '../Entity/Entities.js'

export function rowsToPublicationList(rows) {
    const publicationList = []
    let prevId = rows[0] !== undefined ? rows[0].ID : -1;
    const tagsList = ItemList()
    for(let i = 0; i < rows.length; i++) {
        // Add Tag and Institution to list, if not already in list
        const aTag = rows[i].Tag
        tagsList.addItemIfNew(aTag)
        // If last row or next row is a new Program, push this program to the list
        const lastRow = i+1 >= rows.length
        const nextIdIsNew = !lastRow && rows[i+1].ID !== prevId
        if(lastRow || nextIdIsNew) {
            const aPublication = rowToPublication(rows[i], tagsList.getList())
            publicationList.push(aPublication)
            // reset prevId and tags lists for next program
            tagsList.resetItemsList()
            prevId = aPublication.id
        }
    }
    return publicationList
}

/* Private Helper Method */
function rowToPublication(row, tags = []) {
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


// export function rowsToArtworkList(rows) {
//     const artoworkList = []
//     for(let i = 0; i < rows.length; i++) {
//         const anArtwork = rowToArtwork(rows[i])
//         artoworkList.push(anArtwork)
//     }
//     return artoworkList
// }

// /* Private Helper Method */
// function rowToArtwork(row, publicationIdsIn = [], tags = []) {
//     return new Artwork(
//         row.ID,
//         row.Title,
//         row.Date,
//         row.Author,
//         "", // TODO: no url at this time
//         publicationIdsIn,
//         tags
//     )
// }


export function rowsToProgramList(rows) {
    const programList = []
    let prevId = rows[0] !== undefined ? rows[0].ID : -1;
    const tagsList = ItemList()
    const institutionsList = ItemList()
    for(let i = 0; i < rows.length; i++) {
        // Add Tag and Institution to list, if not already in list
        const aTag = rows[i].Tag
        tagsList.addItemIfNew(aTag)
        const anInstitution = rows[i].Institution_Name
        institutionsList.addItemIfNew(anInstitution)
        // If last row or next row is a new Program, push this program to the list
        const lastRow = i+1 >= rows.length
        const nextIdIsNew = !lastRow && rows[i+1].ID !== prevId
        if(lastRow || nextIdIsNew) {
            const aProgram = rowToProgram(rows[i], institutionsList.getList(), tagsList.getList())
            programList.push(aProgram)
            // reset prevId, institutions, and tags lists for next program
            institutionsList.resetItemsList()
            tagsList.resetItemsList()
            prevId = aProgram.id
        }
    }
    return programList
}

/* Private Helper Method */
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


export function rowsToInstitutionList(rows) {
    const institutionList = []
    for(let i = 0; i < rows.length; i++) {
        const anInstitution = rowToInstitution(rows[i])
        institutionList.push(anInstitution)
    }
    return institutionList
}

/* Private Helper Method */
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
        this.EMPTY_LIST = []
        this.EMPTY_ITEM = null
        this.ITEM_NOT_FOUND = -1
        /* Non-static, mutable variables */
        this.items = this.EMPTY_LIST
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
        this.items = this.EMPTY_LIST
    }
}