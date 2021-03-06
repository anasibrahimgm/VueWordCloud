import Array_sample from './helpers/Array/sample';
import Function_isFunction from './helpers/Function/isFunction';
import Function_noop from './helpers/Function/noop';
import Function_stubArray from './helpers/Function/stubArray';
import Promise_wrap from './helpers/Promise/wrap';

import AsyncComputedContext from './members/AsyncComputedContext';
import runWorker from './members/runWorker';
import getKeyedPopulatedWords from './members/getKeyedPopulatedWords';
import getMeasuredWords from './members/getMeasuredWords';
import getBoundedWords from 'stringify!./members/getBoundedWords.js';
import getScaledBoundedWords from './members/getScaledBoundedWords';
import render from './members/render';

const fontSizePower = 4;

let asyncComputed = {
	measuredWords: {
		get(context) {
			return getMeasuredWords(
				context,
				this.populatedWords,
				fontSizePower,
				this.fontSizeRatio,
			);
		},
		default: Function_stubArray,
		/*errorHandler(error) {
			console.log(error);
		},*/
	},
};

let workerComputed = {
	boundedWords: {
		code: getBoundedWords,
		data() {
			let words = this.measuredWords;
			let containerWidth = this.containerWidth;
			let containerHeight = this.containerHeight;
			return {
				words,
				fontSizePower,
				containerWidth,
				containerHeight,
			};
		},
		default: Function_stubArray,
		/*errorHandler(error) {
			console.log(error);
		},*/
	}
};

Object.entries(workerComputed).forEach(([key, {
	code,
	data,
	default: _default,
	errorHandler,
}]) => {
	let objectURL = URL.createObjectURL(new Blob([code]));
	asyncComputed[key] = {
		get(context) {
			return runWorker(context, objectURL, data.call(this));
		},
		default: _default,
		errorHandler,
	};
});

let VueWordCloud = {
	name: 'VueWordCloud',

	props: {
		words: {
			type: Array,
			default: Function_stubArray,
		},

		text: {
			type: [String, Function],
			default: '',
		},

		weight: {
			type: [Number, Function],
			default: 1,
		},

		rotation: {
			type: [Number, Function],
			default() {
				let values = [0, 3/4];
				return function() {
					return Array_sample(values);
				};
			},
		},

		fontFamily: {
			type: [String, Function],
			default: 'serif',
		},

		fontStyle: {
			type: [String, Function],
			default: 'normal',
		},

		fontVariant: {
			type: [String, Function],
			default: 'normal',
		},

		fontWeight: {
			type: [String, Function],
			default: 'normal',
		},

		color: {
			type: [String, Function],
			default: 'Black',
		},

		fontSizeRatio: {
			type: Number,
			default: 0,
		},

		maxFontSize: {
			type: Number,
			default: Infinity,
		},

		animationDuration: {
			type: Number,
			default: 5000,
		},

		intervalBetweenUpdateContainerSize: {
			type: Number,
			default: 1000,
		},
	},

	data() {
		let returns = {
			containerWidth: 0,
			containerHeight: 0,
		};
		Object.keys(asyncComputed).forEach(key => {
			returns['asyncComputed$trigger$' + key] = {};
		});
		return returns;
	},

	computed: {
		keyedPopulatedWords() {
			return getKeyedPopulatedWords(
				this.words,
				this.text,
				this.weight,
				this.rotation,
				this.fontFamily,
				this.fontStyle,
				this.fontVariant,
				this.fontWeight,
				this.color,
			);
		},

		populatedWords() {
			return Object.values(this.keyedPopulatedWords);
		},

		scaledBoundedWords() {
			return getScaledBoundedWords(
				this.boundedWords,
				this.containerWidth,
				this.containerHeight,
				this.maxFontSize,
			);
		},

		transitionDuration() {
			let wordsCount = this.scaledBoundedWords.length;
			let animationDuration = this.animationDuration;
			return wordsCount > 0 ? animationDuration / Math.min(4, wordsCount) : 0;
		},

		transitionDelay() {
			let wordsCount = this.scaledBoundedWords.length;
			let animationDuration = this.animationDuration;
			let transitionDuration = this.transitionDuration;
			return wordsCount > 1 ? (animationDuration - transitionDuration) / (wordsCount - 1) : 0;
		},
	},

	beforeCreate() {
		Object.entries(asyncComputed).forEach(([key, {
			get,
			default: currentValue,
			errorHandler = Function_noop,
		}]) => {
			let outerContext;
			this.$options.computed[key] = function() {
				this['asyncComputed$promise$' + key];
				this['asyncComputed$trigger$' + key];
				return currentValue;
			};
			this.$options.computed['asyncComputed$promise$' + key] = function() {
				if (outerContext) {
					outerContext.interrupt();
				} else {
					if (Function_isFunction(currentValue)) {
						currentValue = currentValue.call(this);
					}
				}
				let innerContext = (outerContext = new AsyncComputedContext());
				return Promise_wrap(() => get.call(this, innerContext))
					.then(value => {
						if (this._isDestroyed) {
							throw new Error();
						}
						innerContext.throwIfInterrupted();
						currentValue = value;
						this['asyncComputed$trigger$' + key] = {};
					})
					.catch(errorHandler);
			};
		});
	},

	mounted() {
		this.startToUpdateContainerSize();
	},

	methods: {
		startToUpdateContainerSize() {
			if (!this._isDestroyed) {
				setTimeout(() => {
					requestAnimationFrame(() => {
						this.startToUpdateContainerSize();
					});
				}, this.intervalBetweenUpdateContainerSize);
				this.updateContainerSize();
			}
		},

		updateContainerSize() {
			let {width, height} = this.$el.getBoundingClientRect();
			this.containerWidth = width;
			this.containerHeight = height;
		},
	},

	render(createElement) {
		return render(
			createElement,
			Object.assign({
				default: ({text}) => text,
			}, this.$scopedSlots),
			this.scaledBoundedWords,
			this.transitionDuration,
			this.transitionDelay,
		);
	},
};

export default VueWordCloud;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component(VueWordCloud.name, VueWordCloud);
}
