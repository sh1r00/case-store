import _ from 'lodash'

const baseUrl = 'http://localhost/mysites/cockpit'
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

export default {
  getProducts
}