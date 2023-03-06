 function getStorageData(key) {

	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(key, result =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(result[key])
		);
	});
}

 function setStorageData(data) {

	return new Promise((resolve, reject) => {
		chrome.storage.sync.set(data, () =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve()
		);
	});
}

function formatString(s) {
	return s.split("").reverse().join("").replace(/(.{3})/g, "$1.").split("").reverse().join("");
}

