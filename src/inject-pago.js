//import { getStorageData, setStorageData } from "./utils.js";

$(async function () {


	let index = await getStorageData('index');
	let passports = await getStorageData('passports');
	console.log(passports);

	$('#tipo_ide').val(passports[index].tipoDoc);
	$('#num_ide').val(formatString(passports[index].cedula));
	$('#num_ide_confirm').val(formatString(passports[index].cedula));
	$('#nombre').val(passports[index].nombres);
	$('#apellido').val(passports[index].apellidos);
	$('#mobile').val(passports[index].celular);
	$('#email').val(passports[index].correo);
	$('#email_confirm').val(passports[index].correo);
	$($('select')[1]).val('5c5a446a15ab22a64d531d80704d4d88d5928a0a');
	$('#acepto').click();
	$("html, body").animate({ scrollTop: 1000 }, 1000);

});

function formatString(s) {
	return s.split("").reverse().join("").replace(/(.{3})/g, "$1.").split("").reverse().join("");
}
