# Computer Vision

# UNIT 1: Introduction to Computer Vision and Image and Image Formating

### What is Computer Vision

Computer Vision if a field of computer science that enables computers to see identify and process images as human beings see and process and give out the appropriate output

### Fundamental Steps in Image Processing:

- Preprocessing (Image enchancement and image reconstruction)
- Segmentation (Isolating Objects)
- Feature Extraction (representation and description)
- Classification (Object recoognition)

### Clustering

As repetition is based upon similarity, it must be relative. If two things that are similar are always similar is some aspects.
Searching for similarity and differences leads to classfication.

### Computer Vision vs Human Vision (IMP)

1.  **Biological vs. Artificial Perception**:
    Biological process involving the eyes, optic nerves, and brain. Human vision is influenced by factors such as cognition, emotion, and experience.
    Artificial process performed by machines using algorithms and computational techniques. Computer vision lacks human-like cognition and subjective understanding.
2.  **Sensory Mechanism**:
    Relies on biological sensors (eyes) that capture light and convert it into electrical signals. Human vision is sensitive to factors like color, texture, depth, and motion.
    Relies on digital sensors (cameras) to capture images or video frames. Computer vision algorithms process pixel values and features extracted from images.
3.  **Complexity and Adaptability**:  
    Highly complex and adaptive system capable of recognizing a wide range of objects, scenes, and patterns. Human vision can easily adapt to changes in lighting conditions, perspectives, and environmental factors.
    Less complex and less adaptable compared to human vision. Computer vision algorithms may struggle with variations in lighting, occlusions, and perspective changes unless explicitly trained or programmed to handle such scenarios.
4.  **Subjectivity and Context**:
    Subjective perception influenced by individual experiences, biases, and cultural factors. Human vision incorporates contextual understanding and prior knowledge to interpret visual scenes.
    Objective processing based on predefined rules, algorithms, and mathematical models. Computer vision systems lack the subjective interpretation and contextual understanding inherent in human vision.

### Applications of Computer Vision

Computer vision finds applications in numerous domains:

1.  **Document Image Analysis**: It involves tasks such as text extraction, document classification, and handwriting recognition.
2.  **Biometrics**: Computer vision is used for biometric authentication systems, including facial recognition, iris recognition, and fingerprint recognition.
3.  **Object Recognition**: Identifying and categorizing objects within images or videos.
4.  **Tracking**: Continuously monitoring and following objects or people across successive frames in a video.
5.  **Medical Image Analysis**: Analyzing medical images for diagnosis, treatment planning, and medical research.
6.  **Content-Based Image Retrieval**: Retrieving images from large databases based on their visual content rather than textual metadata.
7.  **Video Data Processing**: Analyzing and extracting information from video streams, such as surveillance footage or video content on social media.

**Example:** In autonomous vehicles, computer vision is used for object detection and recognition to identify pedestrians, vehicles, and traffic signs on the road

### What is Image?

In technical terms, an image is a two-dimensional representation of visual data, composed of discrete elements called pixels. Each pixel (short for "picture element") represents a small portion of the image and contains numerical values representing attributes such as color, intensity, or grayscale level.

An image is a matrix or grid of pixels, where each pixel contains numerical data representing the color, intensity, or grayscale value of a specific point in the image

# Unit 2:

### Geomteric Transformation

It can change the orienetation, shape and size of the object in the database as well as on the graphic image.
Uses of Geometric Transformation

- In construction of a model
- In editing the model using commands like: zoom, translate, mirror rotate, etc
- For obtaining orthographic, isometric and prospective view of a model
- To view the model from different positions
- Animation.

### Basic Geomteric Transformation (IMP)

- Translation
- Rotation
- Scaling
- Reflection
- Shear
- Concatenated

### Euclidean Transformation

- Most commonly used transformation
- Is either translation, rotation or reflection.
- Preserves length and angle
- That is line will transform to line, circle to circle, rectangle to rectangle
- Only position and orientation will change

#### Reflection:

- Mirror Images as seen across a line or a point.

#### Translations:

Changes figure to a new location with no change to the looks of the figure.

#### Rotation:

Turns figure clockwise or anti clockwise

### Translation:

- Transformation that slides a figure across a plane through space.
- All the points of a figure move the same distance and same direction.
- If a point is moves `a` units to the right of `b` units up then the translated point will be at `(x+a, y+b)`
- Draw graph and show the same example.

### Rotation

- Turns a figure around a point or line.
- Spin a shape
- The point a figure turns around is called center of rotation
- Centre of rotation can be inside or outside the shape
- Can be rotated about a fixed point.
- When a figure si rotated 180 degree about origin, multiply both coordinated by -1.

### Reflection:

- Reflects a figure using a line or a point. All measures are preserved
- Reflection about x-axix: the x values stay the same and the y values change sign `(x,y) -> (x,-y)`
- Reflection about y-axiz: the y values stay the same and the x values change sign `(x,y) -> (-x,y)`
- Give example with graph.

### Matching Techniques

Image matching has been a major research issue in computer vision and digital photography. The different approaches of image matching are:

- Intensity-based
- Feature based
- Relational

In intensity based matching the origin image data is used in teh form of a matrix of grey values. The most prominent methods are cross-correlationg and least sqaures matching (LS matching or LSM) which are also _area-based matching_. Provides sub pixel accuracy. LS requires good approximate values.

Feature baed matching requires extractino of basic image features such as patches corners, junction edges and so on. In second step matching in performed between these features. Features are not always stable. Information that is lost during the feature extraction phase can no longer be recovered.
Features based has been performed with

- relaxation
- dynamic programming
- robuse estimation
- cross-correlation
- graph matching

Relational matching used geometric or other relations between features and structues. Correspondence is establised by tree-search techniques. Not very accurate but are usually robust. They do not require good approximations.

## Unit 3

#### Introduction to Digital Image.

- The digital iamge means 2d array of quantize intensity values or 2d array of numbers.
- Digital image processing means how to manipulate these numbers.
- The digital image means 2d array of quantize values or maybe a 2d array of numbers.
- If you want to improve visual quality of image, then in this case I have to manipulate these numbers.
- If you want to remove noises then also you have to manipulate these numbers.
- In case of image acquisition, the light is converted into electrical signals, analog to digital using process like sampling and quantization. So Sample along the x-direction and along y-direction called spatial sampling.

### Types of Digital Image

- Digital Photos
- Image sequences used for video broadcasting and playback
- Multi-sensor data like satellite images in the visible, infrared and microwave bands.
- Medical images like unltra-sound images, Xray images and radio-band images
- Astronomical images
- Electron-microscope images used to study material structure.

### What is Digital Image

- 2d array of numbers representing the sampled version of an image
- The image defined over a grid, each grid location being called a pixel.
- Represented by finite grid and each intensity data is represented a finite number of bits.
- A binary image is represented by one bit. Gray-level image is represented by 8bits.
- Dynamic Range
  - The value of highest pixel minus the value of lowest pixel is called dynamic range.
- Resolution
  - Spatial resolution means the number of pairs of lines per unit distance.
  - Intensity resolution is smallest discernible changes in the intensity level.

### Image Processing Steps

- Acquisition, sampling / quantization / compression
- Image enhancement and restoration
- Image segmentation
- Feature extraction
- Object recognition
- Image interpretation / understanding

### Image Enhancement

- enhancing contrast
- sharpening edges
- removing noise

### Histogram Equalization

- Enhance contrast of image by transforming the values in an intensity image to its normalized histogram
- The histogram of the output image is uniformly distributed
- Contrast is better.

### Feature Extraction

- Extracting features like edges
- Very important to detect the boundaries of the object.
- Done through digital differentiation operation.

### Segmentation

- Partitioning of an image into connected homogenous regions.
- Homogenity may be defined in terms of
- gray value
- colour
- texture
- shape
- motion

### Image Understanding

- Inferring about the scene on the basis of the recognized objects
- Supervision is required
- Normally considered as part of artificial intelligence

### Object Recognition

- An object recognition system finds objects in the real world from an image of the world, using object models which are known a priori
- labelling problem based on models of known objects
- Object or model representation
- feature extraction
- feature model matching
- hypothesis formation
- Object verification
