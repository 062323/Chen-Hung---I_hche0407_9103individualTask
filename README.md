# Chen-Hung-I_hche0407_9103individualTask
## Individual Task Inspiration
>Choosen method：Perlin noise and randomness  

![1-1](asset/Part1-1.png)
![1-2](asset/Part1-2.png)
[Inspiration link](https://www.youtube.com/watch?v=mBGz30KY9WQ&t=681s)  
My inspiration is from a film project which the artist uses the point cloud technology to recreate the room of his deceased grandfather.
I really like this effect because it perfectly demonstrates a kind of dreamy atmosphere, suggesting that those memories are truly present but slowly fading away. 
This method is closely related to our chosen topic, __'Saint Georges majeur au crépuscule'__ which its creator Claude Monet based on his memories of his trip to Venice. I think this is a good way to illustrate the fading memory of Monet.

## Instructions
![1](asset/cover.png)
Upon opening, the particles will start emerging from the edge of the buildings, and the waves will slowly moved. When the screen is resized, the shapes and waves will move too.   

## Change Description for waves
1. To make the wave moved, first I remove the `noLoop()` from `setup()` so the loop will not be stop upon refresh.  
2. I defined an public array to store the waves, and a variable to slow down the wave's movement  
>let waves = []; // Set up waves array to store waves  
>let speed = 0.01; // Speed factor to slow down the wave movement  
3. Add function `setWaves()` to give the waves initial settings, and I changed to colour from the group code to fit in the style I want. This function is called in `setup()`.  
![2](asset/c1.png)  
4. Nothing much has been changed here in the original `drawWave()`, just moved the defined part to `setWaves()` and add a for loop to loop over the waves.  
![3](asset/c2.png) 

## Change Description for sky and skyReflection  
Nothing is changed in these two functions, I just change the colour of the gradient to fit in the style I want.  

## Change Description for buildings  
In the `drawBuilding()` I changed the way of drawing the shapes, now I draw shapes from the vertex I stored in edgePoints[], so that I can utalize those vertices for other usage. I also changed the colour and add a new colour stop in `linearGradient()` and blur all the building shapes to match the style.
![4](asset/c3.png) 

## Change Description for adding particles  
1. To add particles generated from the edge of the shapes, first I defined three new arrays.  
>let particles = [];// Set up particles array to store particles
>let shapes = [];// Set up shapes array to store the 3 shapes
>let edgePoints = [];// set up edgePoints array to store the points that will appear on random position on the edge of the shapes  
2. In `setup()`, I convert all the all the coordinates of the 3 shapes I declared in `drawBuilding()` to vectors so that I can use those vertices to make interpolate points between each two vertices.  
![5](asset/c4.png)  
3. In `interpolatePoints()`, I create multiple edge points from each 2 vertices I converted in `setup()` using the parameters given by `setup()`.  
![6](asset/c5.png) 
4. In `draw()`, there are 3 parts of code with different function, the first part of code will create 10 new particles per frame and put them in the particles = [] array. 
![7](asset/c6-1.png) 
The secound part of code will keep `update()` and `show()` in the `class Particle` running as long as there are still particles left in the particles = [] array. Also, it will remove the particle that is already finished its display out of the particles = [] array using splice().  
![8](asset/c6-2.png)  
The third part of the code will create a new point from one of the point from edgePoints[] per frame, and feed this point's coordinates to `class Particle`.  
![9](asset/c6-3.png)  
5. In `class Particle`, first I construct figures for every single particle with the 


