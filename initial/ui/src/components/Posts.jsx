import React, { Component } from "react";
import { connect } from "react-redux";
import { getData, getPost } from "../actions/index";

export class Post extends Component {
  constructor() {
    super();
    this.handlePostClick = this.handlePostClick.bind(this);
  }

  componentDidMount() {
    this.props.getData();
  }

  handlePostClick(event) {
    event.preventDefault();
    this.props.getPost(event.target.id);
  }

  render() {
    return (
      <ul className="list-group list-group-flush">
          {this.props.articles.map(el => (
            <li className="list-group-item" id={el.id} key={el.id} onClick={this.handlePostClick}>
                {el.title}
            </li>
          ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.remoteArticles.slice(0, 10)
  };
}

export default connect(
  mapStateToProps,
  { getData, getPost }
) (Post);

