import React, { Component } from 'react'

class SearchBar extends Component {
  state = {
    keyword: '',
    results: null
  }

  onChange = e => {
    this.setState({keyword: e.target.value})
  }

  keydownHandler = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.setState({ keyword: e.target.value })
      //this.beginSearch()
      this.props.onSearch(this.state.keyword)
    }
  }

  render() {
    return (
      <div className="search_bar">
        <input
          type="search"
          className="search"
          placeholder="开始搜索"
          onKeyUp={this.keydownHandler}
          onChange={this.onChange}
        />
        {this.state.results ? this.state.results : ''}
      </div>
    )
  }
}

export default SearchBar;