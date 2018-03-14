import React, { Component } from 'react'
import alertify from 'alertify.js'

import Spacer from './components/spacer'
import Header from './components/header'
import ItemsList from './components/itemsList'
import * as api from './lib/api'
import { RESERVE_SUCCESS, RESERVE_OUT_OF_STOCK, RESERVE_ERROR } from './constants/api'

import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }

    this.items = [
      {
        id: 1,
        name: '42mm Space Gray Aluminum Case with Black Woven Nylon',
        imageSrc: require('./resources/images/s42sg-nsbk-sel-201603.png'),
        imageSrc2x: require('./resources/images/s42sg-nsbk-sel-201603@2x.png'),
      },
      {
        id: 2,
        name: '42mm Gold Aluminum Case with Gold/Royal Blue Woven Nylon',
        imageSrc: require('./resources/images/s42gd-nsgb-sel-201603.png'),
        imageSrc2x: require('./resources/images/s42gd-nsgb-sel-201603@2x.png')
      },
      {
        id: 3,
        name: '42mm Rose Gold Aluminum Case with Royal Blue Woven Nylon',
        imageSrc: require('./resources/images/s42rg-nsdb-sel-201603.png'),
        imageSrc2x: require('./resources/images/s42rg-nsdb-sel-201603@2x.png')
      },
      {
        id: 4,
        name: '42mm Silver Aluminum Case with Scuba Blue Woven Nylon',
        imageSrc: require('./resources/images/s42si-nssb-sel-201603.png'),
        imageSrc2x: require('./resources/images/s42si-nssb-sel-201603@2x.png')
      },
      {
        id: 5,
        name: 'Double Tour, 38mm Stainless Steel Case with Etain Leather Band',
        imageSrc: require('./resources/images/h38ss-dtgr-sel-201603.png'),
        imageSrc2x: require('./resources/images/h38ss-dtgr-sel-201603@2x.png')
      },
      {
        id: 6,
        name: 'Double Tour, 38mm Stainless Steel Case with Capucine Leather Band',
        imageSrc: require('./resources/images/h38ss-dtrd-sel-201603.png'),
        imageSrc2x: require('./resources/images/h38ss-dtrd-sel-201603@2x.png')
      },
      {
        id: 7,
        name: 'Double Tour, 38mm Stainless Steel Case with Blue Jean Leather Band',
        imageSrc: require('./resources/images/h38ss-dtbl-sel-201603.png'),
        imageSrc2x: require('./resources/images/h38ss-dtbl-sel-201603@2x.png')
      },
      {
        id: 8,
        name: 'Double Tour, 42mm Stainless Steel Case with Noir Leather Band',
        imageSrc: require('./resources/images/h42ss-stbk-sel-201603.png'),
        imageSrc2x: require('./resources/images/h42ss-stbk-sel-201603@2x.png')
      }
    ]
    this.onAddItemToCart = this.onAddItemToCart.bind(this)

    alertify.logPosition('top right')
  }

  async onAddItemToCart(id) {
    const cartItems = this.state.cartItems
    const urn = id
    const quantity = 1

    const reserveResult = await api.reserveItem({urn, quantity})

    if (reserveResult === RESERVE_SUCCESS) {
      return this.setState({
        cartItems: [...cartItems, id]
      })
    } else if (reserveResult === RESERVE_OUT_OF_STOCK) {
      alertify.log('Failed to reserve item. Out of stock.')
      return false
    } else {
      alertify.error('Something went wrong.')
      return false
    }
  }

  render() {
    const {cartItems} = this.state

    return (
      <div className='app'>
        <Header cartItems={cartItems}/>
        
        <Spacer top={4}>
          <ItemsList items={this.items} onAddItemToCart={this.onAddItemToCart}/>
        </Spacer>
      </div>
    )
  }
}

export default App
