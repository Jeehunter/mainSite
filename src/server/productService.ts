
import { EventEmitter } from '../common/event';
import * as zh_JSON from '../ci/product.json';

export class ProductService {
    private static productService: ProductService = new ProductService();
    private _onDidChangeProduct = new EventEmitter();
    public onDidChangeProduct = this._onDidChangeProduct.asSubscriber('onDidChangeProduct');
    private _productMap: Map<string, string>;

    private constructor() {
        this._productMap = new Map();
        for (const key in zh_JSON) {
            if (!Object.hasOwnProperty.call(zh_JSON, key) || key === 'default') {
                continue;
            }
            this._productMap.set(key, zh_JSON[key as keyof object]);
        }
    }

    public getProductBy(id: string, defaultValue?: string): string {
        return  this._productMap.has(id) ? this._productMap.get(id) : defaultValue;
    }

    public static getInstance() {
        return ProductService.productService;
    }
}
