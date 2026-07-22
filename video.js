let vids = JSON.parse(localStorage.getItem('polytube_videos')) || []
let currentIndex = localStorage.getItem('current_vid_index') || 0
let videoData = vids[currentIndex]

const titleEl = document.getElementById('vid-title')
const creatorEl = document.getElementById('vid-creator')
const videoPlayer = document.getElementById('main-video')
const playPauseBtn = document.getElementById('play-pause-btn')
const backBtn = document.getElementById('back-btn')
const forwardBtn = document.getElementById('forward-btn')
const likeBtn = document.getElementById('like-btn')
const likesCount = document.getElementById('likes-count')
const followBtn = document.getElementById('follow-btn')

if (videoData) {
  titleEl.innerText = videoData.title
  creatorEl.innerText = videoData.creator
  videoPlayer.src = videoData.url
  likesCount.innerText = videoData.likes || 0
} else {
  titleEl.innerText = "video not found :("
}

playPauseBtn.onclick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play()
    playPauseBtn.innerText = "Pause"
  } else {
    videoPlayer.pause()
    playPauseBtn.innerText = "Play"
  }
}

backBtn.onclick = () => {
  videoPlayer.currentTime -= 5
}

forwardBtn.onclick = () => {
  videoPlayer.currentTime += 5
}

likeBtn.onclick = () => {
  videoData.likes = (videoData.likes || 0) + 1
  likesCount.innerText = videoData.likes
  vids[currentIndex] = videoData
  localStorage.setItem('polytube_videos', JSON.stringify(vids))
}

let following = false
followBtn.onclick = () => {
  following = !following
  followBtn.innerText = following ? "Following!" : "Follow"
  followBtn.style.background = following ? "#6C9AA6" : "#99D9EA"
  followBtn.style.color = following ? "white" : "black"
}