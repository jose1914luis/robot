/************************************************************************************
* Inyeccion de javascript para el llenado autimatico de los campos del login.
* 
* Archivo:   inject.js
* Autor:     José Luis García Hernández <jose1914luis@gmail.com>
* Copyright: Todos los derechos reservados a nombre de SIGMIN SAS. 2014
* Version:   1.2, revisión 29-09-2016
************************************************************************************/

/*$.getJSON(chrome.extension.getURL('formularios.json'), function(datos) {

	$('#tipoDocumento').val(datos.login.tipoDocumento);
	$('#numeroDocumento').val(datos.login.numeroDocumento);
	$('#j_password').val(datos.login.j_password);
});*/

$(document).ready(function () {

//console.log(".------------- OI");
	chrome.storage.sync.get('passport', function(datos) {

		//console.log(formatString(datos.passport.cedula));
		$('#tipo_ide').val('CC');
		$('#num_ide').val(formatString(datos.passport.cedula));
		$('#num_ide_confirm').val(formatString(datos.passport.cedula));
		$('#nombre').val(datos.passport.nombres);
		$('#apellido').val(datos.passport.apellidos);
		$('#mobile').val(datos.passport.celular);
		$('#email').val(datos.passport.correo);
		$('#email_confirm').val(datos.passport.correo);
		$($('select')[1]).val('5c5a446a15ab22a64d531d80704d4d88d5928a0a');
		$('#acepto').click();
		$("html, body").animate({ scrollTop: 1000 }, 1000);
	});
});

function formatString(s){
	return s.split("").reverse().join("").replace(/(.{3})/g,"$1.").split("").reverse().join("");
}
