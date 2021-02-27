#!/usr/bin/env node
const axios = require('axios')

class BitcoinPriceViewer {

  showEachCompaniesPrice() {
    console.log('現在１ビットコインの各取引所の取引価格は以下の通りです。')
    console.log('※取引を行う際は自己責任でお願い致します。')
    this.checkBitflyer()
    this.checkCoincheck()
    this.checkLiquid()
  }

  checkPrice(companyData) {
    axios.get(companyData.url)
      .then(function (response) { 
        const data = response.data
        console.log(`${companyData.companyName.padEnd(10, ' ')}: ${Math.floor(data.ltp || data.last || data.last_traded_price).toLocaleString()} 円`)
      })
  }

  checkBitflyer() {
    const companyData = {
      url: 'https://api.bitflyer.com/v1/ticker',
      companyName: 'bitflyer',
    }
    this.checkPrice(companyData)
  }

  checkCoincheck() {
    const companyData = {
      url: 'https://coincheck.com/api/ticker',
      companyName: 'coincheck'
    }
    this.checkPrice(companyData)
  }

  checkLiquid() {
    const companyData = {
      url: 'https://api.liquid.com/products/5',
      companyName: 'Liquid'
    }
    this.checkPrice(companyData)
  }
}

new BitcoinPriceViewer().showEachCompaniesPrice()
