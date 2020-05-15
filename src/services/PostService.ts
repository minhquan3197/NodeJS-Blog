import BaseService from '../Base';
import Models from '../../db/models';

class ProductService extends BaseService {
    private static instance: ProductService;

    private model: typeof Models.ProductModel;

    private constructor() {
        super();
        this.model = Models.ProductModel;
    }

    public static get getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    public async get(conditions: any): Promise<any[]> {
       
    }
}

export default ProductService.getInstance;
