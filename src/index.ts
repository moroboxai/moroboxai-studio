console.log('MoroboxAI Studio is starting...');
import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar/main";
import { app as ElectronApp, BrowserWindow, Menu } from 'electron';
import yargs from "yargs/yargs";
import { hideBin } from 'yargs/helpers';
import path from 'path';

setupTitlebar();

const WINDOW_WIDTH: number = 1200;
const WINDOW_HEIGHT: number = 900;
const CPU_DIR: string = './cpu';
const GAMES_DIR: string = './games';
const MAIN_CSS: string = 'assets/theme.css';
const BOOT_MIN_DURATION: number = 4000;
const CWD: string = ElectronApp.getAppPath();

let isDev = false

if (
    process.env.NODE_ENV !== undefined &&
    process.env.NODE_ENV === 'development'
) {
    isDev = true
}

// parse command line arguments
const argv = yargs(hideBin(process.argv)).command(
    'moroboxai', 'Run MoroboxAI'
).option(
    'host', {
    description: 'Public TCP host used for AIs',
    type: 'string',
    default: '127.0.0.1'
}).option(
    'port', {
    description: 'Public TCP port used for AIs',
    type: 'number',
    default: 0
}).option(
    'width', {
    description: 'Force window width',
    type: 'number',
    default: WINDOW_WIDTH
}).option(
    'height', {
    description: 'Force window height',
    type: 'number',
    default: WINDOW_HEIGHT
}).option(
    'cpu-dir', {
    description: 'Directory containing the CPUs',
    type: 'string',
    default: CPU_DIR
}).option(
    'games-dir', {
    description: 'Directory containing MoroboxAI games',
    type: 'string',
    default: GAMES_DIR
}).option(
    'main-css', {
    description: 'Path to custom theme.css file',
    type: 'string',
    default: MAIN_CSS
}).option(
    'boot-duration', {
    description: 'Forced minimum boot duration',
    type: 'number',
    default: BOOT_MIN_DURATION
}).option(
    'game', {
    description: 'Selected game',
    type: 'string',
    default: undefined
}).help()
    .alias('help', 'h')
    .argv;

// create and display main window, pass arguments
let mainWindow: Electron.BrowserWindow | null;

ElectronApp.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: argv.width as number,
        height: argv.height as number,
        titleBarStyle: 'hidden',
        useContentSize: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.cjs')
        }
    });

    const menu = Menu.buildFromTemplate(menuTemplate(ElectronApp));
    Menu.setApplicationMenu(menu);

    mainWindow.loadFile(`${__dirname}/app/index.html`, {
        query: {
            options: JSON.stringify({
                nativeWidth: WINDOW_WIDTH,
                nativeHeight: WINDOW_HEIGHT,
                host: argv.host,
                port: argv.port,
                cpuDir: argv.cpuDir,
                gamesDir: argv.gamesDir,
                game: argv.game,
                mainCss: argv.mainCss,
                bootDuration: argv.bootDuration,
                cwd: CWD
            })
        }
    });

    attachTitlebarToWindow(mainWindow);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
});

ElectronApp.on('window-all-closed', () => {
    ElectronApp.quit();
});

const menuTemplate = (app: Electron.App): Electron.MenuItemConstructorOptions[] => [
    {
        label: "File",
        submenu: [
            {
                label: "Open Folder...",
                click: () => { }
            },
            {
                label: "Exit",
                click: () => app.quit()
            }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: "About",
                click: () => { }
            },
        ],
    }
];