import { ResourcesManager, type Resources } from '../resources/ResourcesManager'

export abstract class Building {
	baseCost: Resources
	costMultiplier: number
	name: string

	constructor(baseCost: Resources, costMultiplier: number, name: string) {
		this.baseCost = baseCost
		this.costMultiplier = costMultiplier
		this.name = name
	}

	abstract countOwned(): number

	calculateCost(): Resources {
		const woodCost = Math.round((this.baseCost.wood || 0) * Math.pow(this.costMultiplier, this.countOwned()))
		const foodCost = Math.round((this.baseCost.food || 0) * Math.pow(this.costMultiplier, this.countOwned()))

		return { wood: woodCost, food: foodCost }
	}

	build(resourcesManager: ResourcesManager): boolean {
		const cost = this.calculateCost()

		if (resourcesManager.canAfford(cost)) {
			resourcesManager.updateResources(cost)

			return true
		} else {
			return false
		}
	}
}
