import React, { Component } from 'react';
import Split from 'split.js'
import './split-open-close-1.css';

class SplitOpenClose1 extends Component {
	constructor ( props ) {
		super ( props );

		this.drop_handler 		= this.drop_handler.bind ( this );
		this.sizeIt 			= this.sizeIt.bind ( this );
		this.dragover_handler 	= this.dragover_handler.bind ( this );
		this.open_handler 		= this.open_handler.bind ( this );
		this.close_handler 		= this.close_handler.bind ( this );
		this.dragstart_handler 	= this.dragstart_handler.bind ( this );
		this.positionSizer 		= this.positionSizer.bind ( this );

		this.state = {
			openDisabled: 	false,
			closeDisabled:	true
		};

		this.drag = {
			drageeId: 	'',
			clone: 		null,
			sizerX: 	0,
			sizerY:		0,
			sizeeW:		0,
			sizeeH:		0,
			startX: 	0,
			startY: 	0
		};
	}

	//	Data associated with any element.  Keys are the elements' id.
	eleData = {};
	PE_BORDER_WIDTH = 1;

	dragstart_handler ( ev ) {
		let sW = 'dragstart_handler()';
		console.log ( sW + ': ev.pageX, Y ' + ev.pageX + ', ' + ev.pageY );
		console.log ( sW + ': ev.clientX, Y ' + ev.clientX + ', ' + ev.clientY );
		// Add the target element's id to the data transfer object
		ev.dataTransfer.setData ( "text/plain", JSON.stringify ( { drageeId: 	ev.target.id,
																   startX: 		ev.pageX,
																   startY: 		ev.pageY  } ) );
		ev.dataTransfer.dropEffect = "move";
		let e = document.querySelector ( '#' + ev.target.id );
	//	ev.dataTransfer.setDragImage ( e, ev.offsetX * 4, ev.offsetY * 4 );		//	* 4 ?
		var clone = e.cloneNode ( true );
		clone.style.display = "none";
		document.body.appendChild ( clone );
		ev.dataTransfer.setDragImage ( clone, 0, 0 );

		let p = e.parentElement;

		this.drag.drageeId 	= ev.target.id;
		this.drag.clone 	= clone;
		this.drag.sizerX 	= Number.parseInt ( e.style.left );
		this.drag.sizerY 	= Number.parseInt ( e.style.top );
		this.drag.sizeeW 	= Number.parseInt ( p.style.width );
		this.drag.sizeeH 	= Number.parseInt ( p.style.height );
		this.drag.startX 	= ev.pageX;
		this.drag.startY 	= ev.pageY;
	}

	sizeIt ( ev ) {
		let sW = 'sizeIt()';
		var dX = ev.pageX - this.drag.startX;
		var dY = ev.pageY - this.drag.startY;
		console.log ( sW + ': dX, Y ' + dX + ', ' + dY );
		let e = document.querySelector ( '#' + this.drag.drageeId );
		let p = e.parentElement;
		e.style.left   = (this.drag.sizerX + dX).toString() + 'px';
		e.style.top    = (this.drag.sizerY + dY).toString() + 'px';
		p.style.width  = (this.drag.sizeeW + dX).toString() + 'px';
		p.style.height = (this.drag.sizeeH + dY).toString() + 'px';
	}
	
	dragover_handler ( ev ) {
		let sW = 'dragover_handler()';

		this.sizeIt ( ev );

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

	//	e.style.left   = (Number.parseInt ( e.style.left ) + dX).toString() + 'px';
	//	e.style.top    = (Number.parseInt ( e.style.top  ) + dY).toString() + 'px';
	//	p.style.width  = (Number.parseInt ( p.style.width )  + dX).toString() + 'px';
	//	p.style.height = (Number.parseInt ( p.style.height ) + dY).toString() + 'px';
		e.style.left   = (this.drag.sizerX + dX).toString() + 'px';
		e.style.top    = (this.drag.sizerY + dY).toString() + 'px';
		p.style.width  = (this.drag.sizeeW + dX).toString() + 'px';
		p.style.height = (this.drag.sizeeH + dY).toString() + 'px';

		this.drag.drageeId = '';
		this.drag.clone.remove();
	}

	open_handler ( ev ) {
		let sW = 'open_handler()';
		console.log ( sW );

		function createSplitPanelElement ( eleId ) {
			let sW = 'createSplitPanelElement()';
			console.log ( sW );
			//	That is, create a panel that is on either side of a spliter (i.e.,
			//	a slider/gutter). This element itself is not split.
			let ele = document.createElement ( 'div' );
			ele.id = eleId;
			ele.classList.value = 'split split-horizontal content';
			return ele;
		}	//	createSplitPanelElement()
		
		//  Get the panel element
		let pe = document.querySelector ( '#rr-pe-a' );
		//	And the sizer.  Remove it from the panel.
		let szr = document.querySelector ( '#rr-pe-a-sizer' );
		szr.remove();
	//	console.log ( pe.innerHTML );
		//  Copy the current contents of the panel.
		let pet = pe.textContent.trim()
		let pec = Array.from ( pe.children );
		//  Delete the current contents.
		pe.textContent = '';
		//	Panel is just sizelable now (no content). Set class to sizeable.
		//	And Fix the size because making it without content might have 
		//	removed some padding.
		let ow = pe.offsetWidth;
		let oh = pe.offsetHeight;
		pe.classList.value = 'sizeable';
		pe.style.width  = (Number.parseInt ( pe.style.width )  + (ow - pe.offsetWidth )).toString() + 'px';
		pe.style.height = (Number.parseInt ( pe.style.height ) + (oh - pe.offsetHeight)).toString() + 'px';
		//	Create three <div>s in the panel.
		let lft = createSplitPanelElement ( 'left' );
		pe.appendChild ( lft );
		let rgt = createSplitPanelElement ( 'right' );
		pe.appendChild ( rgt );
		//  Put the copied contents in the left <div>.
		lft.textContent = pet;
		pec.forEach ( e => lft.appendChild ( e ) );
		//	Split -
		let opts = {
			gutterSize: 6,
			minSize: 	20,
			snapOffset: 5,
			cursor: 	'col-resize'
		};
		let d = this.eleData[pe.id];
		if ( d && d.split && d.split.sizes )
			opts.sizes = d.split.sizes;
		let split = Split ( ['#left', '#right'], opts );
		//	Set the background color of the parent - it will show through
		//	on the gutter.
		pe.style.backgroundColor = 'lightgrey';
		//	Some content in the right side panel.
		rgt.textContent = 'side panel';
		//	Put the sizer back.
		pe.appendChild ( szr );
		//	Remember the split instance.
		if ( ! this.eleData[pe.id] )
			this.eleData[pe.id] = {};
		this.eleData[pe.id].split = { instance: split };
		//	Buttons -
	//	document.getElementById ( 'rr-btn-open' ).setAttribute ( 'disabled', true );
	//	document.getElementById ( 'rr-btn-close' ).removeAttribute ( 'disabled' );
		this.setState ( { openDisabled: true, closeDisabled: false } );
	}	//	open_handler()
	
	close_handler ( ev ) {
		let sW = 'close_handler()';
		console.log ( sW );
		//  Get the panel element
		let pe = document.querySelector ( '#rr-pe-a' );
		//	And the sizer.  Remove it from the panel.
		let szr = document.querySelector ( '#rr-pe-a-sizer' );
		szr.remove();
		//	Copy the contents of the left panel.
		let lft = document.querySelector ( '#left' );
		let lftt = lft.textContent.trim()
		let lftc = Array.from ( lft.children );
		//	Delete the right.
		let rgt = document.querySelector ( '#right' );
		rgt.remove();
		//	And the left.
		lft.remove();
		//	Panel will be continue to be sizeable but will now have content too.
		//	And Fix the size because content might have set padding.
		let ow = pe.offsetWidth;
		let oh = pe.offsetHeight;
		pe.classList.value = 'sizeable content';
		pe.style.width  = (Number.parseInt ( pe.style.width )  + (ow - pe.offsetWidth )).toString() + 'px';
		pe.style.height = (Number.parseInt ( pe.style.height ) + (oh - pe.offsetHeight)).toString() + 'px';
		//	Destroy the split.
		let split = this.eleData[pe.id].split;
		split.sizes = split.instance.getSizes();
		split.instance.destroy();
		delete ( split.instance );
		//  Set the conpied contents.
		pe.textContent = lftt;
		lftc.forEach ( e => pe.appendChild ( e ) );
		//	Set the background color of the panel.
		pe.style.backgroundColor = 'white';
		//	Put the sizer back.
		pe.appendChild ( szr );
		//	Buttons -
	//	document.getElementById ( 'rr-btn-open' ).removeAttribute ( 'disabled' );
	//	document.getElementById ( 'rr-btn-close' ).setAttribute ( 'disabled', true );
		this.setState ( { openDisabled: false, closeDisabled: true } );
	}	//	close_handler()
	
	positionSizer ( eleId ) {
		let sW = 'positionSizer()';
		console.log ( sW );
		let pe  = document.getElementById ( eleId );
		let szr = document.getElementById ( eleId + '-sizer' );
		let w0 = pe.offsetWidth;
		let h0 = pe.offsetHeight;
		szr.style.left = w0 - szr.offsetWidth  - this.PE_BORDER_WIDTH + 'px';
		szr.style.top  = h0 - szr.offsetHeight - this.PE_BORDER_WIDTH + 'px';
	}

	render() {
		return (
			<div className="split-open-close-1">
				<div id = "div-root" className = "a0"
									 onDrop = { this.drop_handler }
									 onDragOver = { this.dragover_handler } >
					Split and Unsplit (open and close a side panel) -
					<button id = "rr-btn-open" name = "btn-open" 
											   className = "rr-panel-control rr-panel-button" 
											   style = {{ left: '50px',  top: '50px',  width: '60px' }}
											   disabled = { this.state.openDisabled }
											   onClick = { this.open_handler } >
						Open</button>
					<button id = "rr-btn-close" name = "btn-close" 
											    className = "rr-panel-control rr-panel-button" 
											    style = {{ left: '120px',  top: '50px',  width: '60px' }}
											    disabled = { this.state.closeDisabled }
											    onClick = { this.close_handler } >
						Close</button>
					<div id = "rr-pe-a" className = "sizeable content" 
										style = {{ left: '50px',  top: '85px',  width: '275px',  height: '150px' }}
										onDrop = { this.drop_handler }
										onDragOver = { this.dragover_handler } >
						panel content
						<div id = "rr-pe-a-sizer" className = "sizer"
												  style = {{ left: '260px',  top: '135px' }}
												  draggable = "true" 
												  onDragStart = { this.dragstart_handler } >

						</div>
					</div>
				</div>
			</div>
		);
	}	//	render()

	componentDidMount() {
		this.positionSizer ( 'rr-pe-a' );
	}	//	componentDidMount()

}	//	class SplitOpenClose1

export default SplitOpenClose1;
