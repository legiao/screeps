var Harvester = require('Harvester')
var Builder = require('Builder')
var Guard = require('Guard')
var Healer = require('Healer')

module.exports = (function () {
  'use strict'

  function CreepsManager(spawn) {
    this.creeps = Game.creeps
    this.spawn = spawn
  }

  CreepsManager.prototype.findByRole = function (role) {
    var harvesters = []

    for (var name in this.creeps) {
      var creep = this.creeps[name]
      if (creep.memory.role === role) {
        harvesters.push(creep)
      }
    }

    return harvesters
  }

  CreepsManager.prototype.create = function () {
    console.log(this.spawn.energy, this.spawn.hits + '/' + this.spawn.hitsMax)

    var harvesters = this.findByRole('harvester')
    var guards = this.findByRole('guard')
    var healers = this.findByRole('healer')

    console.log('harvesters:', harvesters.length, ' - guards', guards.length, ' - healers', healers.length)

    if (harvesters.length > 3 && guards.length > 3 && healers.length === 0) {
      this.spawn.createCreep([HEAL, MOVE], '', { role: 'healer' })
      return
    }

    if (this.spawn.energy >= 200 && (harvesters.length < 3) || (harvesters.length <= guards.length)) {
      this.spawn.createCreep([WORK, CARRY, MOVE], '', { role: 'harvester' })
      return
    }

    if (this.spawn.energy >= 130 && harvesters.length > guards.length) {
      this.spawn.createCreep([ATTACK, MOVE], '', { role: 'guard' })
      return
    }
  }

  CreepsManager.prototype.actions = function () {
    for (var name in this.creeps) {
      var creep = this.creeps[name];

      if (creep.memory.role == 'harvester') {
        new Harvester(creep)
      }

      if (creep.memory.role == 'builder') {
        new Builder(creep)
      }

      if (creep.memory.role == 'guard') {
        new Guard(creep)
      }

      if (creep.memory.role == 'healer') {
        new Healer(creep)
      }
    }
  }

  return CreepsManager
})()