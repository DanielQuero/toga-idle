export interface ResourcesList {
	wood: number
	maxWood: number
	food: number
	maxFood: number
}

export interface Resources {
	wood?: number
	food?: number
	freeHouse?: number
}

export class ResourcesManager {
	private wood: number
	private food: number
	private maxWood: number
	private maxFood: number

	constructor(initialFood: number, maxBaseWood: number, initialWood: number, maxBaseFood: number) {
		this.food = initialFood
		this.maxWood = maxBaseWood
		this.wood = initialWood
		this.maxFood = maxBaseFood
	}

	canAfford(cost: Resources): boolean {
		if (cost.wood !== undefined && this.wood < cost.wood) return false
		if (cost.food !== undefined && this.food < cost.food) return false

		return true
	}

	updateResources(cost: Resources): void {
		if (cost.wood) this.wood -= cost.wood
		if (cost.food) this.food -= cost.food
	}

	collectFood(): void {
		if (this.food < this.maxFood) {
			this.food += 1
		}
	}

	collectWood(): void {
		if (this.wood < this.maxWood) {
			this.wood += 1
		}
	}

	getResources(): ResourcesList {
		return {
			wood: this.wood,
			maxWood: this.getMaxWood(),
			food: this.food,
			maxFood: this.getMaxFood(),
		}
	}

	private getMaxWood(): number {
		return this.maxWood
	}

	private getMaxFood(): number {
		return this.maxFood
	}
}
