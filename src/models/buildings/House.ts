import { Building } from './Building'
import { ResourcesManager } from '../resources/ResourcesManager'
import type { BuildingsManager } from './BuildingsManager'

export class House extends Building {
	constructor(private buildingsManager: BuildingsManager) {
		super({ wood: 5, food: 2 }, 1.5, 'house')
	}

	build(resourcesManager: ResourcesManager): boolean {
		return super.build(resourcesManager)
	}

	countOwned(): number {
		return this.buildingsManager.getBuildings().houses?.length || 0
	}
}
