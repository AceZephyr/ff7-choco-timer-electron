const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    query: (args) => ipcRenderer.invoke('query', args)
});