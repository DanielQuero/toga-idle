import { Building } from './Building'
import type { ResourcesManager } from '../resources/ResourcesManager'
import type { BuildingsManager } from './BuildingsManager'

export class Warehouse extends Building {
	constructor(private buildingsManager: BuildingsManager) {
		super({ wood: 20, food: 10 }, 2, 'Warehouse')
	}

	build(resourcesManager: ResourcesManager): boolean {
		return super.build(resourcesManager)
	}

	countOwned(): number {
		return this.buildingsManager.getBuildings().warehouses?.length || 0
	}
}
