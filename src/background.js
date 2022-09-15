
chrome.runtime.onInstalled.addListener(() => {
	var value = {
		  "cedula":"1020453492",
		  "nombres":"Juan David",
		  "apellidos":"Rincón Sánchez",
		  "celular":"3046389375",
		  "correo":"juandavidentrenador@gmail.com",
		  "tipo":"1",
		  "fecha":"19/08/2022"
	   };
	chrome.storage.sync.set({'passport': value}, function() {
		console.log('passport setup');
	});
});


async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0];
}

async function getValue(callback) {
  await chrome.storage.sync.get(['oi'], callback);
}

// Fired when a tab is updated.
chrome.tabs.onUpdated.addListener(async function () {

    await getTab().then(tab => {
        
		//console.log(tab);
		if(tab.status == "complete"){
			
			var file = '';
			if (tab.url == "https://sedeelectronica.antioquia.gov.co/pasaporte/user/pago/"){
				
				 file = 'src/inject-pago.js';
				  
			}else if (tab.url == "https://sedeelectronica.antioquia.gov.co/pasaporte/user/createAppointment/") {

				file = 'src/inject-cita.js';
			}
			//console.log(file);
			
			if(file != ''){
				
				chrome.scripting.executeScript({
				  target: { tabId: tab.id },
				  files: ['src/jquery-1.11.1.min.js']
				},
				() => { 
					chrome.scripting.executeScript({
					  target: { tabId: tab.id },
					  files: [file]
					})
				});
			}
		}
    })
	
})


