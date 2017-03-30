import React, { Component } from 'react'
import { Icon, Tooltip } from 'react-mdl'

export default class ChooseAvatar extends Component {
	state = {
		selectedImage: -1,
		images: ['Ant','Aquarium','Badger','Bat-Face','Bear','Beaver','Bee','Bird','Bug','Bull','Bumblebee','Butterfly','Cat-Footprint','Cat','Caterpillar','Chicken','Clown-Fish','Corgi','Cow','Crab','Deer','Dinosaur','Dog-Park','Dog','Dolphin','Dragonfly','Duck','Elephant','Falcon','Fish-Food','Fish','Fly','Frog','Giraffe','Gorilla','Grasshopper','Hornet-Hive','Hornet','Horse','Hummingbird','Insect','Kangaroo','Kiwi','Ladybird','Leopard','Lion','Llama','Mite','Mosquito','Octopus','Panda','Pig-With-Lipstick','Pig','Prawn','Puffin-Bird','Rabbit','Rhinoceros','Seahorse','Shark','Sheep','Snail','Spider','Starfish','Stork','Tentacles','Turtle','Unicorn','Wasp','Whale','Wolf']
	}
	componentWillMount () {
		if (this.props.selected) {
			this.setState({selectedImage: this.state.images.indexOf(this.props.selected)})
		}
	}
	rotateImage = (e) => {
		var newimage = 0;
	  	if (e.target.id ==='up') {
	  		newimage = (this.state.selectedImage === this.state.images.length -1) ? 0 : this.state.selectedImage + 1
	  	}
	  	if (e.target.id ==='down') {
	  		newimage = (this.state.selectedImage === -1) ? this.state.images.length -1 : this.state.selectedImage -1
  		}
  		this.setState({selectedImage: newimage})
	  	this.props.changeHandler(this.state.images[newimage])
	}
	render () {
		const imgSrc = (this.state.selectedImage === -1) ? 'none' : this.state.images[this.state.selectedImage] 
	    return (
	    	<div>
		    	<Icon name="chevron_left" id="down" className="arrows" onClick={this.rotateImage} />
		    	<Tooltip label="Choose your avatar" position="top">
		    		<img src={"/img/" + imgSrc + ".png"} alt="Choose your avatar" className="avatar" />
		    	</Tooltip>
		    	<Icon name="chevron_right" id="up" className="arrows" onClick={this.rotateImage} />
	    	</div>
	    )
	}
}
