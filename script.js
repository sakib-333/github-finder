const searchButton = document.querySelector('.search-btn');
const userInput = document.querySelector('.user-input');
const PublicRepos = document.querySelector('.public-repos');
const Gists = document.querySelector('.gists');
const Followers = document.querySelector('.followers');
const Following = document.querySelector('.following');
const User_id = document.querySelector('.user-id');
const Name = document.querySelector('.name');
const Created = document.querySelector('.created');
const Location = document.querySelector('.location');
const img = document.querySelector('img');
searchButton.addEventListener('click', handleClick);

function handleClick() {
  const input = userInput.value;
  const userURL = `https://api.github.com/users/${input}`;
  fetch(userURL)
    .then((reponse) => {
      if (reponse.status !== 200) {
        alertMsg(`URL not found! status code ${reponse.status}`);
        return;
      }
      return reponse.json();
    })
    .then((data) => {
      const {
        avatar_url,
        followers,
        following,
        location,
        name,
        id,
        created_at,
        public_gists,
        public_repos,
      } = data;
      setString(followers, Followers);
      setString(following, Following);
      setString(location, Location);
      setString(name, Name);
      setString(public_gists, Gists);
      setString(public_repos, PublicRepos);
      setString(id, User_id);
      setString(dateFormater(created_at), Created);
      img.setAttribute('src', avatar_url);
    })
    .catch((e) => {
      alertMsg(`Something went wrong ❌❌❌! Try again.`);
      console.log(e);
    });
}

function alertMsg(msg, type = 'danger') {
  const div = document.createElement('div');
  div.innerText = msg;
  div.className = `alert alert-${type}`;
  div.setAttribute('role', 'alert');
  document.body.prepend(div);
  setTimeout(() => {
    div.remove();
  }, 3000);
}
function setString(text, element) {
  // const str = element.innerText + '';
  // const pattern = /^\w+\s+\w+:/g;
  // console.log(pattern.test(str));
  // const matches = str.match(pattern)[0];
  // element.innerText = matches + text;
  const temp = element.innerText.split(':')[0];
  element.innerText = `${temp} : ${text}`;
}
function dateFormater(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
