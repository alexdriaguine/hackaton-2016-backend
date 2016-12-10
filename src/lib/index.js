import xml2js from 'xml2js'
import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'

Promise.promisifyAll(fs)

let parsed = null

export const parseXmlToJson = () =>  
  fs.readFileAsync(path.join(__dirname, '..', '..', 'butiker.xml'))
    .then(res => parse(res))
    .then(res => parsed = res)


export const getOpeningHours = (address) => {
  const store = parsed.ButikerOmbud.ButikOmbud.find(f => f.Address1[0] === address)
  if (!store) throw new Error('Inget hittat')
  const openingHours = store.Oppettider[0].split('_*')
  console.log(openingHours)
  const rightNow = new Date()
  const todaysOpeningHours = openingHours.find(hours => {
    const theHours = new Date(hours.substring(0, 10))
    return rightNow.getDate() === theHours.getDate()
  })


  console.log(todaysOpeningHours)
  const closingTime = todaysOpeningHours.substring(17, 22)
  return closingTime

}

const parse = (data) => {
  const parser = new xml2js.Parser()
  return new Promise((resolve, reject) => {
    parser.parseString(data, (err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
} 


