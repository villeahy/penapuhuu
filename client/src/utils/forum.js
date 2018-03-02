
const forum = {
  makePost(post){
    fetch('http://localhost:3420/api/post',{
      method: 'POST',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json'
      })})
      .catch(err => console.log(err));
  }
}
export default forum;
