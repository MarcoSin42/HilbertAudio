
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