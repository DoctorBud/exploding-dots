import { EventEmitter } from 'events';
/*import assign from 'object-assign';*/
import {DOTS} from '../constants/DotsConstants';
const CHANGE_EVENT = 'change';

class DotsStore extends EventEmitter {


    constructor(dispatcher, state){

        super();

        this.setMaxListeners(20);

        if (!dispatcher) {      console.error(new Error('Store: dispatcher is required'));    }
        if (state) {            console.error('app is created with initial state', state);    }

        this.state = {
            base : 2 ,
            dots : [ [], [], [], [], [] ],
            dotsPositions: [[], [], [], [], []],
            negativeDots : [ [], [], [], [], [] ],
            negativeDotsPositions: [[], [], [], [], []],
            nbContainers : 5,
            containerWidth : 300,
            containerHeight : 400,
            dotsRayon : 22,
            dotsCount: 0,
            negativeDotsCount : 0,
            dotsNum: "?",
            unstable: false,
            maxViewableDots: 150,
            mode: DOTS.DISPLAY
        };

        var _this = this;

        // Register handlers
        dispatcher.register(function (action) {

            switch(action.actionType){
                case DOTS.BASE_CHANGED:
                    _this.changeBase();
                    break;

                case DOTS.DOTS_CHANGED:
                    if(action.hasOwnProperty("newdot")){
                        _this.state.dots[action.index].push(action.newdot);
                    }else{
                        _this.state.dots[action.index] = _this.updateDotsArray(_this.state.dots[action.index], action.value);
                    }
                    break;

                case DOTS.DOT_REMOVED:
                    _this.removeDots(action.zoneIndex, action.nbDots, action.dotIndex, action.style);
                    break;

                case DOTS.DOT_ADDED:
                    _this.addDots(action.zoneIndex, action.nbDots, action.newdot, true);
                    break;

                case DOTS.DOT_NEGATIVE_ADDED:
                    _this.addDots(action.zoneIndex, action.nbDots, action.newdot, false);
                    break;

                case DOTS.ONE_STEP_STABILIZE:
                    _this.oneStepStabilize();
                    break;

                case DOTS.STABILIZE:
                    _this.stablize();
                    break;

                case DOTS.CLEAR:
                    _this.clearDots();
                    break;

                default:
                    break;
            }

            _this.setDotsCount();
            _this.setDotsNum();
            _this.setNegativeDotsNum();
            _this.emitChange();

        });

    }

    setDotsCount(){
        let dotsCount = 0;
        let col = 0;

        for(let dot of this.state.dots){
            dotsCount += dot.length * Math.pow(this.state.base,col);
            col++;
        }
        this.state.dotsCount = dotsCount;


        // negative
        dotsCount = 0;
        col = 0;

        for(let dot of this.state.negativeDots){
            dotsCount += dot.length * Math.pow(this.state.base,col);
            col++;
        }
        this.state.negativeDotsCount = dotsCount;
    }

    setDotsNum(){
        let dotsNum = "";
        this.state.unstable = false;

        for(let dot of this.state.dots){
            dotsNum = String(dot.length)+dotsNum;
            if(dot.length >= this.state.base && !this.state.unstable) this.state.unstable = true;
        }
        this.state.dotsNum = parseInt(dotsNum, 10);
        if(String(parseInt(this.state.dotsNum, 10))==="NaN" || parseInt(this.state.dotsNum, 10) === 0) this.state.dotsNum = "?";
    }

    setNegativeDotsNum(){
        let dotsNum = "";
        for(let dot of this.state.negativeDots){
            dotsNum = String(dot.length)+dotsNum;
            if(!this.state.unstable) this.state.unstable = true;
        }
        this.state.dotsNum = parseInt(dotsNum, 10);
        if(String(parseInt(this.state.dotsNum, 10))==="NaN" || parseInt(this.state.dotsNum, 10) === 0) this.state.dotsNum = "?";
    }

    changeBase(){
        let bases = [2, 3, 4, 5, 10, 12];
        let next = false;
        for (let base of bases) {
            if(this.state.base < base && !next) next = base;
        }
        if(next === false) next = bases[0];
        this.state.base = next;
    }

    setBase(base){
        this.state.base = base;
    }

    setMode(mode){
        this.state.mode = mode;
    }

    clearDots(){
        this.state.dots = [ [], [], [], [], [] ];
        this.state.dotsRayon = 25;
        this.state.dotsCount = 0;
        this.state.dotsNum = "?";
        this.state.unstable = false;
    }

    stablize(){

        var dots = this.state.dots;
        var base = this.state.base;
        var _this = this;

        dots.splice(this.state.nbContainers);

        dots.forEach(function(dot, index){

            if(dots.length <= index+1){
                dots.push([]);
            }

            dots[index+1] = _this.updateDotsArray(dots[index+1], dots[index+1].length + Math.floor(dot.length / base));
            dots[index] = _this.updateDotsArray(dots[index], dot.length % base);
        });
    }


    oneStepStabilize(startIndex = 0){

        var dots = this.state.dots;
        var base = this.state.base;
        var _this = this;

        var stepIsDone = false;


        dots.forEach(function(dot, index){

            if(!stepIsDone && index >= startIndex ){

                if(dots.length <= index+1){
                    dots.push([]);
                }

                if(dot.length >= base){
                    dots[index+1] = _this.updateDotsArray(dots[index+1], dots[index+1].length + 1);
                    dots[index] = _this.updateDotsArray(dots[index], dot.length - base);

                    stepIsDone = true;
                }
            }
        });
    }


    removeDots(zoneIndex, nbDots = 1, dotIndex = -1, dotStyle = ""){

        //this.state.dots[zoneIndex][0].style = dotStyle;
        //console.log("this.state.dots[zoneIndex][0]", this.state.dots[zoneIndex][0]);

        if(nbDots > 0 && dotIndex !== -1){
            this.state.dots[zoneIndex].splice(dotIndex, 1);
            //removed[0].style = dotStyle;
            //console.log("removed", removed);
            nbDots--;
        }

        if(nbDots > 0){
            //Todo : make those dots explode from dotIndex position
            this.state.dots[zoneIndex] = this.updateDotsArray(this.state.dots[zoneIndex], this.state.dots[zoneIndex].length-nbDots);
        }

    }

    removeNegativeDots(zoneIndex, nbDots = 1, dotIndex = -1, dotStyle = ""){
        if(nbDots > 0 && dotIndex !== -1){
            this.state.negativeDots[zoneIndex].splice(dotIndex, 1);
            //removed[0].style = dotStyle;
            //console.log("removed", removed);
            nbDots--;
        }

        if(nbDots > 0){
            //Todo : make those dots explode from dotIndex position
            this.state.negativeDots[zoneIndex] = this.updateDotsArray(this.state.negativeDots[zoneIndex], this.state.negativeDots[zoneIndex].length-nbDots);
        }
    }

    addDots(zoneIndex, nbDots, newDot, isPositive){
        if(nbDots > 0 && newDot !== undefined){
            if(isPositive) {
                this.state.dots[zoneIndex].push(newDot);
                this.state.dotsPositions[zoneIndex].push({x: newDot.x, y: newDot.y});
                nbDots--;
            }else{
                this.state.negativeDots[zoneIndex].push(newDot);
                this.state.negativeDotsPositions[zoneIndex].push({x: newDot.x, y: newDot.y});
                nbDots--;
            }
        }

        if(nbDots > 0){
            //Todo : make those dots spawn from newdot position
            if(isPositive) {
                this.state.dots[zoneIndex] = this.updateDotsArray(this.state.dots[zoneIndex], this.state.dots[zoneIndex].length + nbDots, zoneIndex, isPositive);
            }else {
                this.state.negativeDots[zoneIndex] = this.updateDotsArray(this.state.negativeDots[zoneIndex], this.state.negativeDots[zoneIndex].length + nbDots, zoneIndex, isPositive);
            }
        }
    }


    updateDotsArray(dotsArray, nbDots, zoneIndex, isPositive = true){
        if(dotsArray.length > nbDots){
            dotsArray.splice(nbDots);
        }else if(dotsArray.length < nbDots){
            dotsArray = dotsArray.concat(this.generateDots(nbDots - dotsArray.length, zoneIndex, isPositive));
        }
        return dotsArray;
    }


    generateDots(nbDots, zoneIndex, isPositive){
        var a = [];
        for(var i = 0; i < nbDots; i++){
            a.push({
                x : Math.random() * this.state.containerWidth,
                y : Math.random() * this.state.containerHeight
            });
            this.checkOverlap(a[a.length - 1], zoneIndex, isPositive);
        }
        return a;
    }

    checkOverlap(dot, zoneIndex, retry = 0, previousPos = [], isPositive) {
        var dotsInZone;
        if(isPositive) {
            dotsInZone = this.state.dotsPositions[zoneIndex];
        }else{
            dotsInZone = this.state.negativeDotsPositions[zoneIndex];
        }
        dot.x = Math.random() * this.state.containerWidth;
        dot.y = Math.random() * this.state.containerHeight;
        if(retry < 100) {
            for (var i = 0; i < dotsInZone.length; ++i) {
                let testDotPos = dotsInZone[i];
                var distance = Math.sqrt((dot.x - testDotPos.x) * (dot.x - testDotPos.x) + (dot.y - testDotPos.y) * (dot.y - testDotPos.y));
                if (distance < (this.state.dotsRayon * 2)) {
                    previousPos.push({x:dot.x, y:dot.y, distance:distance});
                    this.checkOverlap(dot, zoneIndex, ++retry, previousPos, isPositive);
                    return;
                }
            }
        }else{
            previousPos.sort(function(a,b) {return (a.distance > b.distance) ? -1 : ((b.distance > a.distance) ? 1 : 0);} );
            dot.x = previousPos[0].x;
            dot.y = previousPos[0].y;
        }
        if(isPositive) {
            this.state.dotsPositions[zoneIndex].push({x: dot.x, y: dot.y});
        }else{
            this.state.negativeDotsPositions[zoneIndex].push({x: dot.x, y: dot.y});
        }
    }

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit('change');
    }

    getList() {
        //return _store;
    }

    getMaxViewableDots(){
        return this.state.maxViewableDots;
    }

    getBase(){
        return this.state.base;
    }

    getDotsValue(){
        return this.state.dots;
    }

    getNegativeDotsValue(){
        return this.state.negativeDots;
    }

    getDotsCount(){
        return this.state.dotsCount;
    }

    getNegativeDotsCount(){
        return this.state.negativeDotsCount;
    }

    getDotsNum(){
        return this.state.dotsNum;
    }

    getNegativeDotsNum(){
        return this.state.negativeDotsNum;
    }

    getDotsValueByIndex(index){
        return this.state.dots[index].length;
    }

    getNegativeDotsValueByIndex(index){
        return this.state.negativeDots[index].length;
    }

    getDotsRayon(){
        return this.state.dotsRayon;
    }

    getNbContainers(){
        return this.state.nbContainers;
    }

    getLeftLimit(){
        return this.state.containerWidth - (this.state.dotsRayon + 10);
    }

    getRightLimit(){
        return this.state.dotsRayon + 30;
    }

    getTopLimit(){
        return this.state.dotsRayon + 70;
    }

    getBottomLimit(){
        return this.state.containerHeight - (this.state.dotsRayon + 10);
    }

    isMachineStable(){
        return !this.state.unstable;
    }

    /*getContainerWidth(){
     return this.state.containerWidth;
     }

     getContainerHeight(){
     return this.state.containerHeight;
     }*/

    getState () {
        //return this.state;
    }

}

export default DotsStore;
