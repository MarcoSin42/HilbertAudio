
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
 * @param {int} sampleNumber 
 * @param {int} tone 
 * @param {AudioContext} context 
 * @returns 
 */
function sineWaveAt(sampleNumber, tone, context) {
    var sampleFreq = context.sampleRate / tone
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)))
}

/** Produces a sound buffer for which to play
 * @param {int} tone The frequency to play
 * @param {AudioContext} context The audio context
 * @param {float} seconds How long to play the tone 
 * @returns Audio Buffer
 */
function playSoundForSec(tone, context, seconds)
{
    var arr = [];
    var volume = 0.2;
  
    for (var i = 0; i < context.sampleRate * seconds; i++) {
        arr[i] = sineWaveAt(i, tone, context) * volume
    }

    return arr
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
    return 28 + 0.3*r + 0.59*g + 0.11*b;
}

/**
 * Produces the factor for which to reduce a noise db level.
 * @param {float} f 
 * @returns a float between 0 and 1
 */
function pinkNoise(f)
{
    return 1/f;
}