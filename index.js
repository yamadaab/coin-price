#!/usr/bin/env node
const axios = require('axios')

class Coin {
  viewer() {
    console.log('現在１ビットコインの各取引所の取引価格は以下の通りです。')
    console.log('※この価格はあくまで学習用です。取引を行う際は自己責任でお願い致します。')
    this.bitflyer()
    this.coincheck()
    this.liquid()
  }

  price_view(coin_data) {
    axios.get(coin_data.url)
      .then(function (response) {
        const data = response.data
        console.log( coin_data.coin_name + Math.floor(data.ltp||data.last||data.last_traded_price).toLocaleString() + ' 円')
      })
  }
}

class Eachcoin extends Coin {
  bitflyer() {
    let coin_data = {
      url: 'https://api.bitflyer.com' + '/v1/ticker' + '',
      coin_name : 'bitflyer : ',
    }
    this.price_view(coin_data)
  }

  coincheck() {
    let coin_data = {
      url: 'https://coincheck.com/' + 'api/ticker',
      coin_name: 'coincheck: '
    }
    this.price_view(coin_data)
  }

  liquid() {
    let coin_data = {
      url: 'https://api.liquid.com' + '/products/5' + '',
      coin_name: 'Liquid   : '
    }
    this.price_view(coin_data)
  }
}

new Eachcoin().viewer()
