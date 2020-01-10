import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search item name"
          value={this.props.valueSearch}
          onChange={event =>
            this.props.handleSearchInputChange(event.target.value)
          }
        />
        <span className="input-group-btn">
          <button
            className="btn btn-info"
            type="button"
            onClick={() => this.props.handleClickClear()}
          >
            Clear
          </button>
        </span>
      </div>
    );
  }
}

export default Search;
