from hilbertutils import generate_hilbert_path, d2xy, xy2d
import sys
import numpy as np
from PIL import Image, ImageOps
import os
from math import floor
from pyaudio import PyAudio
from scipy.io.wavfile import write

LOWER_FREQ = 27.5 # Hz
UPPER_FREQ = 4186 // 2 # Hz

SAMPLE_RATE = 44100 
VOLUME = 0.5 # range [0, 1]

DURATION = 5 #s



def contMapToFreq(px_color: int) -> float:
    """Maps Greyscale space to frequency (or sound) space

    Args:
        px_color (int): The pixel in greyscale
    """

    return np.interp(px_color,[0,255],[LOWER_FREQ,UPPER_FREQ])

def contMapToPiano(px_color: int):
    """ Maps Greyscale space to a piano key space.

    Args:
        px_color (int): The pixel in greyscale
    """

    key = floor(np.interp(px_color,[0,255],[1,88])) # Map pixel space to piano key space
    # Maybe a pentatonic scale would be good?

    return ((2**(1/12))**(key - 49)) * 440


if __name__ == '__main__':

    # Opening file and checking requirements are met
    assert len(sys.argv) >= 2, "Insufficient arguments provided.  You must provide a path to the image."
    assert os.path.exists(sys.argv[1]), "Path does not exist"

    image = ImageOps.grayscale(Image.open(sys.argv[1]))
    
    assert image.size[0] == image.size[1], "Image must be square"


    path = generate_hilbert_path(image.size[0])

    assert (image.size[0] & (image.size[0] - 1) == 0), "The image's dimensions must be a power of 2."

    # Create the sound file 
    duration = DURATION / len(path)

    output = None # OUTPUT
    for d in path:
        pixel:int = image.getpixel(d)
        x,y = d

        f:float = contMapToFreq(pixel)

        """
          "np.arange(SAMPLE_RATE*duration)*f/SAMPLE_RATE)" : 
          The np.arange part creates a SAMPLE_RATE*duration length array
          f/SAMPLE_RATE creates the input of the sin wave curve
        """
        if output is None:
            output = (np.sin(2*np.pi*np.arange(SAMPLE_RATE*duration)*f/SAMPLE_RATE)).astype(np.float32)
        else:
            sample = (np.sin(2*np.pi*np.arange(SAMPLE_RATE*duration)*f/SAMPLE_RATE)).astype(np.float32)
            output = np.concatenate([output, sample], axis=None)

        #print(f'x: {x:3d} | y: {y: 3d} | d: {xy2d(image.size[0], d[0], d[1]):3d} | pixel_val: {pixel: 3d}')

    write('test.wav', SAMPLE_RATE, output)
    





