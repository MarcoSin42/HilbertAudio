
# What is ~~HilbertAudio~~ Sight through Sound?

Sight through Sound is project which, as the name suggests, seeks to be a sight replacement for the visually impaired by converting images to sound.  It does this by interpretting the brightness of each pixel as a sound (not exactly since humans don't perceive all wavelengths of light as equally as brightly).

You may notice that the mapping of the pixels is peculiar, this particular mapping is used using a [Hilbert Curve](https://en.wikipedia.org/wiki/Hilbert_curve).  It's one way of mapping 2D space, like an image, to 1D space like a signal or a sound.  We could have chosen other mappings such as a snakey curve; a curve which reads the pixels like how we read, left to right and top to bottom.  However, a snakey curve does not preserve spatial locality as well as a hilbert curve and it does not lend itself well to increasing resolution of the image.  

You can imagine the mappings of the snakey curve and the hilbert curve as if we were to attach each pixel of an image to a string and then pulling the string straight, this is effectively what the program is doing.  Then, the program starts from the left end of the string and reads off the colour value of the pixel and plays a note for that specific colour, then moves right and repeats until it reaches the end of the string.

This project is mostly completed and was only meant as a proof of concept for a phone app which will do a similar thing except will utilize the phone's camera instead of user-fed images.  Any updates are highly unlikely.


** NOTE ** I wouldn't go any higher than order 4 or 5 and I'd lower the volume down to < 20%.   

[**Try the Web demo here!**](https://infinity315.github.io/HilbertAudio/)

# How to run the D3 visualization

Clone the git repository.  Navigate the d3vis directory using your favourite terminal.  Start a local webserver, you can do this using Python3 with the following command:

    python3 -m http.server

In your favourite web browser, navigate to http://127.0.0.1:8080/

Alternatively, you can specify a port number by appending it to the above command.  For example if you wanted to open it on port 1234 then you'd enter: 

    python3 -m http.server 1234

Then, navigate to http://127.0.0.1:1234/ in your web browser.

# Current challenges

1. Images are too 'noisy' as in there is probably a ton of extraneous information that probably isn't helpful to navigate the world.  A way to reduce the extraneous information is through computer vision methods such as edge detection.
2. The 'sound' sounds like crap, it just plays pure sinewaves.  Is there way to make it sound more appealing?  **IT REALLY HURTS THE EARS.  AGGGGH**

# Getting Started on maintaining this project

First, in order to avoid conflicts with existing installed packages for your python installation.  It is helpful to create a virtual environment.  You can use virtualenv or Anacadonda.

# Requirements
Change your directory to the root level where requirements.txt is located.  Then run the following command:

    pip install -r requirements.txt

# How to use the **hilbert2audio** CLI

    python image2audio.py <Path to Image>

# Getting into Contact with me (marco)

You can just @me on discord through the Saskinvent server
