module.exports = (function () {
  'use strict'

  function Healer(creep) {
    this.healer = creep
    this.Spawns() || this.Creeps() || creep.moveTo(Game.spawns.Spawn1);
  }

  Healer.prototype.Spawns = function () {
    var spawns = this.healer.room.find(FIND_MY_SPAWNS)
    if (spawns) {
      for (var indexSpawns in spawns) {
        var spawn = spawns[indexSpawns]
        if (spawn.hits < spawn.hitsMax) {
          this.healer.moveTo(spawn)
          this.healer.heal(spawn)
          return true
        }
      }
    }
  }

  Healer.prototype.Creeps = function () {
    var creeps = this.healer.room.find(FIND_MY_CREEPS)
    if (creeps) {
      for (var indexCreeps in creeps) {
        var creep = creeps[indexCreeps]
        if (creep.hits < creep.hitsMax) {
          this.healer.moveTo(creep)
          this.healer.heal(creep)
          return
        }
      }

      this.healer.moveTo(creeps[0])
    }
  }

  Healer.prototype.Default = function () {
    if (creep.source) creep.source.total -= 1
    creep.moveTo(Game.spawns.Spawn1);
    creep.transferEnergy(Game.spawns.Spawn1)
  }

  return Healer

})()