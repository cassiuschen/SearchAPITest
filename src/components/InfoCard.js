import React, { Component } from 'react';
import 'prismjs';
import 'prismjs/themes/prism.css';
import PrismCode from 'react-prism';

class InfoCard extends Component {
  htmlDes = () => {
    return {__html: this.props.data.snippet}
  }
  rawData = () => {
    return {__html: JSON.stringify(this.props.data, undefined, 2)}
  }
  render = () => {
    const tagList = this.props.data.keywords.split(' ').map(tag => 
      <span className="tag" key={tag}>{tag}</span>
    )
    return (
      <div className="basic_info">
        <div className="inline">
          <dt>标题</dt>
          <dd>{this.props.data.title}</dd>
        </div>
        <div className="inline">
          <dt>描述</dt>
          <dd dangerouslySetInnerHTML={this.htmlDes()}></dd>
        </div>
        <dl>
          <dt>ID</dt>
          <dd>{this.props.data.id}</dd>
          <dt>来源</dt>
          <dd>{this.props.data.source}</dd>
          <dt>链接地址</dt>
          <dd><a href={this.props.data.link}>{this.props.data.link}</a></dd>
        </dl>
        <dl>
          <dt>类型</dt>
          <dd>{this.props.data.type}</dd>
          <dt>作者</dt>
          <dd>{this.props.data.author}</dd>
          <dt>发布时间</dt>
          <dd>{this.props.data.pubdate}</dd>
        </dl>
        <div className="inline">
          <dt>关键词</dt>
          <dd>
            { tagList }
          </dd>
        </div>
        
        <PrismCode className="extra_code language-json">
          {JSON.stringify(this.props.data, undefined, 2)}
        </PrismCode>
      </div>
    );
  }
}

export default InfoCard;