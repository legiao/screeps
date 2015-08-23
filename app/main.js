(function() {
  'use strict'

  var CreepsManager = require('CreepsManager')

  var spawn = Game.spawns.Spawn1
  if (!spawn) return
  var creepsManager = new CreepsManager(spawn)
  creepsManager.create()
  creepsManager.actions()

})()
