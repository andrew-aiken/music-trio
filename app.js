const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const { execSync, exec } = require("child_process");

const port = 3000;
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

function validURL(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
}

//////// Get / ////////
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

//////// Post /spotdl ////////
app.post('/spotdl', (req, res) => {
	console.log("[|] Download started");
	
	var url = req.body.textinput;
	var dir = req.body.selectbasic;

	var rootDirectory = '/home/node/music/';
	
	if (dir.indexOf(rootDirectory) !== 0) {
		console.log(`[!] Attempt for directory traversal: ${dir}`);
	} else {
		if (validURL(url)) {
			exec(`cd ${dir} && spotdl ${url}`, (error, stdout, stderr) => {
				if (error) {
					console.log(`[!] error: ${error.message}`);
				}
				if (stderr) {
					console.log(`[!] stderr: ${stderr}`);
				}
				console.log(`[+] Downloading songs from ${url}`);
			});
		} else {
			console.log(`[!] Attempted url injection: ${url}`);
		}
	}
	res.status(204).send();
});


//////// Post /delete ////////
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

//////// Post /create ////////
app.post('/create', (req, res) => {
	console.log(`[|] Attempting to create folder ${req.body.selectsingle}`);

	var rootDirectory = '/home/node/music/';
	var filename = path.join(rootDirectory, req.body.selectsingle);

	if (filename.indexOf(rootDirectory) !== 0) {
		console.log(`[!] Attempt for directory traversal: ${req.body.selectsingle}`);
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