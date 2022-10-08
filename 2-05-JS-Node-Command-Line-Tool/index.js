#!/usr/bin/env node

//nodeJS API
// const fs = require("fs");
import fs from "fs";
// const util = require("util");

//option 2
// const lstat = util.promisify(fs.lstat);

//option 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

import path from "path";

// const chalk = require("chalk");
import chalk from "chalk";

fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	}
	//Identify if content is a file
	//BAD CODE IMPLEMENTATION - may cause shuffle files in other devices
	// for (let filename of filenames) {
	// 	fs.lstat(filename, (err, stats) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}

	// 		console.log(filename, stats.isFile());
	// 	});
	// }

	//REFACTORED 1
	// const allStats = Array(filenames.length).fill(null);

	// for (let filename of filenames) {
	// 	const index = filenames.indexOf(filename);

	// 	fs.lstat(filename, (err, stats) => {
	// 		if (err) {
	// 			console.log(err);
	// 		}

	// 		allStats[index] = stats;

	// 		const ready = allStats.every((stats) => {
	// 			return stats;
	// 		});

	// 		if (ready) {
	// 			allStats.forEach((stats, index) => {
	// 				console.log(filename[index], stats.isFile());
	// 			});
	// 		}
	// 	});
	// }

	//REFACTORED 2 - option 1
	// const lstat = (filename) => {
	// 	return new Promise((resolve, reject) => {
	// 		fs.lstat(filename, (err, stats) => {
	// 			if (err) {
	// 				reject(err);
	// 			}

	// 			resolve(stats);
	// 		});
	// 	});
	// };
	//option 2
	// for (let filename of filenames) {
	// 	try {
	// 		const stats = await lstat(filename);

	// 		console.log(filename, stats.isFile());
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	//REFACTORED 3 - best solution
	const statPromises = filenames.map((filename) => {
		return lstat(path.join(targetDir, filename));
	});

	const allStats = await Promise.all(statPromises);

	for (let stats of allStats) {
		const index = allStats.indexOf(stats);

		if (stats.isFile()) {
			console.log(filenames[index]);
		} else {
			console.log(chalk.bold.cyan(filenames[index]));
		}
	}
});
