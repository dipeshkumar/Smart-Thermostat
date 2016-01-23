"use strict"

function getAccessLevel () {
	var accessLevel = window.sessionStorage.getItem('accessLevel');
	
	if(accessLevel) {
		return accessLevel;
	} else {
		return 0;
	}
}

function setAccessLevel(level) {
	window.sessionStorage.setItem('accessLevel',level);
}

function minAccessLevel (level) {
	var accessLevel = getAccessLevel();
	if(accessLevel < level) {
		template.load('denied');
	}
}

function getCurrentPage() {
	var page = window.sessionStorage.getItem('currPage');
	page ? page: page = ROOT_PAGE

	return page;
}

function setCurrentPage (page) {
	window.sessionStorage.setItem('currPage',page);
}