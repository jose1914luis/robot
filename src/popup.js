// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
$(async function () {

	$("#btnDatos").click(async function () {

		await chrome.tabs.create({url:'view/formulario.html#window'});
	});

	$("#btnPay").click(async function () {

		var urlRSM = "https://sedeelectronica.antioquia.gov.co/pasaporte/user/pago/";
		chrome.tabs.create({url: urlRSM});
	});

	$("#btnCita").click(async function () {

		var urlRSM = "https://sedeelectronica.antioquia.gov.co/pasaporte/user/createAppointment/";
		chrome.tabs.create({url: urlRSM});
	});
});


