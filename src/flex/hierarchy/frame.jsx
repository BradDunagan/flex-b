import React, { Component } from 'react';
import Split 	from 'split.js'

import TitleBar from './title-bar'
import Sizer 	from './sizer'

import './hierarchy.css';

class Frame extends Component {
	constructor ( props ) {
		super ( props );
		this.appFnc 		= props.appFnc;
		this.titleBarFnc	= null;
		this.sizerFnc 		= null;
		this.state = {
			iconized:	null,
			style: {
				left:	'40px',
				top:	'40px',
				width:	'200px',
				height:	'300px',
			}
		};
		this.moveX0 = 0;
		this.moveY0 = 0;
		this.sizeW0 = 0;
		this.sizeH0 = 0;

		this.iconize 	= this.iconize.bind ( this );
		this.clickIcon	= this.clickIcon.bind ( this );
		this.doIt		= this.doIt.bind ( this );
	}	//	constructor

	iconize ( o ) {
		let sW = 'iconize()';
		console.log ( 'Frame ' + sW );
		//	1	Make the frame infisible.
		//	2	Render a rectangle matching the frame's position and
		//		size.
		//	3	Transition that rectangle to the icon's position and
		//		size.
		this.setState ( { iconized: { 
			style: {
				left:		this.state.style.left,
				top: 		this.state.style.top,
				width:		this.state.style.left,
				height:		this.state.style.height,
				transitionProperty: 	'left, top, width, height',
				transitionDuration:		'100ms' },
			name: {
				display: 	'none'
			}
		} } );
		window.setTimeout ( () => {
			this.setState ( { iconized: { 
				style: {
					left:		'20px',
					top: 		'20px',
					width:		'50px',
					height:		'60px',
					transitionProperty: 	'left, top, width, height',
					transitionDuration:		'100ms' },
				name: {
					display: 	'block'
				}
			} } );
		}, 50 );
	}	//	iconize()

	clickIcon ( ev ) {
		let sW = 'clickIcon()';
		console.log ( 'Frame ' + sW );
		let style = this.state.iconized.style;
		this.setState ( { iconized: { 
			style: {
				left:		this.state.style.left,
				top: 		this.state.style.top,
				width:		this.state.style.width,
				height:		this.state.style.height,
				transitionProperty: 	'left, top, width, height',
				transitionDuration:		'100ms' },
			name: {
				display: 	'none'
			}
		} } );
		window.setTimeout ( () => {
			this.setState ( { iconized: null } );
		}, 100 );
	}	//	clickIcon()

	doIt ( o ) {
		if ( o.do === 'sizer-call-down' ) {
			this.sizerFnc = o.sizerFnc;
			return;
		}
		if ( o.do === 'title-bar-call-down' ) {
			this.titleBarFnc = o.titleBarFnc;
			return;
		}
		if ( o.do === 'move-start' ) {
			this.moveX0 = Number.parseInt ( this.state.style.left );
			this.moveY0 = Number.parseInt ( this.state.style.top );
			this.appFnc ( { do: 		'move-frame',
							frameFnc:	this.doIt,
							ev: 		o.ev } );
			return;
		}
		if ( o.do === 'move' ) {
			this.setState ( {
				style: {
					left:	(this.moveX0 + o.dX) + 'px',
					top:	(this.moveY0 + o.dY) + 'px',
					width:	this.state.style.width,
					height:	this.state.style.height,
				}
			} );
			return;
		}
		if ( o.do === 'size-start' ) {
			this.sizeW0 = Number.parseInt ( this.state.style.width );
			this.sizeH0 = Number.parseInt ( this.state.style.height );
			if ( this.titleBarFnc ) {
				this.titleBarFnc ( o ); }
			this.appFnc ( { do: 		'size-frame',
							frameFnc:	this.doIt,
							ev: 		o.ev } );
			return;
		}
		if ( o.do === 'size' ) {
			this.setState ( {
				style: {
					left:	this.state.style.left,
					top:	this.state.style.top,
					width:	(this.sizeW0 + o.dX) + 'px',
					height:	(this.sizeH0 + o.dY) + 'px'
				}
			} );
			if ( this.titleBarFnc ) {
				this.titleBarFnc ( o ) }
			if ( this.sizerFnc ) {
				this.sizerFnc ( o ); }
			return;
		}
		if ( o.do === 'iconize' ) {
			this.iconize ( o );
			return;
		}
	}	//	doIt()

	render() {
		if ( this.state.iconized ) {
			return (
				<div className 	= 'hier-frame'
					 style 		= { this.state.iconized.style }
					 onClick	= { this.clickIcon } >
					<div className 	= 'hier-iconized-frame-name'
						 style 		= { this.state.iconized.name } >
						FrameName
					</div>
				</div>
			); }
		return (
			<div className	= 'hier-frame'
				 style		= { this.state.style } >
				<TitleBar frameId	= 'frame-1'
						  appFnc 	= { this.appFnc }
						  frameFnc 	= { this.doIt } />
				frame
				<Sizer frameId 		= 'frame-1'
					   appFnc 	= { this.appFnc }
					   frameFnc	= { this.doIt }  />
			</div>
		);
	}
}   //  class Frame

export default Frame;
