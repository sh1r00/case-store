import _ from 'lodash'

const baseUrl = 'https://heroku-cockpit.herokuapp.com'
const apiUrl = 'api/collections'
const apiToken = '0e7dca289e462780d9641654702558'
const collectionName = 'vueEcommerce'

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
      body: {
        "form": {
          "type": params.type_slug,
          "name": params.title,
          "content": params.content,
          "metafields": params.metafields
        }
      }
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

export default {
  getProducts,
  addForms
}