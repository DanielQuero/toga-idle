import { formatNumber } from '@/utils/formatters/formatters'
import type { BuildingsManager } from '../buildings/BuildingsManager'
import type { Resources, ResourcesManager, ResourcesType } from '../resources/ResourcesManager'

export enum JobsEnum {
	UNEMPLOYED = 'unemployed',
	LUMBERJACK = 'lumberjack',
	FISHER = 'fisher',
}

export type Jobs = JobsEnum.UNEMPLOYED | JobsEnum.UNEMPLOYED | JobsEnum.FISHER

export interface JobResourceRates {
	unemployed?: Resources
	lumberjack?: Resources
	fisher?: Resources
}

export interface CatsByJobs {
	unemployed: number
	lumberjack?: number
	fisher?: number
}

export interface CatsList {
	totalCats: number
	maxCats: number
	jobs: CatsByJobs
}

export class CatsManager {
	private cats: CatsByJobs
	private baseCatCost = { food: 2 }
	private baseJobResourcesCollection = {
		unemployed: {},
		lumberjack: { wood: 0.2 },
		fisher: { food: 0.1 },
	}
	private costMultiplier = 2
	private resourcesManager: ResourcesManager
	private buildingsManager: BuildingsManager

	constructor(resourcesManager: ResourcesManager, buildingsManager: BuildingsManager) {
		this.cats = { unemployed: 0, lumberjack: 0, fisher: 0 }
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
		return this.cats.unemployed + (this.cats.lumberjack || 0) + (this.cats.fisher || 0)
	}

	addNewCat(): void {
		this.cats.unemployed += 1
	}

	changeCatJob(originalJob: Jobs, newJob: Jobs) {
		const originalJobWorkers = this.cats[originalJob] || 0

		if (originalJobWorkers >= 1) {
			this.cats[originalJob] -= 1
			this.cats[newJob] += 1
		}
	}

	resourcesCollectedByJob(): JobResourceRates {
		const resourcesCollectedPerLumberjack = this.baseJobResourcesCollection.lumberjack
		const resourcesCollectedPerFisher = this.baseJobResourcesCollection.fisher

		return {
			unemployed: {},
			lumberjack: resourcesCollectedPerLumberjack,
			fisher: resourcesCollectedPerFisher,
		}
	}

	resourcesCollectedEveryTick(): Resources {
		const resourcesCollectedbyJob: JobResourceRates = this.resourcesCollectedByJob()

		const totalResourcesCollected: Resources = Object.entries(resourcesCollectedbyJob).reduce(
			(resourcesCollected, [job, resourcesCollectedByWorker]) => {
				const workers = this.getCats().jobs[job as Jobs] || 0

				for (const [resource, amount] of Object.entries(resourcesCollectedByWorker)) {
					const resourceCollected = resource as ResourcesType
					const amountCollected = amount as number
					resourcesCollected[resourceCollected] = formatNumber(
						(resourcesCollected[resourceCollected] || 0) + amountCollected * workers,
					)
				}

				return resourcesCollected
			},
			{} as Resources,
		)

		return totalResourcesCollected
	}

	getCats(): CatsList {
		const catsList: CatsList = {
			totalCats: this.totalCatsNumber(),
			maxCats: this.getMaxCats(),
			jobs: {
				unemployed: this.cats.unemployed,
			},
		}

		if (this.buildingsManager.isLumberjackJobAvailable()) {
			catsList.jobs.lumberjack = this.cats.lumberjack || 0
		}
		if (this.buildingsManager.isFisherJobAvailable()) {
			catsList.jobs.fisher = this.cats.fisher || 0
		}

		return catsList
	}

	getMaxCats() {
		return this.buildingsManager.getBuildings().houses.length
	}
}
