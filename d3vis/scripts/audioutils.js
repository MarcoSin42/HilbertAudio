const LOWER_FREQ = 27.5 // Hz
const UPPER_FREQ = 4186 // 16 # Hz


/**
 * Takes in an audio buffer, play it
 * @param {Float32Array} arr The audio buffer 
 * @param {AudioContext} context The context which the sound will play from
 */
function playSound(arr, context) {
    var buf = new Float32Array(arr.length)
    for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
    var buffer = context.createBuffer(1, buf.length, context.sampleRate)
    buffer.copyToChannel(buf, 0)
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
}

/**
 * Produces the value of the sin at sampleNumber
 * @param {int} sampleNumber The number of samples
 * @param {int} tone The frequency of the sinewave
 * @param {AudioContext} context The device context from which the sinewave will play from
 * @returns 
 */
function sineWaveAt(sampleNumber, tone, context) {
    var sampleFreq = context.sampleRate / tone;
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)));
}

/** Produces a sound buffer for which to play
 * @param {int} tone The frequency to play
 * @param {AudioContext} context The audio context
 * @param {int} samples How long to play the tone 
 * @returns Audio Buffer
 */
function getFreqSamples(tone, context, samples)
{
    var arr = new Float32Array(samples);
    var volume = 1;
  
    for (var i = 0; i < samples; i++) {
        arr[i] = sineWaveAt(i, tone, context) * volume * pinkPower(tone);
    }
    // console.log(arr);

    return arr;
}

/**
 * Maps a color by first converting to greyscale then to a tone between [28, 284]
 * @param {int} r Represents the red component [0,255]
 * @param {int} g Represents the green component [0,255]
 * @param {int} b Represents the blue componenet [0,255] 
 * @returns A tone between 28 hz and 284 hz
 */
function mapColorToTone(r, g, b)
{
    var greyscale = 28 + 0.3*r + 0.59*g + 0.11*b;
    
    return d3.scaleLinear()
        .domain([0,255])
        .range([LOWER_FREQ, UPPER_FREQ])(greyscale);
}

/**
 * Produces the factor for which to reduce a noise db level.
 * @param {float} f 
 * @returns a float between 0 and 1
 */
function pinkPower(f)
{
    return 5/(Math.sqrt(f));
}