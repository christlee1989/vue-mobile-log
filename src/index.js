/**
 * Created by liyunfeng on 2017/8/2.
 */
import VlogComponent from './components/Vlog.vue'
import { mergeOptions } from './libs/utils'

let $vm

const plugin = {
    install (vue, options = {}) {
        const Vlog = vue.extend(VlogComponent)

        if (!$vm) {
            $vm = new Vlog({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        mergeOptions($vm, options)

        if(options.level){
            $vm.activeLevel = options.level;
        }

        const vlog = {
            debug(msg){
                $vm.debug(msg);
            },
            info(msg){
                $vm.info(msg);
            },
            warn(msg){
                $vm.warn(msg);
            },
            error(msg){
                $vm.error(msg);
            },
        }

        if (!vue.$vlog) {
            vue.$vlog = vlog
        }

        vue.mixin({
            created: function () {
                this.$vlog = vue.$vlog
            }
        })

        //registered global error handler
        vue.config.errorHandler = function (err, vm, info) {
            vm.$vlog.error(err.stack);
            console.error(err);
        }
        //registered global warn handler
        vue.config.warnHandler = function (msg, vm, trace) {
            vm.$vlog.warn(msg);
            console.warn(msg);
        }
    }
}

export default plugin
export const install = plugin.install

