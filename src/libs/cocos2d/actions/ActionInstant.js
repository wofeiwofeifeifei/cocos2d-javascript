/*globals module exports resource require BObject BArray*/
/*jslint undef: true, strict: true, white: true, newcap: true, browser: true, indent: 4 */
"use strict";

var util = require('util'),
    act = require('./Action'),
    ccp = require('geometry').ccp;

var ActionInstant = act.FiniteTimeAction.extend(/** @lends cocos.actions.ActionInstant */{
    /**
     * @class Base class for actions that triggers instantly. They have no duration.
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.FiniteTimeAction
     * @constructs
     */
    init: function (opts) {
        ActionInstant.superclass.init.call(this, opts);

        this.duration = 0;
    },
    get_isDone: function () {
        return true;
    },
    step: function (dt) {
        this.update(1);
    },
    update: function (t) {
        // ignore
    },
    copy: function() {
        throw "copy() not implemented on this action";
    },
    reverse: function () {
        return this.copy();
    }
});

var FlipX = ActionInstant.extend(/** @lends cocos.actions.FlipX# */{
    flipX: false,

    /**
     * @class FlipX Flips a sprite horizontally
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {Boolean} flipX Should the sprite be flipped
     */
    init: function (opts) {
        FlipX.superclass.init.call(this, opts);

        this.flipX = opts.flipX;
    },
    startWithTarget: function (target) {
        FlipX.superclass.startWithTarget.call(this, target);

        target.set('flipX', this.flipX);
    },
    reverse: function () {
        return FlipX.create({flipX: !this.flipX});
    },
    copy: function () {
        return FlipX.create({flipX: this.flipX});
    }
});

var FlipY = ActionInstant.extend(/** @lends cocos.actions.FlipY# */{
    flipY: false,

    /**
     * @class FlipY Flips a sprite vertically
     *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {Boolean} flipY Should the sprite be flipped
     */
    init: function (opts) {
        FlipY.superclass.init.call(this, opts);

        this.flipY = opts.flipY;
    },
    startWithTarget: function (target) {
        FlipY.superclass.startWithTarget.call(this, target);

        target.set('flipY', this.flipY);
    },
    reverse: function () {
        return FlipY.create({flipY: !this.flipY});
    },
    copy: function () {
        return FlipY.create({flipY: this.flipY});
    }
});

var Place = ActionInstant.extend(/** @lends cocos.actions.Place# */{
    position: null,
    
    /**
	 * @class Place Places the node in a certain position
	 *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {geometry.Point} position
     */
    init: function(opts) {
        Place.superclass.init.call(this, opts);
        this.set('position', util.copy(opts.position));
    },
    
    startWithTarget: function(target) {
        Place.superclass.startWithTarget.call(this, target);
        this.target.set('position', this.position);
    },
    
    copy: function() {
        return Place.create({position: this.position});
    }
});

var CallFunc = ActionInstant.extend(/** @lends cocos.actions.CallFunc# */{
	callback: null,
    target: null,
    method: null,
    
	/**
	 * @class CallFunc Calls a 'callback'
	 *
     * @memberOf cocos.actions
     * @extends cocos.actions.ActionInstant
     * @constructs
     *
     * @opt {BObject} target
     * @opt {String|Function} method
     */
	init: function(opts) {
		CallFunc.superclass.init.call(this, opts);
		
		// Save target & method so that copy() can recreate callback
		this.target = opts.target;
		this.method = opts.method;
		this.callback = util.callback(this.target, this.method);
	},
	
	startWithTarget: function(target) {
		CallFunc.superclass.startWithTarget.call(this, target);
		this.execute();
	},
	
	execute: function() {
	    // Pass target to callback
		this.callback.call(this.target);
	},
	
	copy: function() {
	    return CallFunc.create({target: this.target, method: this.method});
	}
});

exports.ActionInstant = ActionInstant;
exports.FlipX = FlipX;
exports.FlipY = FlipY;
exports.Place = Place;
exports.CallFunc = CallFunc;

