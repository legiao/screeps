module.exports = (function () {
  'use strict'

  function Harvester(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES)
      for (var sourceIndex in sources) {
        var source = sources[sourceIndex]
        if (source.total === undefined) source.total = 0
        if (source.total < 3) {
          source.total += 1
          creep.source = source
          creep.moveTo(source)
          creep.harvest(source)
          return
        }
      }
    }
    else {
      if (creep.source) creep.source.total -= 1
      creep.moveTo(Game.spawns.Spawn1);
      creep.transferEnergy(Game.spawns.Spawn1)
    }
  }

  return Harvester

})()