import boxSDK from 'box-node-sdk'

const BASE_URL = "https://api.box.com/2.0/"
const CLIENT_ID = "8oj6sfy3ykizu43qghtqrf84nsblha6e"
const CLIENT_SECRET = "H0ihKaBLlAoRVfLZvkIIfUvaC4VysJMQ"
const ACCESS_TOKEN = "BXr8PauKq7d5KqSacDw9JZlHIRx7iyjQ"

const client = boxSDK.getBasicClient(ACCESS_TOKEN)

/*** 
 * 1. Get Client Credentials -- specifically the Access Token:
 * curl -i -X POST "https://api.box.com/oauth2/token" -d "client_id=8oj6sfy3ykizu43qghtqrf84nsblha6e" -d "client_secret=H0ihKaBLlAoRVfLZvkIIfUvaC4VysJMQ" -d "grant_type=client_credentials"
 * Reference: https://developer.box.com/reference/post-oauth2-token
 *
 * 2. Get File Information with fileId and Access Token: 
 * curl -i -X GET "https://api.box.com/2.0/files/:fileId" \
     -H "Authorization: Bearer BXr8PauKq7d5KqSacDw9JZlHIRx7iyjQ"
 * Reference: https://developer.box.com/reference/get-files-id/ 
 * 
 * 3. Download File Contents
 * 
 * 
 * GitHub Reference: https://github.com/box/box-node-sdk
***/ 

// const fileId = 932526455922
// const folderId = 158546659531
// const url = `${BASE_URL}files/${fileId}`
// // const url = `${BASE_URL}folders/${folderId}`
// console.log(url)

// const response = await client.get(url, {qs: {fields: 'id,name'}})
// const fileInfo = response.body

// console.log(response.body)
// console.log(`File "${fileInfo.name}" has a size of ${fileInfo.size} bytes`)


// client.files.get(fileId)
//     .then(file => {
//         console.log("Found file data!")
//         console.log(file)
//     })

export async function getFileInfoById(fileId) {
    const url = `${BASE_URL}files/${fileId}`
    let response = {}
    try {
        response = await client.get(url, {qs: {fields: 'id,name'}})
    } catch(e) {
        console.log(e)
        return null
    }
    if(response.body.type === "error") {
        console.log(response.body)
        return null
    }
    const fileInfo = response.body
    console.log(fileInfo)
    return fileInfo
}