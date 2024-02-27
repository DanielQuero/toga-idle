interface ResourcesList {
	wood: number
	maxWood: number
	food: number
	maxFood: number
}

export class Game {
	private food: number
	private wood: number
	private maxWood: number
	private maxFood: number

	constructor(initialFood: number, maxBaseWood: number, initialWood: number, maxBaseFood: number) {
		this.food = initialFood
		this.maxWood = maxBaseWood
		this.wood = initialWood
		this.maxFood = maxBaseFood
	}

	colectFood(): void {
		if (this.food < this.maxFood) {
			this.food += 1
		}
	}

	colectWood(): void {
		if (this.wood < this.maxWood) {
			this.wood += 1
		}
	}

	getResources(): ResourcesList {
		return {
			wood: this.wood,
			maxWood: this.maxWood,
			food: this.food,
			maxFood: this.maxFood,
		}
	}
}
