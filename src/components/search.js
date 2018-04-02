import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './searchresults';
import Cart from './cart';

const API_URL =
  'http://es.backpackbang.com:9200/products/amazon/_search?q=title:';
var ena = 1;
var hindex = -1;
class App extends Component {
  state = {
    query: '',
    results: [],
    history: [],
    items: [],
    prcart: [],
    total: 0,
  };

  getProduct = () => {
    if(this.state.query != ''){
    axios.get(`${API_URL}${this.state.query}`).then(({ data }) => {
      if (ena == 1) {
        this.setState({
          results: data.hits,
        });
      }
    });
    }
  };

  AddHistory = () => {
      var cur_item = this.state.prcart;
      var action = {query:this.state.query, items:cur_item};
      this.state.history.push(JSON.stringify(action));
   
       
    hindex++; 
  };

  History = type => {
    if(type == "forward"){
    hindex++;
    if(this.state.history.length > hindex){
        this.state.items = JSON.parse(this.state.history[hindex]).items;
         this.search.value = JSON.parse(this.state.history[hindex]).query;
        this.state.query = JSON.parse(this.state.history[hindex]).query;
        this.countTotal();
        if(JSON.parse(this.state.history[hindex]).query != ''){
           this.getProduct();
        }
    }  

        
    if(hindex == 0){
        this.search.value = "";
         this.state.items = [];
         this.getProduct;
          this.countTotal();
     }
    if(hindex > this.state.history.length){
        hindex = this.state.history.length;
    }
        
    }
    else if(type == "backward"){
    if(hindex > 0){
     hindex--;
    if(this.state.history.length > hindex){
        this.state.items = JSON.parse(this.state.history[hindex]).items;
         this.search.value = JSON.parse(this.state.history[hindex]).query;
        this.state.query = JSON.parse(this.state.history[hindex]).query;
        this.countTotal();
        if(JSON.parse(this.state.history[hindex]).query != ''){
           this.getProduct();
        }
    }  
       
        }
    if(hindex == 0){
        this.search.value = "";
        this.setState({
          results: [],
        });
        this.state.items = [];
        this.countTotal();
     }
    if(hindex > this.state.history.length){
        hindex = this.state.history.length;
    }
    
    }
      
  };

  addItem = item => {
    this.state.items.push(item);
    this.state.prcart.push(item);
    this.countTotal();
    this.AddHistory(); 
  };

  clearCart = () => {
    this.state.items = [];
    this.state.prcart = [];
    this.countTotal();
    this.AddHistory(); 
  };

  removeItem = itemId => {
    if (typeof itemId != 'undefined') {
      this.state.items.splice(itemId, 1);
      this.state.prcart.splice(itemId, 1);
      this.countTotal();
      this.AddHistory(); 
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
          if (this.state.query && this.state.query.length%2 == 0){
            this.AddHistory('query',this.state.query);  
          }
          
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
             <div className="grid history">
             <div className="col-1">
                       <button
                  type="button"
                  onClick={() =>{this.History("backward")}}
                  className="submit"
                >
                  <i className="fa fa-arrow-left" />
                </button>
                  </div>
            <div className="col-1">
                 <button
                  type="button"
                  onClick={() =>{this.History("forward")}}
                  className="submit"
                >
                  <i className="fa fa-arrow-right" />
                </button>
                  </div>
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
