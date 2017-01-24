  import React, {Component, PropTypes, bindActionCreators} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import {addDot, removeDot, addMultipleDots, removeMultipleDots, rezoneDot} from '../../actions/index';

class Machine extends Component {
  static propTypes = {
    state: PropTypes.shape({
      id: PropTypes.number.isRequired,
      zones: PropTypes.number.isRequired,
      dots: PropTypes.array,
      dotsRayon: PropTypes.number.isRequired,
      positiveDotsCount: PropTypes.number.isRequired,
      negativeDotsCount: PropTypes.number.isRequired,
      unstable: PropTypes.bool.isRequired,
      maxViewableDots: PropTypes.number.isRequired
    })
  };

  //dotZones = [];
  dotsPerZone = [];
  groups = [];
  backgrounds = [];

  constructor(props) {
    console.log("Machine", props);
    super(props);
    for (let i = 0; i < this.props.state.zones; i++) {
      this.dotsPerZone[i] = this.props.state.dots.filter((dot)=> {
        return dot.zone === i
      });
    }
  }

  shouldComponentUpdate(props) {
    console.log('shouldComponentUpdate', props.state.dots, this.dotsPerZone);
    this.removeDotsFromStateChange();
    this.addDotsFromStateChange();
    this.checkBase();
    console.log('ComponentUpdateDone', this.dotsPerZone);
    return false;
  }

  removeDotsFromStateChange(){
    for(let i = 0; i < this.dotsPerZone.length; i++){
      if(this.dotsPerZone[i].length > 0) {
        //console.log('Here I', i)
        let j = this.dotsPerZone[i].length;
        while(j--){
          //console.log('Here J', j, this.dotsPerZone[i][j].zone);
          let isPresent = false;
          let k = this.props.state.dots.length;
          while(k--){
            //console.log("Here K", this.props.state.dots[k].zone);
            if(this.props.state.dots[k].zone===i && this.props.state.dots[k].id===this.dotsPerZone[i][j].id === true){
              isPresent = true;
              break;
            }
          };
          if(isPresent === false) {
            this.removeCircleFromZone(this.dotsPerZone[i][j]);
            this.dotsPerZone[i].splice(this.dotsPerZone[i].indexOf(this.dotsPerZone[i][j]), 1);
          }
        }
      }
    }
  }

  addDotsFromStateChange(){
    this.props.state.dots.forEach((dot) => {
      if(this.dotsPerZone[dot.zone].length > 0) {
        let identicalDot = false;
        this.dotsPerZone[dot.zone].forEach((existingDot) => {
          if (existingDot.id === dot.id) {
            identicalDot = true;
          }
        });
        if(identicalDot === false){
          this.addDotToZone(dot);
        }
      }else{
        this.addDotToZone(dot)
      }
    });
  }

  checkBase() {
    for(let i = 0; i < this.dotsPerZone.length; i++){
      if(this.dotsPerZone[i].length > this.props.state.base-1) {
        this.dotsPerZone[i].forEach((dot) =>{
          dot.svgCircle.classed('baseIsOver', true);
        });
      }else{
        this.dotsPerZone[i].forEach((dot) =>{
          dot.svgCircle.classed('baseIsOver', false);
        });
      }
    }
  }

  addDotToZone(dot, addToDotsPerZone = true){
    let circle = d3.select(this.groups[dot.zone]).append("circle");
    let drag = d3.drag()
      .on("start", this.dragstarted.bind(this, this.groups[dot.zone], circle))
      .on("drag", this.dragged.bind(this, this.groups[dot.zone], circle))
      .on("end", this.dragended.bind(this, this.groups[dot.zone], circle));

    circle.id = dot.id;
    dot.svgCircle = circle;
    circle.attr("cx", dot.x).attr("cy", dot.y).attr("r", 25);
    circle.classed('dotCircle', true);
    circle.call(drag);
    if(addToDotsPerZone) {
      this.dotsPerZone[dot.zone].push(dot);
    }
    //console.log('addDotToZone', this.dotsPerZone);
  }

  removeCircleFromZone(dot){
    let drag = d3.drag()
      .on("start", null)
      .on("drag", null)
      .on("end", null);
    dot.svgCircle.call(drag);
    dot.svgCircle.remove();
  }

  dragstarted(zone, circle){
    circle.origin = [circle.attr("cx"), circle.attr("cy")];
    var m = d3.mouse(zone);
    circle.attr("cx", m[0])
      .attr("cy", m[1]);
  }

  dragged(zone, circle){
    var m = d3.mouse(zone);
    circle.attr("cx", m[0])
      .attr("cy", m[1]);
  }

  dragended(originalZone, circle){
    let dropzones = d3.selectAll('#powerZone'+ this.props.state.id);
    let currentZoneIndex = -1;
    let currentZone = null;
    let originalZoneIndex = Number(originalZone.id);
    dropzones._groups[0].forEach(function(zone, index){
      let posInZone = d3.mouse(zone);
      let boundingZone = zone.getBBox();
      if(posInZone[0] > 0
        && posInZone[0] > boundingZone.x
        && posInZone[0] < boundingZone.width
        && posInZone[1] > 0
        && posInZone[1] > boundingZone.y
        && posInZone[1] < boundingZone.height){
        currentZoneIndex = dropzones._groups[0].length - index - 1;
        currentZone = zone;
      }
    });

    if(currentZoneIndex !== -1 && currentZone !== null) {
      if (currentZoneIndex !== originalZoneIndex) {
        let originalZoneIndex = Number(originalZone.id);
        let diffZone = originalZoneIndex - currentZoneIndex;
        let dotsToRemove = 1;
        if (diffZone < 0) {
          dotsToRemove = Math.pow(this.props.state.base, diffZone * -1);
        }
        //check if possible
        let finalNbOfDots = this.dotsPerZone[originalZoneIndex].length - dotsToRemove;
        if (finalNbOfDots < 0) {
          //alert("Pas assez de points disponibles pour cette opération");
          circle.transition()
            .attr("cx", circle.origin[0])
            .attr("cy", circle.origin[1]);
          return false;
        }


        // Set position of dot linked to circle.
        let dotMoved = this.dotsPerZone[originalZoneIndex].filter((dot) => {
          return dot.id === circle.id;
        })[0];

        var m = d3.mouse(this.groups[currentZoneIndex]);
        dotMoved.x = m[0];
        dotMoved.y = m[1];

        // rezone current dot and thus remove it from the amount to be moved
        this.props.onRezoneDots(this.props.state.id, currentZoneIndex, dotMoved);
        dotsToRemove--;
        console.log('dotsToRemove', dotsToRemove);

        // remove dots
        this.props.onRemoveDots(this.props.state.id, originalZoneIndex, dotsToRemove);

        //Add the new dots
        let dotsPos = [];
        let currentBoundingZone = currentZone.getBBox();
        let newNbOfDots = Math.pow(this.props.state.base, diffZone);
        newNbOfDots--;
        for (let i = 0; i < newNbOfDots; i++) {
          dotsPos.push({
            x: Math.random() * (currentBoundingZone.width - currentBoundingZone.x),
            y: Math.random() * (currentBoundingZone.height - currentBoundingZone.y)
          })
        }
        if (currentZone) {
          this.props.onAddDots(this.props.state.id, currentZoneIndex, dotsPos);
        }
      }
    }else{
      this.props.onRemoveDot(this.props.state.id, originalZone, circle.id);
    }
  }

  onZoneClick(group) {
    console.log("onZoneClick", this.props.state.id, group.id);
    this.props.onAddDot(this.props.state.id, Number(group.id), d3.mouse(group));
  }

  componentDidMount() {
    console.log('componentDidMount', this.dotsPerZone);
    for(let i = 0; i < this.dotsPerZone.length; i++){
      d3.select(this.backgrounds[i]).on('click', this.onZoneClick.bind(this, this.groups[i]));
      if(this.dotsPerZone[i].length > 0) {
        this.dotsPerZone[i].forEach((dot) => {
          this.addDotToZone(dot, false);
        })
      }
    }
  }

  render(){
    let startingXPos = 0;
    //console.log('render', this.dotsPerZone);
    let backgrounds = [];
    var dotZones = [];
    for(let i = this.dotsPerZone.length - 1; i >= 0; i--){
      let key = this.props.state.id + ".zone" + i;
      dotZones.push(
        <g key={key} transform={'translate(' + (startingXPos + 10) + ',' + 10 + ')'} id={i}  ref={(g) => { this.groups[i]=g; }} />
      );
      key = this.props.state.id + ".bg" + i;
      backgrounds.push(
        <rect key={key} id={"powerZone" + this.props.state.id} className="powerZoneRect"  transform={'translate(' + (startingXPos + 10) + ',' + 10 + ')'} ref={(rect) => { this.backgrounds[i]=rect; }}/>
      );
      startingXPos += 310;
    }

    return (
      <div className="dotsComponent">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox='0 0 1600 400' ref={(g) => { this.container=g; }}>
          <g>
            {backgrounds}
            {dotZones}
          </g>
        </svg>
      </div>
    );
  }
}

const getState = (state, id) => {
  //console.log('getState', state);
  if (!state.explodingInstances[id]) {
    const initialState = {
      base: 2,
      zones: 5,
      dots: [{x: 10, y: 20, zone: 0, id: 'dot' + Math.random()}],
      dotsRayon: 22,
      positiveDotsCount: 0,
      negativeDotsCount: 0,
      unstable: false,
      maxViewableDots: 150,
      id: id
    };
    return {...state.explodingInstances[id] = initialState};
  } else {
    return {...state.explodingInstances[id]};
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    state: getState(state.dotsReducer, ownProps.index)
  }
};

const mapDispatchToProps = (dispatch) => ({
  onAddDot: (parentId, zoneId, position) => dispatch(addDot(parentId, zoneId, position)),
  onRemoveDot: (parentId, zoneId, dotId) => dispatch(removeDot(parentId, zoneId, dotId)),
  onAddDots: (parentId, zoneId, dots) => dispatch(addMultipleDots(parentId, zoneId, dots)),
  onRemoveDots: (parentId, zoneId, dotsAmount) => dispatch(removeMultipleDots(parentId, zoneId, dotsAmount)),
  onRezoneDots: (parentId, zoneId, dot) => dispatch(rezoneDot(parentId, zoneId, dot))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Machine);
