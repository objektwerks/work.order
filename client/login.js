// @ts-check
export default class Login {
  constructor(fetcher) {
    document.getElementById('login-command-id').addEventListener('click', () => {
      // get form values
      const emailAddress = document.getElementById('login-email-address-id').value;
      const pin = document.getElementById('login-pin-id').value;
      // validate form values
      // package form values
      // call fetcher
      // handle fetcher return value vis-a-vis UI
    }, false);
  }
}