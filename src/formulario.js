/************************************************************************************
* Inyeccion de javascript para el llenado autimatico de los campos del login.
* 
* Archivo:   inject.js
* Autor:     José Luis García Hernández <jose1914luis@gmail.com>
* Copyright: Todos los derechos reservados a nombre de SIGMIN SAS. 2014
* Version:   1.2, revisión 29-09-2016
************************************************************************************/

//$.getJSON(chrome.runtime.getURL('formularios.json'), function(datos) {

	//$('#txtCedula').val(datos.passport.cedula);
	//$('#numeroDocumento').val(datos.login.numeroDocumento);
	//$('#j_password').val(datos.login.j_password);
//});

$(document).ready(function () {

	
	chrome.storage.sync.get('passport', function(datos) {
		
		$('#txtCedula').val(datos.passport.cedula);
		$('#txtNombre').val(datos.passport.nombres);
		$('#txtApellido').val(datos.passport.apellidos);
		$('#txtCelular').val(datos.passport.celular);
		$('#txtCorreo').val(datos.passport.correo);
		$('#sltTipo').val(datos.passport.tipo);
		$('#txtFecha').val(datos.passport.fecha);
	});
	
	
	
	$( "#btnGuardar" ).click(function() {
		var value = {
		  "cedula":$('#txtCedula').val(),
		  "nombres":$('#txtNombre').val(),
		  "apellidos":$('#txtApellido').val(),
		  "celular":$('#txtCelular').val(),
		  "correo":$('#txtCorreo').val(),
		  "tipo":$('#sltTipo').val(),
		  "fecha":$('#txtFecha').val()
		};
		chrome.storage.sync.set({'passport': value}, function() {
			console.log('Value is set to ' + value);
			alert('Datos guardados correctamente');
		});

	});
	
	$( "#btnLimpiar" ).click(function() {
		
		$('#txtCedula').val('');
		$('#txtNombre').val('');
		$('#txtApellido').val('');
		$('#txtCelular').val('');
		$('#txtCorreo').val('');
		$('#sltTipo').val('0');
		$('#txtFecha').val('//2022');
	});

})
