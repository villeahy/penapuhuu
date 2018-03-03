import React from 'react';

export default class Post extends React.Component {
  getClock(date){
    if(date.getMinutes()<9){
      if(date.getHours()<9){
        return '0'+date.getHours()+':0'+date.getMinutes();
      }else{
        return date.getHours()+':0'+date.getMinutes();
      }
    }else{
      if(date.getHours()<9){
        return '0'+date.getHours()+':'+date.getMinutes();
      }else{
        return date.getHours()+':'+date.getMinutes();
      }
    }
  }
  renderDay(){
    const date = new Date(this.props.post.date);
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+ '  '+this.getClock(date);
  }
  render(){
    return(
      <div className='Post'>
      <h4>User {this.props.post.username}</h4>
      <p>{this.props.post.text}</p>
      <p>Posted: {this.renderDay()}</p>
      </div>
    )
  }
}
