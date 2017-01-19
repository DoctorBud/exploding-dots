const dotsReducer = (state = {explodingInstances:[]}, action) => {
    switch (action.type) {
        case 'ADD_DOT':
            var stateCopy = {...state};
            const point = {x:action.position[0], y:action.position[1], zone:action.zoneId, id:Math.random()};
            stateCopy.explodingInstances[action.parentId].dots.push(point);
            return stateCopy;
        default:
            return state
    }
};

export default dotsReducer;

