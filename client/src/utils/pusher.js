import Pusher from 'pusher-js';

const pusher = new Pusher('a0baf500d9f8ab951ca1', {
  cluster: 'eu',
  encrypted: true
});

const callback = {
  setPusher(channelEvent, callback){
    const channel = pusher.subscribe('weather');
    channel.bind(channelEvent, data => {
      callback(data)
    });
  },
}

export default callback;
