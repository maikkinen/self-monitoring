const showLogin = ({ render }) => {
  render('login.ejs')
}

const showRegistration = ({ render }) => {
  render('registration.ejs')
}

export { showRegistration, showLogin }