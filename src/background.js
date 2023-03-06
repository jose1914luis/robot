
chrome.runtime.onInstalled.addListener(async () => {
	

	chrome.storage.sync.set({'index':0}, () => console.log('index initial')
	);
});


async function getTab() {
	
  const queryOptions = {url: [
    'https://sedeelectronica.antioquia.gov.co/pasaporte/user/*'
  ]};
  const tabs = await chrome.tabs.query(queryOptions);
  //console.log(tabs[0])
  return tabs[0];
}

// Fired when a tab is updated.

chrome.tabs.onUpdated.addListener(async function(){ await runProgram()})

chrome.tabs.onCreated.addListener(async function(){ await runProgram()});



async function runProgram() {

	const tab = await getTab();
	console.log(tab)
	if(tab && tab.status == "complete"){
			
		let file = '';
		if (tab.url == "https://sedeelectronica.antioquia.gov.co/pasaporte/user/pago/"){
			
			file = 'pago';
			  
		}else if (tab.url == "https://sedeelectronica.antioquia.gov.co/pasaporte/user/createAppointment/") {

			file = 'cita';
		}
		
		
		if(file != ''){
			
			const filePath = `src/inject-${file}.js`;
			console.log(filePath);
			chrome.scripting.executeScript({
			  target: { tabId: tab.id },
			  files: ['src/jquery-3.6.3.min.js', 'src/utils.js', filePath]
			});
		}
	}
	
}

