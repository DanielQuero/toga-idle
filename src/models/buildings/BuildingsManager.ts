import { ResourcesManager, type Resources } from '../resources/ResourcesManager'
import { House } from './House'
import { LumberCamp } from './LumberCamp'
import { Port } from './Port'
import { Warehouse } from './Warehouse'

export interface BuildingsList {
	houses: House[]
	lumberCamps: LumberCamp[]
	warehouses: Warehouse[]
	ports: Port[]
}

export interface BuildingsNumber {
	houses: number
	lumberCamps: number
	warehouses: number
	ports: number
}

export class BuildingsManager {
	private houses: House[]
	private lumberCamps: LumberCamp[]
	private warehouses: Warehouse[]
	private ports: Port[]
	private resourcesManager: ResourcesManager

	constructor(resourcesManager: ResourcesManager) {
		this.houses = []
		this.lumberCamps = []
		this.warehouses = []
		this.ports = []
		this.resourcesManager = resourcesManager
	}

	// < Houses >
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
	// </ Houses >

	// < LumberCamp >
	buyLumberCamp(): void {
		const lumberCamp = new LumberCamp(this)
		if (lumberCamp.build(this.resourcesManager)) {
			this.lumberCamps.push(lumberCamp)
		}
	}

	calculateNextLumberCampCost(): Resources {
		const lumberCamp = new LumberCamp(this)

		return lumberCamp.calculateCost()
	}

	canBuyNextLumberCamp(): boolean {
		const lumberCamp = new LumberCamp(this)

		return this.resourcesManager.canAfford(lumberCamp.calculateCost())
	}
	// </ LumberCamp >

	// < Jobs >
	isLumberjackJobAvailable(): boolean {
		return this.getBuildings().lumberCamps.length > 0
	}

	isFisherJobAvailable(): boolean {
		return this.getBuildings().ports.length > 0
	}

	isAnyJobAvailable(): boolean {
		return this.isLumberjackJobAvailable() || this.isFisherJobAvailable()
	}
	// </ Jobs >

	// < Warehouse >
	buyWarehouse(): void {
		const warehouse = new Warehouse(this)
		if (warehouse.build(this.resourcesManager)) {
			this.warehouses.push(warehouse)
		}
	}

	calculateNextWarehouseCost(): Resources {
		const warehouse = new Warehouse(this)

		return warehouse.calculateCost()
	}

	canBuyNextWarehouse(): boolean {
		const warehouse = new Warehouse(this)

		return this.resourcesManager.canAfford(warehouse.calculateCost())
	}
	// </ Warehouse >

	// < Port >
	buyPort(): void {
		const port = new Port(this)
		if (port.build(this.resourcesManager)) {
			this.ports.push(port)
		}
	}

	calculateNextPortCost(): Resources {
		const port = new Port(this)

		return port.calculateCost()
	}

	canBuyNextPort(): boolean {
		const port = new Port(this)

		return this.resourcesManager.canAfford(port.calculateCost())
	}
	// </ Port >

	getBuildings(): BuildingsList {
		return {
			houses: this.houses,
			lumberCamps: this.lumberCamps,
			warehouses: this.warehouses,
			ports: this.ports,
		}
	}

	getBuildingsNumber(): BuildingsNumber {
		return {
			houses: this.houses.length,
			lumberCamps: this.lumberCamps.length,
			warehouses: this.warehouses.length,
			ports: this.ports.length,
		}
	}
}
