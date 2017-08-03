## Screenshot
![](https://github.com/christlee1989/vue-mobile-log/blob/master/screenshot/screenshot.png)  

## Requirements

+ vue@^2.3.0

## Docs

+ 中文文档(建设中)
+ English(working)

## Quick Start

**1.in project path:**
``` bash
npm install vue-mobile-log
```

**2.import:**
``` bash
import Vlog from 'vue-mobile-log'
Vue.use(Vlog);
//or
Vue.use(Vlog,options)
```

options:
```bash
{
    env:'development',//when production does not open the console
    level:'debug' //debug,info,warn,error
}
```

**3.print log:**
```bash
global call:
Vue.$vlog.debug(logMsg);
Vue.$vlog.info(logMsg);
Vue.$vlog.warn(logMsg);
Vue.$vlog.error(logMsg);
 
in component:
this.$vlog.debug(logMsg);
this.$vlog.info(logMsg);
this.$vlog.warn(logMsg);
this.$vlog.error(logMsg);
```


## License

MIT

