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
    const {passwordList, checkBoxClicked} = this.state

    return passwordList.map(eachItem => (
      <PasswordListItem
        key={eachItem.id}
        passwordDetails={eachItem}
        onDelete={this.onDelete}
        checkBoxClicked={checkBoxClicked}
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

  onNameSearch = event => {
    const {searchInput} = this.state
    this.setState({
      searchInput: event.target.value,
    })
  }

  getSearchResults = () => {
    const {passwordList, nameInput, searchInput} = this.state
    const searchResult = passwordList.filter(eachItem =>
      eachItem.nameInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {
      passwordCount,
      nameInput,
      websiteInput,
      passwordInput,
      searchInput,
    } = this.state
    const searchResult = this.getSearchResults()

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
              <div className="con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon-img"
                />
                <input
                  placeholder="Enter Website"
                  type="text"
                  className="input-bar"
                  onChange={this.onWebsiteInputChange}
                  value={websiteInput}
                />
              </div>
              <div className="con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon-img"
                />
                <input
                  placeholder="Enter Username"
                  type="text"
                  className="input-bar"
                  onChange={this.onNameInputChange}
                  value={nameInput}
                />
              </div>
              <div className="con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-bar"
                  onChange={this.onPasswordInputChange}
                  value={passwordInput}
                />
              </div>
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
            <h1>
              Your Passwords: <p>{passwordCount}</p>
            </h1>
            <div className="con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="seacrh-img"
              />
              <input
                className="search-input"
                type="search"
                placeholder="Search-Name"
                onChange={this.onNameSearch}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <input
            id="checkBox"
            type="checkbox"
            onChange={this.onClickCheckbox}
          />
          <label htmlFor="checkBox">Show Passwords </label>
          {passwordCount > 0 ? (
            <ul className="ul-container">{this.renderPasswordListItems()}</ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-pass-txt">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
