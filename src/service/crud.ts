import { Service } from "typedi";
import { FindManyOptions, FindOneOptions, MongoRepository } from "typeorm";
import { validate } from "class-validator";
import { ErrorHandler } from "../helper/error-handler";

@Service()
export class CRUD<Entity> {
    protected repo: MongoRepository<Entity>;

    constructor(repo: MongoRepository<Entity>) {
        this.repo = repo;
    }
    public getRepo(): MongoRepository<Entity> {
        return this.repo;
    }

    protected async fillObjectIdField(
        entity: Entity,
        fieldName: string,
        fieldEntityService: CRUD<any>,
    ): Promise<void> {
        const entityName = entity.constructor.name;
        if (!entity) throw new ErrorHandler(500, `${entityName} not found`);
        if (!(fieldName in entity))
            throw new ErrorHandler(
                500,
                `${fieldName} does not exist in ${entityName}`,
            );
        entity[fieldName] = await fieldEntityService.findOne(entity[fieldName]);
        if (!entity[fieldName]) {
            throw new ErrorHandler(500, `Invalid ${fieldName}`);
        }
    }

    public async create(entity: Entity, identifier?: string): Promise<Entity> {
        const errors = await validate(entity, {
            validationError: { target: false },
        });

        console.log(entity);
        const foundEntity =
            identifier &&
            (await this.repo.findOne({
                [identifier]: entity[identifier],
            }));
        if (foundEntity)
            throw new ErrorHandler(
                400,
                `The ${entity.constructor.name} already exists`,
            );
        console.log(errors);

        console.log(await this.repo.save(entity));

        if (errors.length > 0) throw errors;
        return await this.repo.save(entity);
    }

    async find(
        optionsOrConditions?: Partial<Entity> | FindManyOptions<Entity>,
    ): Promise<Entity[]> {
        const entities = await this.repo.find(optionsOrConditions);
        if (entities) {
            return entities;
        }
        throw new ErrorHandler(404, "Not found");
    }

    async findOne(
        options: string | FindOneOptions<Entity>,
    ): Promise<Entity | undefined> {
        const entity = await this.repo.findOne(options);
        if (entity) {
            return entity;
        }
        throw new ErrorHandler(404, "Not found");
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
