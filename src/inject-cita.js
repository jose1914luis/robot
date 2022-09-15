/************************************************************************************
* Inyeccion de javascript para el llenado autimatico de los campos del login.
* 
* Archivo:   inject.js
* Autor:     José Luis García Hernández <jose1914luis@gmail.com>
* Copyright: Todos los derechos reservados a nombre de SIGMIN SAS. 2014
* Version:   1.2, revisión 29-09-2016
************************************************************************************/


$(document).ready(function () {


	chrome.storage.sync.get('passport', function(datos) {

		$('#num_ide').val(datos.passport.cedula);
		$('#fecha_pago').val(datos.passport.fecha);
		$('#tipo_solic').val(datos.passport.tipo);
		$('#num_tel').val(datos.passport.celular);
		$('#correo').val(datos.passport.correo);
		$('#correo_ok').val(datos.passport.correo);
		$('#acepto').click();
		$("html, body").animate({ scrollTop: 1000 }, 1000);
	});
	
});