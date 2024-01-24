
export const similarActorsInlist = (actors = [], actorsFilter = []) => {
    let counter = 0;
    actorsFilter.forEach(actorFilter => {
        if(actors.some(actor => actor.people_id === actorFilter.people_id)){
            counter++;
        }
    });
    
    return counter;
}