<template>
    <div class="vlog-container" v-if="env === 'development'">
        <transition name="fade-in">
            <div class="mask" v-show="show" @click="close"></div>
        </transition>
        <div class="log-box" :class="{close:!show}">
            <div class="arrow" @click="show = !show">
                <img :class="{down:show}" src="../assets/arrow.png">
            </div>
            <div class="title">
                <img class="logo" src="../assets/vlog.png">
                <div class="navbar" style="padding-right:10px;" @click="clearLog">
                    <img src="../assets/clear.png">
                </div>
                <div class="navbar" :class="{active:lev === activeLevel}" v-if="showNavbar(lev)" style="font-size:12px;" v-for="lev in levels" @click="activeLevel = lev">
                    {{lev.toUpperCase()}}
                </div>
            </div>
            <div class="content">
                <div class="scroll">
                    <p class="log" :class="logClass(log.level)" v-for="log in logData" v-show="isShow(log.level)">
                        {{log.msg}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logger from '../libs/logger.js'

    const levelWeights = {
        [Logger.DEBUG]:0,
        [Logger.INFO]:1,
        [Logger.WARN]:2,
        [Logger.ERROR]:3,
    }

    export default {
        name: 'VLog',
        props:{
            env:{
                type:String,
                default:'development'
            },
            level:{
                type:String,
                default:Logger.DEBUG
            }
        },
        data () {
            return {
                title: 'Vlog',
                show:true,
                logData:[],
                levels:[
                    Logger.ERROR,
                    Logger.WARN,
                    Logger.INFO,
                    Logger.DEBUG
                ],
                activeLevel:this.level
            }
        },
        methods:{
            close(){
                this.show = false;
            },
            clearLog(){
                this.logData = [];
            },
            isShow(level){
                return levelWeights[level] >= levelWeights[this.activeLevel]
            },
            showNavbar(level){
                return levelWeights[level] >= levelWeights[this.level]
            },
            logClass(level){
                return {
                    debug:level === Logger.DEBUG,
                    info:level === Logger.INFO,
                    warn:level === Logger.WARN,
                    error:level === Logger.ERROR,
                }
            },
            _print(level,msg){
                if(this.env === 'development' && (levelWeights[level] >= levelWeights[this.level])){
                    this.logData.push({
                        level,
                        msg,
                        timestamp:new Date().getTime()
                    });
                }
            },
            debug(msg){
                this._print(Logger.DEBUG,msg)
            },
            info(msg){
                this._print(Logger.INFO,msg)
            },
            warn(msg){
                this._print(Logger.WARN,msg)
            },
            error(msg){
                this._print(Logger.ERROR,msg)
            }
        }
    }
</script>

<style scoped lang="scss">

    .vlog-container{
        box-sizing:border-box;

        *{
            box-sizing:border-box;
        }

        .mask{
            position:fixed;
            width:100%;
            height:100%;
            top:0;
            left:0;
            background-color:#000;
            opacity: 0.5;
            z-index:301;

            &.fade-in-enter,&.fade-in-leave-to{
                 opacity:0;
            }

            &.fade-in-enter-active,&.fade-in-leave-active{
                transition:opacity .3s;
            }

        }

        .log-box{
            position:fixed;
            width:100%;
            height:365px;
            bottom:0;
            left:0;
            background-color:#fff;
            z-index:310;
            transition:bottom .3s;

            &.close{
                 bottom:-365px;
             }

            .arrow{
                position:absolute;
                width:80px;
                height:20px;
                display:flex;
                justify-content:center;
                align-items:center;
                z-index:310;
                left:50%;
                margin-left:-40px;
                top:-20px;
                background-color:#fff;
                border-top-left-radius:5px;
                border-top-right-radius:5px;
                border:1px solid #ccc;
                border-bottom:none;

                img{
                    display:inline-block;
                    height:14px;
                    width:auto;
                    transition:transform .3s;

                    &.down{
                         transform:rotate(180deg);
                     }
                }
            }

            .title{
                height:50px;
                line-height:50px;
                position:absolute;
                top:0;
                left:0;
                z-index:1;
                width:100%;
                color:#818181;
                font-size:15px;
                text-align:center;
                border-bottom:1px solid #ddd;

                .logo{
                    position:absolute;
                    display:inline-block;
                    height:22px;
                    left:10px;
                    top:50%;
                    margin-top:-11px;
                }

                .navbar{
                    padding:0 5px;
                    float:right;
                    line-height:50px;
                    font-size:0;

                    &.active{
                        color:#009a61
                     }

                    img{
                        display:inline-block;
                        width:18px;
                        height:18px;
                        vertical-align: middle;
                    }
                }
            }

            .content{
                width:100%;
                height:100%;
                padding-top:50px;
                position:relative;

                .scroll{
                    height:100%;
                    overflow:auto;
                    padding-bottom:5px;
                }

                .log{
                    font-size:12px;
                    color:#666;
                    margin:5px 0 0 0;
                    padding-left:20px;
                    position:relative;
                    /*line-height:18px;*/

                    &.debug{

                    }
                    &.info{
                        color:#31708f;
                    }
                    &.warn{
                        background-color:#fcf8e3;
                        color:#8a6d3b;

                        &:before{
                            content:' ';
                            position:absolute;
                            left:4px;
                            top:50%;
                            margin-top:-6px;
                            background:url(../assets/warn.png) center no-repeat;
                            background-size:12px 12px;
                            display:inline-block;
                            width:12px;
                            height:12px;
                         }
                    }
                    &.error{
                        background-color:#f2dede;
                        color:#a94442;

                        &:before{
                             content:' ';
                             position:absolute;
                             left:4px;
                             top:50%;
                             margin-top:-6px;
                             background:url(../assets/error.png) center no-repeat;
                             background-size:12px 12px;
                             display:inline-block;
                             width:12px;
                             height:12px;
                         }
                    }
                }
            }
        }
    }

</style>
