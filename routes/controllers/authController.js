import { bcrypt } from '../../deps.js';
import * as authService from '../../services/authService.js';
import { validate, required, notNull, isEmail, isString, lengthBetween } from "../../deps.js";

const validateRegistration = {
  email: [required, notNull, isEmail],
  password: [required, notNull, isString, lengthBetween(5, 20)],
};

const showLogin = async ({ request, response, session, render }) => {
  console.log(request.method)
  if (request.method === 'POST') {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    // check if the email exists in the database
    const res = await authService.getUserByEmail(email);
    if (res.rowCount === 0) {
      response.status = 401;
      render('login.ejs');

      return;
    }

    // take the first row from the results
    const userObj = res.rowsOfObjects()[0];

    const hash = userObj.password;

    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
      response.status = 401;
      render('login.ejs');

      return;
    }

    await session.set('authenticated', true);
    await session.set('user', {
      id: userObj.id,
      email: userObj.email
    });
    console.log('session await')
    console.log(await session.get('user'));

    const loggedInUserEmail = (await session.get('user')).email;

    response.body = 'Authentication successful!';
    console.log('successful auth');
    response.redirect('/', { loggedInUserEmail: loggedInUserEmail} );

  } else {
    let loggedInUserEmail;
    const sessionUser = await session.get('user');
    if(sessionUser) loggedInUserEmail = sessionUser.email;

    render('login.ejs', { loggedInUserEmail: loggedInUserEmail} )
  }
}


const showLogout = async ({ response, session }) => {
  await session.set('user', null);
  await session.set('authenticated', false);
  response.status = 200;
  response.redirect('/');

}

const showRegistration = async ({ render, request, response }) => {
  let frontendErrors = [];
  let formData = {
    password: '',
    email: '',
    verification: ''
  }
  if (request.method === 'POST') {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');
    const verification = params.get('verification');

    console.log(email, password, verification);

    if (password !== verification) {
      console.log('The entered passwords did not match');
      frontendErrors.push('The entered passwords did not match'); //thus, dont create new account
    }

    const emailReserved = await authService.isEmailReserved(email);
    if (emailReserved) {
      console.log('Indeed, the email is already reserved.');
      frontendErrors.push('The email is already reserved.');
      //thus, dont create account with a matchin email
    }

    const newUser = {
      email: email,
      password: password
    }

    const [passes, errors] = await validate(newUser, validateRegistration);
    console.log("errors from validasaur: ");
    console.log(errors);
    console.log("errors from frontend: ");
    console.log(frontendErrors);


    if (passes && frontendErrors.length < 1) {
      const hash = await bcrypt.hash(password);
      console.log('password: ', password);
      console.log('hash: ', hash);

      await authService.createNewUser(email, hash);
      response.status = 200;
      console.log('success, created new accout');
      response.redirect('/');
    } else {
      console.log('failed to create new')
      console.log(formData);
      formData.password = password;
      formData.email = email;
      formData.verification = verification;

      console.log(formData);

      response.status = 400;
      render('registration.ejs', {
        errors: errors,
        frontendErrors: frontendErrors,
        formData: formData
      });
    }

  } else {
    render('registration.ejs', {
      errors: [],
      frontendErrors: [],
      formData: formData
    })
  }
};







export { showRegistration, showLogin, showLogout }