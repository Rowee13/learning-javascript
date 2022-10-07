// const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } =
// 	Matter;

// const width = 800;
// const height = 600;

// //setting up the canvas area
// const engine = Engine.create();
// const { world } = engine;
// const render = Render.create({
// 	element: document.body,
// 	engine: engine,
// 	options: {
// 		wireframes: false,
// 		width,
// 		height,
// 	},
// });

// //renderer
// Render.run(render);
// Runner.run(Runner.create(), engine);

// World.add(
// 	world,
// 	MouseConstraint.create(engine, {
// 		mouse: Mouse.create(render.canvas),
// 	})
// );

// // //creating shapes
// // const shape = Bodies.rectangle(200, 200, 50, 50, {
// // 	isStatic: true,
// // });
// // //adding shapes to the canvas
// // World.add(world, shape);

// //walls
// const walls = [
// 	Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
// 	Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
// 	Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
// 	Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
// ];
// World.add(world, walls);

// //random shapes
// for (let i = 0; i < 40; i++) {
// 	if (Math.random() > 0.5) {
// 		World.add(
// 			world,
// 			Bodies.rectangle(
// 				Math.random() * width,
// 				Math.random() * height,
// 				50,
// 				50,
// 				{
// 					render: {
// 						fillStyle: "yellow  ",
// 					},
// 				}
// 			)
// 		);
// 	} else {
// 		World.add(
// 			world,
// 			Bodies.circle(Math.random() * width, Math.random() * height, 35, {
// 				render: {
// 					fillStyle: "teal",
// 				},
// 			})
// 		);
// 	}
// }

// World.add(world, Bodies.rectangle(200, 200, 50, 50));

//TODO: debug on random maze generation to make it a more complicated maze

const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;
const cellsHorizontal = 6;
const cellsVertical = 5;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

//setting up the canvas area
const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height,
	},
});

//renderer
Render.run(render);
Runner.run(Runner.create(), engine);

//border walls
const walls = [
	Bodies.rectangle(width / 2, 0, width, 5, {
		isStatic: true,
		render: { fillStyle: "red" },
	}),
	Bodies.rectangle(width / 2, height, width, 5, {
		isStatic: true,
		render: { fillStyle: "red" },
	}),
	Bodies.rectangle(0, height / 2, 5, height, {
		isStatic: true,
		render: { fillStyle: "red" },
	}),
	Bodies.rectangle(width, height / 2, 5, height, {
		isStatic: true,
		render: { fillStyle: "red" },
	}),
];
World.add(world, walls);

//maze generation
const shuffle = (arr) => {
	let counter = arr.length;

	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter--;
		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
	return arr;
};

const grid = Array(cellsVertical)
	.fill(null)
	.map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
	.fill(null)
	.map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
	.fill(null)
	.map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) => {
	//if the cell is visited at [row, column], then just return
	if (grid[row][column]) {
		return;
	}
	//mark this cell as being visited
	grid[row][column] = true;
	//Assemble randomly-orderend list of neighbord
	const neighbors = [
		[row - 1, column, "up"],
		[row, column + 1, "right"],
		[row + 1, column, "down"],
		[row, column - 1, "left"],
	];
	//for each neighbor...
	for (let neighbor of neighbors) {
		const [nextRow, nextColumn, direction] = neighbor;
		//See if that neighbor is our of bounds
		if (
			nextRow < 0 ||
			nextRow >= cellsVertical ||
			nextColumn < 0 ||
			nextColumn >= cellsHorizontal
		) {
			continue;
		}
		//if we have visited that neighbor, continue to next neighbor
		if (grid[nextRow][nextColumn]) {
			continue;
		}
		//remove wall from either horizontals or verticals
		if (direction === "left") {
			verticals[row][column - 1] = true;
		} else if (direction === "right") {
			verticals[row][column] = true;
		} else if (direction === "up") {
			horizontals[row - 1][column] = true;
		} else if (direction === "down") {
			horizontals[row][column] = true;
		}

		stepThroughCell(nextRow, nextColumn);
	}
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}
		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX / 2,
			rowIndex * unitLengthY + unitLengthY,
			unitLengthX,
			5,
			{
				label: "wall",
				isStatic: true,
				render: {
					fillStyle: "red",
				},
			}
		);
		World.add(world, wall);
	});
});

verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}
		const wall = Bodies.rectangle(
			columnIndex * unitLengthX + unitLengthX,
			rowIndex * unitLengthY + unitLengthY / 2,
			5,
			unitLengthY,
			{
				label: "wall",
				isStatic: true,
				render: {
					fillStyle: "red",
				},
			}
		);
		World.add(world, wall);
	});
});

//goal shape
const goal = Bodies.rectangle(
	width - unitLengthX / 2,
	height - unitLengthY / 2,
	unitLengthX * 0.7,
	unitLengthY * 0.7,
	{
		isStatic: true,
		label: "goal",
		render: {
			fillStyle: "magenta",
		},
	}
);
World.add(world, goal);

//ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
	label: "ball",
	render: {
		fillStyle: "cyan",
	},
});
World.add(world, ball);

document.addEventListener("keydown", (event) => {
	const { x, y } = ball.velocity;

	if (event.key === "w") {
		Body.setVelocity(ball, { x, y: y - 5 });
	}
	if (event.key === "d") {
		Body.setVelocity(ball, { x: y + 5, y });
	}
	if (event.key === "s") {
		Body.setVelocity(ball, { x, y: y + 5 });
	}
	if (event.key === "a") {
		Body.setVelocity(ball, { x: y - 5, y });
	}
});

//win condition
Events.on(engine, "collisionStart", (event) => {
	event.pairs.forEach((collision) => {
		const labels = ["ball", "goal"];

		if (
			labels.includes(collision.bodyA.label) &&
			labels.includes(collision.bodyB.label)
		) {
			document.querySelector(".winner").classList.remove("hidden");
			world.gravity.y = 1;
			world.bodies.forEach((body) => {
				if (body.label === "wall") {
					Body.setStatic(body, false);
				}
			});
		}
	});
});
