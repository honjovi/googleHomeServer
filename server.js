const googlehome = require('google-home-notifier');
const restify = require('restify');
const language = 'ja';

const sayTommorrowWeather = (req, res, next) => {
	console.log(`tommorrow: ${req.query.condition}`);
	const dialogue = `明日の天気は${req.query.condition}です`;
	notify(dialogue);
	res.send('OK');
	next();
}

const sayTodayWeather = (req, res, next) => {
	console.log(`today: ${req.query.condition}`);
	const dialogue = `今日の天気は${req.query.condition}です`;
	notify(dialogue);
	res.send('OK');
	next();
}

const sayTVProgram = (req, res, next) => {
	console.log(`program title: ${req.body.title}`);
	const dialogue = `今から、${req.body.title}がはじまります`;
	notify(dialogue);
	res.send('OK');
	next();
}

const notify = (dialogue) => {
	googlehome.device('Google-Home', language);
	googlehome.notify(dialogue, (res) => {
		console.log(res);
	});
}

const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/today-weather', sayTodayWeather);
server.get('/tommorrow-weather', sayTommorrowWeather);
server.post('/tv-program', sayTVProgram);

server.listen(8080, () => {
	console.log(`${server.name} listening at ${server.url}`);
});
