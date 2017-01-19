export const addDot = (parentId, zoneId, position) => ({
    type: 'ADD_DOT',
    parentId,
    zoneId,
    position
});

export const removeDot = (parentId, zoneId, dotId) => ({
    type: 'REMOVE_DOT',
    parentId,
    zoneId,
    dotId
});

export const addMultipleDots = (parentId, zoneId, dots) => ({
    type: 'ADD_MULTIPLE_DOTS',
    parentId,
    zoneId,
    dots
});

export const removeMultipleDots = (parentId, zoneId, dotsAmount) => ({
    type: 'REMOVE_MULTIPLE_DOTS',
    parentId,
    zoneId,
    dotsAmount
});
