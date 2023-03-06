$(async function () {


	let index = await getStorageData('index');
	let passports = await getStorageData('passports');
	console.log(passports);
	console.log('index ' + index);
	console.log(passports[index].tipoDoc)
	$('#num_ide').val(passports[index].cedula);
	$('#fecha_pago').val(passports[index].fecha);
	$('#tipo_solic').val(passports[index].tipo);
	$('#num_tel').val(passports[index].celular);
	$('#mobile').val(passports[index].celular);
	$('#correo').val(passports[index].correo);
	$('#correo_ok').val(passports[index].correo);
	$('#acepto').click();
	$("html, body").animate({ scrollTop: 1000 }, 1000);

});
