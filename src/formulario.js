function setData(index, passports) {

	console.log(index)
	console.log(passports)
	$('#sltDoc').val(passports[index].tipoDoc);
	$('#txtCedula').val(passports[index].cedula);
	$('#txtNombre').val(passports[index].nombres);
	$('#txtApellido').val(passports[index].apellidos);
	$('#txtCelular').val(passports[index].celular);
	$('#txtCorreo').val(passports[index].correo);
	$('#sltTipo').val(passports[index].tipo);
	$('#txtFecha').val(passports[index].fecha);
}

async function loadFromMemory(index) {

	let passports = await getStorageData('passports');
	
	setData(index, passports);
}

function buildButtons(passports){

	$("#people").empty();
	let btnLess = '<button id="btnLess" type="button" class="btn btn-danger me-1">-</button>';
	$("#people").append(btnLess);

	$("#btnLess").click(async function () {

		let index = await getStorageData('index');
		console.log(index)
		
		let passports = await getStorageData('passports');
		//console.log(passports)
		if(passports.length > 1){
			passports.splice(index, 1); 
			await setStorageData({ "passports": passports });
			console.log(passports)
			buildButtons(passports);
			cleanForm();
		}
		
	});

	for(let i = 0; i < passports.length; i++){
		let newButton = $('<button id="person' + i + '" type="button" class="btn btn-primary me-1">' + (i + 1) + ' - ' + passports[i].nombres+ '</button>');
		$("#people").append(newButton);
		$("#person" + i).click(async function () {

			await setStorageData({ 'index': i });
			loadFromMemory(i);
		});
	}

	let btnMore = '<button id="morePeople" type="button" class="btn btn-primary">+</button>'
	$("#people").append(btnMore);
	
	$("#morePeople").click(async function () {

		let passportsIndex = await getStorageData('passports');

		let index = passportsIndex.length;

		var newButton = $('<button id="person' + index + '" type="button" class="btn btn-primary me-1">' + (index + 1) + '</button>');
		$(newButton).insertBefore("#morePeople");
		//$("#morePeople").insertBefore(newButton);
		
		await setStorageData({ 'index': index });

		$("#person" + index).click(function () {

			loadFromMemory(index);
		});

		let passports = await getStorageData('passports');

		passports.push({
			"tipoDoc": "CC",
			"cedula": "",
			"nombres": "",
			"apellidos": "",
			"celular": "",
			"correo": "",
			"tipo": "1",
			"fecha": "19/08/2022"
		});

		await setStorageData({ "passports": passports });

		setData(index, passports);

	});
}

$(async function () {


	let index = await getStorageData('index');

	let passports = await getStorageData('passports');

	if (passports === undefined || passports.length == 0) {

		$.getJSON(chrome.runtime.getURL('/assets/formularios.json'), async (fileData) => {

			console.log('if')
			console.log(fileData)
			setData(index, fileData.passports);
			await setStorageData(fileData);
			buildButtons(fileData.passports)

		});


	} else {

		console.log('else')
		setData(index, passports);
		buildButtons(passports)

	}


	$("#btnGuardar").click(async function () {

		let index = await getStorageData('index');

		let passports = await getStorageData('passports');

		passports[index].tipoDoc = $('#sltDoc').val();
		passports[index].cedula = $('#txtCedula').val();
		passports[index].nombres = $('#txtNombre').val();
		passports[index].apellidos = $('#txtApellido').val();
		passports[index].celular = $('#txtCelular').val();
		passports[index].correo = $('#txtCorreo').val();
		passports[index].tipo = $('#sltTipo').val();
		passports[index].fecha = $('#txtFecha').val();

		await setStorageData({ "passports": passports });
		alert('Datos guardados correctamente');
		$("#person" + index).html((index+1) + ' - ' +$('#txtNombre').val());

	});

	$("#btnLimpiar").click(function () {

		cleanForm();
	});

})

function cleanForm(){

	$('#sltDoc').val('CC');
	$('#txtCedula').val('');
	$('#txtNombre').val('');
	$('#txtApellido').val('');
	$('#txtCelular').val('');
	$('#txtCorreo').val('');
	$('#sltTipo').val('1');
	$('#txtFecha').val('//2022');
}



