const thumbText = document.querySelectorAll('.fa-thumbs-up');
const deleteText = document.querySelectorAll('.fa-trash');

Array.from(deleteText).forEach((ele) => {
  ele.addEventListener('click', deletePlayer);
});

Array.from(thumbText).forEach((ele) => {
  ele.addEventListener('click', addLike);
});

async function deletePlayer() {
  const sPlayerName = this.parentNode.childNodes[1].innerText;
  const sPlayerGuitar = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch('deleteGuitarPlayer', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerNameS: sPlayerName,
        playerGuitarS: sPlayerGuitar,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addLike() {
  const sPlayerName = this.parentNode.childNodes[1].innerText;
  const sPlayerGuitar = this.parentNode.childNodes[3].innerText;
  const tLikes = Number(this.parentNode.childNodes[5].innerText);
  try {
    const res = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerNameS: sPlayerName,
        playerGuitarS: sPlayerGuitar,
        likesS: tLikes,
      }),
    });
    const data = await res.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
