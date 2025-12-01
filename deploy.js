import FtpDeploy from 'ftp-deploy';
const ftpDeploy = new FtpDeploy();

const config = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: 21,
  localRoot: './dist',
  remoteRoot: '/www/',
  include: ['*', '**/*', '.htaccess'],
  deleteRemote: true,
  forcePasv: true
};

ftpDeploy.deploy(config)
  .then(res => console.log('✅ Deploy completato!'))
  .catch(err => console.log('❌ Errore:', err));
