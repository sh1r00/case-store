import _ from 'lodash'

const baseUrl = process.env.BASE_URL
const apiUrl = process.env.API_URL
const apiToken = process.env.API_TOKEN
const collectionName = process.env.COLLECTION_NAME

function getProducts() {
  return new Promise((resolve, reject) => {
    const endpoint =
      baseUrl +
      '/' +
      apiUrl +
      '/get/' +
      collectionName +
      '?token=' +
      apiToken
    fetch(endpoint, {
      method: 'get',
      headers: {
        'Content-Type': 'application.json'
      },
    })
      .then(response =>
        response.json().then(data => {
          console.log('response', data)
          resolve(data)
        })
      )
      .catch(error => {
        console.log(error)
        resolve(error)
      })
  })
}

function addForms(params) {
  return new Promise((resolve, reject) => {
    const endpoint =
      baseUrl +
      '/' +
      'api/forms/submit' +
      collectionName +
      'Receipts' +
      '?token=' +
      apiToken
    fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        form: {
          type: params.type_slug,
          name: params.title,
          content: params.content,
          metafields: params.metafields
        }
      })
    })
      .then(entry => entry.json)
      .then(entry => console.losg(entry))
      .catch(error => {
        console.log(error)
        resolve(error)
      })
  })
}

export default {
  getProducts,
  addForms
}