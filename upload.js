const uploadTitle = document.getElementById('upload-title')
const uploadTags = document.getElementById('upload-tags')
const uploadFile = document.getElementById('upload-file')
const uploadBtn = document.getElementById('upload-btn')

uploadBtn.onclick = () => {
  let currentUser = JSON.parse(localStorage.getItem('polytube_user'))
  
  if (!currentUser) {
    alert('sign in first bro')
    window.location.href = 'login.html'
    return
  }

  let file = uploadFile.files[0]
  if (!file || !uploadTitle.value) {
    alert('add a title and file first')
    return
  }

  let reader = new FileReader()
  reader.onload = (e) => {
    let base64Video = e.target.result

    let newVideo = {
      title: uploadTitle.value,
      tags: uploadTags.value,
      creator: currentUser.customName || currentUser.name,
      url: base64Video,
      likes: 0
    }

    let vids = JSON.parse(localStorage.getItem('polytube_videos')) || []
    vids.push(newVideo)
    localStorage.setItem('polytube_videos', JSON.stringify(vids))

    alert('uploaded successfully!')
    window.location.href = 'index.html'
  }

  reader.readAsDataURL(file)
}