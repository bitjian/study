const parseString = require('xml2js').parseString
const xml = `<?xml version="1.0" encoding="UTF-8"?> <Config> <WhiteFilter> <Process> <Item type="Other">appmarket.exe,360chromex.exe</Item> </Process> <Class> <Item type="Other"/> </Class> <ComBination> <Item type="Combin" process="360tray.exe" title="WndFastOptmTips2" width="1" height="1" class="Q360NetmonClassTips"/> <Item type="Combin" process="flashhelperservice.exe" title="信息" width="138" height="147" class="WindowsForms10.Window.8.app.0.33c0d9d"/> <Item type="Combin" process="QQPCTray.exe" width="100" height="100"/> <Item type="Combin" process="360tray.exe" width="" height=""/> <Item type="Combin" process="abcminixktt.exe" title="ABC头条" width="444" height="169" class="#32770"/> <Item type="Combin" title="钉钉"/> </ComBination> </WhiteFilter> </Config>`

parseString(xml, function (err, result) {
  console.dir(JSON.stringify(result));
});