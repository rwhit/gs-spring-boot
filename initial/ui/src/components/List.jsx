import  React, { Component} from "react";
import { connect } from "react-redux";
import { getArticles } from "../actions";

const mapStateToProps = state => {
  return { articles: state.articles };
};

class List extends Component {

  componentDidMount() {
    this.props.getArticles();
  }
  
  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.articles.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.title}
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(mapStateToProps, {getArticles})(List);
