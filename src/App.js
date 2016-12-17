
import './App.css';
import React, { Component } from 'react';
import DotsActions from './actions/DotsActions.js'
import DotsStore from './stores/DotsStore.js'
import AppDispatcher from './dispatchers/AppDispatcher';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import * as d3 from 'd3';

var _DotsStore = new DotsStore(AppDispatcher, { base : 2 });

var getDotsStateByIndex = (index) => {
    return {
        base : _DotsStore.getBase(),
        value : _DotsStore.getDotsValueByIndex(index),
        dots : _DotsStore.getDotsValue()
    }
};


var getDotsState = () => {
    return {
        base : _DotsStore.getBase(),
        dots : _DotsStore.getDotsValue(),
        dotsCount: _DotsStore.getDotsCount(),
        dotsNum: _DotsStore.getDotsNum()
    }
};

var getMinusDotsStateByIndex = (index) => {
    return {
        base : _DotsStore.getBase(),
        value : _DotsStore.getMinusDotsValueByIndex(index),
        dots : _DotsStore.getMinusDotsValue()
    }
};


class DotsContainer extends Component{

    constructor(props){
        super();
        this.state = {
            base : 2,
            value : 0,
            index: props.index
        };

    }

    plusOne(){
        var v = this.state.value+1;
        DotsActions.dotsChanged(this.state.index, v);
    }

    minusOne(){
        if(this.state.value > 0){
            DotsActions.removeDots(this.state.index);
        }
    }


    updateBase(value, base){
        return Math.round(value / base);
    }

    numToDisplay(){
        // Don't display leading zeroes
        if(this.state.value !== 0 || this.state.index === '0'){
            if(_DotsStore.getBase() !== 12) {
                return this.state.value;
            }else{
                if(this.state.value > (this.state.base-1)){
                    return this.state.value;
                }else{
                    switch (this.state.value){
                        case 10:
                            return 'A';
                        case 11:
                            return 'B';
                        default:
                            return this.state.value;
                    }
                }
            }
        }else {
            let nbContainers = _DotsStore.getNbContainers() - 1;
            for(let i = parseInt(this.state.index, 10) + 1; i <= nbContainers; ++i){
                if (_DotsStore.getDotsValueByIndex(i) !== 0) {
                    return this.state.value;
                }
            }
            return '';
        }
    }

    _onChange(){
        this.setState(getDotsStateByIndex(this.state.index));
    }


    // Add change listeners to stores
    componentDidMount() {
        _DotsStore.addChangeListener(this._onChange.bind(this));
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        _DotsStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {

        return (
            <div className="dotsContainer">
                <div className="title">x<sup>{this.state.index}</sup></div>
                <span className="nbDots">{this.state.value}</span>
                <button onClick={this.plusOne.bind(this)}>+1</button>
                <button onClick={this.minusOne.bind(this)}>-1</button>
                <div className={"baseNumber baseNumber2 " + (this.state.value > (this.state.base-1) ? 'baseIsOver' : '')}>{
                    this.numToDisplay()
                }</div>
            </div>);
    }
}


class MinusDotsContainer extends Component{

    constructor(props){
        super();
        this.state = {
            base : 2,
            value : 0,
            index: props.index
        };

    }

    numToDisplay(){
        // Don't display leading zeroes
        if(this.state.value !== 0 || this.state.index === '0'){
            if(_DotsStore.getBase() !== 12) {
                return 5;
                return this.state.value;
            }else{
                if(this.state.value > (this.state.base-1)){
                    return this.state.value;
                }else{
                    switch (this.state.value){
                        case 10:
                            return 'A';
                        case 11:
                            return 'B';
                        default:
                            return this.state.value;
                    }
                }
            }
        }else {
            let nbContainers = _DotsStore.getNbContainers() - 1;
            for(let i = parseInt(this.state.index, 10) + 1; i <= nbContainers; ++i){
                if (_DotsStore.getMinusDotsValueByIndex(i) !== 0) {
                    return this.state.value;
                }
            }
            return '';
        }
    }

    /*_onChange(){
        this.setState(getMinusDotsStateByIndex(this.state.index));
    }


    // Add change listeners to stores
    componentDidMount() {
        _DotsStore.addChangeListener(this._onChange.bind(this));
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        _DotsStore.removeChangeListener(this._onChange.bind(this));
    }*/

    render() {
        return (
            <div className="dotsContainer">
                <span className="nbDots">{this.state.value}</span>
                 <div className={"baseNumber baseNumber2 " + (this.state.value > (this.state.base-1) ? 'baseIsOver' : '')}>{
                    this.numToDisplay()
                }</div>
            </div>);
    }
}


class SVGContainer extends React.Component {


    constructor(props){
        super();

        this.state = {
            width : 300,
            height : 400,
            base : 2
        };

        this.dots = [];
    }

    // Add change listeners to stores
    componentDidMount() {
        _DotsStore.addChangeListener(this._onChange.bind(this));
        d3.select(this.refs.zone).on("click", this.addDot.bind(this) );
    }

    _onChange(){
        this.setState(getDotsStateByIndex(this.props.index));
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        d3.select(this.refs.zone).on("click", null );
        _DotsStore.removeChangeListener(this._onChange.bind(this));
    }

    addDot(event){
        var v = this.dots.length+1;

        var pos = d3.mouse(this.refs.zone);

        DotsActions.dotsChanged(this.props.index, v, pos[0], pos[1]);
    }



    render() {

        var statedots = _DotsStore.getDotsValue()[this.props.index];

        var zoneIndex = this.props.index;
        var _this = this;

        this.dots = [];
        statedots.forEach(function(dot, index){
            var key = zoneIndex + "." + dot.x + "." + dot.y;
            if(_this.dots.length <= _DotsStore.getMaxViewableDots()) _this.dots.push(<SVGDot key={key} index={index} x={dot.x} y={dot.y} style={dot.style} positive={true} zoneIndex={zoneIndex} />);
        });

        var reverseIndex = (_DotsStore.getNbContainers() - this.props.index - 1);
        var style = (this.state.base <= this.dots.length) ? "dotGroup shaking" : "dotGroup";
        var position = `translate(${reverseIndex*(this.state.width+20)},0)`;

        return (

            <g transform={position} className="dropZone">
                <rect ref="zone" className="dotBox" />

                <rect className="dotBoxTitle" />
                <text x={(this.state.width/2)+9} y="45" className="dotBoxTitleText" textAnchor="middle">{Math.pow(this.state.base,this.props.index)}</text>

                <ReactCSSTransitionGroup transitionName="svgDot" component="g" className={style}
                                         transitionEnterTimeout={300} transitionLeaveTimeout={500}>
                    {this.dots}
                </ReactCSSTransitionGroup>
            </g>

        );
    }
}



class SVGFullSizeContainer extends React.Component {


    constructor(props){
        super();

        this.state = {
            dots : [0, 0, 0, 0, 0]
        }
    }

    // Add change listeners to stores
    componentDidMount() {
        _DotsStore.addChangeListener(this._onChange.bind(this));
        d3.select("#stage circle").style("display","none");
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        _DotsStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange(){
        this.setState(getDotsState());
    }

    render() {

        return (
            <div className="SVGContainer">
                <div className="scrollContainer">

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1600 400">
                        <g>
                            <SVGContainer className="SVGContainer" index={4} dots={this.state.dots} />
                            <SVGContainer className="SVGContainer" index={3} dots={this.state.dots} />
                            <SVGContainer className="SVGContainer" index={2} dots={this.state.dots} />
                            <SVGContainer className="SVGContainer" index={1} dots={this.state.dots} />
                            <SVGContainer className="SVGContainer" index={0} dots={this.state.dots} />
                        </g>
                        <g id="stage">
                            <SVGDot key={0} x={0} y={0} positive={true} zoneIndex={0} className="draggedDot" />
                        </g>
                    </svg>

                </div>
            </div>
        );
    }
}

class SVGDot extends React.Component {

    constructor(props){
        super();

        this.state = {
            zoneIndex : props.zoneIndex,
            selected:false
        };
    }

    componentDidMount() {
        d3.select(this.refs.dot).call(d3.drag()
            .on("start", this.dragstarted.bind(this))
            .on("drag", this.dragged.bind(this))
            .on("end", this.dragended.bind(this)));
    }

    componentWillUnmount() {
        d3.drag()
            .subject(this.refs.dot)
            .on("start", null)
            .on("drag", null)
            .on("end", null);
    }


    dragstarted(event){

        d3.select("#stage circle").style("display","block");

        var m = d3.mouse(stage);
        d3.select("#stage circle")
            .attr("cx", m[0])
            .attr("cy", m[1]);

        this.setState({
            selected: true
        });
    }

    dragended(event){

        this.setState({
            selected: false
        });

        d3.select("#stage circle").style("display","none");


        //find new zone for dots
        var dropzones = d3.selectAll(".dropZone");
        var currentZoneIndex = -1;
        var currentZone;
        dropzones._groups[0].forEach(function(zone, index){
            var posInZone = d3.mouse(zone);
            var boundingZone = zone.getBoundingClientRect();
            if(posInZone[0] > 0 && posInZone[1] > 0 && posInZone[1] < boundingZone.bottom){
                currentZoneIndex = dropzones._groups[0].length - index - 1;
                currentZone = zone;
            }
        });

        var diffZone = this.state.zoneIndex - currentZoneIndex;
        var dotsToRemove = 1;
        if(diffZone < 0){
            dotsToRemove = Math.pow(_DotsStore.getBase(), diffZone*-1);
        }

        //Remove the dots
        var finalNbOfDots = _DotsStore.getDotsValueByIndex(this.state.zoneIndex) - dotsToRemove;
        if(finalNbOfDots < 0){
            alert("Pas assez de points disponibles pour cette opération");
            return false;
        }
        DotsActions.removeDots(this.state.zoneIndex, dotsToRemove, this.props.index, "no-animation");

        //Add the new dots
        var newNbOfDots = Math.pow(_DotsStore.getBase(), diffZone);
        if(currentZone) {
            var pos = d3.mouse(currentZone);
            DotsActions.addDots(currentZoneIndex, newNbOfDots, pos[0], pos[1], "dotmove");
        }
    }

    dragged(event){
        //lint fails because stage is not declared
        var m = d3.mouse(stage);

        d3.select("#stage circle")
            .attr("cx", m[0])
            .attr("cy", m[1]);
    }



    render(){

        var style = (this.state.selected ? "dotCircle dotCircleSelected" : "dotCircle");
        if(this.props.style) style += " " + this.props.style;

        var x = Math.min(Math.max(this.props.x, _DotsStore.getRightLimit()), _DotsStore.getLeftLimit());
        var y = Math.min(Math.max(this.props.y, _DotsStore.getTopLimit()), _DotsStore.getBottomLimit());

        let circle = (<circle ref="dot" cx={x} cy={y} r={_DotsStore.getDotsRayon()} className={style} />);

        return circle;
    }
}




class ConfigPanel extends Component{


    constructor(props){
        super();
        this.state = {base : 2 };
    }

    changeBase(event){
        DotsActions.changeBase();
    }

    reset(event){
        DotsActions.clearDots();
    }

    stabilize(event){
        DotsActions.stabilize();
    }

    oneStepStabilize(event){
        DotsActions.oneStepStabilize();
    }

    // Add change listeners to stores
    componentDidMount() {
        _DotsStore.addChangeListener(this._onChange.bind(this));
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        _DotsStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange(){
        this.setState({base : _DotsStore.getBase()});
    }

    render() {
        return (
            <div className="configPanel">
                <button onClick={this.changeBase} className="base">1 <i className="fa fa-long-arrow-left"></i> {this.state.base}</button>
                <button onClick={this.stabilize} className="play"><i className="fa fa-play"></i></button>
                <button onClick={this.oneStepStabilize} className="explode"><i className="fa fa-magic"></i></button>
                <button onClick={this.reset} className="reset"><i className="fa fa-refresh"></i></button>
            </div>
        );
    }
}

class VisualPanel extends Component{

    constructor(props){
        super();
        this.state = getDotsState();
        this.mode = props.mode;
        this.startingValue = props.startingValue;
    }

    // Add change listeners to stores
    componentDidMount() {
        _DotsStore.addChangeListener(this._onChange.bind(this));
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        _DotsStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange(){
        this.setState(getDotsState());
    }

    validateNumber(evt) {
        var theEvent = evt || window.event;
        let target = theEvent.target;
        let key = theEvent.target.value;

        if (key.length > target.maxLength){
            target.value = target.value.slice(0, target.maxLength);
        }
        if(theEvent.keyCode === 37 || theEvent.keyCode === 39 || theEvent.keyCode === 8 || theEvent.keyCode === 46) { // Left / Up / Right / Down Arrow, Backspace, Delete keys
            return;
        }
        key = String.fromCharCode(evt.keyCode);
        var regex = /[0-9]|\./;
        if(!regex.test(key) ) {
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    processAddition(evt){
        let inputValue = evt.target.value.toString().split("").map(function(t){return parseInt(t, _DotsStore.getBase())});
        if(inputValue.length > 0){
            var nbContainer = _DotsStore.getNbContainers();
            while(inputValue.length < nbContainer){
                inputValue.unshift(0);
            }
            for(var i = nbContainer - 1; i >= 0; --i){
                var reverseIndex = (_DotsStore.getNbContainers() - i - 1);
                if(inputValue[i]){
                    DotsActions.addDots(reverseIndex, inputValue[i], undefined, undefined, "dotmove");
                }
            }
        }
    }

    processMultiply(evt){
        let inputValue = parseInt(evt.target.value, _DotsStore.getBase());
        if(inputValue > 0){
            let nbContainer = _DotsStore.getNbContainers();
            for(let i = nbContainer - 1; i >= 0; --i){
                let currentDotsCount = _DotsStore.getDotsValueByIndex(i);
                for(let j = 0; j < inputValue - 1; ++j) {
                    DotsActions.addDots(i, currentDotsCount, undefined, undefined, "dotmove");
                }
            }
        }
    }

    processSubtract(evt){
        let inputValue = evt.target.value.toString().split("").map(function(t){return parseInt(t, _DotsStore.getBase())});
        if(inputValue.length > 0){
            var nbContainer = _DotsStore.getNbContainers();
            while(inputValue.length < nbContainer){
                inputValue.unshift(0);
            }
            for(var i = nbContainer - 1; i >= 0; --i){
                var reverseIndex = (_DotsStore.getNbContainers() - i - 1);
                if(inputValue[i]){
                    DotsActions.removeDots(reverseIndex, inputValue[i], undefined, undefined, "dotmove");
                }
            }
        }
    }

    /*render() {
     return (
     <div className="visualPanel">
     {this.state.dotsCount} <i className="fa fa-arrows-h"></i> <span className={((_DotsStore.getDotsNum() !== "?") ? 'ok' : '') + ((_DotsStore.isMachineStable()) ? '' : ' baseIsOver')}>{this.state.dotsNum}</span>
     </div>
     );
     }*/
    render() {
        if(this.mode === "display"){
            return (
                <div className="visualPanel">
                    <span className='blackText'>The code for&nbsp;</span>{this.state.dotsCount}<span className='blackText'>&nbsp;is</span>
                </div>
            );
        }else if(this.mode === "add") {
            return (
                <div className="calculus">
                    {this.startingValue}&nbsp;<i className="fa fa-plus"></i> <input type="text" name="fname" className='inputNumber' maxLength="5" onKeyDown={this.validateNumber} onBlur={this.processAddition}/>
                </div>
            );
        }else if(this.mode === "multiply") {
            return (
                <div className="calculus">
                    {this.startingValue}&nbsp;<i className="fa fa-times"></i> <input type="text" name="fname" className='inputNumber' maxLength="2" onKeyDown={this.validateNumber} onBlur={this.processMultiply}/>
                </div>
            );
        }else if(this.mode === "subtract") {
            return (
                <div className="calculus">
                    {this.startingValue}&nbsp;<i className="fa fa-minus"></i> <input type="text" name="fname" className='inputNumber' maxLength="5" onKeyDown={this.validateNumber} onBlur={this.processSubtract}/>
                </div>
            );
        }
    }
}




class App extends Component {

    constructor(props){
        super(props);
        this.logo = props.logo;
        this.boum = props.boum;
        this.mode = props.mode;
        this.startingValue = props.startingValue;
        this.base = props.base;
    }

    componentDidMount() {
        if(this.base){
            _DotsStore.setBase(this.base);
        }
        if(this.startingValue){
            var nbContainer = _DotsStore.getNbContainers();
            while(this.startingValue.length < nbContainer){
                this.startingValue.unshift(0);
            }
            for(var i = nbContainer - 1; i >= 0; --i){
                var reverseIndex = (_DotsStore.getNbContainers() - i - 1);
                if(this.startingValue[i]){
                    DotsActions.addDots(reverseIndex, this.startingValue[i], undefined, undefined, "dotmove");
                }
            }
            while(this.startingValue.indexOf(0) === 0){
                this.startingValue.shift();
            }
        }
    }

    render() {
        return (
            <div id="jeu" className="scolab">
                <div className="App">
                    <div className="App-header">
                        <h2><img src={this.boum} alt="Boum, Le Jeu Mathématique" /></h2>
                        <ConfigPanel />
                    </div>

                    <div className="App-intro">
                        <VisualPanel mode={this.mode} startingValue={this.startingValue}/>
                        <div className="dotsContainers">
                            <DotsContainer index="4" />
                            <DotsContainer index="3" />
                            <DotsContainer index="2" />
                            <DotsContainer index="1" />
                            <DotsContainer index="0" />
                        </div>
                        <div className="minusDotsContainers">
                            <MinusDotsContainer index="4" />
                            <MinusDotsContainer index="3" />
                            <MinusDotsContainer index="2" />
                            <MinusDotsContainer index="1" />
                            <MinusDotsContainer index="0" />
                        </div>
                        <div className="dotsFullSizeContainers">
                            <SVGFullSizeContainer className="SVGFullSizeContainer" />
                        </div>
                    </div>
                </div>
                <div className="credits">
                    <p><a href="http://www.scolab.com" target="_blank">Un projet de <img src={this.logo} width="65" alt="Une présentation de Scolab Inc. - scolab.com" /></a></p>
                    <p className="license"><small>Cette œuvre est mise à disposition selon les termes de la <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Licence Creative Commons Attribution 4.0 International</a>.</small></p>
                </div>
            </div>
        );
    }


}

export default App;


