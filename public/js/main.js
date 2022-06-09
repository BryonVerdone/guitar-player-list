const thumbText = document.querySelectorAll('.fa-thumbs-up');

Array.from(thumbText).forEach((ele) => {
  ele.addEventListener('click', addLike);
});

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
