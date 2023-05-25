# What is ~~HilbertAudio~~ Sight through Sound?

Sight through Sound is project which, as the name suggests, seeks to be a sight replacement for the visually impaired by converting images to sound.  It does this through a clever little thing called a Hilbert curve.  Here are the steps the program does in order to accomplish this.

1. Given an image, map each pixel to a point on the Hilbert curve.
2. Interpret the mapped pixels as a sound.  


# Current challenges

1. Images are too 'noisy' as in there is probably a ton of extraneous information that probably isn't helpful to navigate the world.  A way to reduce the extraneous information is through computer vision methods such as edge detection.
2. The 'sound' sounds like crap, it just plays pure sinewaves.  Is there way to make it sound more appealing?  

# Getting Started on maintaining this project

First, in order to avoid conflicts with existing installed packages for your python installation.  It is helpful to create a virtual environment.  You can use virtualenv or Anacadonda.

# Requirements
Change your directory to the root level where requirements.txt is located.  Then run the following command:

    pip install -r requirements.txt

# How to use the **hilbert2audio** CLI

    python hilbert2audio.py <Path to Image>

# Getting into Contact with me (marco)

You can just @me on discord through the Saskinvent server