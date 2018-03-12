
const privateForum = {
  async getToken(user){
    try {
      let response = await fetch('http://localhost:3420/user/login/',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
          'Content-Type': 'application/json'
        })})
        if(response.ok){
          let jsonResponse = await response.json()
          if(jsonResponse.success===false){
            return jsonResponse.success
          }else{
            this.token=jsonResponse.token
            return true
          }
        }
    }catch(error){
      console.log(error)
    }
  },

  async createUser(user){
    try {
      let response = await fetch('http://localhost:3420/user/',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
          'Content-Type': 'application/json'
        })})
        if(response.ok){
          let jsonResponse = await response.json()
          if(jsonResponse.success===false){
            return jsonResponse.success
          }else{
            return jsonResponse
          }
        }
    }catch(error){
      console.log(error)
    }
  },

  makePost(post){
    fetch('http://localhost:3420/api/privateforum/',{
      method: 'POST',
      body: JSON.stringify(post),
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + this.token
      })})
      .catch(err => console.log(err));
  },
  async getPosts(){
    try{
      let response = await fetch('http://localhost:3420/api/privateforum/',{
        headers: new Headers({
          'authorization': 'bearer ' + this.token
        })})
      if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse.posts;
      }
    }catch(error){
        console.log(error);
    }
  },
  deletePost(id){
    fetch('http://localhost:3420/api/privateforum/'+id,{
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + this.token
      })})
      .catch(err => console.log(err));
  }
}
export default privateForum;
