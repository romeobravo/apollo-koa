import { mockServer } from 'graphql-tools'
import schema from '../src/api/schema'

const myMockServer = mockServer(schema)
myMockServer.query(`{
  allUsers: {
    id
    name
  }
}`)

// returns
// {
//   data: {
//     allUsers:[
//       { id: 'ee5ae76d-9b91-4270-a007-fad2054e2e75', name: 'lorem ipsum' },
//       { id: 'ca5c182b-99a8-4391-b4b4-4a20bd7cb13a', name: 'quis ut' }
//     ]
//   }
// }
