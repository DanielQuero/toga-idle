import { ResourcesManager, type Resources } from '../resources/ResourcesManager'
import { House } from './House'

export interface BuildingsList {
	houses: House[]
}

export interface BuildingsNumber {
	houses: number
}

export class BuildingsManager {
	private houses: House[]
	private resourcesManager: ResourcesManager

	constructor(resourcesManager: ResourcesManager) {
		this.houses = []
		this.resourcesManager = resourcesManager
	}

	buyHouse(): void {
		const house = new House(this)
		if (house.build(this.resourcesManager)) {
			this.houses.push(house)
		}
	}

	calculateNextHouseCost(): Resources {
		const house = new House(this)

		return house.calculateCost()
	}

	canBuyNextHouse(): boolean {
		const house = new House(this)

		return this.resourcesManager.canAfford(house.calculateCost())
	}

	getBuildings(): BuildingsList {
		return {
			houses: this.houses,
		}
	}

	getBuildingsNumber(): BuildingsNumber {
		return {
			houses: this.houses.length,
		}
	}
}
