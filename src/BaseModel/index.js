export default class BaseModel {
    constructor (store) {
        this.store = new store()
        this.fetchPromise = null
    }

    getState () {
        return this.store.getState()
    }

    fetch () {
        return Promise.resolve()
    }

    _fetch (...args) {
        this.fetchPromise = this.fetch(...args)
            .catch((error) => {
                this.fetchPromise = null
                throw error
            })

        return this.fetchPromise
    }

    validateCache () {
        return true
    }

    load (...args) {
        const isCacheStale = this.validateCache(...args)

        return (isCacheStale || !this.fetchPromise)
            ? this._fetch(...args)
            : this.fetchPromise
    }

    forceLoad (...args) {
        this._fetch(...args)
    }

    reset () {
        return this.store.reset()
    }
}
