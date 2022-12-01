import {Component} from 'react'

import {v4} from 'uuid'

import PasswordListItem from '../PasswordListItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    nameInput: '',
    websiteInput: '',
    passwordInput: '',
    checkBoxClicked: false,
    passwordList: [],
    searchInput: '',
    passwordCount: 0,
  }

  onDelete = id => {
    const {passwordList} = this.state
    this.setState(prevState => ({
      passwordList: passwordList.filter(password => password.id !== id),
      passwordCount: prevState.passwordCount - 1,
    }))
  }

  onSearchName = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getSearchResults = () => {
    const {searchInput, passwordList} = this.state
    const searchResults = passwordList.filter(eachApp =>
      eachApp.nameInput.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  renderPasswordListItems = () => {
    const {passwordList} = this.state

    return passwordList.map(eachItem => (
      <PasswordListItem
        key={eachItem.id}
        passwordDetails={eachItem}
        onDelete={this.onDelete}
      />
    ))
  }

  onAddbtn = event => {
    event.preventDefault()
    const {nameInput, websiteInput, passwordInput} = this.state

    const newPasswordList = {
      id: v4(),
      nameInput,
      websiteInput,
      passwordInput,
      onClickCheckbox: false,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPasswordList],
      nameInput: '',
      websiteInput: '',
      passwordInput: '',
      passwordCount: prevState.passwordCount + 1,
    }))
  }

  onNameInputChange = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onWebsiteInputChange = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onPasswordInputChange = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({
      checkBoxClicked: !prevState.checkBoxClicked,
    }))
  }

  render() {
    const {searchInput, passwordCount} = this.state
    const searchResults = this.getSearchResults()

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="password-input-container">
          <div className="password-form-container">
            <h1 className="form-heading">Add New Password</h1>
            <form onSubmit={this.onAddbtn} className="form">
              <input
                placeholder="Enter Website"
                type="text"
                className="input-bar"
                onChange={this.onWebsiteInputChange}
              />
              <input
                placeholder="Enter Username"
                type="text"
                className="input-bar"
                onChange={this.onNameInputChange}
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-bar"
                onChange={this.onPasswordInputChange}
              />
              <div>
                <button type="submit" className="submit-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager"
            />
          </div>
        </div>
        <div className="password-store-container">
          <div className="search-count-container">
            <p>Your Passwords{passwordCount}</p>
            <input
              className="search-input"
              type="search"
              placeholder="Search-Name"
              onChange={this.onSearchName}
              value={searchInput}
            />
          </div>
          <hr className="hr-line" />
          <input
            id="checkBox"
            type="checkbox"
            onChange={this.onClickCheckbox}
          />
          <label onChange={this.onClickCheckbox} htmlFor="checkBox">
            Show Password{' '}
          </label>
          <ul className="ul-container">{this.renderPasswordListItems()}</ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager

