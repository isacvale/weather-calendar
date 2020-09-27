import { action, observable } from 'mobx'

// Data structure
const data = {

}

// Store creation
const store = observable({
    data,
    testMethod () {
        console.log('this: ', this)
    }
}, {
    testMethod: action.bound
})

export default store