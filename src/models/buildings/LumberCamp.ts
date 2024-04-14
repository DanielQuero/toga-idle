import { Building } from './Building'
import type { ResourcesManager } from '../resources/ResourcesManager'
import type { BuildingsManager } from './BuildingsManager'

export class LumberCamp extends Building {
	constructor(private buildingsManager: BuildingsManager) {
		super({ wood: 10, food: 5 }, 2, 'Aserradero')
	}

	build(resourcesManager: ResourcesManager): boolean {
		return super.build(resourcesManager)
	}

	countOwned(): number {
		return this.buildingsManager.getBuildings().lumberCamps?.length || 0
	}
}
