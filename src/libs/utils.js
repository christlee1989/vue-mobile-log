/**
 * Created by liyunfeng on 2017/8/2.
 */
const mergeOptions = function ($vm, options) {
    const defaults = {}
    for (let i in $vm.$options.props) {
        if (i !== 'value') {
            defaults[i] = $vm.$options.props[i].default
        }
    }
    const _options = Object.assign({}, defaults, options)
    for (let i in _options) {
        $vm[i] = _options[i]
    }
}

export {
    mergeOptions
}
