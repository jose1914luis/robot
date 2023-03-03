function setData(index, passports) {

	const passport = passports[index];
	$('#sltDoc').val(passport.tipoDoc);
	$('#txtCedula').val(passport.cedula);
	$('#txtNombre').val(passport.nombres);
	$('#txtApellido').val(passport.apellidos);
	$('#txtCelular').val(passport.celular);
	$('#txtCorreo').val(passport.correo);
	$('#sltTipo').val(passport.tipo);
	$('#txtFecha').val(passport.fecha);
}

async function loadFromMemory(index) {

	const passports = await getStorageData('passports');
	
	setData(index, passports);
}

function buildButtons(passports){

	const $people = $("#people");
	$people.empty();

	const btnLess = $('<button/>', {
		id: 'btnLess',
		type: 'button',
		class: 'btn btn-danger me-1',
		html: '-'
	}).appendTo($people);

	btnLess.click(async function () {

		const index = await getStorageData('index');
		let passports = await getStorageData('passports');
		if(passports.length > 1){

			passports.splice(index, 1); 
			await setStorageData({ "passports": passports });
			console.log(passports)
			buildButtons(passports);
			cleanForm();
		}
		
	});

	passports.forEach(
		(passport, i) =>{

			const newButton = $('<button/>', {
				id: `person${i}`,
				type: 'button',
				class: 'btn btn-primary me-1',
				html: `${i + 1} - ${passport.nombres}`
			}).appendTo($people);
			newButton.click(async function () {

				await setStorageData({ 'index': i });
				loadFromMemory(i);
			});
		}
	)

	const btnMore = $('<button/>', {
		id: 'morePeople',
		type: 'button',
		class: 'btn btn-primary',
		html: '+'
	}).appendTo($people);
	
	btnMore.click(async function () {

		let passportsIndex = await getStorageData('passports');

		let index = passportsIndex.length;

		const newButton = $('<button/>', {
			id: 'person' + index,
			type: 'button',
			class: 'btn btn-primary me-1',
			html: (index + 1)
		}).insertBefore(btnMore);
		
		await setStorageData({ 'index': index });

		newButton.click(async function () {

			//console.log(index)
			loadFromMemory(index);
			await setStorageData({ 'index': index });
		});

		let passports = await getStorageData('passports');


		const updatedPassports = [
			...passports,
			{
			  "tipoDoc": "CC",
			  "cedula": "",
			  "nombres": "",
			  "apellidos": "",
			  "celular": "",
			  "correo": "",
			  "tipo": "1",
			  "fecha": "19/08/2022"
			}
		  ];
		  await setStorageData({ "passports": updatedPassports });
		  setData(index, updatedPassports);

	});
}

$(async function () {


	let index = await getStorageData('index');

	let passports = await getStorageData('passports');

	if (passports === undefined || passports.length == 0) {

		await $.getJSON(chrome.runtime.getURL('/assets/formularios.json'), async (fileData) => {

			passports = fileData.passports;
			setData(index, passports);
			await setStorageData(fileData);

		});


	} else {

		setData(index, passports);

	}

	buildButtons(passports)


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



