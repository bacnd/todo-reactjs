import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import Title from "./components/Title";
import Search from "./components/Search";
import Sort from "./components/Sort";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import Items from "./mockdata/Items";
import Item from "./components/Item";
import ItemEdit from "./components/ItemEdit";
import { orderBy as orderByld } from "lodash";

class App extends Component {
  render() {
    return (
      <div className="container">
        <SweetAlert
          show={this.state.showAlert}
          title="Delete Item"
          text={this.state.titleAlert}
          showCancelButton
          onOutsideClick={() => this.setState({ showAlert: false })}
          onEscapeKey={() => this.setState({ showAlert: false })}
          onCancel={() => this.setState({ showAlert: false })}
          onConfirm={() => this.handleDeleteItem()}
        />
        <Title />
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <Search
              handleClickClear={this.handleClickClear}
              valueSearch={this.state.valueSearch}
              handleSearchInputChange={this.handleSearchInputChange}
            />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Sort
              sortType={this.state.sortType}
              sortOrder={this.state.sortOrder}
              handleSort={this.handleSort}
            />
          </div>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <button
              type="button"
              className="btn btn-info btn-block marginB10"
              onClick={this.handleShowForm}
            >
              {this.state.showForm ? "Close Item" : "Add Item"}
            </button>
          </div>
        </div>
        <div className="row marginB10">
          <div className="col-md-offset-7 col-md-5">
            <Form
              showForm={this.state.showForm}
              arrayLevel={this.state.arrayLevel}
              valueItem={this.state.valueItem}
              handleFormInputChange={this.handleFormInputChange}
              levelItem={this.state.levelItem}
              handleFormSelectChange={this.handleFormSelectChange}
              handleFormClickCancel={this.handleFormClickCancel}
              handleFormClickSubmit={this.handleFormClickSubmit}
            />
          </div>
        </div>
        <ListItem renderItem={this.renderItem} />
      </div>
    );
  }
  constructor(props) {
    super(props);
    let arrayLevel = [];
    if (Items.length > 0) {
      for (let i = 0; i < Items.length; i++) {
        if (arrayLevel.indexOf(Items[i].level) === -1) {
          arrayLevel.push(Items[i].level);
        }
      }
    }
    arrayLevel.sort(function(a, b) {
      return a - b;
    });
    this.state = {
      items: Items,
      showAlert: false,
      titleAlert: "",
      idAlert: "",
      indexEdit: 0,
      idEdit: "",
      nameEdit: "",
      levelEdit: 0,
      arrayLevel: arrayLevel,
      showForm: false,
      valueItem: "",
      levelItem: 0,
      sortType: "",
      sortOrder: "",
      valueSearch: ""
    };
  }

  renderItem = () => {
    let {
      items,
      idEdit,
      indexEdit,
      nameEdit,
      levelEdit,
      arrayLevel
    } = this.state;
    if (items.length === 0) {
      return <Item item={0} />;
    }
    return items.map((item, index) => {
      if (item.id === idEdit) {
        return (
          <ItemEdit
            key={index}
            indexEdit={indexEdit}
            nameEdit={nameEdit}
            levelEdit={levelEdit}
            arrayLevel={arrayLevel}
            handleEditClickCancel={this.handleEditClickCancel}
            handleEditInputChange={this.handleEditInputChange}
            handleEditSelectChange={this.handleEditSelectChange}
            handleEditClickSubmit={this.handleEditClickSubmit}
          />
        );
      }
      return (
        <Item
          item={item}
          index={index}
          key={index}
          handleShowAlert={this.handleShowAlert}
          handleEditItem={this.handleEditItem}
        />
      );
    });
  };

  handleShowAlert = item => {
    this.setState({
      showAlert: true,
      titleAlert: item.name,
      idAlert: item.id
    });
  };

  handleDeleteItem = () => {
    let { idAlert, items } = this.state;
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === idAlert) {
          items.splice(i, 1);
          break;
        }
      }
    }
    this.setState({
      showAlert: false,
      titleAlert: "",
      idAlert: ""
    });
  };

  handleEditItem = (index, item) => {
    this.setState({
      indexEdit: index,
      idEdit: item.id,
      nameEdit: item.name,
      levelEdit: item.level
    });
  };

  handleEditClickCancel = () => {
    this.setState({
      idEdit: ""
    });
  };

  handleEditInputChange = value => {
    this.setState({
      nameEdit: value
    });
  };

  handleEditSelectChange = value => {
    this.setState({
      levelEdit: value
    });
  };

  handleEditClickSubmit = () => {
    let { items, idEdit, nameEdit, levelEdit } = this.state;
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === idEdit) {
          items[i].name = nameEdit;
          items[i].level = +levelEdit;
          break;
        }
      }
    }
    this.setState({
      idEdit: ""
    });
  };

  handleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  handleFormInputChange = value => {
    this.setState({
      valueItem: value
    });
  };

  handleFormSelectChange = value => {
    this.setState({
      levelItem: value
    });
  };

  handleFormClickCancel = () => {
    this.setState({
      valueItem: "",
      levelItem: 0
    });
  };

  handleFormClickSubmit = () => {
    let { valueItem, levelItem } = this.state;
    if (valueItem.trim() === "") return false;
    let newItem = {
      id: uuidv4(),
      name: valueItem,
      level: +levelItem
    };
    Items.push(newItem);
    this.setState({
      items: Items,
      valueItem: "",
      levelItem: 0,
      showForm: false
    });
  };

  handleSort = (sortType, sortOrder) => {
    this.setState({
      sortType: sortType,
      sortOrder: sortOrder
    });
    let { items } = this.state;
    this.setState({
      items: orderByld(items, [sortType], [sortOrder])
    });
  };

  handleClickClear = () => {
    this.setState({
      items: Items,
      valueSearch: ""
    });
  };

  handleSearchInputChange = value => {
    if (value.trim() === "") {
      this.setState({ items: Items, valueSearch: "" });
      return false;
    }
    let filteredItems = Items.filter(item => {
      return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    this.setState({
      items: filteredItems,
      valueSearch: value
    });
  };
}

export default App;
