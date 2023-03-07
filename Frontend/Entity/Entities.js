import { Readable } from 'stream';
import bufferToDataUrl from "buffer-to-data-url"

// import { getFileInfoById } from '../Control/FetchBoxData.js'

import { Buffer as Buffer } from 'buffer'

export class Publication {
    constructor(id, title, creationDate, author, fileId, type, tags, blob, blobType) {
        this.id = id                                    // integer, unique identifer
        this.title = title                              // string
        this.creationDate = creationDate                // date
        this.author = author                            // string
        this.fileId = fileId                            // int
        this.type = type                                // string
        this.tags = tags                                // list of strings
        this.blobBuffer = blob                          // Buffer
        this.blobType = blobType                        // string
    }

    getFileDataUrl() {
        const base64Encoding = new Buffer.from(this.blobBuffer).toString('base64')
        const fileUrl = `data:${this.blobType};base64,${base64Encoding}` 
        return fileUrl
    }
}

export class Program {
    constructor(id, name, type, startDate, endDate, programURL, hostingInstitutions, tags) {
        this.id = id                                    // integer, unique identifer
        this.name = name                                // string
        this.type = type                                // string
        this.startDate = startDate                      // date
        this.endDate = endDate                          // date
        this.programURL = programURL                    // string
        this.hostingInstitutions = hostingInstitutions  // list of integers
        this.tags = tags                                // list of strings
    }

    async getContent() {
        const programData = await fetch(this.programURL)
        return programData;
    }
}

export class Institution {
    constructor(id, name, institutionURL) {
        this.id = id                                    // integer, unique identifer
        this.name = name                                // string
        this.institutionURL = institutionURL            // string
    }
}
