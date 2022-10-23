const path = require('path');
let fs = require('fs');
const express = require('express');
const app = express();
const urlencodedParser = express.urlencoded({extended: false});

const password = "1";
const logpass = "2";
const maxLogs = 10;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/log', function(req, res){ // get log by GET
	if(req.query.pass != logpass){
		console.log("Неправильный пароль (лог)");
		res.sendStatus(403);
	}
	else if(req.query.text == undefined){
		console.log("Пустое поле текста (лог)");
		res.sendStatus(400);
	}
	else if(req.query.text.length > 100){
		console.log("Слишком длинный лог");
		res.sendStatus(400);
	}
	else{
		console.log("Получен лог: " + req.query.text);
		res.sendStatus(200);

		var logs = fs.readFileSync(`${__dirname}/logs.json`, 'utf8');
		logs = JSON.parse(logs);
		dt = new Date();
		dt = dt.toString();
		dt = dt.slice(dt.search(' ')+1, dt.search(' ')+21);

		logs.list.push(dt + " — " + req.query.text);
		if(logs.list.length > maxLogs) logs.list.shift();

		fs.writeFileSync(`${__dirname}/logs.json`, JSON.stringify(logs), function(err) {
			if(err) return console.log(err);
		}); 
	}
});

app.get('/all', (req, res) => { // send json all info
	var logs = fs.readFileSync(`${__dirname}/logs.json`, 'utf8');
	var save = fs.readFileSync(`${__dirname}/save.json`, 'utf8');
	logs = JSON.parse(logs);
	save = JSON.parse(save);
	x = { ...logs, ...save};
	res.send(x);
	console.log("Передано сохранение");
});

app.get('/today', (req, res) => { // send time (hhmmss) + today sch
	var today = new Date();
	i = today.getDay();
	i--;
	if(i == -1) i = 6;

	var text = fs.readFileSync(`${__dirname}/save.json`, 'utf8');
	js = JSON.parse(text);
	k = js.week[i];
	console.log("День недели: " + i + "; Расписание: " + k);

	h = today.getHours().toString();
	m = today.getMinutes().toString();
	s = today.getSeconds().toString();
	if(h.length < 2) h = "0" + h; 
	if(m.length < 2) m = "0" + m; 
	if(s.length < 2) s = "0" + s; 
	time = h + m + s;

	switch(k){
		case '1':
			res.send(time + js.r1);
			break;
		case '2':
			res.send(time + js.r2);
			break;
		case '3':
			res.send(time + js.r3);
			break;
		case '4':
			res.send(time + js.r4);
			break;
		default:
			str = "9".repeat(2 * 2 * 2 * 14);
			console.log(str);
			res.send(time + str)
			break;
	}
	console.log("Передано расписание");
});

app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
	try {
		request.body.r1;
		request.body.r2;
		request.body.r3;
		request.body.r4;
		request.body.pass;
		request.body.week;
	} catch (error) {
		response.send("Ошибка передачи данных");
		console.log("Ошибка получения данных");
		return;
	}
	if(request.body.pass != password){
		response.send("Неверный пароль");
		console.log("Неверный пароль");
		return;
	}

	err = 0;
	if(request.body.week.length != 7) err = 1;
	else{
		for(let i = 0; i < 7; i++){
			if(request.body.week[i] < '0' || request.body.week[i] > '4') err = 1;
		}
	}
	if(err){
		response.send("Ошибка данных (недельное распределение расписаний).<br> Значения могут быть либо пустыми, либо в диапазоне [0, 4]");
		console.log("Ошибка данных (неделя)");
		return;
	}

	if(request.body.r1.length % 4 != 0 || isNaN(request.body.r1) ||
		request.body.r2.length % 4 != 0 || isNaN(request.body.r2) ||
		request.body.r3.length % 4 != 0 || isNaN(request.body.r3) ||
		request.body.r4.length % 4 != 0 || isNaN(request.body.r4)){
			response.send("Ошибка данных (расписания)");
			console.log("Ошибка данных (расписание)");
			return;
	}
	console.log("Принято");
	delete request.body['pass'];

	fs.writeFileSync(`${__dirname}/save.json`, JSON.stringify(request.body), function(err) {
		if(err) return console.log(err);
	});
	response.send("Успешно");
});

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});