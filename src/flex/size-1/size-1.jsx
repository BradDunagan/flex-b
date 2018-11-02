import React, { Component } from 'react';
import './size-1.css';

//	See -
//		https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

class Size1 extends Component {
	constructor ( props ) {
		super ( props );
		this.dragstart_handler = 	this.dragstart_handler.bind ( this );
		this.dragover_handler = 	this.dragover_handler.bind ( this );
		this.drop_handler = 		this.drop_handler.bind ( this );
	}
	dragstart_handler ( ev ) {
		let sW = 'dragstart_handler()';
		console.log ( sW + ': ev.pageX, Y ' + ev.pageX + ', ' + ev.pageY );
		console.log ( sW + ': ev.clientX, Y ' + ev.clientX + ', ' + ev.clientY );
		// Add the target element's id to the data transfer object
		ev.dataTransfer.setData ( "text/plain", JSON.stringify ( { drageeId: 	ev.target.id,
																	startX: 	ev.pageX,
																	startY: 	ev.pageY  } ) );
		ev.dataTransfer.dropEffect = "move";
		let e = document.querySelector ( '#' + ev.target.id );
		ev.dataTransfer.setDragImage ( e, ev.offsetX * 4, ev.offsetY * 4 );		//	* 4 ?
	}
	dragover_handler ( ev ) {
		let sW = 'dragover_handler()';
		ev.preventDefault();
		// Set the dropEffect to move
		ev.dataTransfer.dropEffect = "move"
	}
	drop_handler ( ev ) {
		let sW = 'drop_handler()';
		ev.preventDefault();
		ev.stopPropagation();
		console.log ( sW + ': ev.pageX, Y ' + ev.pageX + ', ' + ev.pageY );
		console.log ( sW + ': ev.clientX, Y ' + ev.clientX + ', ' + ev.clientY );
		// Get the id of the target and add the moved element to the target's DOM
		var data = JSON.parse ( ev.dataTransfer.getData ( "text" ) );
		var dX = ev.pageX - data.startX;
		var dY = ev.pageY - data.startY;
		console.log ( sW + ': dX, Y ' + dX + ', ' + dY );
		let e = document.querySelector ( '#' + data.drageeId );
		let p = e.parentElement;
	//	if (   (ev.target.id !== e.id)
	//		&& (ev.target.id !== p.id) {
	//
	//	}
		e.style.left   = (Number.parseInt ( e.style.left ) + dX).toString() + 'px';
		e.style.top    = (Number.parseInt ( e.style.top  ) + dY).toString() + 'px';
		p.style.width  = (Number.parseInt ( p.style.width )  + dX).toString() + 'px';
		p.style.height = (Number.parseInt ( p.style.height ) + dY).toString() + 'px';
	}            
	render() {
		return (
			<div className="size-1">
				One sizable panel -
				<div id="div-root" className="a0"
								   onDrop={this.drop_handler}
								   onDragOver={this.dragover_handler}>
					<div id="div-sizeable" className="sizeable" 
										   style={{left: '50px', top: '75px', width: '275px', height: '150px',}} 
										   onDrop={this.drop_handler} 
										   onDragOver={this.dragover_handler}>
						Size Me
						<div id="id-sizer" className="sizer"
										   style={{left: '260px', top: '135px'}}
										   draggable="true" 
										   onDragStart={this.dragstart_handler}>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Size1;
