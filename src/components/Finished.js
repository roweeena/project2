import React, {Component} from 'react';
import {FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  TumblrIcon,} from 'react-share'



class Finished extends Component {
  constructor(){
    super();
    this.state={
      name:'',
      catchphrase: '',
      class: ''
    }
  }


  render(){
    const url = 'https://roweeena.github.io/project2'; //change to deployed url
   const title = 'RPG Character Creator';
    return(
    <div>
      <div className = "home">
        <h2>{this.props.name}</h2>
          <img src={this.props.imgUrl} alt="Finished product"/>
          <p>{this.props.class}</p>
          <p>{this.props.catchphrase}</p>
          <h5>Share your avatar</h5>
          <div className = "socials">
          <FacebookShareButton url={url} quote={title} >
            <FacebookIcon size={32} />
           </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <TumblrShareButton url={url} title={title}>
            <TumblrIcon size={32} />
          </TumblrShareButton>
          <RedditShareButton url={url} title={title}>
           <RedditIcon size={32} />
         </RedditShareButton>

        </div>
      </div>
    </div>
    )
  }
}



export default Finished
