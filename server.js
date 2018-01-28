const googlehome = require('google-home-notifier');
const restify = require('restify');
const log4js = require('log4js');

log4js.configure('log-config.json');
const logger = log4js.getLogger('system');

const language = 'ja';

const sayTommorrowWeather = (req, res, next) => {
	logger.info(`GET /tommorrow-weather condition: "${req.query.condition}"`);
	const dialogue = `明日の天気は${req.query.condition}です`;
	notify(dialogue);
	res.send('OK');
	next();
}

const sayTodayWeather = (req, res, next) => {
	logger.info(`GET /today-weather condition: "${req.query.condition}"`);
	const dialogue = `今日の天気は${req.query.condition}です`;
	notify(dialogue);
	res.send('OK');
	next();
}

const sayTVProgram = (req, res, next) => {
	logger.info(`GET /tv-program title: "${req.body.title}"`);
	const dialogue = `今から、${req.body.title}がはじまります`;
	notify(dialogue);
	res.send('OK');
	next();
}

const notify = (dialogue) => {
	googlehome.device('Google-Home', language);
	googlehome.notify(dialogue, (res) => {
		logger.info(`Google Home: "${res}"`);
	});
}

const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/today-weather', sayTodayWeather);
server.get('/tommorrow-weather', sayTommorrowWeather);
server.post('/tv-program', sayTVProgram);

server.listen(8080, () => {
	logger.info(`${server.name} listening at ${server.url}`);
});
