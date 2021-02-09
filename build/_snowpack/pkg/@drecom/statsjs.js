var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var stats = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory() ;
}(commonjsGlobal, (function () {
/**
 * @author mrdoob / http://mrdoob.com/
 * @author Drecom Co.,Ltd. / http://www.drecom.co.jp/
 */

var Stats = function Stats(config) {

	var maxFPS = config && config.maxFPS ? config.maxFPS : 60;
	var maxMem = config && config.maxMem ? config.maxMem : 100;
	var customGraphConf = config && config.customGraphConf ? config.customGraphConf : undefined;
	var drawInterval = config && config.drawInterval ? config.drawInterval : 1000;

	// Determine whether JavaScript heap can be obtained.
	var isReadMemTest = false;
	var isReadMemTestMem = 0;
	var isReadMemTestTime = (performance || Date).now() + 5000;
	var canReadMem = false;
	if (self.performance && self.performance.memory && self.performance.memory.usedJSHeapSize) {
		isReadMemTest = true;
		isReadMemTestMem = self.performance.memory.usedJSHeapSize;
	}

	var panel = new FpsPanel(maxFPS, customGraphConf);

	var beginTime = (performance || Date).now(),
	    prevTime = beginTime,
	    frames = 0,
	    mem = 0,
	    maxTime = 0;

	var customText = "";

	return {
		dom: panel.dom,
		getFps: function getFps() {
			return panel.getFps();
		},
		getMs: function getMs() {
			return panel.getMs();
		},
		getMem: function getMem() {
			return mem;
		},

		setText: function setText(text) {
			customText = text;
		},

		begin: function begin() {

			beginTime = (performance || Date).now();
		},

		end: function end(customGraphValue) {

			frames++;

			var time = (performance || Date).now();

			var nowTime = time - beginTime;
			if (maxTime < nowTime) {
				maxTime = nowTime;
			}

			if (time >= prevTime + drawInterval) {

				var text = customText;

				if (isReadMemTest) {
					// Enable if there are heap fluctuations
					if (isReadMemTestMem !== performance.memory.usedJSHeapSize) {
						isReadMemTest = false;
						panel.addCustomGraph({
							color: '#fa0',
							max: maxMem
						});
						canReadMem = true;
					} else {
						if (isReadMemTestTime < time) {
							isReadMemTest = false;
						}
					}
				}

				if (canReadMem) {
					if (!customGraphValue) {
						customGraphValue = [];
					}
					mem = window.performance.memory.usedJSHeapSize / 1048576;
					customGraphValue.push(mem);
					text = Math.round(mem) + ' MB  ' + customText;
				}

				panel.update(frames * 1000 / (time - prevTime), maxTime, customGraphValue, text);

				prevTime = time;
				frames = 0;
				maxTime = 0;
			}

			return time;
		},

		update: function update(customGraphValue) {

			beginTime = this.end(customGraphValue);
		}
	};
};

// A class that displays passed data in a graph.
var FpsPanel = function FpsPanel(maxFPS, customGraphConf) {

	var MAX_FPS = maxFPS,
	    MAX_MS = 1000 / MAX_FPS,
	    ALERT_MS = 1000 / MAX_FPS * 0.6;

	var PR = Math.round(window.devicePixelRatio || 1) * 2;
	var WIDTH = 80 * PR,
	    HEIGHT = 48 * PR,
	    TEXT_X = 3 * PR,
	    TEXT_Y = 2 * PR,
	    GRAPH_X = 3 * PR,
	    GRAPH_Y = 25 * PR,
	    GRAPH_WIDTH = 74 * PR,
	    GRAPH_HEIGHT = 20 * PR;
	var CUSTOM_TEXT_Y = GRAPH_Y / 2;

	var FRAME_COLOR = '#002',
	    GRAPH_COLOR = '#124',
	    FPS_COLOR = '#a15',
	    MS_COLOR = '#0ff',
	    NORMAL_TEXT_COLOR = '#0ff',
	    ALERT_TEXT_COLOR = '#f08',
	    CUSTOM_TEXT_COLOR = '#fa0';

	var lastFps = 0;

	var lastMs = 0;
	var lastMsY = GRAPH_HEIGHT;

	var customGraphLength = 0;
	var customGraphLastY = [];
	if (!customGraphConf) {
		customGraphConf = [];
	}
	customGraphLength = customGraphConf.length;
	for (var i = 0; i < customGraphLength; i++) {
		customGraphLastY.push(GRAPH_HEIGHT);
	}

	var container = document.createElement('div');
	container.style.cssText = 'position:fixed;top:0;left:0;opacity:0.9;z-index:10000';
	var canvas = document.createElement('canvas');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	container.appendChild(canvas);
	canvas.style.cssText = 'width:80px;height:48px';
	var context = canvas.getContext('2d');
	context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = FRAME_COLOR;
	context.fillRect(0, 0, WIDTH, HEIGHT);
	context.fillStyle = GRAPH_COLOR;
	context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

	var drawLineGraph = function drawLineGraph(color, maxValue, newValue, lastY) {
		context.fillStyle = color;
		var newY = Math.round((1 - newValue / maxValue) * GRAPH_HEIGHT);
		if (GRAPH_HEIGHT - PR < newY) {
			newY = GRAPH_HEIGHT - PR;
		} else if (newY < 0) {
			newY = 0;
		}
		var head = Math.min(newY, lastY);
		var bottom = Math.max(newY, lastY);
		var height = bottom - head;
		if (height < PR) height = PR;
		context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y + head, PR, height);
		return newY;
	};

	return {

		dom: container,

		getFps: function getFps() {
			return lastFps;
		},
		getMs: function getMs() {
			return lastMs;
		},

		addCustomGraph: function addCustomGraph(graphProps) {
			customGraphConf.push(graphProps);
			customGraphLastY.push(GRAPH_HEIGHT);
			customGraphLength++;
		},

		update: function update(fps, ms, customGraphValue, customText) {
			lastFps = fps;
			lastMs = ms;

			context.fillStyle = FRAME_COLOR;
			context.fillRect(0, 0, WIDTH, GRAPH_Y);

			if (ALERT_MS <= lastMs) {
				context.fillStyle = ALERT_TEXT_COLOR;
			} else {
				context.fillStyle = NORMAL_TEXT_COLOR;
			}
			context.fillText(Math.round(lastFps) + ' FPS  -  ' + Math.round(lastMs) + ' MS', TEXT_X, TEXT_Y);

			if (customText) {
				context.fillStyle = CUSTOM_TEXT_COLOR;
				context.fillText(customText, TEXT_X, CUSTOM_TEXT_Y);
			}

			context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

			context.fillStyle = GRAPH_COLOR;
			context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

			context.fillStyle = FPS_COLOR;
			var nowFpsY = Math.round((1 - lastFps / MAX_FPS) * GRAPH_HEIGHT);
			if (nowFpsY < 0) nowFpsY = 0;
			context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y + nowFpsY, PR, GRAPH_HEIGHT - nowFpsY);

			lastMsY = drawLineGraph(MS_COLOR, MAX_MS, lastMs, lastMsY);

			if (customGraphLength) {
				for (var i = 0; i < customGraphLength; i++) {
					customGraphLastY[i] = drawLineGraph(customGraphConf[i].color, customGraphConf[i].max, customGraphValue[i], customGraphLastY[i]);
				}
			}
		}
	};
};

return Stats;

})));
});

export default stats;
