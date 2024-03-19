import { BuildingsManager } from './buildings/BuildingsManager'
import { ResourcesManager } from './resources/ResourcesManager'
import { CatsManager } from './cats/CatsManager'

export class Game {
	resourcesManager: ResourcesManager
	buildingsManager: BuildingsManager
	catsManager: CatsManager

	constructor(initialFood: number, maxBaseWood: number, initialWood: number, maxBaseFood: number) {
		this.resourcesManager = new ResourcesManager(initialWood, maxBaseWood, initialFood, maxBaseFood)
		this.buildingsManager = new BuildingsManager(this.resourcesManager)
		this.resourcesManager.setBuildingsManager(this.buildingsManager)
		this.catsManager = new CatsManager(this.resourcesManager, this.buildingsManager)
	}
}
