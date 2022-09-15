// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
	
	if(e.target.id == 'btnPay'){
		var urlRSM = "https://sedeelectronica.antioquia.gov.co/pasaporte/user/pago/";
		chrome.tabs.create({url: urlRSM});
	}else if(e.target.id == 'btnCita'){
		
		var urlRSM = "https://sedeelectronica.antioquia.gov.co/pasaporte/user/createAppointment/";
		chrome.tabs.create({url: urlRSM});
	}if(e.target.id == 'btnDatos'){
		
		//chrome.tabs.create({url: "formulario.html"});
		//chrome.browserAction.setPopup({popup: "formulario.html"});
		chrome.tabs.create({url:'view/formulario.html#window'});
	}
}

document.addEventListener('DOMContentLoaded', function () {
	
	var inputs = document.querySelectorAll('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('click', click);
	}
});

function myFunction(){
	//chrome.tabs.executeScript(null, {code:"alert('oi')"});
	var urlRSM = "https://sedeelectronica.antioquia.gov.co/pasaporte/user/pago/";
    chrome.tabs.create({url: urlRSM});
	
}

