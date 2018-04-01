import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './searchresults';
import Cart from './cart';

const API_URL =
  'http://es.backpackbang.com:9200/products/amazon/_search?q=title:';
var ena = 1;
class App extends Component {
  state = {
    query: '',
    results: [],
    items: [],
    total: 0,
  };

  getProduct = () => {
    axios.get(`${API_URL}${this.state.query}`).then(({ data }) => {
      if (ena == 1) {
        this.setState({
          results: data.hits,
        });
      }
    });
  };

  addItem = item => {
    this.state.items.push(item);
    this.countTotal();
  };

  clearCart = () => {
    this.state.items = [];
    this.countTotal();
  };

  removeItem = itemId => {
    if (typeof itemId != 'undefined') {
      this.state.items.splice(itemId, 1);
      this.countTotal();
    }
  };
  countTotal = () => {
    var total = 0;
    if (this.state.items.length > 0) {
      this.state.items.forEach(function(item, index) {
        total += item._source.price;
      });
    }
    this.setState({
      total: total,
    });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          ena = 1;
          this.getProduct();
        } else {
          this.state.results = '';
          ena = 0;
        }
      }
    );
  };

  render() {
    var idname = 'item-' + this.state.total;
    return (
      <div className="grid">
        <div className="col-8">
          <div className="searchbar">
            <div className="grid center">
              <div className="col-6">
                <input
                  placeholder="Search..."
                  type="text"
                  ref={input => (this.search = input)}
                  onChange={this.handleInputChange}
                  onKeyUp={this.handleInputChange}
                  className="search"
                />
              </div>
              <div className="col-1">
                <button
                  type="button"
                  onClick={this.handleInputChange}
                  className="submit"
                >
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
          <div className="products">
            <SearchResults
              addcart={this.addItem}
              results={this.state.results}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="cart-body">
            <div className="cart-header">
              <div className="cart-title">Cart</div>
              <div className="cart-clear">
                <button
                  id={idname}
                  className="clearbtn item-"
                  onClick={this.clearCart}
                >
                  Clear cart
                </button>
              </div>
            </div>
            <div className="items">
              <Cart removeitem={this.removeItem} state={this.state} />
            </div>
            <div className="cart-footer">
              <button id="placeOrderButton">
                <span className="placeOrderText">Total</span>
                <span className="totalMoneyCount">
                  <span>৳</span>
                  <span>{this.state.total}</span>
                  <span> </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
