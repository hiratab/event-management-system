'use strict'

class Log {
    constructor(previous, current, actionTaken, createdAt = new Date()) {
        this.previous = previous
        this.current = current
        this.actionTaken = actionTaken
        this.createdAt = createdAt
    }
}

module.exports = Log
