import React, { Component } from 'react';
import Split from 'split.js'

import Frame from './frame'

import './hierarchy.css';

class App extends Component {
	constructor ( props ) {
		super ( props );

		this.mouseMove 		= this.mouseMove.bind ( this );
		this.mouseUp 		= this.mouseUp.bind ( this );
		this.doIt 			= this.doIt.bind ( this );
	
	
		this.frameMoving = {
			moverMouseDown: 	false,
			frameFnc:			null,
			startX: 			0,
			startY: 			0
		};
		this.frameSizing = {
			sizerMouseDown: 	false,
			frameFnc:			null,
			startX: 			0,
			startY: 			0
		};
	}	//	constructor
	
	mouseMove ( ev ) {
		let sW = 'mouseMove()';
		console.log ( sW );
		if ( this.frameMoving.moverMouseDown ) {
			this.frameMoving.frameFnc ( { do: 	'move',
										  dX:	ev.pageX - this.frameMoving.startX,
										  dY:	ev.pageY - this.frameMoving.startY } );
			ev.preventDefault();
			return;	}
		if ( this.frameSizing.sizerMouseDown ) {
			this.frameSizing.frameFnc ( { do: 	'size',
										  dX:	ev.pageX - this.frameSizing.startX,
										  dY:	ev.pageY - this.frameSizing.startY } );
			ev.preventDefault();
			return;	}
	}	//	mouseMove()

	mouseUp ( ev ) {
		let sW = 'mouseUp()';
		console.log ( sW );
		if ( this.frameMoving.moverMouseDown ) {
			this.frameMoving.moverMouseDown	= false;
			this.frameMoving.frameFnc		= null;
			return;	}
		if ( this.frameSizing.sizerMouseDown ) {
			this.frameSizing.sizerMouseDown	= false;
			this.frameSizing.frameFnc		= null;
			return;	}
	}	//	mouseUp()

	doIt ( o ) {
		if ( o.do === 'move-frame' ) {
			this.frameMoving.moverMouseDown	= true;
			this.frameMoving.frameFnc 		= o.frameFnc;
			this.frameMoving.startX			= o.ev.pageX;
			this.frameMoving.startY			= o.ev.pageY;
		}
		if ( o.do === 'size-frame' ) {
			this.frameSizing.sizerMouseDown	= true;
			this.frameSizing.frameFnc 		= o.frameFnc;
			this.frameSizing.startX			= o.ev.pageX;
			this.frameSizing.startY 		= o.ev.pageY;
		}
	}	//	doIt()

	render() {
		return (
			<div className 		= 'hier-app'
				 onMouseMove	= { this.mouseMove } 
				 onMouseUp		= { this.mouseUp } >
				root
				<Frame appFnc = { this.doIt } />
			</div>
		);
	}
}   //  class App

export default App;
