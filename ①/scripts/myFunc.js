function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof(oldonload) == 'function') {
		window.onload = function(){
			oldonload();
			func();
		}
	}
	else window.onload = func;
}

function insertAfter(newElement,targetElement){
	var parentElement=targetElement.parentNode;
	if (parentElement.lastChild==targetElement) 
		parentElement.appendChild(newElement);
	else
		parentElement.insertBefore(newElement,targetElement.nextSibling);	
}
function addClass(element,value){
	if (!element.className) {
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+= "";
		newClassName+= value;
		element.className = newClassName;
	}
}
function moveElement(elementID,final_x,final_y,interval){
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		var dist = Math.ceil(final_x-xpos)/10;
		xpos = xpos + dist;
	}
	if (xpos > final_x) {
		var dist = Math.ceil(xpos-final_x)/10;
		xpos = xpos - dist;
	}
	if (ypos < final_y) {
		var dist = Math.ceil(final_y-ypos)/10;
		ypos = ypos + dist;
	}
	if (ypos > final_y) {
		var dist = Math.ceil(ypos-final_y)/10;
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function resetFields(whichform){
	if (Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit") continue;
		var check = element.placeholder||element.getAttribute("placeholder");
		if (!check) continue;
		element.onfocus = function(){
			var text = this.placeholder||this.getAttribute("placeholder");
			if (this.value == text) {
				this.className = "";
				this.value = "";
			}
		}
		element.onblur = function(){
			if (this.value == "") {
				this.className = 'placeholder';
				this.value = this.placeholder||this.getAttribute('placeholder');
			}
		}
		element.onblur();
	}
}