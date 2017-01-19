const dotsReducer = (state = {explodingInstances:[]}, action) => {
    var stateCopy;
    switch (action.type) {
        case 'ADD_DOT':
            console.log('ADD_DOT');
            stateCopy = {...state};
            const point = {x:action.position[0], y:action.position[1], zone:action.zoneId, id:'dot' + Math.random()};
            stateCopy.explodingInstances[action.parentId].dots.push(point);
            return stateCopy;

        case 'REMOVE_DOT':
            console.log('REMOVE_DOT');
            stateCopy = {...state};
            stateCopy.explodingInstances[action.parentId].dots.forEach((dot) => {
                if(dot.id === action.dotId) {
                    stateCopy.explodingInstances[action.parentId].dots.splice(stateCopy.explodingInstances[action.parentId].dots.indexOf(dot), 1);
                }
            });
            return stateCopy;

        case 'ADD_MULTIPLE_DOTS':
            console.log('ADD_MULTIPLE_DOTS', action.dots, action.zoneId);
            stateCopy = {...state};
            action.dots.forEach((dot) =>{
                let point = {x:dot.x, y:dot.y, zone:action.zoneId, id:Math.random()};
                stateCopy.explodingInstances[action.parentId].dots.push(point);
            });
            return stateCopy;

        case 'REMOVE_MULTIPLE_DOTS':
            stateCopy = {...state};
            console.log('REMOVE_MULTIPLE_DOTS', action.dotsAmount, action.zoneId, stateCopy.explodingInstances[action.parentId].dots.length);
            let i = stateCopy.explodingInstances[action.parentId].dots.length;
            while(i--){
                if(stateCopy.explodingInstances[action.parentId].dots[i].zone === action.zoneId){
                    action.dotsAmount--;
                    stateCopy.explodingInstances[action.parentId].dots.splice(stateCopy.explodingInstances[action.parentId].dots.indexOf(stateCopy.explodingInstances[action.parentId].dots[i]), 1);
                    if(action.dotsAmount <= 0){
                        break;
                    }
                }
            };
            return stateCopy;
        default:
            return state
    }
};

export default dotsReducer;

