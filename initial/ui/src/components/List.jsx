import  React, { Component} from "react";
import { connect } from "react-redux";
import { getArticles } from "../actions";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const mapStateToProps = state => {
  return {
    articles: state.articles,
    total: state.totalArticles,
    offset: state.articleOffset,
    pageSize: 4
  };
};

class List extends Component {

  componentDidMount() {
    this.props.getArticles(0, this.props.pageSize);
  }

  handleClick(e, page) {
    e.preventDefault();
    this.props.getArticles(this.props.pageSize * (page - 1), this.props.pageSize)
  }

  render() {
    const page = Math.floor(this.props.offset/this.props.pageSize) + 1;
    const pages = Math.floor(this.props.total/this.props.pageSize) + 1;
    const leftEnabled = (page > 1);
    const rightEnabled = (page < pages);
    // TODO fix styling for page of pages
    return (
      <div>
          <ul className="list-group list-group-flush">
              {this.props.articles.map(el => (
                <li className="list-group-item" key={el.id}>
                    {el.title}
                </li>
              ))}
          </ul>
          <Pagination size="sm" aria-label="Articles">
              <PaginationItem disabled={!leftEnabled}>
                  <PaginationLink first disabled={!leftEnabled} onClick={e => this.handleClick(e, 1)} href='#' />
              </PaginationItem>
              <PaginationItem disabled={!leftEnabled}>
                  <PaginationLink previous disabled={true} onClick={e => this.handleClick(e, Math.max(1, page - 1))} href='#' />
              </PaginationItem>
              <PaginationItem disabled={!rightEnabled}>
                  <PaginationLink next onClick={e => this.handleClick(e, Math.min(pages, page + 1))} href='#' />
              </PaginationItem>
              <PaginationItem disabled={!rightEnabled}>
                  <PaginationLink last onClick={e => this.handleClick(e, pages)} href='#' />
              </PaginationItem>
              <div>{page} of {pages}</div>
          </Pagination>
      </div>
    );
  }
}

export default connect(mapStateToProps, {getArticles})(List);
