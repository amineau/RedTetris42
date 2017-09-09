import params  from '../../params'
import * as server from './index'

server.create(params.server).then( () => console.log(`Server start on ${params.server.url}`) )
