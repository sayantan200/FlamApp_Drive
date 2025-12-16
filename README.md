## Interactive Bézier Rope (Web)

## Overview
This project implements an interactive cubic Bézier curve that behaves like a flexible rope.  
The curve updates in real time based on mouse movement and is rendered using HTML Canvas and JavaScript.

## Bézier Curve Math
The curve is defined using four control points (P₀, P₁, P₂, P₃).  
P₀ and P₃ are fixed endpoints, while P₁ and P₂ influence the shape of the curve.
The cubic Bézier equation is evaluated for values of t from 0 to 1 at small steps, and the resulting points are connected to form the curve.

## Tangent Visualization
Tangent vectors are computed using the derivative of the cubic Bézier equation.  
For each selected t value, the derivative gives the direction of the curve at that point.  
These vectors are normalized and drawn as short arrows starting from the curve.

## Control Point Motion (Physics)
The inner control points (P₁ and P₂) move using a simple spring-damping model.  
Mouse input updates a target position, and acceleration is calculated as the difference between the current position and the target, along with a damping term based on velocity.  
This avoids sudden jumps and gives the curve a smooth, rope-like motion.

## Rendering and Interaction
The animation runs using requestAnimationFrame to keep updates smooth.  
All Bézier math, tangent computation, and motion logic are implemented manually without using any built-in Bézier or physics libraries.
