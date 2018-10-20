import { Component } from '@angular/core';
import * as d3 from 'd3';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App!';
}


var circles = [
  {"cx": 4, "cy": 10, "r":2},
  {"cx": 40, "cy": 20, "r":2},
  {"cx": 8, "cy": 40, "r":2},
  {"cx": 5, "cy": 50, "r":2},
  {"cx": 3, "cy": 200, "r":2},
]

let dataset = [

];


let width = window.innerWidth -10;
let height = window.innerHeight -25;
let margin = { top: 40, right: 20, bottom: 20, left: 40 };
let radius = 6;

let svg = d3.select("body")
  .append("svg")
    .attr("width",width)
    .attr("height",height)

let xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width - margin.right]);  // Set margins for x specific

let yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, height - margin.bottom]);  // Set margins for x specific

let circleAttrs = {
  cx: function(d) { return xScale(d.x); },
  cy: function(d) { return yScale(d.y); },
  r: radius
};

function drawCircles() {
  svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
      .attr("cx",function(d) { return xScale(d.x)})
      .attr("cy",function(d) { return yScale(d.y)})
      .attr("r", function(d) { return radius})  
}

drawCircles()

      
svg.on("click", function () {
  
  let aux:any = this
  let coords = d3.mouse(aux);


  // Normally we go from data to pixels, but here we're doing pixels to data
  var newData= {
    x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
    y: Math.round( yScale.invert(coords[1]))
  };

  dataset.push(newData);   // Push data to our array
  drawCircles()
  
})

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}


window.addEventListener("keydown", function(event) {
  let str = "KeyboardEvent: key='" + event.key + "' | code='" +
  event.code + "'";
  console.log(str);
  if(event.key == 's') download(JSON.stringify(dataset), Date.now()+'data.txt', 'text/plain'); 
}, true);

console.log("Esteve, you're the best!");
