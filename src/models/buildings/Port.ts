import { Building } from './Building'
import type { ResourcesManager } from '../resources/ResourcesManager'
import type { BuildingsManager } from './BuildingsManager'

export class Port extends Building {
	constructor(private buildingsManager: BuildingsManager) {
		super({ wood: 25, food: 20 }, 2, 'Puerto')
	}

	build(resourcesManager: ResourcesManager): boolean {
		return super.build(resourcesManager)
	}

	countOwned(): number {
		return this.buildingsManager.getBuildings().ports?.length || 0
	}
}
