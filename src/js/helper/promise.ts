
export class createCatchPromise {
    public oldPromise;

    /**
     * 
     * @param oldPromise 原始Promise
     * @param onrejected 默认catch
     */
    constructor(oldPromise,defaultCatch: ((reason) =>)) {
        this.oldPromise = oldPromise;

        const methods = ['then', 'catch', 'finally']
        for (const method of methods) {
            this[method] = function (...args) {
                this.oldPromise = this.oldPromise[method](...args)
                return this
            }
        }
        Promise.resolve().then(() => {
            return this.oldPromise;
        }).catch(defaultCatch);
    }
}; 
