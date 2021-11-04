import { reactive, readonly } from 'vue'

export default class BaseStore {
    _initialState
    _state

    constructor (state) {
        this._initialState = state
        this._state = reactive(JSON.parse(JSON.stringify(this._initialState)))
    }

    getState () {
        return readonly(this._state)
    }

    reset () {
        const clone = JSON.parse(JSON.stringify(this._initialState))
        for (const key in clone) this._state[key] = clone[key]
    }

    getWritableState () {
        return this._state
    }
}
