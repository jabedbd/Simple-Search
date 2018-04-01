import React from 'react';

class ImageLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ctatus: 'loading',
      imageStatus: <img className="laoding" src="img/loading.gif" />,
    };
  }

  handleImageLoaded() {
    this.setState({ ctatus: 'loaded', imageStatus: '' });
  }

  handleImageErrored() {
    this.setState({
      ctatus: 'loading',
      imageStatus: <img src="img/failed.jpg" />,
    });
  }

  render() {
    return (
      <div className="product-image">
        <img
          id={this.state.ctatus}
          src={this.props.imageUrl}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
        {this.state.imageStatus}
      </div>
    );
  }
}
export default ImageLoading;
