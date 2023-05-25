import hilbertutils 
import sys
import numpy as np
from PIL import Image, ImageOps
import os

def contMapToFreq(px_color: int):
    """Maps Greyscale space to frequency (or sound) space

    Args:
        px_color (int): The pixel in greyscale
    """

    return np.interp(px_color,[0,255],[27.5,4186])



if __name__ == '__main__':
    assert len(sys.argv) >= 2, "Insufficient arguments provided.  You must provide a path to the image."
    assert os.path.exists(sys.argv[1]), "Path does not exist"
    image = ImageOps.grayscale(Image.open(sys.argv[1]))
    assert image.size[0] == image.size[1], "Image must be square"

    path = hilbertutils.generate_hilbert_path(image.size[0])




