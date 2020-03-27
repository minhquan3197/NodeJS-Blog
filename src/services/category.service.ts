import { Category } from '../models/category.model';

export class CategoryService {
    constructor() {}

    /**
     * This is function get all category
     */
    static async list(): Promise<any> {
        return await Category.find({}).exec();
    }

    /**
     * This is function create category
     * @param data
     */
    static async create(data: object): Promise<any> {
        return await Category.create(data);
    }

    /**
     * This is function remove category
     * @param id
     */
    static async remove(id: string): Promise<any> {
        return await Category.findOneAndRemove({ _id: id }).exec();
    }

    /**
     * This is function update category
     * @param id
     * @param data
     */
    static async update(id: string, data: object): Promise<any> {
        return await Category.findOneAndUpdate({ _id: id }, data).exec();
    }

    /**
     * This is function get detail category
     * @param id
     */
    static async detail(id: string): Promise<any> {
        return await Category.findById(id).exec();
    }

    /**
     * This is function check exists blog in category
     * @param id
     */
    static async checkExistsPopulate(id: string): Promise<any> {
        const result = Category.findById(id).populate([
            { path: 'blog', select: '_id', options: { limit: 1 } },
        ]);
        console.log(result);
        return result;
    }
}
