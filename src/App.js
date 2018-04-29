import $ from 'jquery'
import React, { Component } from 'react';
import logo from './synced_logo.svg';
import mask from './mask.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import InfoCard from './components/InfoCard';


class App extends Component {
  static resultSize = 20
  state = {
    currentKeyword: undefined,
    data: [],
    selectedTarget: {},
    results: {},
    resultQuery: [],
    queryFrom: 0
  }

  generateMaskStyle = () => {
    return "background-image:url(" + mask + ");"
  }
  defaultMask = () => {
    if (this.state.selectedTarget === null) {
      return <div className="mask"
              style={{backgroundImage: 'url(' + mask + ')'}} />
    }
  }

  // Searching Logic
  handleSearch = keywords => {
    this.setState({queryFrom: 0, currentKeyword: keywords, resultQuery: []})
    this.getSearchResults(keywords)
  }

  getSearchResults = keywords => {
    if (keywords !== '') {
      const aiDiggerParams = {
        size: -1,
        sort: "overall",
        from: this.state.queryFrom,
        q: keywords
      }
      return $.ajax({
        method: 'GET',
        async: true,
        url: 'http://127.0.0.1:9292/ai_digger',
        data: aiDiggerParams,
        crossDomain: true,
        dataType: 'json'
      }).done(results => {
        this.setState({results: results.hits, resultQuery: this.state.resultQuery.concat(results.hits.machine_mind.hits),queryFrom: this.state.queryFrom + results.hits.machine_mind.hits.length})
      });
    }
  }

  // Keep Scrolling
  scrollDetectorShown = () => {
    return $('#scrollDetector').offset().top - $(window).height() < 0
  }
  canKeepScrolling = () => {
    return this.state.results.tooks - this.state.queryFrom >= this.resultSize
  }
  fetchMore = () => {
    if (this.canKeepScrolling() && this.scrollDetectorShown()) {

    }
  }

  // Show Details
  handleClickOnResult = data => {
    this.setState({selectedTarget: data})
  }

  renderSearchResult = data => {
    return data.map(datum => {
      return (
        <SearchResult
          key={datum.id}
          itemId={datum.id}
          title={datum.title}
          snippet={datum.snippet}
          author={datum.author}
          pubdate={datum.pubdate}
          raw={datum}
          clickHandler={this.handleClickOnResult}
        />
      )}
    )
  }

  render() {
    const searchResults = () => {
      const that = this
      if(this.state.results.tooks !== undefined) {
        const renderedResults = that.renderSearchResult(this.state.results.machine_mind.hits)
        return (
          <div>
            <div className="benchmark">
              <span className="total">找到 {this.state.results.tooks} 条内容</span>
              <span className="duration">用时 {this.state.results.used_times}s</span>
            </div>
            { renderedResults }
            <div 
              id="scrollDetector"
              style={{backgroundImage:'url(' + mask + ')'}} >
            </div>
          </div>
        )
      } else { 
        return null
      }
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchBar onSearch={this.handleSearch} />
        </header>
        <div className="container">
          <div className="results">
            { searchResults() }
          </div>
          <div className="detail">
            { this.state.selectedTarget.id === undefined ?
              <div className="mask"
                style={{backgroundImage: 'url(' + mask + ')'}} ></div>
              :
              <InfoCard data={this.state.selectedTarget} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
