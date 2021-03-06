import React, { Component } from 'react';
import Split from 'split.js'
import './hierarchy.css';

class Sizer extends Component {
	constructor ( props ) {
		super ( props );
		this.id 		= 'sizer-' + props.frameId;
		this.appFnc 	= props.appFnc;
		this.frameFnc 	= props.frameFnc;
		this.state = {
			style: {
				left:	'0px',
				top:	'0px',
				width:	'0px',
				height:	'0px'
			}
		};
		this.doIt 		= this.doIt.bind ( this );
		this.mouseDown	= this.mouseDown.bind ( this );
		this.mouseUp	= this.mouseUp.bind ( this );

		this.sizeX0 = 0;
		this.sizeY0 = 0;

		this.frameFnc ( { do: 		'sizer-call-down',
						  sizerFnc: this.doIt } );
	}	//	constructor
	
	doIt ( o ) {
		if ( o.do === 'size' ) {
			this.setState ( {
				style: {
					left:	(this.sizeX0 + o.dX) + 'px',
					top:	(this.sizeY0 + o.dY) + 'px',
					width:	this.state.style.width,
					height:	this.state.style.height
				}
			} );
			return;
		}
	}

	mouseDown ( ev ) {
		let sW = 'mouseDown()';
		console.log ( sW );
		this.sizeX0 = Number.parseInt ( this.state.style.left );
		this.sizeY0 = Number.parseInt ( this.state.style.top );
		this.frameFnc ( { do: 	'size-start',
						  ev: 	ev } );
	}	//	mouseDown()

	mouseUp ( ev ) {
		let sW = 'mouseUp()';
		console.log ( sW );
	}	//	mouseUp()
	
	render() {
		return (
			<div id				= { this.id }
				 className		= 'hier-sizer'
				 style			= { this.state.style }
				 onMouseDown	= { this.mouseDown }
				 onMouseUp		= { this.mouseUp } >
			</div>
		);
	}   //  render()

	componentDidMount() {
		let e = document.getElementById ( this.id );
		let p = e.parentElement;
		this.setState ( { 
			style: {
				left:	(p.clientWidth  - 20) + 'px',
				top:	(p.clientHeight - 20) + 'px',
				width: 	'19px',
				height:	'19px'
			}
		} );
	}	//	componentDidMount()

}   //  class Sizer

export default Sizer;
