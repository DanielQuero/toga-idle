import { formatNumber } from '@/utils/formatters/formatters'
import type { BuildingsManager } from '../buildings/BuildingsManager'
import type { CatsManager, JobResourceRates } from '../cats/CatsManager'
import type { Jobs } from '../cats/CatsManager'

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

export type ResourcesType = 'wood' | 'food' | 'freeHouse'

export class ResourcesManager {
	private wood: number
	private food: number
	private maxWood: number
	private maxFood: number
	private buildingsManager: BuildingsManager | undefined
	private catsManager: CatsManager | undefined

	constructor(initialFood: number, maxBaseWood: number, initialWood: number, maxBaseFood: number) {
		this.food = initialFood
		this.maxWood = maxBaseWood
		this.wood = initialWood
		this.maxFood = maxBaseFood
	}

	setBuildingsManager(buildingsManager: BuildingsManager): void {
		this.buildingsManager = buildingsManager
	}

	setCatsManager(catsManager: CatsManager): void {
		this.catsManager = catsManager
	}

	canAfford(cost: Resources): boolean {
		if (cost.wood !== undefined && this.wood < cost.wood) return false
		if (cost.food !== undefined && this.food < cost.food) return false

		return true
	}

	updateResources(cost: Resources): void {
		if (cost.wood) this.wood = formatNumber(this.wood - cost.wood)
		if (cost.food) this.food = formatNumber(this.food - cost.food)
	}

	addResources(resourcesToAdd: Resources): void {
		if (resourcesToAdd.wood !== undefined) {
			this.wood = formatNumber(Math.min(this.wood + resourcesToAdd.wood, this.getMaxWood()))
		}
		if (resourcesToAdd.food !== undefined) {
			this.food = formatNumber(Math.min(this.food + resourcesToAdd.food, this.getMaxFood()))
		}
	}

	collectFood(foodCollected: number = 1): void {
		if (this.food < this.getMaxFood()) {
			this.food += foodCollected
		}
	}

	collectWood(woodCollected: number = 1): void {
		if (this.wood < this.getMaxWood()) {
			this.wood += woodCollected
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

	addResourcesCollected() {
		const resourcesCollectedbyJob: JobResourceRates = this.catsManager?.resourcesCollectedByJob() || {}

		const totalResourcesCollected: Resources = Object.entries(resourcesCollectedbyJob).reduce(
			(resourcesCollected, [job, resourcesCollectedByWorker]) => {
				const workers = this.catsManager?.getCats().jobs[job as Jobs] || 0

				for (const [resource, amount] of Object.entries(resourcesCollectedByWorker)) {
					const resourceCollected = resource as ResourcesType
					const amountCollected = amount as number
					resourcesCollected[resourceCollected] =
						(resourcesCollected[resourceCollected] || 0) + amountCollected * workers
				}

				return resourcesCollected
			},
			{} as Resources,
		)

		this.addResources(totalResourcesCollected)
	}

	private getMaxWood(): number {
		const totalWarehouses = this.buildingsManager?.getBuildingsNumber().warehouses || 0
		const extraSpace = totalWarehouses * 15

		return this.maxWood + extraSpace
	}

	private getMaxFood(): number {
		const totalWarehouses = this.buildingsManager?.getBuildingsNumber().warehouses || 0
		const extraSpace = totalWarehouses * 15

		return this.maxFood + extraSpace
	}
}
