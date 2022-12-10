import './index.css'

const PasswordListItem = props => {
  const {passwordDetails, onDelete, checkBoxClicked} = props
  const {id, nameInput, websiteInput, passwordInput} = passwordDetails
  const initial = nameInput[0]

  const passwordInputTxtUrl = checkBoxClicked ? (
    <p className="inputs">{passwordInput}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )
  const onClickDeleteIconBtn = () => {
    onDelete(id)
  }

  return (
    <li className="li-container">
      <div className="content">
        <div className="initial-container">
          <p className="initial">{initial}</p>
        </div>
        <div>
          <p className="inputs">{websiteInput}</p>
          <p className="inputs">{nameInput}</p>
          {passwordInputTxtUrl}
        </div>
      </div>

      <div className="delete-icon-container">
        <button
          type="button"
          className="del-icon-btn"
          onClick={onClickDeleteIconBtn}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="del-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordListItem
