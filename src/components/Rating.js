import React, { Component } from "react";
import fullStar from '../css/assets/FULL.svg';
import halfStar from '../css/assets/half.png';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 4.5
    }
  }

  renderStars = () => {
    var starArray = []
    for(let i = 1; i <= parseInt(this.props.rating); i++){
      starArray.push((<img src={fullStar} key={i} />));
    }

    if(this.props.rating % 1){
      starArray.push((<img src={halfStar} key={this.props.rating} />));
    }

      return starArray;
    }

  render() {

    return (
      <div>
         {this.renderStars()}
      </div>
    ) }
  }

export default Rating;