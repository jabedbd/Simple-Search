import React, { Component } from 'react';
import ImageLoading from './imageloading';

class SearchResults extends Component {
    

    
render(){
var options
var props = this.props;
if(props.results != '') { 
if(props.results.hits.length > 0){
 var index = 0;
  options = props.results.hits.map(r => (
    <div key={r._id} className="product-box">
      <ImageLoading imageUrl={r._source.images[0]}  />
      <div className="product-info">
      <h5>{r._source.title}</h5>
      <h6>${r._source.price/100} (Tk. {r._source.price})</h6>
    </div>
    <div className="cartbutton"><button  className="addtocart" 
                onClick={this.props.addcart.bind(this,props.results.hits[index])} key={index++}>Add to Cart</button></div>
    </div>
   
  ))
  } 
else {
  options = <div className="noproduct"><h2>No product found with your query</h2></div>
}
}
    else {
        options = <div className="noproduct"><h2>What'll you buy today!</h2></div>
}
  return options
}
}

export default SearchResults