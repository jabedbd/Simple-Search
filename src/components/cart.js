import React, { Component } from 'react';
import ImageLoading from './imageloading';
class Cart extends Component {
  render() {
    var data = '';
    if (this.props.state.items.length > 0) {
      var index = 0;
      data = this.props.state.items.map(r => (
        <div className="item" key={r._id}>
          <div className="itemimg">
            <ImageLoading imageUrl={r._source.images[0]} />
          </div>
          <div className="itemname">{r._source.title}</div>
          <div className="itemprice">৳{r._source.price}</div>
          <div
            className="remove"
            onClick={this.props.removeitem.bind(this, index)}
            key={index++}
          >
            <i className="fa fa-times" />
          </div>
        </div>
      ));
    } else {
      data = <div className="no-item">No item in your cart</div>;
    }
    return data;
  }
}

export default Cart;
