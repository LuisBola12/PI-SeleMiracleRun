import app from './app';

const server_port = 5000;

app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`)
