'use strict'

_ = require 'lodash'
glob = require 'glob'

path = require 'path'
fs = require 'fs'

Song = require './song'

# TODO: this does **NOT** belong here!!!!!
module.exports.loadSongs = (songDir) ->
    songs = {}
    files = glob.sync '*.songdown', cwd: songDir

    _.each files, (name) ->
        song = new Song name, songDir
        songs[song.artist] ?= []
        songs[song.artist].push song.names

    songs
