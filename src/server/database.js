import path from 'path'
const sqlite3 = require('sqlite3').verbose();


export default class HightScores {

	constructor() {
		this._db = this.init_db()
	}

	init_db() {
		let db = new sqlite3.Database(path.resolve(__dirname, '../../db/hightScores.db'), (err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log('Connected to the SQlite database.');
		})
		db.run(`CREATE TABLE IF NOT EXISTS score (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			player CHAR(6) NOT NULL,
			score INT,
			lines INT,
			created_at DATETIME DEFAULT current_timestamp
			)`);
		return db;
	}

	add({name, score, linesDone}) {
		this._db.run(`INSERT INTO score(player, score, lines) VALUES(?,?,?);`, [name, score, linesDone], err => {
			if (err) {
				return console.log(err.message)
			}
		})
	}

	show() {
		return new Promise((resolve, reject) => {
			this._db.all(`SELECT player, score, lines, created_at FROM score ORDER BY score DESC LIMIT 10;`, (err, rows) => {
				if (err) {
					return reject(err.message)
				}
				resolve(rows)
			})
		})		
	}

	close() {
		this._db.close((err) => {
			if (err) {
				console.error(err.message);
			}
			console.log('Close the database connection.');
		})
	}

}
