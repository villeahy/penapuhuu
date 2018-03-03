
const forum = {
  makePost(post){
    fetch('http://localhost:3420/api/post',{
      method: 'POST',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json'
      })})
      .catch(err => console.log(err));
  },
  async getPosts(){
    try{
      let response = await fetch('http://localhost:3420/api/posts');
      if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse.posts;
      }
    }catch(error){
        console.log(error);
    }
  }
}
export default forum;
