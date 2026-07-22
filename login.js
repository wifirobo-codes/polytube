const loginUser = document.getElementById('login-user')
const loginPass = document.getElementById('login-pass')
const loginSubmitBtn = document.getElementById('login-submit-btn')

loginSubmitBtn.onclick = () => {
  let username = loginUser.value.trim()
  let password = loginPass.value.trim()

  if (!username || !password) {
    alert('enter both username and password bro')
    return
  }

  let userData = {
    name: username,
    customName: username
  }
  
  localStorage.setItem('polytube_user', JSON.stringify(userData))
  
  alert('signed in successfully!')
  window.location.href = 'index.html'
}