const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const { execSync, exec } = require("child_process");

const port = 3000;
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
	var folderNames = execSync("ls -d /home/node/music/*/ || echo ''", { encoding: "utf8" });

	var formFolder = '';

	folderNameArray = folderNames.split(/\r?\n/);
	folderNameArray.pop();

	for (const directory of folderNameArray) {
		formFolder += '<option value="' + directory + '">' + directory + '</option>'
	}

	res.render(__dirname + '/index.ejs', {
		formFolderOptions: formFolder
	});

});

app.post('/spotdl', (req, res) => {
	console.log("[|] Download started");
	
	var url = req.body.textinput;
	var dir = req.body.selectbasic;

	var rootDirectory = '/home/node/music/';

	if (dir.indexOf(rootDirectory) !== 0) {
		console.log('[!] trying to sneak out of the web root');
	} else {
		exec(`cd ${dir} && spotdl ${url}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`[!] error: ${error.message}`);
			}
			if (stderr) {
				console.log(`[!] stderr: ${stderr}`);
			}
			console.log(`[+] Downloading songs from ${url}`);
		});
	}
	res.status(204).send();
});

app.post('/delete', (req, res) => {
	console.log(`[|] ${req.body.selectmultiple}`);

	console.log(typeof(req.body.selectmultiple));

	if (typeof(req.body.selectmultiple) == "string") {
		userArray = [ req.body.selectmultiple ]
	} else {
		userArray = req.body.selectmultiple
	}

	for (const directory in userArray) {
		console.log(userArray[directory]);
		exec(`rm -rf ${userArray[directory]}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`[!] error: ${error.message}`);
			} else {
				console.log(`[+] Removed folder ${userArray[directory]}`);
			}
		});
	}
	res.status(204).send();
});

app.post('/create', (req, res) => {
	console.log(`[|] Attempting to create folder ${req.body.selectsingle}`);

	var rootDirectory = '/home/node/music/';
	var filename = path.join(rootDirectory, req.body.selectsingle);

	if (filename.indexOf(rootDirectory) !== 0) {
		console.log('trying to sneak out of the web root?');
	} else {
		exec(`mkdir ${filename}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`[!] error: ${error.message}`);
			} else {
				console.log(`[+] Created directory ${filename}`);
			}
		});
	}
	res.status(204).send();
});

//////// Listener ////////
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:{port}`);
})