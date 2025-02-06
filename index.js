console.log('@Sisked ☆')

import { join, dirname } from 'path'
import { createRequire } from 'module';
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts';
import { createInterface } from 'readline'
import yargs from 'yargs'
import express from 'express'
import chalk from 'chalk'
import path from 'path'
import os from 'os'
import { promises as fsPromises } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const { say } = cfonts
const rl = createInterface(process.stdin, process.stdout)

const app = express()
const port = process.env.PORT || 8080;

say('JerBot\nv05', {
  font: '3D',
  align: 'right',
  gradient: ['cyan', 'blue']
});

//borrar por si a caso
// index.js (fragmento)
const handleConfig = require('./handlers/configHandler');

sock.ev.on('messages.upsert', async (m) => {
  const message = m.messages[0];
  const id = message.key.remoteJid;
  const text = message.message.conversation || "";
  const args = text.trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  // Comandos enable/disable
  if (command === '.enable' || command === '.disable') {
    await handleConfig(command, args, sock, id);
    return;
  }

  // borrar por si a caso
});

var isRunning = false

async function start(files) {
  if (isRunning) return;
  isRunning = true;
  
  for (const file of files) {
    const currentFilePath = new URL(import.meta.url).pathname;
    let args = [join(__dirname, file), ...process.argv.slice(2)];
    say([process.argv[0], ...args].join(' '), {
      font: 'console',
      align: 'center',
      gradient: ['red', 'magenta']
    });
    
    setupMaster({
      exec: args[0],
      args: args.slice(1),
    });
    
    let p = fork();
    p.on('message', data => {
      console.log('[RECEIVED]', data);
      switch (data) {
        case 'reset':
          p.process.kill();
          isRunning = false;
          start(files);
          break;
        case 'uptime':
          p.send(process.uptime());
          break;
      }
    });
    
    p.on('exit', (_, code) => {
      isRunning = false;
      console.error('Ocurrió un error inesperado:', code)
      start(files);

      if (code === 0) return;
      watchFile(args[0], () => {
        unwatchFile(args[0]);
        start(files);
      });
    });
    
    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
    if (!opts['test'])
      if (!rl.listenerCount()) rl.on('line', line => {
        p.emit('message', line.trim());
      });
  }
}

start(['sisked.js'])
