const authLink = document.getElementById('auth-link')
const authBox = document.getElementById('auth-box')
const userDisplayName = document.getElementById('user-display-name')
const customNameInput = document.getElementById('custom-name-input')
const saveNameBtn = document.getElementById('save-name-btn')
const logoutBtn = document.getElementById('logout-btn')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const videoFeed = document.getElementById('video-feed')

let currentUser = JSON.parse(localStorage.getItem('polytube_user')) || null

function updateAuthUI() {
  if (currentUser) {
    authLink.style.display = 'none'
    authBox.style.display = 'block'
    userDisplayName.innerText = `Logged in as: ${currentUser.customName || currentUser.name}`
    customNameInput.value = currentUser.customName || ''
  } else {
    authLink.style.display = 'block'
    authBox.style.display = 'none'
  }
}

saveNameBtn.onclick = () => {
  if (currentUser) {
    currentUser.customName = customNameInput.value
    localStorage.setItem('polytube_user', JSON.stringify(currentUser))
    updateAuthUI()
    alert('saved name!')
  }
}

logoutBtn.onclick = () => {
  localStorage.removeItem('polytube_user')
  window.location.reload()
}

function loadVideos(filter = "") {
  videoFeed.innerHTML = ""
  let vids = JSON.parse(localStorage.getItem('polytube_videos')) || []

  let filtered = vids.filter(v => {
    if (!filter) return true
    let q = filter.toLowerCase()
    return v.title.toLowerCase().includes(q) || 
           v.tags.toLowerCase().includes(q) || 
           v.creator.toLowerCase().includes(q)
  })

  if (filtered.length === 0) {
    videoFeed.innerHTML = "<p>no vids found lol</p>"
    return
  }

  filtered.forEach((v, index) => {
    let div = document.createElement('div')
    div.className = 'vid-item'
    div.innerHTML = `
      <h4>${v.title}</h4>
      <p>by ${v.creator}</p>
      <p><small>${v.tags}</small></p>
    `
    div.onclick = () => {
      localStorage.setItem('current_vid_index', index)
      window.location.href = 'video.html'
    }
    videoFeed.appendChild(div)
  })
}

searchBtn.onclick = () => {
  loadVideos(searchInput.value)
}

updateAuthUI()
loadVideos()