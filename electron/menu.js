const {Menu,ipcMain} = require('electron');

const menu = [
    {
        label: "切换配置",
        onclick(){
            ipcMain.on("toggleSetting","toggle")
        }
    }
];

const context_menu = Menu.buildFromTemplate(menu);

module.exports = context_menu;