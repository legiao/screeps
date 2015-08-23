module.exports = (function () {
  'use strict'

  function Guard(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    for (var targetIndex in targets) {
        var target = targets[targetIndex]
        if (target.hits < 5000) {
        creep.moveTo(target);
        creep.attack(target);
        return
        }
    }

    creep.moveTo(Game.spawns.Spawn1);
  }

  return Guard

})()