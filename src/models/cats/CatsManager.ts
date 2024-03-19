import type { BuildingsManager } from '../buildings/BuildingsManager'
import type { Resources, ResourcesManager } from '../resources/ResourcesManager'

export interface CatsList {
	cats: number
	maxCats: number
}

export class CatsManager {
	private cats: number
	private baseCatCost = { food: 4 }
	private costMultiplier = 2
	private resourcesManager: ResourcesManager
	private buildingsManager: BuildingsManager

	constructor(resourcesManager: ResourcesManager, buildingsManager: BuildingsManager) {
		this.cats = 0
		this.resourcesManager = resourcesManager
		this.buildingsManager = buildingsManager
	}

	calculateNextCatCost(): Resources {
		const foodCost = Math.round((this.baseCatCost.food || 0) * Math.pow(this.costMultiplier, this.totalCatsNumber()))
		const emptySpaceNeeded = 1

		return { food: foodCost, freeHouse: emptySpaceNeeded }
	}

	canAttractNextCat(): boolean {
		return this.totalCatsNumber() < this.getMaxCats() && this.resourcesManager.canAfford(this.calculateNextCatCost())
	}

	getNewCat() {
		if (this.totalCatsNumber() < this.getMaxCats()) {
			const catCost = this.calculateNextCatCost()
			if (this.resourcesManager.canAfford(catCost)) {
				this.addNewCat()
				this.resourcesManager.updateResources(catCost)
			}
		}
	}

	getFreeHousingSpace(): number {
		return this.getMaxCats() - this.totalCatsNumber()
	}

	totalCatsNumber(): number {
		return this.cats
	}

	addNewCat(): void {
		this.cats += 1
	}

	getCats(): CatsList {
		return {
			cats: this.cats,
			maxCats: this.getMaxCats(),
		}
	}

	getMaxCats() {
		return this.buildingsManager.getBuildings().houses.length
	}
}
