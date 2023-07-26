const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.img-upload__effects');
const imagePreview = document.querySelector('.img-upload__preview');

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const showSlider = () => sliderContainer.classList.remove('hidden');
const hideSlider = () => sliderContainer.classList.add('hidden');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: currentEffect.max,
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    connect: 'lower',
  });
};

const onEffectsChange = (evt) => {
  currentEffect = EFFECTS.find((element) => element.name === evt.target.value);
  updateSlider();

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDefault()) {
    imagePreview.style.filter = DEFAULT_EFFECT.style;
  } else{
    imagePreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  }
  effectValue.value = sliderValue;
};

const addListenersToEffectList = () => {
  effectList.addEventListener('change', onEffectsChange);
};

const removeListenersToEffectList = () => {
  effectList.removeEventListener('change', onEffectsChange);
};

const setDefaultSlider = () => {
  createSlider();
  hideSlider();
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const resetSlider = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
  hideSlider();
};

export {setDefaultSlider, resetSlider, addListenersToEffectList, removeListenersToEffectList};
