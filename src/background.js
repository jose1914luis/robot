
chrome.runtime.onInstalled.addListener(async () => {
	

	chrome.storage.sync.set({'index':0}, () => console.log('index initial')
	);
});


async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0];
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
				  files: ['src/jquery-3.6.3.min.js', 'src/utils.js', file]
				});
			}
		}
    })
	
})


