import React, { Component } from 'react';

class SearchResult extends Component {
  htmlDes = () => {
    return {__html: this.props.snippet}
  }
  onClick = e => {
    this.props.clickHandler(this.props.raw)
  }
  render = () =>{
    return (
      <a className= "result" onClick={this.onClick}>
        <div className="cover"></div>
        <div className="info">
          <h1 className="title">{this.props.title}</h1>
          <p className="des" dangerouslySetInnerHTML={this.htmlDes()}></p>
          <div className="extra">
            <span className="author">{this.props.author}</span>
            <span className="time">{this.props.pubdate}</span>
          </div>
        </div>
      </a>
    );
  }
}

export default SearchResult;