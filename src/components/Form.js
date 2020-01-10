import React, { Component } from "react";

class Form extends Component {
  render() {
    if (this.props.showForm === false) return null;
    return (
      <form
        className="form-inline"
        onSubmit={() => this.props.handleFormClickSubmit()}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control marginR5"
            placeholder="Item Name"
            value={this.props.valueItem}
            onChange={event =>
              this.props.handleFormInputChange(event.target.value)
            }
          />
        </div>
        <div className="form-group marginR5">
          <select
            className="form-control"
            value={this.props.levelItem}
            onChange={event =>
              this.props.handleFormSelectChange(event.target.value)
            }
          >
            {this.renderLevel()}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary marginR5"
          onClick={() => this.props.handleFormClickSubmit()}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={() => this.props.handleFormClickCancel()}
        >
          Cancel
        </button>
      </form>
    );
  }
  renderLevel = () => {
    let { arrayLevel } = this.props;
    return arrayLevel.map((level, index) => {
      switch (level) {
        case 0:
          return (
            <option key={index} value={level}>
              Small
            </option>
          );
        case 1:
          return (
            <option key={index} value={level}>
              Medium
            </option>
          );
        default:
          return (
            <option key={index} value={level}>
              High
            </option>
          );
      }
    });
  };
}

export default Form;
